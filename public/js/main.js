// ============================================
// PORTFOLIO INTERATIVO - MAIN.JS
// ============================================

// Variáveis globais
let portfolioData = null;
const API_BASE = '/api';

// ============================================
// 1. CARREGAMENTO DE DADOS
// ============================================

async function loadPortfolioData() {
  try {
    const response = await fetch(`${API_BASE}/portfolio`);
    portfolioData = await response.json();
    console.log('✅ Portfólio carregado com sucesso!', portfolioData);
    
    renderAllSections();
  } catch (error) {
    console.error('❌ Erro ao carregar portfólio:', error);
    showError('Erro ao carregar dados do portfólio');
  }
}

// ============================================
// 2. RENDERIZAÇÃO DE SEÇÕES
// ============================================

function renderAllSections() {
  renderExperience();
  renderReviews();
  renderProjects();
  renderSkills();
  addScrollAnimations();
}

function renderExperience() {
  const container = document.getElementById('experience-container');
  if (!container || !portfolioData.experience) return;

  container.innerHTML = portfolioData.experience.map((exp, index) => `
    <div class="experience-card bg-gradient-to-r from-cyan-500/10 to-red-500/10 p-8 rounded-lg border border-cyan-500/30 hover:border-cyan-400/60 transition">
      <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
        <div>
          <h3 class="text-2xl font-bold text-cyan-300">${exp.position}</h3>
          <p class="text-red-400 text-lg">${exp.company}</p>
        </div>
        <span class="text-gray-400 text-sm px-3 py-1 border border-gray-500 rounded-full whitespace-nowrap">
          ${exp.period}
        </span>
      </div>
      
      <ul class="space-y-3">
        ${exp.achievements.map(achievement => `
          <li class="flex gap-3 text-gray-300">
            <span class="text-cyan-400 mt-1">▸</span>
            <span>${achievement}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');
}

function renderReviews() {
  const container = document.getElementById('reviews-container');
  if (!container || !portfolioData.reviews) return;

  container.innerHTML = portfolioData.reviews.map((review, index) => `
    <div class="review-card p-8 rounded-lg backdrop-blur-sm hover:shadow-lg transition-all">
      <div class="mb-4">
        <p class="text-gray-300 italic leading-relaxed">"${review.text}"</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-2 h-2 bg-gradient-to-r from-cyan-400 to-red-400 rounded-full"></div>
        <p class="font-semibold text-cyan-400">${review.author}</p>
      </div>
    </div>
  `).join('');
}

function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container || !portfolioData.projects) return;

  container.innerHTML = portfolioData.projects.map((project, index) => `
    <div class="project-card p-6 rounded-lg backdrop-blur-sm cursor-pointer group">
      <h3 class="text-xl font-bold text-cyan-300 mb-2 group-hover:text-red-400 transition">
        ${project.title}
      </h3>
      <p class="text-gray-400 text-sm mb-4">${project.description}</p>
      
      <div class="flex flex-wrap gap-2 mb-4">
        ${project.tech.map(tech => `
          <span class="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">
            ${tech}
          </span>
        `).join('')}
      </div>
      
      <div class="pt-4 border-t border-cyan-500/20">
        <p class="text-sm text-red-400 font-semibold">${project.metrics}</p>
      </div>
    </div>
  `).join('');
}

function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container || !portfolioData.skills) return;

  container.innerHTML = portfolioData.skills.map((skill, index) => `
    <div class="skill-tag px-4 py-2 rounded-lg text-sm font-medium text-cyan-300 text-center hover:text-white transition cursor-pointer">
      ${skill}
    </div>
  `).join('');
}

// ============================================
// 3. INTERATIVIDADE E ANIMAÇÕES
// ============================================

function addScrollAnimations() {
  const elements = document.querySelectorAll('.experience-card, .review-card, .project-card, .skill-tag');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
  });
}

function handleContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      if (response.ok) {
        showSuccessMessage('✅ Mensagem enviada com sucesso! Obrigado!');
        form.reset();
      } else {
        showError('❌ Erro ao enviar mensagem');
      }
    } catch (error) {
      console.error('Erro:', error);
      showError('Erro de conexão');
    }
  });
}

function showSuccessMessage(msg) {
  const div = document.createElement('div');
  div.className = 'fixed top-20 right-4 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg animate-fade-in';
  div.textContent = msg;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 4000);
}

function showError(msg) {
  const div = document.createElement('div');
  div.className = 'fixed top-20 right-4 px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg animate-fade-in';
  div.textContent = msg;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 4000);
}

// ============================================
// 4. EFEITOS DE PARALLAX E MOUSE
// ============================================

function initParallaxEffect() {
  document.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.animate-blob');
    const panels = document.querySelectorAll('.hero-panel');
    const x = (e.clientX / window.innerWidth) * 20;
    const y = (e.clientY / window.innerHeight) * 20;
    const offsetX = (e.clientX / window.innerWidth - 0.5) * 32;
    const offsetY = (e.clientY / window.innerHeight - 0.5) * 28;

    blobs.forEach((blob, index) => {
      blob.style.transform = `translate(${x * (index + 1) * 2}px, ${y * (index + 1) * 2}px) scale(1)`;
    });

    panels.forEach((panel, index) => {
      const depth = (index + 1) * 2;
      panel.style.setProperty('--mx', `${offsetX / depth}px`);
      panel.style.setProperty('--my', `${offsetY / depth}px`);
    });
  });
}

// ============================================
// 5. SCROLL INFINITO / INTERATIVIDADE
// ============================================

function addScrollInteractivity() {
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
    
    // Opacity effect baseada em scroll
    const nav = document.querySelector('nav');
    if (nav) {
      const opacity = Math.min(scrollTop / 300, 0.95);
      nav.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// ============================================
// 6. EASTER EGG / INTERATIVIDADE EXTRA
// ============================================

function initEasterEgg() {
  let konami = [];
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  document.addEventListener('keydown', (e) => {
    konami.push(e.key);
    konami = konami.slice(-10);

    if (konami.join('') === konamiCode.join('')) {
      activateMatrixMode();
    }
  });
}

function activateMatrixMode() {
  document.body.style.filter = 'hue-rotate(180deg)';
  showSuccessMessage('🎮 MATRIX MODE ATIVADO!');
  setTimeout(() => {
    document.body.style.filter = 'hue-rotate(0deg)';
  }, 5000);
}

// ============================================
// 6.5 MOBILE MENU
// ============================================

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuBtn = document.getElementById('menu-btn');
  if (mobileMenu) {
    mobileMenu.classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });
  }
});

// ============================================
// 7. INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Inicializando Portfolio...');
  
  loadPortfolioData();
  handleContactForm();
  initParallaxEffect();
  addScrollInteractivity();
  initEasterEgg();

  console.log('✨ Portfolio pronto!');
});

// ============================================
// 8. UTILIDADES
// ============================================

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showSuccessMessage('📋 Copiado para clipboard!');
  });
}

// Smoothscroll enhancement
function smoothScroll(target) {
  document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
}

// Export para uso global
window.smoothScroll = smoothScroll;
window.copyToClipboard = copyToClipboard;
