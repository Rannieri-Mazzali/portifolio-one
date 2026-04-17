// ============================================
// PORTFOLIO INTERATIVO - MAIN.JS
// ============================================

console.log('✅ main.js carregado com sucesso!');

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
  addScrollAnimations();
}

function renderExperience() {
  const container = document.getElementById('experience-container');
  if (!container || !portfolioData.experience) return;

  container.innerHTML = portfolioData.experience.map((exp, index) => {
    const isRed = exp.theme === 'red';
    const borderColor = isRed ? '#ff006e' : '#00d4ff';
    const accentColor = isRed ? '#ff006e' : '#00d4ff';
    const bgGlow = isRed ? 'rgba(255, 0, 110, 0.15)' : 'rgba(0, 212, 255, 0.15)';
    const ring1Color = isRed ? 'rgba(255, 0, 110, 0.3)' : 'rgba(0, 212, 255, 0.3)';
    const ring2Color = isRed ? 'rgba(255, 0, 110, 0.5)' : 'rgba(0, 212, 255, 0.5)';
    const ring3Color = isRed ? 'rgba(255, 0, 110, 0.2)' : 'rgba(0, 212, 255, 0.2)';
    
    return `
    <div class="experience-portal group cursor-pointer" onclick="openPortalModal(${exp.id})" 
         style="perspective: 1000px; transform-style: preserve-3d;">
      <!-- 3D Portal Frame -->
      <div class="relative rounded-lg overflow-hidden transform transition-all duration-500"
           style="height: 320px; box-shadow: 0 0 40px ${bgGlow}, inset 0 0 30px rgba(0, 0, 0, 0.5);
                  border: 2px solid ${borderColor}; background: rgba(0, 0, 0, 0.4);
                  group-hover:scale-105 group-hover:shadow-2xl;
                  animation: portal-float 6s ease-in-out infinite;">
        
        <!-- Animated portal rings center -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div class="absolute w-40 h-40 rounded-full border-2" 
               style="border-color: ${ring1Color}; animation: ring-spin 8s linear infinite;">
          </div>
          <div class="absolute w-24 h-24 rounded-full border-2" 
               style="border-color: ${ring2Color}; animation: ring-spin 6s linear infinite reverse;">
          </div>
          <div class="absolute w-12 h-12 rounded-full" 
               style="background: radial-gradient(circle, ${ring3Color}, transparent); animation: ring-pulse 3s ease-in-out infinite;">
          </div>
        </div>
        
        <!-- Scanlines effect -->
        <div class="absolute inset-0 pointer-events-none opacity-5"
             style="background-image: linear-gradient(0deg, transparent 1px, ${accentColor} 2px, transparent 3px);
                    background-size: 100% 4px;"></div>
        
        <!-- Content overlay -->
        <div class="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 z-10">
          <div>
            <p class="text-xs sm:text-sm uppercase tracking-widest mb-2" 
               style="color: ${accentColor}; opacity: 0.6;">Exp. ${index + 1}</p>
            <h3 class="text-xl sm:text-2xl md:text-3xl font-bold leading-tight"
                style="color: ${accentColor}; text-shadow: 0 0 20px ${accentColor};">${exp.position}</h3>
          </div>
          
          <div class="space-y-2">
            <p class="text-sm sm:text-base" style="color: ${accentColor}; opacity: 0.8;">${exp.company}</p>
            <div class="flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all"
                 style="color: ${accentColor};">
              <span>Explorar</span>
              <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Glow effect on hover -->
        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"
             style="background: radial-gradient(ellipse at center, ${bgGlow} 0%, transparent 70%);"></div>
      </div>
    </div>
    `;
  }).join('');
}

function openPortalModal(expId) {
  const exp = portfolioData.experience.find(e => e.id === expId);
  if (!exp) return;
  
  document.getElementById('modal-position').textContent = exp.position;
  document.getElementById('modal-company').textContent = exp.company;
  document.getElementById('modal-period').textContent = exp.yearRange;
  
  const achievementsHtml = exp.achievements.map(achievement => `
    <div class="flex gap-3 pb-4 border-b border-cyan-500/20 last:border-b-0">
      <div class="flex-shrink-0">
        <svg class="w-5 h-5 text-cyan-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <p class="text-gray-300 leading-relaxed">${achievement}</p>
    </div>
  `).join('');
  
  document.getElementById('modal-achievements').innerHTML = achievementsHtml;
  document.getElementById('portal-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closePortalModal(event) {
  if (event && event.target.id !== 'portal-modal') return;
  document.getElementById('portal-modal').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Reviews, Projects and Skills rendering removed per request; site will show only Experiência.

// ============================================
// 3. INTERATIVIDADE E ANIMAÇÕES
// ============================================

function addScrollAnimations() {
  const elements = document.querySelectorAll('.experience-portal');
  
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
// PORTAL MODAL FUNCTIONS
// ============================================

function openPortalModal(expId) {
  const exp = portfolioData.experience.find(e => e.id === expId);
  if (!exp) return;
  
  document.getElementById('modal-position').textContent = exp.position;
  document.getElementById('modal-company').textContent = exp.company;
  document.getElementById('modal-period').textContent = exp.yearRange;
  
  const achievementsHtml = exp.achievements.map(achievement => `
    <div class="flex gap-3 pb-4 border-b border-cyan-500/20 last:border-b-0">
      <div class="flex-shrink-0">
        <svg class="w-5 h-5 text-cyan-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <p class="text-gray-300 leading-relaxed">${achievement}</p>
    </div>
  `).join('');
  
  document.getElementById('modal-achievements').innerHTML = achievementsHtml;
  document.getElementById('portal-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closePortalModal(event) {
  if (event && event.target.id !== 'portal-modal') return;
  document.getElementById('portal-modal').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuBtn = document.getElementById('menu-btn');
  if (mobileMenu) {
    mobileMenu.classList.add('hidden');
  }
}

// ============================================
// 7. INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Inicializando Portfolio...');
  
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

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePortalModal({ target: { id: 'portal-modal' } });
    }
  });
  
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
