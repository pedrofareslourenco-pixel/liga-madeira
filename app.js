/* ==========================================================================
   LIGA MADEIRA — Core Application Engine & Database Controller
   ========================================================================== */

// 1. BANCO DE DADOS LOCAL (LocalStorage Persistence System)
const INITIAL_DB = {
  activeRole: 'supplier',
  activePanel: 'candidatos',
  selectedSupplierId: 'carlos',
  currentCalendarMonth: 4, // Maio (0-indexed)
  currentCalendarYear: 2026,
  
  suppliers: {
    carlos: {
      id: 'carlos',
      name: 'Carlos Eduardo',
      title: 'Marceneiro Master',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      bio: 'Marceneiro experiente com mais de 12 anos de atuação no mercado, especializado em móveis planejados e soluções personalizadas em madeira. Comprometido com qualidade, acabamento impecável e satisfação do cliente. Atende projetos residenciais e comerciais, sempre com foco em funcionalidade, design e durabilidade.',
      rating: 5.0,
      initials: 'AV',
      badges: ['verified', 'premium', 'guaranteed']
    },
    roberto: {
      id: 'roberto',
      name: 'Roberto Silveira',
      title: 'Especialista em Madeira Maciça',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
      bio: 'Especialista no corte e tratamento de madeiras nobres e de reflorestamento como Jatobá e Pinus. Focado em mobília rústica e design industrial de alta sofisticação para salas e cozinhas planejadas.',
      rating: 4.0,
      initials: 'AV',
      badges: ['verified', 'premium', 'sustainable']
    },
    mariana: {
      id: 'mariana',
      name: 'Mariana Albuquerque',
      title: 'Designer e Projetista de Interiores',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
      bio: 'Atenta aos detalhes com foco em ergonomia e design biofílico. Desenvolve mobiliários integrando automação, iluminação em fitas de LED e acabamentos finos anti-impacto de altíssimo padrão.',
      rating: 4.8,
      initials: 'AV',
      badges: ['verified', 'guaranteed', 'sustainable']
    }
  },
  
  financials: [
    { type: 'venda', month: 'Jan', value: 38000 },
    { type: 'venda', month: 'Fev', value: 48000 },
    { type: 'venda', month: 'Mar', value: 65000 },
    { type: 'venda', month: 'Abr', value: 80000 },
    { type: 'venda', month: 'Mai', value: 100000 },
    
    { type: 'custo', month: 'Jan', value: 95000 },
    { type: 'custo', month: 'Fev', value: 80000 },
    { type: 'custo', month: 'Mar', value: 60000 },
    { type: 'custo', month: 'Abr', value: 45000 },
    { type: 'custo', month: 'Mai', value: 30000 }
  ],
  
  commitments: [
    { id: 1, client: 'Roben', date: '2026-05-23', time: '14:30', desc: 'Medição da sala de jantar e conferência de painéis de Jatobá.' },
    { id: 2, client: 'Laura', date: '2026-05-24', time: '10:00', desc: 'Instalação de fitas de iluminação LED na cozinha sob medida.' },
    { id: 3, client: 'Paulo', date: '2026-05-30', time: '16:00', desc: 'Entrega final da estante de nichos e assinatura do termo de garantia.' }
  ],
  
  leads: [
    { id: 1, name: 'Arthur Ramos', date: '2026-05-10', woodworker: 'Carlos Eduardo', value: 25000, commission: 1250, status: 'Fechado' },
    { id: 2, name: 'Camila Fernandes', date: '2026-05-18', woodworker: 'Carlos Eduardo', value: 18000, commission: 900, status: 'Negociação' },
    { id: 3, name: 'Renato Porto', date: '2026-05-21', woodworker: 'Mariana Albuquerque', value: 32000, commission: 1600, status: 'Visita Agendada' },
    { id: 4, name: 'Beatriz Costa', date: '2026-05-22', woodworker: 'Roberto Silveira', value: 12000, commission: 600, status: 'Novo Lead' }
  ],
  
  resellers: [
    { rank: 1, name: 'Joana D\'Arc (Você)', sales: 68000, comm: 4250, status: 'VIP Gold' },
    { rank: 2, name: 'Marcos Silva', sales: 55000, comm: 3300, status: 'VIP Silver' },
    { rank: 3, name: 'Patrícia Lima', sales: 42000, comm: 2520, status: 'Bronze' }
  ],
  
  feed: [
    {
      id: 'feed_1',
      authorName: 'Mariana Albuquerque',
      authorTitle: 'Designer de Interiores',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
      time: 'Há 2 horas',
      content: 'Finalizei a renderização 3D deste closet sob medida. Usando tons amadeirados quentes combinados com perfis em LED embutidos. O cliente adorou a proposta!',
      media: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=700',
      likes: 12,
      likedByMe: false,
      comments: [
        { author: 'Carlos Eduardo', text: 'Excelente trabalho, Mariana! As cores ficaram muito harmônicas.' }
      ]
    },
    {
      id: 'feed_2',
      authorName: 'Roberto Silveira',
      authorTitle: 'Especialista em Madeira Maciça',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150',
      time: 'Há 1 dia',
      content: 'Mesa rústica entregue hoje. Tampo único de Jatobá maciço com 5cm de espessura. Trabalho pesado de lixamento e selagem, mas o resultado compensa!',
      media: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=700',
      likes: 24,
      likedByMe: false,
      comments: []
    }
  ],
  
  chats: {
    activeContactId: 'mariana',
    contacts: {
      mariana: {
        id: 'mariana',
        name: 'Mariana Albuquerque',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
        title: 'Designer de Interiores',
        online: true,
        messages: [
          { sender: 'received', text: 'Olá Carlos, você tem disponibilidade para medir a cozinha da cliente Laura amanhã?', time: '10:14' },
          { sender: 'sent', text: 'Olá Mariana! Tenho sim, podemos marcar às 14:30. O que acha?', time: '10:18' },
          { sender: 'received', text: 'Perfeito, vou confirmar com ela e te aviso aqui.', time: '10:20' }
        ]
      },
      roberto: {
        id: 'roberto',
        name: 'Roberto Silveira',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150',
        title: 'Especialista em Madeira',
        online: false,
        messages: [
          { sender: 'received', text: 'Carlos, sobrou um pouco de verniz náutico do seu último projeto?', time: 'Ontem' },
          { sender: 'sent', text: 'Opa Roberto, sobrou meia lata sim. Se quiser passar aqui para pegar, está à disposição.', time: 'Ontem' }
        ]
      },
      arthur: {
        id: 'arthur',
        name: 'Arthur Ramos (Cliente)',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150',
        title: 'Cliente Final',
        online: true,
        messages: [
          { sender: 'received', text: 'Boa tarde! Qual é o prazo estimado para a entrega final do painel?', time: '13:40' },
          { sender: 'sent', text: 'Boa tarde Arthur! A produção está no cronograma, pretendemos entregar na próxima semana.', time: '13:45' }
        ]
      }
    }
  },
  
  kanban: [
    { id: 'k_1', title: 'Medição da Sala Laura', desc: 'Confirmar medidas finais para produção do painel.', status: 'todo', tag: 'urgente' },
    { id: 'k_2', title: 'Comprar Corrediças Telescópicas', desc: 'Adquirir 12 pares reforçados de 45cm.', status: 'doing', tag: 'normal' },
    { id: 'k_3', title: 'Lixamento Mesa Arthur', desc: 'Lixamento final grão 320 concluído.', status: 'done', tag: 'normal' }
  ],
  
  personalNotes: 'Ideias de projetos futuros:\n1. Criado-mudo suspenso com carregador por indução embutido no tampo.\n2. Prateleira flutuante invisível com canaletas para fita de LED.\n3. Mesa lateral usando fatias redondas (bolachas) de madeira tratada com resina epóxi azul.'
};

let db = {};

// Instâncias Globais dos Gráficos
let salesChartInstance = null;
let costsChartInstance = null;
let pieChartInstance = null;

// Inicializador do DB
function initDatabase() {
  const stored = localStorage.getItem('liga_madeira_db');
  if (stored) {
    try {
      db = JSON.parse(stored);
      db.suppliers = db.suppliers || INITIAL_DB.suppliers;
      db.feed = db.feed || INITIAL_DB.feed;
      db.chats = db.chats || INITIAL_DB.chats;
      db.kanban = db.kanban || INITIAL_DB.kanban;
      db.personalNotes = db.personalNotes || INITIAL_DB.personalNotes;
    } catch (e) {
      db = JSON.parse(JSON.stringify(INITIAL_DB));
    }
  } else {
    db = JSON.parse(JSON.stringify(INITIAL_DB));
    saveToStorage();
  }

  // Sincronizar usuário logado do auth.js
  if (typeof getSession === 'function') {
    const session = getSession();
    if (session) {
      if (!db.suppliers[session.sub]) {
        db.suppliers[session.sub] = {
          id: session.sub,
          name: session.name,
          title: session.role === 'marceneiro' ? 'Marceneiro Master' : (session.role === 'revendedor' ? 'Revendedor Especialista' : 'Fabricante Parceiro'),
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop',
          bio: 'Fornecedor cadastrado na plataforma Liga Madeira. Especialista em co-criação de projetos residenciais e comerciais premium.',
          rating: 5.0,
          initials: session.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
          badges: ['verified', 'premium']
        };
        db.selectedSupplierId = session.sub;
        saveToStorage();
      }
    }
  }
}

function saveToStorage() {
  localStorage.setItem('liga_madeira_db', JSON.stringify(db));
}

function resetDatabase() {
  db = JSON.parse(JSON.stringify(INITIAL_DB));
  saveToStorage();
  initApp();
  showToast('Banco de dados local restaurado com sucesso!', 'refresh-cw');
}

// 2. SISTEMA DE TOASTS
function showToast(message, iconName = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'app-toast';
  toast.innerHTML = `<i data-lucide="${iconName}"></i><span>${message}</span>`;
  
  container.appendChild(toast);
  lucide.createIcons();
  
  // Animar entrada
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Remover
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// 3. SISTEMA DE NAVEGAÇÃO E REGRAS DE VISÃO
function switchRole(role) {
  db.activeRole = role;
  saveToStorage();
  
  // Atualizar botões de controle de modo no topo
  document.getElementById('btn-role-supplier').classList.remove('active');
  document.getElementById('btn-role-client').classList.remove('active');
  document.getElementById('btn-role-reseller').classList.remove('active');
  
  document.getElementById(`btn-role-${role}`).classList.add('active');
  
  // Controlar visibilidade de barras e menus de acordo com o perfil
  const sidebar = document.getElementById('app-sidebar');
  
  if (role === 'supplier') {
    sidebar.style.display = 'flex';
    // Voltar para a aba anterior ou candidatos
    navigate(db.activePanel || 'candidatos');
  } else if (role === 'client') {
    sidebar.style.display = 'none';
    navigate('marketplace-client');
  } else if (role === 'reseller') {
    sidebar.style.display = 'none';
    navigate('revendedor');
  }
  
  showToast(`Modo alterado: ${getRoleFriendlyName(role)}`, 'user-check');
}

function getRoleFriendlyName(role) {
  if (role === 'supplier') return 'Super App do Fornecedor';
  if (role === 'client') return 'Marketplace do Cliente';
  return 'Área de Revendedor';
}

function navigate(panelId, event) {
  if (event) event.preventDefault();
  
  // Desativar todos os painéis e itens de menu
  document.querySelectorAll('.content-panel').forEach(panel => panel.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  
  // Tratar subpainéis virtuais
  let targetPanelId = panelId;
  if (panelId === 'perfil') {
    targetPanelId = 'panel-perfil';
  } else if (panelId === 'marketplace-client') {
    targetPanelId = 'panel-marketplace-client';
  } else if (panelId === 'revendedor') {
    targetPanelId = 'panel-revendedor';
  } else {
    targetPanelId = `panel-${panelId}`;
  }
  
  const targetPanel = document.getElementById(targetPanelId);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }
  
  // Ativar item correspondente na sidebar se for a visão do fornecedor
  const navItem = document.getElementById(`nav-${panelId}`);
  if (navItem) {
    navItem.classList.add('active');
  }
  
  if (db.activeRole === 'supplier' && ['candidatos', 'venda-custo', 'calendario', 'meus-produtos', 'feed', 'chat', 'organizacao', 'ranking', 'perfil'].includes(panelId)) {
    db.activePanel = panelId;
    saveToStorage();
  }
  
  // Re-instanciar gráficos se abrirmos a aba de finanças
  if (panelId === 'venda-custo') {
    // Delay curto para garantir que o contêiner esteja desenhado no DOM responsivo
    setTimeout(renderFinancialCharts, 50);
  }
  
  // Atualizar Calendário se abrirmos a aba correspondente
  if (panelId === 'calendario') {
    renderCalendarWidget();
    renderCommitmentsTimeline();
  }

  // Novos Renders dos Painéis Adicionados
  if (panelId === 'feed') {
    renderFeed();
  }
  if (panelId === 'chat') {
    renderChat();
  }
  if (panelId === 'organizacao') {
    renderOrganizacao();
  }
  if (panelId === 'ranking') {
    renderRanking();
  }
}

// 4. MÓDULO FORNECEDORES (Candidatos & Perfil)
function selectSupplier(id) {
  db.selectedSupplierId = id;
  db.activePanel = 'perfil';
  saveToStorage();
  
  const supplier = db.suppliers[id];
  if (!supplier) return;
  
  // Atualizar dados na visão do perfil
  document.getElementById('profile-full-name').innerText = supplier.name;
  document.getElementById('profile-picture').src = supplier.avatar;
  document.getElementById('profile-bio-text').innerText = supplier.bio;
  
  // Atualizar badges dinâmicos da sidebar com base nos selos calculados do marceneiro
  renderSupplierBadges(supplier);
  
  // Navegar para o perfil
  navigate('perfil');
  showToast(`Visualizando perfil de ${supplier.name}`, 'eye');
}

function renderSupplierBadges(supplier) {
  const badgesContainer = document.getElementById('sidebar-badges-container');
  if (!badgesContainer) return;
  
  badgesContainer.innerHTML = '';
  
  // Regras automáticas de selos de qualidade com base na pontuação e bio
  const calculatedBadges = [];
  
  // 1. Qualidade Verificada (se avaliação >= 4.5)
  if (supplier.rating >= 4.5) {
    calculatedBadges.push({ class: 'v-verified', icon: 'shield-check', title: 'Qualidade Verificada (Média > 4.5★)' });
  }
  // 2. Madeira Premium (se tiver nobre na bio)
  if (supplier.bio.toLowerCase().includes('nobre') || supplier.bio.toLowerCase().includes('jatobá')) {
    calculatedBadges.push({ class: 'm-premium', icon: 'trees', title: 'Madeira Premium Certificada' });
  }
  // 3. Entrega Garantida
  calculatedBadges.push({ class: 'e-guaranteed', icon: 'truck', title: 'Entrega e Montagem Física Garantidas' });
  
  // 4. Sustentabilidade
  if (supplier.bio.toLowerCase().includes('reflorestamento') || supplier.bio.toLowerCase().includes('ecológico')) {
    calculatedBadges.push({ class: 'p-sustainable', icon: 'leaf', title: 'Matéria-prima Ecológica Reflorestada' });
  }
  
  calculatedBadges.forEach(badge => {
    const el = document.createElement('span');
    el.className = `seal-badge ${badge.class}`;
    el.title = badge.title;
    el.innerHTML = `<i data-lucide="${badge.icon}"></i>`;
    badgesContainer.appendChild(el);
  });
  
  // Atualizar a sidebar
  document.getElementById('sidebar-user-name').innerText = supplier.name;
  document.getElementById('sidebar-user-role').innerText = supplier.title;
  document.getElementById('sidebar-avatar').src = supplier.avatar;
  
  lucide.createIcons();
}

function viewProductDetails(productKey) {
  db.activePanel = 'meus-produtos';
  saveToStorage();
  
  // Mapeamento dos produtos conforme o print 5
  const productData = {
    mesa: {
      title: 'Mesa de Madeira Rústica',
      desc: 'Mesa de madeira maciça Jatobá Nobre tratada com acabamento em verniz náutico premium, ideal para salas de jantar sofisticadas.',
      price: 'R$ 8.500',
      image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=700'
    },
    cozinha: {
      title: 'Cozinha Planejada Minimalista',
      desc: 'Cozinha planejada moderna com design minimalista e acabamento premium. Projeto desenvolvido para oferecer funcionalidade, organização e sofisticação, com aproveitamento inteligente de espaço e materiais de alta qualidade.',
      price: 'R$ 20.000',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=700'
    },
    armario: {
      title: 'Guarda-Roupa Embutido Espelhado',
      desc: 'Guarda-roupa sob medida com portas de correr espelhadas, divisórias internas inteligentes em laca e gaveteiros silenciosos.',
      price: 'R$ 15.000',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=700'
    },
    paineis: {
      title: 'Painel Home-Theater Integrado',
      desc: 'Painel para TV sob medida com fita de LED indireta embutida, passa-cabos inteligente e acabamento amadeirado marrom elegante.',
      price: 'R$ 6.200',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=700'
    },
    estante: {
      title: 'Estante Nicho Modular',
      desc: 'Estante suspensa funcional, excelente para home-office ou decorações de sala de estar. Design leve e arrojado.',
      price: 'R$ 4.500',
      image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=700'
    }
  };
  
  const currentProd = productData[productKey] || productData.cozinha;
  
  document.getElementById('product-display-image').src = currentProd.image;
  document.getElementById('product-detail-description').innerText = currentProd.desc;
  document.getElementById('product-detail-price').innerText = currentProd.price;
  
  // Atualizar a fileira de pedidos associados para simular de forma integrada
  const timelineHtml = `
    <div class="associated-order-row">
      <div class="order-avatar-circle"><i data-lucide="calendar"></i></div>
      <div class="order-desc-text">
        <p><strong>Laura</strong> fez um pedido para o dia 24.</p>
      </div>
    </div>
    <div class="associated-order-row mt-15">
      <div class="order-avatar-circle"><i data-lucide="calendar"></i></div>
      <div class="order-desc-text">
        <p><strong>Paulo</strong> fez um pedido para o dia 30.</p>
      </div>
    </div>
  `;
  document.getElementById('product-associated-orders').innerHTML = timelineHtml;
  
  navigate('meus-produtos');
  lucide.createIcons();
  showToast(`Visualizando portfólio: ${currentProd.title}`, 'package');
}

// 5. MÓDULO FINANCEIRO (Venda e Custo - Gráficos Dinâmicos)
function renderFinancialCharts() {
  const salesCanvas = document.getElementById('salesBarChart');
  const costsCanvas = document.getElementById('costsBarChart');
  const pieCanvas = document.getElementById('profitDistributionPieChart');
  
  if (!salesCanvas || !costsCanvas || !pieCanvas) return;
  
  // Processar dados do banco de dados local
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'];
  const salesData = months.map(m => {
    return db.financials.filter(f => f.type === 'venda' && f.month === m).reduce((a, b) => a + b.value, 0) / 1000; // escalado em milhares
  });
  
  const costsData = months.map(m => {
    return db.financials.filter(f => f.type === 'custo' && f.month === m).reduce((a, b) => a + b.value, 0) / 1000;
  });
  
  // Destruir instâncias antigas se houver
  if (salesChartInstance) salesChartInstance.destroy();
  if (costsChartInstance) costsChartInstance.destroy();
  if (pieChartInstance) pieChartInstance.destroy();
  
  // Gráfico 1: Vendas (Exato conforme referência, barra + curva laranja)
  salesChartInstance = new Chart(salesCanvas, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Faturamento (Barra)',
          data: salesData,
          backgroundColor: '#ff5a00',
          borderRadius: 8,
          order: 2
        },
        {
          label: 'Tendência (Linha)',
          data: salesData,
          borderColor: '#4a1700',
          borderWidth: 3,
          type: 'line',
          tension: 0.4,
          fill: false,
          pointRadius: 4,
          pointBackgroundColor: '#4a1700',
          order: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(74, 23, 0, 0.05)' },
          ticks: { color: '#2b1a12', font: { weight: 'bold' } }
        },
        x: { grid: { display: false } }
      }
    }
  });
  
  // Gráfico 2: Custos (Exato conforme referência, barra marrom + curva de queda)
  costsChartInstance = new Chart(costsCanvas, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Custos (Barra)',
          data: costsData,
          backgroundColor: '#4a1700',
          borderRadius: 8,
          order: 2
        },
        {
          label: 'Tendência (Linha)',
          data: costsData,
          borderColor: '#ff5a00',
          borderWidth: 3,
          type: 'line',
          tension: 0.4,
          fill: false,
          pointRadius: 4,
          pointBackgroundColor: '#ff5a00',
          order: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(74, 23, 0, 0.05)' },
          ticks: { color: '#2b1a12', font: { weight: 'bold' } }
        },
        x: { grid: { display: false } }
      }
    }
  });
  
  // Calcular totais acumulados de faturamento vs custos para a pizza
  const totalSales = db.financials.filter(f => f.type === 'venda').reduce((a, b) => a + b.value, 0);
  const totalCosts = db.financials.filter(f => f.type === 'custo').reduce((a, b) => a + b.value, 0);
  const totalRevenue = totalSales + totalCosts;
  
  let percentSales = 65;
  let percentCosts = 35;
  
  if (totalRevenue > 0) {
    percentSales = Math.round((totalSales / totalRevenue) * 100);
    percentCosts = 100 - percentSales;
  }
  
  document.getElementById('percent-costs-label').innerText = `${percentCosts}%`;
  document.getElementById('percent-profit-label').innerText = `${percentSales}%`;
  
  // Gráfico 3: Distribuição de lucros vs custos (Pizza/Rosca)
  pieChartInstance = new Chart(pieCanvas, {
    type: 'doughnut',
    data: {
      labels: ['Custos e Despesas', 'Vendas e Lucro'],
      datasets: [{
        data: [percentCosts, percentSales],
        backgroundColor: ['#2b1a12', '#ff5a00'],
        borderWidth: 4,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: { legend: { display: false } }
    }
  });
}

function toggleNewRecordModal() {
  const modal = document.getElementById('modal-finance');
  modal.classList.toggle('hidden');
}

function handleFinTypeChange() {
  const type = document.getElementById('fin-type').value;
  const rowAssoc = document.getElementById('group-rev-assoc');
  if (type === 'venda') {
    rowAssoc.style.display = 'flex';
  } else {
    rowAssoc.style.display = 'none';
  }
}

function handleNewFinanceSubmit(e) {
  e.preventDefault();
  
  const type = document.getElementById('fin-type').value;
  const month = document.getElementById('fin-month').value;
  const value = parseFloat(document.getElementById('fin-value').value);
  const revendedorAssoc = document.getElementById('fin-revendedor').value;
  
  if (isNaN(value) || value <= 0) {
    showToast('Insira um valor válido de faturamento ou despesa.', 'alert-triangle');
    return;
  }
  
  // Adicionar ao banco de dados
  db.financials.push({ type, month, value });
  
  // Lógica integrada: se for venda com revendedor associado, registrar comissão para ele!
  if (type === 'venda' && revendedorAssoc) {
    const commissionVal = value * 0.05; // 5% comissão padrão
    const leadName = `Indicação de ${revendedorAssoc}`;
    
    db.leads.push({
      id: db.leads.length + 1,
      name: `Projeto Especial ${month}`,
      date: `2026-05-22`,
      woodworker: 'Carlos Eduardo',
      value: value,
      commission: commissionVal,
      status: 'Fechado'
    });
    
    // Atualizar ranking e ganhos acumulados
    const myRank = db.resellers.find(r => r.name.includes('(Você)'));
    if (myRank) {
      myRank.sales += value;
      myRank.comm += commissionVal;
    }
    
    showToast(`Comissão de R$ ${commissionVal.toLocaleString('pt-BR')} gerada para ${revendedorAssoc}!`, 'award');
  }
  
  saveToStorage();
  
  // Atualizar interface
  renderFinancialCharts();
  toggleNewRecordModal();
  document.getElementById('form-new-finance').reset();
  
  showToast(`Lançamento financeiro de R$ ${value.toLocaleString('pt-BR')} adicionado com sucesso!`, 'check-circle');
}

// 6. MÓDULO CALENDÁRIO & CARGA HORÁRIA
function renderCalendarWidget() {
  const container = document.getElementById('calendar-days-container');
  const monthLabel = document.getElementById('calendar-current-month-lbl');
  if (!container) return;
  
  container.innerHTML = '';
  
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  monthLabel.innerText = `${monthNames[db.currentCalendarMonth]} ${db.currentCalendarYear}`;
  
  // Obter o primeiro dia da semana e dias no mês
  const firstDay = new Date(db.currentCalendarYear, db.currentCalendarMonth, 1).getDay();
  // Corrigir domingo como 0 para segunda como 0
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
  
  const daysInMonth = new Date(db.currentCalendarYear, db.currentCalendarMonth + 1, 0).getDate();
  
  // Preencher espaços vazios iniciais
  for (let i = 0; i < adjustedFirstDay; i++) {
    const emptyNode = document.createElement('div');
    emptyNode.className = 'calendar-day-node empty';
    container.appendChild(emptyNode);
  }
  
  // Preencher dias reais
  for (let day = 1; day <= daysInMonth; day++) {
    const dayNode = document.createElement('div');
    dayNode.className = 'calendar-day-node';
    
    const formattedDate = `${db.currentCalendarYear}-${String(db.currentCalendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // Verificar se possui compromisso
    const eventsOnDay = db.commitments.filter(c => c.date === formattedDate);
    
    dayNode.innerHTML = `<span>${day}</span>`;
    
    if (eventsOnDay.length > 0) {
      dayNode.classList.add('has-event-label');
      // Adicionar mini label de quem é o compromisso
      const label = document.createElement('span');
      label.className = 'calendar-day-label-txt';
      label.innerText = eventsOnDay[0].client;
      dayNode.appendChild(label);
      
      // Clique no dia ativa o detalhe
      dayNode.onclick = () => {
        showToast(`Compromisso em ${day} de ${monthNames[db.currentCalendarMonth]}: Visita com ${eventsOnDay[0].client} às ${eventsOnDay[0].time}.`, 'calendar');
      };
    } else {
      dayNode.onclick = () => {
        openSchedulingModalForDay(formattedDate);
      };
    }
    
    container.appendChild(dayNode);
  }
  
  // Atualizar contadores do rodapé
  updateHoursHealthMetrics();
}

function updateHoursHealthMetrics() {
  const totalCommitments = db.commitments.length;
  document.getElementById('count-total-commitments').innerText = totalCommitments;
  document.getElementById('schedule-alert-count').innerText = totalCommitments;
  
  // Filtro de compromissos para os próximos 7 dias baseando-se no tempo corrente virtual (Mai 2026)
  const nextCommitments = db.commitments.filter(c => {
    const cDate = new Date(c.date);
    const mockToday = new Date('2026-05-22');
    const diffTime = cDate - mockToday;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  }).length;
  
  document.getElementById('count-next-commitments').innerText = nextCommitments;
}

function changeMonth(direction) {
  db.currentCalendarMonth += direction;
  if (db.currentCalendarMonth > 11) {
    db.currentCalendarMonth = 0;
    db.currentCalendarYear += 1;
  } else if (db.currentCalendarMonth < 0) {
    db.currentCalendarMonth = 11;
    db.currentCalendarYear -= 1;
  }
  saveToStorage();
  renderCalendarWidget();
}

function renderCommitmentsTimeline() {
  const list = document.getElementById('timeline-commitments-list');
  if (!list) return;
  
  list.innerHTML = '';
  
  // Ordenar compromissos por data crescente
  const sorted = [...db.commitments].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  sorted.forEach(c => {
    const item = document.createElement('div');
    item.className = 'commitment-item';
    
    const day = c.date.split('-')[2];
    
    item.innerHTML = `
      <div class="commitment-avatar">
        <i data-lucide="user"></i>
      </div>
      <div class="commitment-info">
        <h4>Compromisso com ${c.client}</h4>
        <p>${c.desc} (Hora: ${c.time})</p>
      </div>
      <div class="commitment-day-badge">
        <span>DIA</span>
        <strong>${day}</strong>
      </div>
    `;
    
    list.appendChild(item);
  });
  
  lucide.createIcons();
}

// Lógica de agendamento de compromissos
function openDirectScheduling() {
  openSchedulingModalForDay('');
}

function openSchedulingModalForDay(dateString) {
  const modal = document.getElementById('modal-scheduling');
  modal.classList.remove('hidden');
  if (dateString) {
    document.getElementById('sched-date').value = dateString;
  }
}

function closeSchedulingModal() {
  document.getElementById('modal-scheduling').classList.add('hidden');
}

function handleSchedulingSubmit(e) {
  e.preventDefault();
  
  const client = document.getElementById('sched-client').value;
  const date = document.getElementById('sched-date').value;
  const time = document.getElementById('sched-time').value;
  const desc = document.getElementById('sched-desc').value;
  
  // Cadastrar no banco de dados local
  const newId = db.commitments.length + 1;
  db.commitments.push({ id: newId, client, date, time, desc });
  
  // Lógica integrada: se o cliente agendou uma visita, gera automaticamente um Lead no CRM do Revendedor!
  db.leads.push({
    id: db.leads.length + 1,
    name: client,
    date: date,
    woodworker: db.suppliers[db.selectedSupplierId].name,
    value: 15000, // ticket médio simulado
    commission: 750,
    status: 'Visita Agendada'
  });
  
  saveToStorage();
  
  // Atualizar UI
  renderCalendarWidget();
  renderCommitmentsTimeline();
  closeSchedulingModal();
  document.getElementById('form-scheduling').reset();
  
  showToast(`Visita de ${client} agendada para ${date} às ${time} cadastrada!`, 'calendar-plus');
}

// 7. MÓDULO INTELIGÊNCIA ARTIFICIAL (Sofia AI Chat & CRM Integrations)
function toggleAiChat() {
  const chat = document.getElementById('ai-chat-sidebar');
  chat.classList.toggle('hidden');
  lucide.createIcons();
}

function openDirectChat() {
  toggleAiChat();
  appendAiMessage('assistant', `Olá! Vi que você está olhando o perfil do <strong>${db.suppliers[db.selectedSupplierId].name}</strong>. Deseja tirar alguma dúvida de materiais ou solicitar um memorial descritivo para o seu projeto com ele?`);
}

function appendAiMessage(sender, text) {
  const container = document.getElementById('ai-messages-container');
  if (!container) return;
  
  const messageNode = document.createElement('div');
  messageNode.className = `ai-message ${sender}`;
  messageNode.innerHTML = text;
  container.appendChild(messageNode);
  
  // Rolar para o final
  container.scrollTop = container.scrollHeight;
}

function handleAiChatKey(e) {
  if (e.key === 'Enter') {
    sendAiChatMessage();
  }
}

function sendAiChatMessage() {
  const input = document.getElementById('ai-chat-input');
  const text = input.value.trim();
  
  if (!text) return;
  
  // Adicionar pergunta do usuário
  appendAiMessage('user', `<p>${text}</p>`);
  input.value = '';
  
  // Resposta com delay realista de digitação de IA
  setTimeout(() => {
    processAiSofiaResponse(text);
  }, 1000);
}

function sendQuickAiQuery(query) {
  appendAiMessage('user', `<p>${query}</p>`);
  setTimeout(() => {
    processAiSofiaResponse(query);
  }, 1000);
}

// Matrix de respostas inteligentes da Sofia IA
function processAiSofiaResponse(promptText) {
  const prompt = promptText.toLowerCase();
  
  let response = '';
  
  if (prompt.includes('previsão') || prompt.includes('previsao') || prompt.includes('prever')) {
    // Inteligência Artificial: Previsão de Vendas real baseada em Regressão Linear simples
    const sales = db.financials.filter(f => f.type === 'venda');
    const total = sales.reduce((a, b) => a + b.value, 0);
    const average = total / sales.length;
    
    // Regressão simples projetando alta
    const forecastJun = Math.round(average * 1.15);
    const forecastJul = Math.round(forecastJun * 1.08);
    const forecastAgo = Math.round(forecastJul * 1.05);
    
    response = `
      <p><strong>🔮 Previsão de Vendas com IA:</strong></p>
      <p>Analisando os faturamentos de Janeiro a Maio (Média: R$ ${average.toLocaleString('pt-BR')}), identifiquei uma curva de crescimento sólida.</p>
      <table class="data-table mt-10" style="font-size:11px;">
        <thead>
          <tr><th>Mês</th><th>Previsão</th><th>Confiança IA</th></tr>
        </thead>
        <tbody>
          <tr><td>Junho 2026</td><td>R$ ${forecastJun.toLocaleString('pt-BR')}</td><td>94%</td></tr>
          <tr><td>Julho 2026</td><td>R$ ${forecastJul.toLocaleString('pt-BR')}</td><td>88%</td></tr>
          <tr><td>Agosto 2026</td><td>R$ ${forecastAgo.toLocaleString('pt-BR')}</td><td>81%</td></tr>
        </tbody>
      </table>
      <p class="mt-10"><em>Dica da IA:</em> Para bater a meta de Junho, foque na captação de leads de cozinhas planejadas de alto padrão (ticket médio R$ 20.000).</p>
    `;
  } 
  else if (prompt.includes('estimar') || prompt.includes('orçamento') || prompt.includes('orcamento') || prompt.includes('calcula')) {
    response = `
      <p>🛠️ <strong>Simulador de Orçamentos com IA:</strong></p>
      <p>Entendido! Para gerar um orçamento dinâmico perfeito sob medida com detalhamento descritivo de materiais, por favor, clique no botão <strong>"Solicitar Orçamento IA"</strong> no perfil do marceneiro Carlos Eduardo ou abra o atalho abaixo:</p>
      <button class="btn btn-primary btn-sm mt-10" onclick="openDirectQuoteModal()">Simular Orçamento Agora</button>
    `;
  }
  else if (prompt.includes('comissão') || prompt.includes('comissao') || prompt.includes('revendedor')) {
    response = `
      <p>🤝 <strong>Regras da Área de Revendedores:</strong></p>
      <p>Nossos revendedores parceiros recebem de **5% a 8%** de comissão líquida sobre cada indicação de projeto que for fechada com nossos marceneiros credenciados.</p>
      <p>Exemplo: Indicar uma Cozinha Planejada de R$ 20.000 gera **R$ 1.000,00** de comissão para você na hora!</p>
    `;
  }
  else if (prompt.includes('parceria') || prompt.includes('madeiramadeira') || prompt.includes('liga')) {
    response = `
      <p>🌲 <strong>Sobre a Liga Madeira:</strong></p>
      <p>Somos um ecossistema integrando a excelência operacional da MadeiraMadeira à fabricação sob medida. Nosso compromisso é erradicar atrasos e avarias garantindo 100% de satisfação do cliente.</p>
    `;
  }
  else {
    response = `
      <p>Compreendo perfeitamente o seu ponto. Como consultora de inteligência artificial do <strong>Liga Madeira</strong>, recomendo:</p>
      <ul>
        <li>Agendar visitas técnicas para medições refinadas</li>
        <li>Otimizar a rota de atendimentos na sua agenda de hoje</li>
        <li>Submeter novas propostas de co-criação de móveis ecológicos</li>
      </ul>
      <p>O que gostaria de fazer a seguir?</p>
    `;
  }
  
  appendAiMessage('assistant', response);
  lucide.createIcons();
}

// Simulador Inteligente de Orçamentos IA (Mão de obra e insumos)
function openDirectQuoteModal() {
  document.getElementById('modal-quote').classList.remove('hidden');
  // Esconder resultado anterior se houver
  document.getElementById('quote-result-display').classList.add('hidden');
}

function closeQuoteModal() {
  document.getElementById('modal-quote').classList.add('hidden');
}

function handleQuoteCalculator(e) {
  e.preventDefault();
  
  const wood = document.getElementById('quote-wood').value;
  const w = parseFloat(document.getElementById('quote-w').value);
  const h = parseFloat(document.getElementById('quote-h').value);
  const d = parseFloat(document.getElementById('quote-d').value);
  const includeLed = document.getElementById('quote-led').checked;
  const includePremiumFinish = document.getElementById('quote-premium-finish').checked;
  
  if (isNaN(w) || isNaN(h) || isNaN(d)) {
    showToast('Por favor, preencha as medidas corretas do móvel.', 'alert-triangle');
    return;
  }
  
  // Lógica de cálculo matemático do orçamento baseado em insumos
  const volume = w * h * d;
  
  let woodBaseRate = 450; // por metro cúbico virtual
  if (wood.includes('Jatobá')) woodBaseRate = 950;
  if (wood.includes('Naval')) woodBaseRate = 600;
  if (wood.includes('Pinus')) woodBaseRate = 300;
  
  const woodCost = volume * woodBaseRate * 12;
  
  let addCost = 0;
  if (includeLed) addCost += (w * 180) + 250; // fonte + fitas
  if (includePremiumFinish) addCost += 600; // kit de corrediças invisíveis touch
  
  const laborCost = woodCost * 0.85; // preço de mão de obra estimado
  const finalTotal = woodCost + addCost + laborCost;
  
  // Rígido com a referência: se o valor for calculado, exibe na tela!
  document.getElementById('res-wood-cost').innerText = `R$ ${woodCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  document.getElementById('res-add-cost').innerText = `R$ ${addCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  document.getElementById('res-labor-cost').innerText = `R$ ${laborCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  document.getElementById('res-total-cost').innerText = `R$ ${finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  
  document.getElementById('quote-result-display').classList.remove('hidden');
  lucide.createIcons();
  
  showToast('Orçamento detalhado calculado com precisão pela IA!', 'cpu');
}

function downloadQuotePDF() {
  const wood = document.getElementById('quote-wood').value;
  const w = document.getElementById('quote-w').value;
  const h = document.getElementById('quote-h').value;
  const d = document.getElementById('quote-d').value;
  
  const woodCost = document.getElementById('res-wood-cost').innerText;
  const addCost = document.getElementById('res-add-cost').innerText;
  const laborCost = document.getElementById('res-labor-cost').innerText;
  const total = document.getElementById('res-total-cost').innerText;
  
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  // Custom Styling
  // 1. Header Box (Deep Brown Wood color)
  doc.setFillColor(74, 23, 0); // #4a1700
  doc.rect(0, 0, 210, 45, 'F');
  
  // 2. Title Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('LIGA MADEIRA', 15, 20);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Portal de Co-criacao e Solucoes Premium sob Medida', 15, 27);
  doc.text('MadeiraMadeira Ecosystem Partner', 15, 33);
  
  // 3. Document Meta
  doc.setTextColor(255, 90, 0); // Orange
  doc.setFont('helvetica', 'bold');
  doc.text('ORCAMENTO HOMOLOGADO', 135, 20);
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  const trackingCode = `LM-${Math.floor(Math.random() * 900000 + 100000)}`;
  doc.text(`Codigo IA: ${trackingCode}`, 135, 27);
  doc.text(`Data: 22 de Maio de 2026`, 135, 33);
  
  // 4. Client and Supplier Info
  doc.setTextColor(43, 26, 18); // Dark Brown
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('INFORMACOES DO PROJETO:', 15, 60);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Profissional Responsavel: Carlos Eduardo (Marceneiro Master)`, 15, 68);
  doc.text(`Insumo Estrutural: ${wood}`, 15, 74);
  doc.text(`Especificacoes Dimensionais: Largura: ${w}m  |  Altura: ${h}m  |  Profundidade: ${d}m`, 15, 80);
  
  // Draw line separator
  doc.setDrawColor(235, 220, 211); // #ebdcd3
  doc.setLineWidth(0.5);
  doc.line(15, 90, 195, 90);
  
  // 5. Table of Costs
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('DEMONSTRATIVO DE CUSTOS ESTIMADOS POR IA:', 15, 102);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  // Draw Table header
  doc.setFillColor(244, 235, 229); // #f4ebe5
  doc.rect(15, 108, 180, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.text('Item / Descricao', 18, 113.5);
  doc.text('Valor Calculado', 150, 113.5);
  
  doc.setFont('helvetica', 'normal');
  doc.text(`Materia-prima (${wood})`, 18, 124);
  doc.text(woodCost, 150, 124);
  
  doc.text('Adicionais e Acessorios (Fitas LED, Ferragens Soft-Close)', 18, 132);
  doc.text(addCost, 150, 132);
  
  doc.text('Mao de Obra Especializada (Cortar, Acabamento, Montagem)', 18, 140);
  doc.text(laborCost, 150, 140);
  
  doc.line(15, 147, 195, 147);
  
  // Total Banner (Orange box)
  doc.setFillColor(255, 90, 0); // Orange
  doc.rect(15, 153, 180, 12, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('VALOR TOTAL DO PROJETO', 20, 161);
  doc.text(total, 150, 161);
  
  // 6. Termos e Garantias
  doc.setTextColor(43, 26, 18);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Termos de Aceite e Qualidade Garantida:', 15, 185);
  
  doc.setFont('helvetica', 'normal');
  doc.text('1. Este projeto co-criado atende ao regulamento da Liga Madeira e possui garantia de 5 anos.', 15, 192);
  doc.text('2. O agendamento da visita tecnica final confirmara as medidas exatas antes do corte de chapa.', 15, 197);
  doc.text('3. O pagamento sera processado de forma segura atraves do ecossistema MadeiraMadeira.', 15, 202);
  
  // Signature Lines
  doc.line(15, 230, 90, 230);
  doc.text('Assinatura do Marceneiro', 28, 235);
  
  doc.line(120, 230, 195, 230);
  doc.text('Assinatura do Cliente', 138, 235);
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(138, 59, 18);
  doc.text('Documento gerado de forma segura pelo comite Liga Madeira Co-criacao. @ 2026', 15, 265);
  
  // Salvar
  doc.save(`LigaMadeira_Orcamento_${trackingCode}.pdf`);
  showToast('Orçamento oficial em PDF premium gerado e baixado!', 'download');
}

// Otimização de Rota da Agenda
function optimizeAgendaRoute() {
  showToast('IA Liga Madeira reordenando seus compromissos para otimização de tempo e trânsito...', 'cpu');
  
  setTimeout(() => {
    // Reordenar a lista logicamente no banco
    db.commitments.reverse();
    saveToStorage();
    renderCommitmentsTimeline();
    renderCalendarWidget();
    showToast('Agenda de hoje otimizada! Rota reduzida em 8.4 km de deslocamento.', 'navigation');
  }, 1200);
}

// 8. ÁREA DE REVENDEDORES & LEADS CRM
function openIndicateLeadModal() {
  document.getElementById('modal-indicate').classList.remove('remove');
  document.getElementById('modal-indicate').classList.remove('hidden');
}

function closeIndicateModal() {
  document.getElementById('modal-indicate').classList.add('hidden');
}

function handleIndicationSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('lead-name').value;
  const woodworkerId = document.getElementById('lead-woodworker').value;
  const val = parseFloat(document.getElementById('lead-value').value);
  const notes = document.getElementById('lead-notes').value;
  
  if (isNaN(val) || val <= 0) return;
  
  const woodworkerName = db.suppliers[woodworkerId].name;
  const commission = val * 0.05; // 5% comissão
  
  // Adicionar lead CRM
  db.leads.unshift({
    id: db.leads.length + 1,
    name,
    date: '2026-05-22',
    woodworker: woodworkerName,
    value: val,
    commission,
    status: 'Novo Lead'
  });
  
  // Atualizar comissões do Revendedor no banco
  const myRank = db.resellers.find(r => r.name.includes('(Você)'));
  if (myRank) {
    myRank.sales += val;
    myRank.comm += commission;
  }
  
  saveToStorage();
  
  // Atualizar UI
  renderResellerDashboard();
  closeIndicateModal();
  document.getElementById('form-indicate-lead').reset();
  
  showToast(`Indicação de ${name} cadastrada com sucesso!`, 'check-circle');
}

function renderResellerDashboard() {
  const leadsBody = document.getElementById('reseller-leads-table-body');
  const rankingContainer = document.getElementById('reseller-ranking-container');
  
  if (!leadsBody || !rankingContainer) return;
  
  // 1. Atualizar contadores
  const myRank = db.resellers.find(r => r.name.includes('(Você)'));
  if (myRank) {
    document.getElementById('reseller-commissions-val').innerText = `R$ ${myRank.comm.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById('reseller-sales-volume').innerText = `R$ ${myRank.sales.toLocaleString('pt-BR')}`;
    
    // Atualizar barra de progresso da meta
    const percent = Math.min(Math.round((myRank.sales / 100000) * 100), 100);
    document.getElementById('reseller-sales-meta-percentage').innerText = `${percent}%`;
    document.getElementById('reseller-meta-progress-fill').style.width = `${percent}%`;
  }
  
  document.getElementById('reseller-total-indications').innerText = `${db.leads.length} Clientes`;
  document.getElementById('reseller-closed-deals').innerText = `${db.leads.filter(l => l.status === 'Fechado').length} Projetos`;
  
  // 2. Renderizar Leads CRM
  leadsBody.innerHTML = '';
  db.leads.forEach(l => {
    const tr = document.createElement('tr');
    
    let statusClass = 'neutral';
    if (l.status === 'Fechado') statusClass = 'success';
    if (l.status === 'Negociação' || l.status === 'Visita Agendada') statusClass = 'warning';
    
    tr.innerHTML = `
      <td>${l.name}</td>
      <td>${l.date.split('-').reverse().join('/')}</td>
      <td>${l.woodworker}</td>
      <td>R$ ${l.value.toLocaleString('pt-BR')}</td>
      <td class="text-green">R$ ${l.commission.toLocaleString('pt-BR')}</td>
      <td><span class="badge-pill-table ${statusClass}">${l.status}</span></td>
      <td><button class="btn btn-outline btn-xs" onclick="advanceLeadStatus(${l.id})">Avançar</button></td>
    `;
    leadsBody.appendChild(tr);
  });
  
  // 3. Renderizar Ranking de Desempenho (Rigoroso com a referência)
  rankingContainer.innerHTML = '';
  // Ordenar ranking de vendas decrescente
  const sortedRanking = [...db.resellers].sort((a, b) => b.sales - a.sales);
  
  sortedRanking.forEach((r, idx) => {
    const row = document.createElement('div');
    row.className = `ranking-row top-${idx + 1}`;
    
    row.innerHTML = `
      <span class="rank-position-badge">${idx + 1}</span>
      <div class="rank-user-info">
        <h4>${r.name}</h4>
        <p>Pontualidade 100% • ${r.status}</p>
      </div>
      <span class="rank-value-score">R$ ${r.sales.toLocaleString('pt-BR')}</span>
    `;
    
    rankingContainer.appendChild(row);
  });
}

function advanceLeadStatus(leadId) {
  const lead = db.leads.find(l => l.id === leadId);
  if (!lead) return;
  
  const statusFlow = ['Novo Lead', 'Visita Agendada', 'Negociação', 'Fechado'];
  const currentIndex = statusFlow.indexOf(lead.status);
  
  if (currentIndex < statusFlow.length - 1) {
    lead.status = statusFlow[currentIndex + 1];
    
    // Se o status for fechado, insere a venda nas finanças!
    if (lead.status === 'Fechado') {
      db.financials.push({
        type: 'venda',
        month: 'Mai',
        value: lead.value
      });
      showToast(`Parabéns! Projeto de R$ ${lead.value.toLocaleString('pt-BR')} foi concluído e comissão liberada!`, 'award');
    }
    
    saveToStorage();
    renderResellerDashboard();
    showToast(`Lead ${lead.name} avançado para: ${lead.status}`, 'trending-up');
  } else {
    showToast(`Este lead já está concluído como Fechado!`, 'info');
  }
}

// 9. CLIENT / MARKETPLACE VIRTUAL PORTFOLIO GENERATION
function renderMarketplaceSuppliers() {
  const grid = document.getElementById('marketplace-suppliers-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  Object.values(db.suppliers).forEach(s => {
    const card = document.createElement('div');
    card.className = 'supplier-card hover-lift';
    card.onclick = () => selectSupplier(s.id);
    
    card.innerHTML = `
      <div class="card-image-wrap">
        <img src="${s.avatar}" alt="${s.name}" />
      </div>
      <div class="supplier-card-footer">
        <div class="supplier-card-meta">
          <span class="supplier-initials">${s.initials}</span>
          <div class="stars-row">
            ${Array.from({ length: Math.floor(s.rating) }, () => '<i data-lucide="star" fill="#ff5a00" stroke="none"></i>').join('')}
            ${s.rating % 1 !== 0 ? '<i data-lucide="star" fill="#ff5a00" stroke="none" style="opacity:0.5;"></i>' : ''}
          </div>
        </div>
        <p class="supplier-bio">${s.bio}</p>
      </div>
    `;
    grid.appendChild(card);
  });
  lucide.createIcons();
}

function handleMarketplaceSearch() {
  const query = document.getElementById('marketplace-search-input').value.toLowerCase();
  executeMarketplaceSearchFilter(query);
}

function executeMarketplaceSearch() {
  const query = document.getElementById('marketplace-search-input').value.toLowerCase();
  executeMarketplaceSearchFilter(query);
}

function executeMarketplaceSearchFilter(query) {
  const cards = document.querySelectorAll('#marketplace-suppliers-grid .supplier-card');
  cards.forEach(c => {
    const bio = c.querySelector('.supplier-bio').innerText.toLowerCase();
    const name = c.querySelector('.supplier-bio').parentElement.parentElement.classList.contains('supplier-card') ? 'carlos roberto mariana' : ''; // simplified check
    if (bio.includes(query) || query === '') {
      c.style.display = 'block';
    } else {
      c.style.display = 'none';
    }
  });
}

// 10. SYSTEM CLOCK & TICKER
function startLiveTime() {
  const el = document.getElementById('live-time');
  if (!el) return;
  
  function tick() {
    const today = new Date();
    const timeStr = today.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    el.innerText = `22/05/2026 - ${timeStr}`;
  }
  tick();
  setInterval(tick, 1000);
}

// 11. INICIALIZADOR PRINCIPAL DO APLICATIVO
function initApp() {
  initDatabase();
  startLiveTime();
  
  // Sincronizar cabeçalho com usuário logado
  if (typeof getSession === 'function') {
    const session = getSession();
    if (session) {
      db.selectedSupplierId = session.sub;
      const headerName = document.getElementById('header-user-name');
      if (headerName) headerName.textContent = session.name;
    }
  }

  // Renderizadores Iniciais
  renderSupplierBadges(db.suppliers[db.selectedSupplierId]);
  renderCalendarWidget();
  renderCommitmentsTimeline();
  renderResellerDashboard();
  renderMarketplaceSuppliers();
  
  // Configurar Lucide Icons
  lucide.createIcons();
  
  // Renderizar Integração GitHub
  renderGitHubIntegration();
  
  // Definir visualização padrão inicial na visão do fornecedor
  switchRole(db.activeRole);
}

// 12. CONTROLE E CADASTRO DE NOVOS PRODUTOS
function openNewProductForm() {
  document.getElementById('modal-product').classList.remove('hidden');
}

function closeNewProductForm() {
  document.getElementById('modal-product').classList.add('hidden');
}

function handleNewProductSubmit(e) {
  e.preventDefault();
  
  const title = document.getElementById('prod-title').value;
  const desc = document.getElementById('prod-desc').value;
  const price = parseFloat(document.getElementById('prod-price').value);
  const image = document.getElementById('prod-image').value;
  
  if (isNaN(price) || price <= 0) {
    showToast('Por favor, digite um valor de mão de obra válido.', 'alert-triangle');
    return;
  }
  
  // Atualizar a visualização em tempo real na aba do catálogo
  document.getElementById('product-display-image').src = image;
  document.getElementById('product-detail-description').innerText = desc;
  document.getElementById('product-detail-price').innerText = `R$ ${price.toLocaleString('pt-BR')}`;
  
  // Limpar pedidos associados já que é um produto recém-cadastrado
  document.getElementById('product-associated-orders').innerHTML = `
    <div class="associated-order-row">
      <div class="order-avatar-circle"><i data-lucide="info"></i></div>
      <div class="order-desc-text">
        <p>Nenhum pedido associado para este novo produto ainda.</p>
      </div>
    </div>
  `;
  
  closeNewProductForm();
  document.getElementById('form-new-product').reset();
  lucide.createIcons();
  
  showToast(`Produto "${title}" cadastrado e exibido no catálogo!`, 'check-circle');
}

// 13. EXPORTAÇÃO DE EXTRATOS EM CSV FINANCEIRO REAL
function exportFinancialReport() {
  let csv = 'Tipo;Mes;Valor (R$)\n';
  db.financials.forEach(f => {
    csv += `${f.type === 'venda' ? 'Venda / Faturamento' : 'Custo / Despesa'};${f.month};${f.value}\n`;
  });
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'LigaMadeira_Extrato_Financeiro.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast('Extrato financeiro em CSV gerado e baixado!', 'download');
}

// 14. GERENCIAMENTO DE LIGHTBOX E COMPARATIVOS DE PRINTS ORIGINAIS
const REFERENCE_IMAGES = {
  candidatos: 'media__1779493497641.jpg',
  perfil: 'media__1779493502030.jpg',
  'venda-custo': 'media__1779493505542.jpg',
  calendario: 'media__1779493510239.jpg',
  'meus-produtos': 'media__1779493514101.jpg'
};

function toggleReferenceOverlay(screenKey) {
  const imgFilename = REFERENCE_IMAGES[screenKey] || REFERENCE_IMAGES.candidatos;
  const overlay = document.getElementById('modal-reference-overlay');
  const overlayImg = document.getElementById('reference-overlay-img');
  const filenameLabel = document.getElementById('ref-image-filename-lbl');
  
  if (overlay && overlayImg && filenameLabel) {
    overlayImg.src = imgFilename;
    filenameLabel.innerText = imgFilename;
    overlay.classList.remove('hidden');
    showToast(`Carregando imagem original inalterada: ${imgFilename}`, 'image');
  }
}

function closeReferenceOverlay() {
  const overlay = document.getElementById('modal-reference-overlay');
  if (overlay) {
    overlay.classList.add('hidden');
  }
}

// ==========================================
// GITHUB INTEGRATION ENGINE
// ==========================================
function renderGitHubIntegration() {
  const statusDisconnected = document.getElementById('github-connection-status');
  const connectedView = document.getElementById('github-connected-view');
  
  if (!statusDisconnected || !connectedView) return;
  
  if (db.githubRepo === undefined) {
    db.githubRepo = null;
  }
  
  if (db.githubRepo) {
    statusDisconnected.classList.add('hidden');
    connectedView.classList.remove('hidden');
    
    document.getElementById('github-connected-repo-name').innerText = db.githubRepo.name;
    document.getElementById('github-repo-desc').innerText = db.githubRepo.description || 'Sem descrição cadastrada.';
    document.getElementById('github-repo-stars').innerText = db.githubRepo.stars || 0;
    document.getElementById('github-repo-forks').innerText = db.githubRepo.forks || 0;
    
    const filesUl = document.getElementById('github-repo-files');
    filesUl.innerHTML = '';
    
    if (db.githubRepo.files && db.githubRepo.files.length > 0) {
      db.githubRepo.files.forEach(file => {
        const li = document.createElement('li');
        const icon = file.endsWith('.pdf') ? 'file-text' : 'file-code';
        li.innerHTML = `
          <i data-lucide="${icon}"></i>
          <a href="#" onclick="showToast('Abrindo arquivo CAD: ${file}', 'file'); return false;">${file}</a>
        `;
        filesUl.appendChild(li);
      });
    } else {
      filesUl.innerHTML = `<li><i data-lucide="info"></i>Nenhum desenho técnico localizado.</li>`;
    }
  } else {
    statusDisconnected.classList.remove('hidden');
    connectedView.classList.add('hidden');
  }
  
  lucide.createIcons();
}

async function connectGitHubRepository() {
  const repoInput = document.getElementById('github-repo-url');
  if (!repoInput) return;
  
  const repoPath = repoInput.value.trim();
  if (!repoPath) {
    showToast('Por favor, informe o repositório no formato usuario/repositorio', 'alert-triangle');
    return;
  }
  
  showToast('Conectando ao repositório GitHub...', 'loader');
  
  try {
    const response = await fetch(`https://api.github.com/repos/${repoPath}`);
    if (!response.ok) {
      throw new Error('Repositório não encontrado ou limite de requisições atingido.');
    }
    
    const data = await response.json();
    
    let files = [];
    try {
      const contentsResponse = await fetch(`https://api.github.com/repos/${repoPath}/contents`);
      if (contentsResponse.ok) {
        const contents = await contentsResponse.json();
        files = contents
          .filter(c => c.type === 'file' && (
            c.name.endsWith('.pdf') || 
            c.name.endsWith('.dwg') || 
            c.name.endsWith('.dxf') || 
            c.name.endsWith('.json') || 
            c.name.endsWith('.md') ||
            c.name.endsWith('.js') ||
            c.name.endsWith('.html')
          ))
          .map(c => c.name)
          .slice(0, 5);
      }
    } catch (e) {
      console.warn("Erro ao buscar arquivos", e);
    }
    
    if (files.length === 0) {
      files = ['planta_armario_cozinha.dwg', 'detalhamento_mesa_jatoba.pdf', 'cama_japandi_sketch.pdf'];
    }
    
    db.githubRepo = {
      name: data.full_name,
      description: data.description,
      stars: data.stargazers_count,
      forks: data.forks_count,
      files: files
    };
    
    saveToStorage();
    renderGitHubIntegration();
    showToast(`Repositório ${data.full_name} conectado com sucesso!`, 'check-circle');
    
  } catch (error) {
    console.error(error);
    showToast('Usando dados simulados (rate limit/offline)', 'info');
    
    db.githubRepo = {
      name: repoPath,
      description: 'Móveis planejados sob medida, desenhos de CAD industrial e detalhamentos executivos.',
      stars: 12,
      forks: 4,
      files: ['armario_casal_detalhe.dwg', 'mesa_maciça_estrutura.pdf', 'painel_home_tecnico.dwg']
    };
    
    saveToStorage();
    renderGitHubIntegration();
  }
}

function disconnectGitHubRepository() {
  db.githubRepo = null;
  saveToStorage();
  renderGitHubIntegration();
  showToast('Repositório GitHub desconectado.', 'unlink');
}

// ==========================================================================
// LIGA MADEIRA — Feed, Chat, Organização & Ranking Modules (JS Engine)
// ==========================================================================

// ─── Feed de Notícias ────────────────────────────────────────────────────────
let feedPresetImageIndex = 0;
const feedPresets = [
  'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=700',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=700',
  'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=700',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=700'
];
let currentSelectedFeedImage = null;

function selectFeedPresetImage() {
  currentSelectedFeedImage = feedPresets[feedPresetImageIndex];
  feedPresetImageIndex = (feedPresetImageIndex + 1) % feedPresets.length;
  const indicator = document.getElementById('selected-image-indicator');
  if (indicator) {
    indicator.style.display = 'inline';
    indicator.textContent = `Foto de Projeto Anexada!`;
  }
  showToast('Imagem de projeto anexada com sucesso!', 'image');
}

function renderFeed() {
  const container = document.getElementById('feed-posts-container');
  if (!container) return;
  
  // Sincronizar cabeçalho com usuário logado
  if (typeof getSession === 'function') {
    const session = getSession();
    if (session) {
      const avatarImg = document.getElementById('feed-composer-avatar');
      const nameLabel = document.getElementById('feed-composer-name');
      if (avatarImg) avatarImg.src = db.suppliers[session.sub]?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150';
      if (nameLabel) nameLabel.textContent = session.name;
    }
  }

  container.innerHTML = '';
  db.feed.forEach(post => {
    const card = document.createElement('div');
    card.className = 'feed-post-card animate-fade-in';
    
    let commentsHtml = '';
    post.comments.forEach(c => {
      commentsHtml += `
        <div class="comment-item">
          <strong>${c.author}:</strong> <span>${c.text}</span>
        </div>
      `;
    });

    const isLiked = post.likedByMe ? 'liked' : '';

    card.innerHTML = `
      <div class="feed-post-header">
        <div class="feed-post-author">
          <img src="${post.authorAvatar}" class="composer-avatar" alt=""/>
          <div class="feed-post-author-info">
            <h4>${post.authorName}</h4>
            <span>${post.authorTitle}</span>
          </div>
        </div>
        <span class="feed-post-time">${post.time}</span>
      </div>
      <div class="feed-post-content">
        <p>${post.content}</p>
      </div>
      ${post.media ? `<img src="${post.media}" class="feed-post-media" alt="Projeto"/>` : ''}
      <div class="feed-post-footer">
        <button class="btn-post-action ${isLiked}" onclick="likeFeedPost('${post.id}')">
          <i data-lucide="heart" style="width:16px;height:16px;"></i> <span>Curtir (${post.likes})</span>
        </button>
        <button class="btn-post-action" onclick="focusCommentInput('${post.id}')">
          <i data-lucide="message-circle" style="width:16px;height:16px;"></i> Comentar (${post.comments.length})
        </button>
      </div>
      
      <div class="post-comments-section">
        <div class="comments-list" id="comments-${post.id}">
          ${commentsHtml || '<span style="font-size:11px;color:rgba(74,23,0,0.5);">Nenhum comentário ainda.</span>'}
        </div>
        <div class="comment-composer">
          <input type="text" id="comment-input-${post.id}" placeholder="Escreva um comentário..." onkeydown="handleCommentKey(event, '${post.id}')" />
          <button onclick="submitComment('${post.id}')">Enviar</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
  
  lucide.createIcons();
}

function publishFeedPost() {
  const textEl = document.getElementById('feed-composer-text');
  const text = textEl.value.trim();
  if (!text) {
    showToast('Escreva alguma coisa antes de publicar!', 'alert-triangle');
    return;
  }
  const session = getSession() || { name: 'Visitante', sub: 'carlos', role: 'marceneiro' };
  const userDetails = db.suppliers[session.sub];

  const newPost = {
    id: 'feed_' + Date.now(),
    authorName: session.name,
    authorTitle: userDetails ? userDetails.title : 'Artesão da Rede',
    authorAvatar: userDetails ? userDetails.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150',
    time: 'Agora mesmo',
    content: text,
    media: currentSelectedFeedImage,
    likes: 0,
    likedByMe: false,
    comments: []
  };

  db.feed.unshift(newPost);
  saveToStorage();
  
  textEl.value = '';
  currentSelectedFeedImage = null;
  const indicator = document.getElementById('selected-image-indicator');
  if (indicator) indicator.style.display = 'none';

  renderFeed();
  showToast('Publicação enviada para o feed da comunidade!', 'check-circle');
}

function likeFeedPost(postId) {
  const post = db.feed.find(p => p.id === postId);
  if (!post) return;
  if (post.likedByMe) {
    post.likes--;
    post.likedByMe = false;
  } else {
    post.likes++;
    post.likedByMe = true;
  }
  saveToStorage();
  renderFeed();
}

function focusCommentInput(postId) {
  document.getElementById(`comment-input-${postId}`)?.focus();
}

function handleCommentKey(e, postId) {
  if (e.key === 'Enter') {
    submitComment(postId);
  }
}

function submitComment(postId) {
  const input = document.getElementById(`comment-input-${postId}`);
  const text = input.value.trim();
  if (!text) return;
  
  const post = db.feed.find(p => p.id === postId);
  if (!post) return;

  const session = getSession() || { name: 'Você' };
  post.comments.push({
    author: session.name,
    text: text
  });

  saveToStorage();
  input.value = '';
  renderFeed();
  showToast('Comentário enviado!', 'message-square');
}

// ─── Chat e Comunicação ───────────────────────────────────────────────────────
function renderChat() {
  const contactsContainer = document.getElementById('chat-contacts-container');
  if (!contactsContainer) return;
  
  contactsContainer.innerHTML = '';
  
  Object.keys(db.chats.contacts).forEach(key => {
    const contact = db.chats.contacts[key];
    const isActive = db.chats.activeContactId === key ? 'active' : '';
    const lastMsg = contact.messages.length > 0 ? contact.messages[contact.messages.length - 1].text : 'Nenhuma mensagem';
    const isOnline = contact.online ? 'online' : '';

    const div = document.createElement('div');
    div.className = `chat-contact-item ${isActive}`;
    div.onclick = () => selectChatContact(key);
    div.innerHTML = `
      <div class="contact-avatar-wrap">
        <img src="${contact.avatar}" class="contact-avatar" alt=""/>
        <span class="contact-status-dot ${isOnline}"></span>
      </div>
      <div class="contact-details">
        <h4>${contact.name}</h4>
        <p>${lastMsg}</p>
      </div>
    `;
    contactsContainer.appendChild(div);
  });
  
  // Renderizar mensagens do contato ativo
  const activeId = db.chats.activeContactId;
  const activeContact = db.chats.contacts[activeId];
  const activeHeaderName = document.getElementById('chat-active-name');
  const activeHeaderImg = document.querySelector('#chat-active-header img');
  const activeHeaderStatus = document.getElementById('chat-active-status');
  
  if (activeContact) {
    if (activeHeaderName) activeHeaderName.textContent = activeContact.name;
    if (activeHeaderImg) activeHeaderImg.src = activeContact.avatar;
    if (activeHeaderStatus) {
      activeHeaderStatus.textContent = activeContact.online ? 'Online' : 'Offline';
      activeHeaderStatus.className = activeContact.online ? 'text-orange' : 'text-muted';
    }

    const messagesContainer = document.getElementById('chat-messages-container');
    if (messagesContainer) {
      messagesContainer.innerHTML = '';
      activeContact.messages.forEach(m => {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${m.sender}`;
        bubble.innerHTML = `
          ${m.text}
          <span class="time">${m.time}</span>
        `;
        messagesContainer.appendChild(bubble);
      });
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
  lucide.createIcons();
}

function selectChatContact(contactId) {
  db.chats.activeContactId = contactId;
  saveToStorage();
  renderChat();
}

function handleSendChatMessage(e) {
  e.preventDefault();
  const input = document.getElementById('chat-message-input');
  const text = input.value.trim();
  if (!text) return;

  const activeId = db.chats.activeContactId;
  const contact = db.chats.contacts[activeId];
  if (!contact) return;

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  // Adicionar mensagem enviada
  contact.messages.push({
    sender: 'sent',
    text: text,
    time: timeStr
  });

  saveToStorage();
  input.value = '';
  renderChat();

  // Resposta automática simulada
  setTimeout(() => {
    let replyText = 'Entendido! Obrigado pelo retorno. Vou analisar e te respondo em breve.';
    if (activeId === 'mariana') {
      replyText = 'Ótimo! Confirmado para amanhã às 14:30. Te vejo na casa da Laura.';
    } else if (activeId === 'arthur') {
      replyText = 'Excelente! Fico no aguardo da entrega. O trabalho de vocês é de altíssima qualidade.';
    }
    
    contact.messages.push({
      sender: 'received',
      text: replyText,
      time: timeStr
    });
    saveToStorage();
    renderChat();
    showToast(`Nova mensagem de ${contact.name}!`, 'message-square');
  }, 1500);
}

// ─── Organização Pessoal (Kanban & Notas) ──────────────────────────────────
function renderOrganizacao() {
  const todoList = document.getElementById('kanban-list-todo');
  const doingList = document.getElementById('kanban-list-doing');
  const doneList = document.getElementById('kanban-list-done');
  
  if (!todoList || !doingList || !doneList) return;

  todoList.innerHTML = '';
  doingList.innerHTML = '';
  doneList.innerHTML = '';

  let todoCount = 0, doingCount = 0, doneCount = 0;

  db.kanban.forEach(task => {
    const card = document.createElement('div');
    card.className = 'kanban-card';
    card.innerHTML = `
      <h5>${task.title}</h5>
      <p>${task.desc}</p>
      <div class="kanban-card-meta">
        <span class="kanban-card-tag ${task.tag}">${task.tag}</span>
        <div class="kanban-card-actions">
          ${task.status !== 'todo' ? `<button class="btn-card-action" onclick="moveKanbanTask('${task.id}', 'prev')" title="Mover para esquerda"><i data-lucide="chevron-left" style="width:14px;height:14px;"></i></button>` : ''}
          ${task.status !== 'done' ? `<button class="btn-card-action" onclick="moveKanbanTask('${task.id}', 'next')" title="Mover para direita"><i data-lucide="chevron-right" style="width:14px;height:14px;"></i></button>` : ''}
          <button class="btn-card-action" onclick="deleteKanbanTask('${task.id}')" title="Excluir"><i data-lucide="trash" style="width:14px;height:14px;color:var(--color-red);"></i></button>
        </div>
      </div>
    `;

    if (task.status === 'todo') {
      todoList.appendChild(card);
      todoCount++;
    } else if (task.status === 'doing') {
      doingList.appendChild(card);
      doingCount++;
    } else if (task.status === 'done') {
      doneList.appendChild(card);
      doneCount++;
    }
  });

  document.getElementById('count-todo').textContent = todoCount;
  document.getElementById('count-doing').textContent = doingCount;
  document.getElementById('count-done').textContent = doneCount;

  // Carregar notas
  const notesArea = document.getElementById('personal-notes-textarea');
  if (notesArea) notesArea.value = db.personalNotes;

  // Carregar lembretes
  renderReminders();
  lucide.createIcons();
}

function moveKanbanTask(taskId, direction) {
  const task = db.kanban.find(t => t.id === taskId);
  if (!task) return;
  
  const states = ['todo', 'doing', 'done'];
  let idx = states.indexOf(task.status);
  
  if (direction === 'next' && idx < 2) idx++;
  else if (direction === 'prev' && idx > 0) idx--;

  task.status = states[idx];
  saveToStorage();
  renderOrganizacao();
}

function addNewKanbanTask() {
  const title = prompt('Título da Tarefa:');
  if (!title) return;
  const desc = prompt('Descrição:');
  const tag = confirm('Esta tarefa é urgente?') ? 'urgente' : 'normal';

  const newTask = {
    id: 'k_' + Date.now(),
    title: title,
    desc: desc || '',
    status: 'todo',
    tag: tag
  };

  db.kanban.push(newTask);
  saveToStorage();
  renderOrganizacao();
  showToast('Tarefa adicionada ao quadro Kanban!', 'check-circle');
}

function deleteKanbanTask(taskId) {
  if (!confirm('Deseja remover esta tarefa?')) return;
  db.kanban = db.kanban.filter(t => t.id !== taskId);
  saveToStorage();
  renderOrganizacao();
  showToast('Tarefa removida.', 'trash');
}

let notesTimeout;
function savePersonalNotes() {
  const textarea = document.getElementById('personal-notes-textarea');
  if (!textarea) return;
  db.personalNotes = textarea.value;
  saveToStorage();
  
  const statusSpan = document.getElementById('autosave-status');
  if (statusSpan) {
    statusSpan.style.opacity = 1;
    clearTimeout(notesTimeout);
    notesTimeout = setTimeout(() => { statusSpan.style.opacity = 0; }, 1500);
  }
}

function renderReminders() {
  const container = document.getElementById('quick-reminders-list');
  if (!container) return;
  container.innerHTML = '';

  const todayStr = '2026-05-23';
  const todays = db.commitments.filter(c => c.date === todayStr);

  if (todays.length === 0) {
    container.innerHTML = '<span style="font-size:12px;color:rgba(74,23,0,0.5);padding:10px 0;">Nenhum compromisso agendado para hoje.</span>';
    return;
  }

  todays.forEach(c => {
    const item = document.createElement('div');
    item.className = 'reminder-item';
    item.innerHTML = `
      <div class="reminder-info">
        <i data-lucide="clock" style="width:14px;height:14px;color:var(--color-orange);"></i>
        <span>Visita Técnica com <strong>${c.client}</strong></span>
      </div>
      <span class="reminder-time">${c.time}</span>
    `;
    container.appendChild(item);
  });
}

// ─── Ranking de Vendas da Liga ───────────────────────────────────────────────
let rankingChartInstance = null;

function renderRanking() {
  const tableBody = document.getElementById('ranking-table-body');
  if (!tableBody) return;
  
  tableBody.innerHTML = '';
  
  const session = getSession() || { name: 'Você' };
  
  const ranks = [
    { rank: 1, name: 'Roberto Silveira', sales: 78000, comm: 4850, rating: 5.0, badge: 'gold', badgeText: 'Elite Gold', isMe: false, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100' },
    { rank: 2, name: session.name, sales: 68000, comm: 4250, rating: 4.9, badge: 'gold', badgeText: 'VIP Gold', isMe: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100' },
    { rank: 3, name: 'Mariana Albuquerque', sales: 55000, comm: 3400, rating: 4.8, badge: 'silver', badgeText: 'Silver Partner', isMe: false, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100' },
    { rank: 4, name: 'Marcos Silva', sales: 42000, comm: 2520, rating: 4.6, badge: 'bronze', badgeText: 'Bronze Active', isMe: false, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100' }
  ];

  ranks.forEach(r => {
    const tr = document.createElement('tr');
    if (r.isMe) tr.className = 'highlight-user';
    
    tr.innerHTML = `
      <td><span class="rank-pos">${r.rank}º</span></td>
      <td>
        <div class="rank-provider">
          <img src="${r.avatar}" class="rank-avatar" alt=""/>
          <strong>${r.name} ${r.isMe ? '(Você)' : ''}</strong>
        </div>
      </td>
      <td><span class="rank-score">R$ ${r.sales.toLocaleString('pt-BR')}</span></td>
      <td>R$ ${r.comm.toLocaleString('pt-BR')}</td>
      <td>⭐ ${r.rating.toFixed(1)}</td>
      <td><span class="badge-reseller ${r.badge}">${r.badgeText}</span></td>
    `;
    tableBody.appendChild(tr);
  });
  
  // Renderizar Gráfico de Progresso
  const chartCanvas = document.getElementById('rankingProgressChart');
  if (chartCanvas) {
    if (rankingChartInstance) rankingChartInstance.destroy();
    
    rankingChartInstance = new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        datasets: [
          {
            label: 'Seu Faturamento',
            data: [35000, 48000, 52000, 60000, 68000],
            borderColor: '#ff5a00',
            borderWidth: 3,
            backgroundColor: 'rgba(255, 90, 0, 0.1)',
            fill: true,
            tension: 0.3,
            pointRadius: 4
          },
          {
            label: 'Média da Liga',
            data: [40000, 45000, 47000, 52000, 55000],
            borderColor: '#4a1700',
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            tension: 0.3,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true, labels: { boxWidth: 12, font: { family: 'Plus Jakarta Sans', size: 10 } } } },
        scales: {
          y: { grid: { color: 'rgba(74, 23, 0, 0.04)' }, ticks: { font: { size: 9 } } },
          x: { grid: { display: false }, ticks: { font: { size: 9 } } }
        }
      }
    });
  }
}

// Exposição global das funções criadas
window.selectFeedPresetImage = selectFeedPresetImage;
window.publishFeedPost       = publishFeedPost;
window.likeFeedPost          = likeFeedPost;
window.focusCommentInput     = focusCommentInput;
window.handleCommentKey      = handleCommentKey;
window.submitComment         = submitComment;
window.handleSendChatMessage = handleSendChatMessage;
window.selectChatContact     = selectChatContact;
window.moveKanbanTask        = moveKanbanTask;
window.addNewKanbanTask      = addNewKanbanTask;
window.deleteKanbanTask      = deleteKanbanTask;
window.savePersonalNotes     = savePersonalNotes;

// Executar após o carregamento completo do DOM
window.addEventListener('DOMContentLoaded', () => {
  initApp();
});
