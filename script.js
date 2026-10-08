/* ======================================================
   GDG VITM Core Recruitment — Script
   ====================================================== */

(function () {
  'use strict';

  // ---- DOM References ----
  const rocketIntro = document.getElementById('rocket-intro');
  const starsContainer = document.getElementById('stars-container');
  const particlesContainer = document.getElementById('particles-container');
  const introText = document.getElementById('intro-text');
  const introSubtext = document.getElementById('intro-subtext');
  const rocketEl = document.getElementById('rocket');
  const flameEl = document.getElementById('flame');
  const mainContent = document.getElementById('main-content');
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const modal = document.getElementById('enrollment-modal');
  const modalClose = document.getElementById('modal-close');
  const modalCancel = document.getElementById('modal-cancel');
  const domainSelect = document.getElementById('domain-select');
  const form = document.getElementById('enrollment-form');
  const toast = document.getElementById('toast');

  let introSkipped = false;

  // ---- Utility ----
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // ---- Floating Dots Generation (Google-colored, light theme) ----
  function generateStars() {
    if (!starsContainer) return;
    starsContainer.innerHTML = '';
    const colors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853'];
    const count = window.innerWidth < 768 ? 25 : 55;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.className = 'star';
      dot.style.left = (Math.random() * 88 + 4) + '%'; // keep within 4% - 92%
      dot.style.top = (Math.random() * 80 + 4) + '%'; // keep above clouds
      const size = Math.random() * 6 + 3;
      dot.style.width = size + 'px';
      dot.style.height = size + 'px';
      dot.style.background = colors[Math.floor(Math.random() * colors.length)];
      dot.style.opacity = (Math.random() * 0.2 + 0.06).toFixed(2);
      dot.style.animationDelay = Math.random() * 4 + 's';
      dot.style.animationDuration = (Math.random() * 4 + 4) + 's';
      starsContainer.appendChild(dot);
    }
  }

  // ---- Fit intro text to viewport ----
  // CSS must NOT use !important on font-size — otherwise JS inline style is overridden.
  function fitIntroText() {
    if (!introText) return;
    introText.style.fontSize = '';
    const stage = document.getElementById('intro-stage');
    if (!stage) return;
    const stageStyle = window.getComputedStyle(stage);
    const stagePadH =
      parseFloat(stageStyle.paddingLeft) + parseFloat(stageStyle.paddingRight);
    const availableWidth = stage.clientWidth - stagePadH - 4;

    if (introText.scrollWidth <= availableWidth) return;

    // Binary search: find largest font-size that still fits (20 iterations)
    const baseSize = parseFloat(window.getComputedStyle(introText).fontSize);
    let lo = 10;
    let hi = baseSize;
    for (let i = 0; i < 20; i++) {
      const mid = (lo + hi) / 2;
      introText.style.fontSize = mid + 'px';
      if (introText.scrollWidth <= availableWidth) {
        lo = mid;
      } else {
        hi = mid;
      }
    }
    introText.style.fontSize = Math.floor(lo) + 'px';
  }

  // ---- Launch Particles (burst on ignition) ----
  function spawnParticles() {
    if (!particlesContainer || !rocketEl) return;
    particlesContainer.innerHTML = '';
    const colors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#FFF'];
    const rocketRect = rocketEl.getBoundingClientRect();
    const cx = rocketRect.left + rocketRect.width / 2;
    const cy = rocketRect.bottom;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 18 : 30;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * (isMobile ? 4 : 6) + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.left = cx + 'px';
      p.style.top = cy + 'px';
      p.style.boxShadow = `0 0 ${size * 2}px ${p.style.background}`;
      particlesContainer.appendChild(p);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * (isMobile ? 60 : 120) + 30;
      const dx = Math.cos(angle) * velocity;
      const dy = Math.sin(angle) * velocity + (isMobile ? 25 : 40);

      p.animate(
        [
          { transform: 'translate(0, 0) scale(1)', opacity: 1 },
          { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 },
        ],
        {
          duration: Math.random() * 600 + 500,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          fill: 'forwards',
        }
      );
    }
  }

  // ---- Launch Sequence (Science Fair style — no countdown) ----
  async function launchSequence() {
    generateStars();

    // Defer one frame so the stage has its real layout width before measuring
    await new Promise((resolve) => requestAnimationFrame(resolve));
    fitIntroText();

    // Re-fit after web fonts load (fallback font metrics differ)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitIntroText);
    }

    // Phase 1: Show text elements
    await delay(400);
    if (introSkipped) return;
    introSubtext.classList.add('visible');

    await delay(300);
    if (introSkipped) return;
    introText.classList.add('visible');

    // Show tagline
    const tagline = document.getElementById('intro-tagline');
    if (tagline) tagline.classList.add('visible');

    // Phase 2: Pause to let user read
    const readPause = window.innerWidth < 768 ? 1400 : 2000;
    await delay(readPause);
    if (introSkipped) return;

    // Phase 3: Rocket ignites
    flameEl.classList.add('active');
    spawnParticles();

    await delay(500);
    if (introSkipped) return;

    // Phase 4: Rocket launches UP through text — letters scatter
    rocketEl.classList.add('launching');
    rocketIntro.classList.add('shake');

    // Scatter the letters as rocket passes through
    await delay(300);
    if (introSkipped) return;
    document.getElementById('intro-content').classList.add('scatter');

    await delay(1000);
    if (introSkipped) return;

    // Phase 5: Transition to main content
    revealMainContent();
  }

  function revealMainContent() {
    window.scrollTo(0, 0);
    rocketIntro.classList.add('fade-out');
    mainContent.classList.add('visible');

    setTimeout(() => {
      rocketIntro.style.display = 'none';
      window.scrollTo(0, 0);
    }, 800);
  }

  // ---- Navbar Scroll ----
  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // ---- Mobile Nav Toggle ----
  function toggleMobileNav() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  }

  // ---- Modal ----
  function openModal(domain) {
    if (domain) {
      domainSelect.value = domain;
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ---- Form Submit ----
  function handleFormSubmit(e) {
    e.preventDefault();

    // Basic validation
    const requiredFields = form.querySelectorAll('[required]');
    let valid = true;
    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = 'var(--g-red)';
        field.addEventListener(
          'input',
          () => {
            field.style.borderColor = '';
          },
          { once: true }
        );
      }
    });

    if (!valid) {
      showToast('Please fill in all required fields ⚠️');
      return;
    }

    closeModal();
    showToast('Application submitted successfully! 🎉');
    form.reset();
  }

  // ---- Toast ----
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3500);
  }

  // ---- Scroll Reveal (IntersectionObserver) ----
  function setupScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el);
    });
  }

  // ---- Smooth scroll for nav links (close mobile nav on click) ----
  function setupNavLinks() {
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ---- Init ----
  document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll
    window.addEventListener('scroll', handleNavScroll);

    // Mobile hamburger
    hamburger.addEventListener('click', toggleMobileNav);

    // Nav link clicks
    setupNavLinks();

    // Domain cards → open modal
    document.querySelectorAll('.domain-card').forEach((card) => {
      card.addEventListener('click', () => {
        const domain = card.dataset.domain;
        openModal(domain);
      });
    });

    // Modal close actions
    modalClose.addEventListener('click', closeModal);
    modalCancel.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    // Form submit
    form.addEventListener('submit', handleFormSubmit);

    // Scroll reveal
    setupScrollReveal();

    // Start launch sequence
    launchSequence();

    // Re-fit text on resize / orientation change
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(fitIntroText, 150);
    }, { passive: true });
    window.addEventListener('orientationchange', () => {
      setTimeout(fitIntroText, 300);
    }, { passive: true });

    // Skip button — touchstart for instant iOS response
    const skipBtn = document.getElementById('skip-btn');
    if (skipBtn) {
      function doSkip() {
        if (introSkipped) return;
        introSkipped = true;
        revealMainContent();
      }
      skipBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        doSkip();
      }, { passive: false });
      skipBtn.addEventListener('click', doSkip);
    }
  });
})();
