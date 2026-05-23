/* ==========================================================================
   LIGA MADEIRA — Authentication Engine
   JWT-like tokens · SHA-256 hashing · OTP · Google OAuth sim · WhatsApp OTP
   ========================================================================== */

'use strict';

// ─── Constants ───────────────────────────────────────────────────────────────
const AUTH_STORAGE_KEY = 'lm_auth_db';
const SESSION_KEY      = 'lm_session';
const OTP_KEY          = 'lm_otp_pending';
const TOKEN_EXPIRY_MS  = 7 * 24 * 60 * 60 * 1000; // 7 days

// ─── Memory Fallbacks for Sandboxed / local file:// Contexts ─────────────────
window._mock_auth_db = window._mock_auth_db || null;
window._mock_session = window._mock_session || null;
window._mock_otp     = window._mock_otp || null;

// ─── Utility: SHA-256 via SubtleCrypto (with pure JS fallback) ───────────────
async function sha256(message) {
  if (typeof crypto !== 'undefined' && crypto && crypto.subtle) {
    try {
      const msgBuffer = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      console.warn("Crypto.subtle failed, using pure JS hashing fallback", e);
    }
  }

  // Pure JS Fallback for non-secure contexts (e.g. file:// protocol)
  let hash = 0;
  for (let i = 0; i < message.length; i++) {
    const char = message.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  let hex = Math.abs(hash).toString(16).padStart(8, '0');
  while (hex.length < 64) {
    hex += Math.abs(hash ^ (hex.length * 997)).toString(16).padStart(8, '0');
  }
  return hex.slice(0, 64);
}

// ─── Utility: base64url encode/decode ────────────────────────────────────────
function b64Encode(str) {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
function b64Decode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return decodeURIComponent(escape(atob(str)));
}

// ─── JWT-like Token ───────────────────────────────────────────────────────────
async function generateToken(user) {
  const header  = b64Encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = b64Encode(JSON.stringify({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    iat: Date.now(),
    exp: Date.now() + TOKEN_EXPIRY_MS
  }));
  const sig = await sha256(header + '.' + payload + '.lm_secret_key_2026');
  return `${header}.${payload}.${sig.slice(0, 32)}`;
}

function parseToken(token) {
  try {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(b64Decode(parts[1]));
    if (payload.exp < Date.now()) return null; // expired
    return payload;
  } catch { return null; }
}

// ─── User Database ────────────────────────────────────────────────────────────
function getAuthDB() {
  try { 
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)) || window._mock_auth_db || { users: [] }; 
  } catch { 
    return window._mock_auth_db || { users: [] }; 
  }
}
function saveAuthDB(db) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(db));
  } catch (e) {
    console.warn("Storage write failed. Using memory fallback.", e);
  }
  window._mock_auth_db = db;
}

function findUserByEmail(email) {
  return getAuthDB().users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

function findUserById(id) {
  return getAuthDB().users.find(u => u.id === id) || null;
}

async function createUser({ name, email, phone, role, password }) {
  const db = getAuthDB();
  const existingUser = findUserByEmail(email);
  if (existingUser) throw new Error('E-mail já cadastrado.');

  const pwHash = await sha256(password + 'lm_salt_2026');
  const newUser = {
    id: 'usr_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
    name,
    email: email.toLowerCase(),
    phone: phone || '',
    role,
    passwordHash: pwHash,
    verified: false,
    createdAt: new Date().toISOString(),
    avatar: null
  };
  db.users.push(newUser);
  saveAuthDB(db);
  return newUser;
}

async function verifyLogin(email, password) {
  const user = findUserByEmail(email);
  if (!user) throw new Error('Usuário não encontrado.');
  const pwHash = await sha256(password + 'lm_salt_2026');
  if (pwHash !== user.passwordHash) throw new Error('Senha incorreta.');
  return user;
}

async function updateUserPassword(email, newPassword) {
  const db = getAuthDB();
  const idx = db.users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (idx === -1) throw new Error('Usuário não encontrado.');
  db.users[idx].passwordHash = await sha256(newPassword + 'lm_salt_2026');
  saveAuthDB(db);
}

function markUserVerified(email) {
  const db = getAuthDB();
  const idx = db.users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (idx !== -1) { db.users[idx].verified = true; saveAuthDB(db); }
}

// ─── Session Management ───────────────────────────────────────────────────────
async function startSession(user) {
  const token = await generateToken(user);
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ token, userId: user.id }));
  } catch (e) {
    console.warn("Storage write failed. Using memory fallback for session.", e);
  }
  window._mock_session = { token, userId: user.id };
  // Ensure the session is persisted before any navigation occurs.
  await new Promise(r => setTimeout(r, 200));
  return token;
}

function getSession() {
  try {
    const s = JSON.parse(localStorage.getItem(SESSION_KEY)) || window._mock_session;
    if (!s) return null;
    const payload = parseToken(s.token);
    if (!payload) { endSession(); return null; }
    return { ...s, ...payload };
  } catch { 
    if (window._mock_session) {
      const payload = parseToken(window._mock_session.token);
      if (!payload) { endSession(); return null; }
      return { ...window._mock_session, ...payload };
    }
    return null; 
  }
}

function endSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {}
  window._mock_session = null;
}

// ─── Route Protection (call on index.html load) ───────────────────────────────
function requireAuth() {
  const session = getSession();
  if (!session) {
    window.location.href = 'auth.html';
    return null;
  }
  return session;
}

// ─── OTP Management ──────────────────────────────────────────────────────────
function generateOTP() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function storeOTP(email, code, type = 'verify') {
  const otpData = {
    email, code, type,
    expires: Date.now() + 10 * 60 * 1000 // 10 min
  };
  try {
    localStorage.setItem(OTP_KEY, JSON.stringify(otpData));
  } catch (e) {
    console.warn("Storage write failed. Using memory fallback for OTP.", e);
  }
  window._mock_otp = otpData;
}

function getStoredOTP() {
  try {
    const d = JSON.parse(localStorage.getItem(OTP_KEY)) || window._mock_otp;
    if (!d || d.expires < Date.now()) { clearOTP(); return null; }
    return d;
  } catch { 
    if (window._mock_otp) {
      if (window._mock_otp.expires < Date.now()) { clearOTP(); return null; }
      return window._mock_otp;
    }
    return null; 
  }
}

function clearOTP() { 
  try {
    localStorage.removeItem(OTP_KEY); 
  } catch {}
  window._mock_otp = null;
}

// ══════════════════════════════════════════════════════════════════════════════
// UI LOGIC
// ══════════════════════════════════════════════════════════════════════════════

// ─── Page init ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Skip auth checks on the login/registration page itself
  if (window.location.pathname.includes('auth.html')) {
    // Initialize particles and Google modal for the auth page only
    generateParticles();
    initGoogleModal();
    return;
  }

  // On protected pages (e.g., index.html), enforce authentication
  if (!getSession()) {
    requireAuth(); // redirects to auth.html if no session
    return;
  }

  // If session exists, ensure we stay on the app
  // (no redirect needed; just initialize UI effects)
  generateParticles();
  initGoogleModal();
});

// ─── Particles ───────────────────────────────────────────────────────────────
function generateParticles() {
  const layer = document.getElementById('particles-layer');
  if (!layer) return;
  const colors = ['rgba(255,90,0,0.5)', 'rgba(255,160,80,0.4)', 'rgba(244,235,229,0.3)', 'rgba(138,59,18,0.5)'];
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 8 + 3;
    const left = Math.random() * 100;
    const dur  = Math.random() * 10 + 6;
    const delay = Math.random() * 8;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${left}%;
      bottom:-20px;
      background:${color};
      --dur:${dur}s;
      --delay:${delay}s;
    `;
    layer.appendChild(p);
  }
}

// ─── Tab Switching ────────────────────────────────────────────────────────────
function switchTab(tab) {
  document.querySelectorAll('.auth-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-' + (tab === 'recover' ? 'recover' : tab)).classList.add('active');
  document.getElementById('panel-' + tab).classList.add('active');
  clearFieldErrors();
}

function clearFieldErrors() {
  document.querySelectorAll('.field-error').forEach(e => e.classList.remove('show'));
  document.querySelectorAll('input').forEach(i => { i.classList.remove('error'); i.classList.remove('success'); });
}

function showFieldError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.classList.add('show'); }
}

// ─── Toast ────────────────────────────────────────────────────────────────────
let toastTimer;
function showToast(msg, type = 'info') {
  const toast = document.getElementById('auth-toast');
  const msgEl  = document.getElementById('auth-toast-msg');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.className = `auth-toast ${type} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3800);
}

// ─── Password Toggle ──────────────────────────────────────────────────────────
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  btn.querySelector('svg').innerHTML = isPass
    ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'
    : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
}

// ─── Password Strength ────────────────────────────────────────────────────────
function checkPasswordStrength(val) {
  const bars  = [1,2,3].map(i => document.getElementById(`pw-bar-${i}`));
  const label = document.getElementById('pw-label');
  if (!bars[0]) return;
  bars.forEach(b => { b.className = 'pw-bar'; });
  if (val.length === 0) { if (label) label.textContent = '—'; return; }
  let score = 0;
  if (val.length >= 8)  score++;
  if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  const levels = [
    { cls: 'weak',   text: 'Fraca',  color: '#e53e3e' },
    { cls: 'medium', text: 'Média',  color: '#f6ad55' },
    { cls: 'strong', text: 'Forte',  color: '#38a169' }
  ];
  const lvl = levels[Math.max(0, score - 1)];
  for (let i = 0; i < score; i++) bars[i].classList.add(lvl.cls);
  if (label) { label.textContent = lvl.text; label.style.color = lvl.color; }
}

// ─── OTP Digit Inputs ────────────────────────────────────────────────────────
function otpInput(idx) {
  const inp = document.getElementById(`otp-${idx}`);
  if (!inp) return;
  inp.value = inp.value.replace(/\D/g, '').slice(-1);
  if (inp.value && idx < 5) document.getElementById(`otp-${idx + 1}`)?.focus();
}

function otpKeydown(idx, e) {
  if (e.key === 'Backspace') {
    const inp = document.getElementById(`otp-${idx}`);
    if (inp && !inp.value && idx > 0) {
      document.getElementById(`otp-${idx - 1}`)?.focus();
    }
  }
}

function getOTPValue() {
  return [0,1,2,3,4,5].map(i => document.getElementById(`otp-${i}`)?.value || '').join('');
}

function clearOTPInputs() {
  [0,1,2,3,4,5].forEach(i => { const el = document.getElementById(`otp-${i}`); if (el) el.value = ''; });
}

// ─── OTP Overlay ─────────────────────────────────────────────────────────────
function showOTPOverlay(email, type = 'verify') {
  const code = generateOTP();
  storeOTP(email, code, type);
  const lbl = document.getElementById('otp-email-label');
  if (lbl) lbl.textContent = email;
  clearOTPInputs();
  document.getElementById('otp-overlay')?.classList.add('show');
  setTimeout(() => document.getElementById('otp-0')?.focus(), 200);
  // In a real app this goes to a server; we log it to console for demo
  console.log(`[Liga Madeira OTP] Code for ${email}: ${code}`);
  showToast(`Código enviado para ${email} (veja o console para demo)`, 'info');
}

function confirmOTP() {
  const entered = getOTPValue();
  if (entered.length < 6) { showToast('Digite os 6 dígitos do código.', 'error'); return; }
  const stored = getStoredOTP();
  if (!stored)                 { showToast('Código expirado. Reenvie.', 'error'); return; }
  if (stored.code !== entered) { showToast('Código inválido. Tente novamente.', 'error'); return; }

  clearOTP();
  document.getElementById('otp-overlay')?.classList.remove('show');

  if (stored.type === 'verify') {
    markUserVerified(stored.email);
    completeRegistration(stored.email);
  } else if (stored.type === 'recover') {
    document.getElementById('recover-step-1').style.display = 'none';
    document.getElementById('recover-step-2').style.display = 'block';
    window._recoverEmail = stored.email;
    showToast('Código confirmado! Defina sua nova senha.', 'success');
  }
}

function resendOTP() {
  const stored = getStoredOTP();
  if (stored) { clearOTP(); showOTPOverlay(stored.email, stored.type); }
  else showToast('Inicie o processo novamente.', 'error');
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
async function handleLogin(e) {
  e.preventDefault();
  clearFieldErrors();
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-password').value;
  let valid = true;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFieldError('login-email-err', 'E-mail inválido.'); valid = false;
  }
  if (!pass) {
    showFieldError('login-pass-err', 'Informe a senha.'); valid = false;
  }
  if (!valid) return;

  const btn     = document.getElementById('login-btn');
  const btnText = document.getElementById('login-btn-text');
  btn.disabled = true;
  btnText.innerHTML = '<span class="spinner"></span> Entrando...';

  try {
    const user = await verifyLogin(email, pass);
    await startSession(user);
    showToast(`Bem-vindo, ${user.name.split(' ')[0]}!`, 'success');
    setTimeout(() => window.location.href = 'index.html', 800);
  } catch (err) {
    btn.disabled = false;
    btnText.textContent = 'Entrar na Plataforma';
    if (err.message.includes('Usuário')) showFieldError('login-email-err', 'E-mail não encontrado.');
    else showFieldError('login-pass-err', 'Senha incorreta. Tente novamente.');
    showToast(err.message, 'error');
  }
}

// ─── REGISTER ─────────────────────────────────────────────────────────────────
let pendingRegistrationEmail = null;

async function handleRegister(e) {
  e.preventDefault();
  clearFieldErrors();
  const name     = document.getElementById('reg-name').value.trim();
  const phone    = document.getElementById('reg-phone').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const profile  = document.getElementById('reg-profile').value;
  const pass     = document.getElementById('reg-password').value;
  const confirm  = document.getElementById('reg-confirm-password').value;
  const terms    = document.getElementById('reg-terms').checked;
  let valid = true;

  if (!name)                    { showFieldError('reg-name-err', 'Nome obrigatório.'); valid = false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFieldError('reg-email-err', 'E-mail inválido.'); valid = false;
  }
  if (findUserByEmail(email))   { showFieldError('reg-email-err', 'E-mail já cadastrado.'); valid = false; }
  if (!profile)                 { showFieldError('reg-profile-err', 'Selecione um perfil.'); valid = false; }
  if (pass.length < 8)          { showFieldError('reg-pass-err', 'Mínimo 8 caracteres.'); valid = false; }
  if (pass !== confirm)         { showFieldError('reg-confirm-err', 'As senhas não coincidem.'); valid = false; }
  if (!terms)                   { document.getElementById('reg-terms-err').classList.add('show'); valid = false; }
  if (!valid) return;

  const btn     = document.getElementById('register-btn');
  const btnText = document.getElementById('register-btn-text');
  btn.disabled = true;
  btnText.innerHTML = '<span class="spinner"></span> Criando conta...';

  try {
    await createUser({ name, email, phone, role: profile, password: pass });
    pendingRegistrationEmail = email;
    showOTPOverlay(email, 'verify');
    btn.disabled = false;
    btnText.textContent = 'Criar Minha Conta';
  } catch (err) {
    btn.disabled = false;
    btnText.textContent = 'Criar Minha Conta';
    showToast(err.message, 'error');
  }
}

async function completeRegistration(email) {
  const user = findUserByEmail(email);
  if (!user) return;
  await startSession(user);
  showToast(`Conta verificada! Bem-vindo, ${user.name.split(' ')[0]}!`, 'success');
  setTimeout(() => window.location.href = 'index.html', 900);
}

// ─── RECOVER PASSWORD ─────────────────────────────────────────────────────────
async function handleRecoverSend(e) {
  e.preventDefault();
  clearFieldErrors();
  const email = document.getElementById('recover-email').value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFieldError('recover-email-err', 'E-mail inválido.'); return;
  }
  if (!findUserByEmail(email)) {
    showFieldError('recover-email-err', 'E-mail não encontrado no sistema.'); return;
  }

  const btn     = document.getElementById('recover-send-btn');
  const btnText = document.getElementById('recover-btn-text');
  btn.disabled = true;
  btnText.innerHTML = '<span class="spinner"></span> Enviando...';
  await new Promise(r => setTimeout(r, 800));
  btn.disabled = false;
  btnText.textContent = 'Enviar Código de Recuperação';
  showOTPOverlay(email, 'recover');
}

async function handleRecoverReset(e) {
  e.preventDefault();
  const email   = window._recoverEmail;
  const pass    = document.getElementById('new-password').value;
  const confirm = document.getElementById('new-password-confirm').value;
  if (!pass || pass.length < 8) { showToast('Mínimo 8 caracteres.', 'error'); return; }
  if (pass !== confirm) { showFieldError('new-pass-confirm-err', 'As senhas não coincidem.'); return; }

  await updateUserPassword(email, pass);
  showToast('Senha redefinida com sucesso!', 'success');
  setTimeout(() => switchTab('login'), 1200);
}

// ─── GOOGLE LOGIN ─────────────────────────────────────────────────────────────
function initGoogleModal() {
  // Pre-fill with demo account
  const existingSession = getSession();
  if (existingSession) return;
}

function loginWithGoogle() {
  document.getElementById('google-modal')?.classList.add('show');
}

function closeGoogleModal() {
  document.getElementById('google-modal')?.classList.remove('show');
}

async function confirmGoogleLogin() {
  closeGoogleModal();
  const googleName  = document.getElementById('google-account-name')?.textContent || 'Usuário Google';
  const googleEmail = document.getElementById('google-account-email')?.textContent || 'usuario@gmail.com';

  let user = findUserByEmail(googleEmail);
  if (!user) {
    user = await createUser({
      name: googleName,
      email: googleEmail,
      phone: '',
      role: 'marceneiro',
      password: 'google_oauth_' + Date.now()
    });
    markUserVerified(googleEmail);
  }
  await startSession(user);
  showToast(`Bem-vindo via Google, ${user.name.split(' ')[0]}!`, 'success');
  setTimeout(() => window.location.href = 'index.html', 800);
}

// ─── WHATSAPP LOGIN ───────────────────────────────────────────────────────────
function loginWithWhatsApp() {
  const phone = prompt('Digite seu número do WhatsApp (com DDD):\nEx: 11987654321');
  if (!phone) return;
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10) { showToast('Número inválido.', 'error'); return; }

  const code = generateOTP();
  const waNumber = '55' + cleaned;
  const msg = encodeURIComponent(
    `🌲 *Liga Madeira* - Seu código de acesso é: *${code}*\n\nVálido por 10 minutos. Não compartilhe com ninguém.`
  );

  storeOTP('whatsapp_' + cleaned, code, 'whatsapp');

  // Open WhatsApp with the code pre-filled
  window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank');

  // Show a simplified OTP overlay to enter the code
  const lbl = document.getElementById('otp-email-label');
  if (lbl) lbl.textContent = `+55 ${phone}`;
  clearOTPInputs();
  document.getElementById('otp-overlay')?.classList.add('show');
  setTimeout(() => document.getElementById('otp-0')?.focus(), 200);

  // Override confirmOTP for WhatsApp flow
  window._whatsappPhone = cleaned;
}

// Handle WhatsApp OTP confirmation
const _origConfirmOTP = window.confirmOTP;
window.confirmOTPWhatsApp = async function() {
  const entered = getOTPValue();
  if (entered.length < 6) { showToast('Digite os 6 dígitos do código.', 'error'); return; }
  const stored = getStoredOTP();
  if (!stored || stored.code !== entered) { showToast('Código inválido.', 'error'); return; }

  clearOTP();
  document.getElementById('otp-overlay')?.classList.remove('show');

  if (stored.type === 'whatsapp') {
    const phone = window._whatsappPhone || '';
    const email = 'wa_' + phone + '@ligamadeira.app';
    let user = findUserByEmail(email);
    if (!user) {
      user = await createUser({ name: 'Usuário WhatsApp', email, phone, role: 'marceneiro', password: 'wa_' + Date.now() });
      markUserVerified(email);
    }
    await startSession(user);
    showToast('Login via WhatsApp confirmado!', 'success');
    setTimeout(() => window.location.href = 'index.html', 800);
  }
};

// Patch confirmOTP to handle whatsapp type
window.confirmOTP = async function() {
  const stored = getStoredOTP();
  if (stored && stored.type === 'whatsapp') {
    await window.confirmOTPWhatsApp();
  } else {
    const entered = getOTPValue();
    if (entered.length < 6) { showToast('Digite os 6 dígitos do código.', 'error'); return; }
    if (!stored)             { showToast('Código expirado. Reenvie.', 'error'); return; }
    if (stored.code !== entered) { showToast('Código inválido. Tente novamente.', 'error'); return; }

    clearOTP();
    document.getElementById('otp-overlay')?.classList.remove('show');

    if (stored.type === 'verify') {
      markUserVerified(stored.email);
      completeRegistration(stored.email);
    } else if (stored.type === 'recover') {
      document.getElementById('recover-step-1').style.display = 'none';
      document.getElementById('recover-step-2').style.display = 'block';
      window._recoverEmail = stored.email;
      showToast('Código confirmado! Defina sua nova senha.', 'success');
    }
  }
};

// ─── Expose functions globally ─────────────────────────────────────────────
window.switchTab         = switchTab;
window.handleLogin       = handleLogin;
window.handleRegister    = handleRegister;
window.handleRecoverSend = handleRecoverSend;
window.handleRecoverReset = handleRecoverReset;
window.togglePassword    = togglePassword;
window.checkPasswordStrength = checkPasswordStrength;
window.otpInput          = otpInput;
window.otpKeydown        = otpKeydown;
window.resendOTP         = resendOTP;
window.loginWithGoogle   = loginWithGoogle;
window.closeGoogleModal  = closeGoogleModal;
window.confirmGoogleLogin = confirmGoogleLogin;
window.loginWithWhatsApp = loginWithWhatsApp;
window.requireAuth       = requireAuth;
window.getSession        = getSession;
window.endSession        = endSession;
window.findUserById      = findUserById;
