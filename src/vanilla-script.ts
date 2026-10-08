/* ======================================================
   GDG VITM Core Recruitment — Script
   ====================================================== */
export function initVanillaJS() {

  // ---- DOM References ----
  const rocketIntro = document.getElementById('rocket-intro');
  const mainContent = document.getElementById('main-content');
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navBackdrop = document.getElementById('nav-backdrop');
  const mobileNavClose = document.getElementById('mobile-nav-close');
  const modal = document.getElementById('enrollment-modal');
  const modalClose = document.getElementById('modal-close');
  const modalCancel = document.getElementById('modal-cancel');
  const domainSelect = document.getElementById('domain-select') as HTMLSelectElement;
  const form = document.getElementById('enrollment-form');
  const toast = document.getElementById('toast');

  // ---- Utility ----
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  void delay; // suppress unused warning


  // ---- WebGL PRISM Intro ----
  // Vertex shader: full-screen quad
  const VERT_SRC = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  // Fragment shader: raymarched crystal with dispersion
  const FRAG_SRC = `
    precision highp float;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform float uPulse;
    #define PI 3.14159265359
    #define TAU 6.28318530718
    #define MAX_STEPS 80
    #define MAX_DIST 50.0
    #define SURF_DIST 0.001
    float hash(float n) { return fract(sin(n) * 43758.5453123); }
    mat2 rot(float a) { float s=sin(a),c=cos(a); return mat2(c,-s,s,c); }
    float sdOctahedron(vec3 p, float s) {
      p = abs(p);
      float m = p.x+p.y+p.z-s;
      vec3 q;
      if(3.0*p.x<m) q=p.xyz;
      else if(3.0*p.y<m) q=p.yzx;
      else if(3.0*p.z<m) q=p.zxy;
      else return m*0.57735027;
      float k=clamp(0.5*(q.z-q.y+s),0.0,s);
      return length(vec3(q.x,q.y-s+k,q.z-k));
    }
    float sdTriPrism(vec3 p, vec2 h) {
      vec3 q=abs(p);
      return max(q.z-h.y, max(q.x*0.866025+p.y*0.5,-p.y)-h.x*0.5);
    }
    float smin(float a,float b,float k){
      float h=clamp(0.5+0.5*(b-a)/k,0.0,1.0);
      return mix(b,a,h)-k*h*(1.0-h);
    }
    float smax(float a,float b,float k){ return -smin(-a,-b,k); }
    float map(vec3 p) {
      vec2 m=(uMouse-0.5)*2.5;
      p.xy+=m*0.4;
      p.xz*=rot(uTime*0.12);
      p.xy*=rot(uTime*0.08);
      vec3 p1=p;
      p1.yz*=rot(uTime*0.15);
      float cd=sin(p1.x*3.0+uTime)*sin(p1.y*3.0+uTime)*sin(p1.z*3.0+uTime)*0.1;
      float core=sdOctahedron(p1,1.6)+cd;
      vec3 p2=p1;
      p2.xy*=rot(PI*0.25+uTime*0.2);
      core=smax(core,-sdTriPrism(p2,vec2(1.4,2.0)),0.2);
      float d=core;
      float kb=0.2+0.15*(0.5+0.5*sin(uTime*1.5));
      for(int i=0;i<4;i++){
        float fi=float(i);
        float angle=fi*TAU/4.0+uTime*0.3;
        float radius=3.0+0.3*sin(uTime*0.4+fi);
        vec3 pos=vec3(cos(angle)*radius,sin(angle*0.7)*1.0,sin(angle)*radius);
        vec3 po=p-pos;
        po.xy*=rot(uTime*0.5+fi);
        float sd=sin(po.x*5.0+fi)*sin(po.y*5.0+fi)*sin(po.z*5.0+fi)*0.05;
        d=smin(d,sdOctahedron(po,0.4)+sd,kb);
      }
      return d;
    }
    vec3 getNormal(vec3 p){
      vec2 e=vec2(0.001,0.0);
      return normalize(vec3(
        map(p+e.xyy)-map(p-e.xyy),
        map(p+e.yxy)-map(p-e.yxy),
        map(p+e.yyx)-map(p-e.yyx)
      ));
    }
    float raymarch(vec3 ro,vec3 rd){
      float t=0.0;
      for(int i=0;i<MAX_STEPS;i++){
        vec3 p=ro+rd*t;
        float d=map(p);
        if(abs(d)<SURF_DIST||t>MAX_DIST) break;
        t+=d*0.7;
      }
      return t;
    }
    vec3 getBg(vec3 rd){
      float stars=0.0;
      vec3 p=rd*100.0;
      float h=hash(dot(p,vec3(12.9898,78.233,54.53)));
      if(h>0.98) stars=pow(h-0.98,10.0)*20.0;
      vec3 nb=vec3(0.0);
      nb+=vec3(0.3,0.15,0.5)*pow(max(0.0,sin(rd.x*2.0+uTime*0.1)),3.0)*0.2;
      nb+=vec3(0.15,0.3,0.6)*pow(max(0.0,sin(rd.y*2.5+uTime*0.05)),3.0)*0.2;
      
      vec3 darkBg = stars + nb;
      vec3 lightBg = vec3(0.85, 0.9, 0.95) + rd.y * 0.15;
      
      return mix(darkBg, lightBg, uPulse); // Background goes fully to lightBg based on pulse
    }
    void main(){
      vec2 uv=(gl_FragCoord.xy-0.5*uResolution)/min(uResolution.x,uResolution.y);
      vec2 m=(uMouse-0.5)*0.5;
      vec3 ro=vec3(m.x*2.0,m.y*2.0,5.5);
      vec3 rd=normalize(vec3(uv,-1.0));
      rd.xy*=rot(m.x*0.2);
      rd.yz*=rot(m.y*0.2);
      float t=raymarch(ro,rd);
      vec3 color=vec3(0.0);
      if(t<MAX_DIST){
        vec3 p=ro+rd*t;
        vec3 n=getNormal(p);
        vec3 vd=normalize(ro-p);
        float fresnel=pow(1.0-max(dot(vd,n),0.0),3.0);
        float ior=1.5;
        vec3 refDir=refract(rd,n,1.0/ior);
        if(length(refDir)>0.0){
          float t2=raymarch(p-n*0.01,refDir);
          if(t2<MAX_DIST){
            vec3 p2=p-n*0.01+refDir*t2;
            vec3 n2=getNormal(p2);
            vec3 r=refract(refDir,-n2,ior-0.2);
            vec3 g=refract(refDir,-n2,ior);
            vec3 b=refract(refDir,-n2,ior+0.2);
            vec3 bgR=getBg(r)*vec3(1.4,0.7,0.7);
            vec3 bgG=getBg(g)*vec3(0.7,1.4,0.8);
            vec3 bgB=getBg(b)*vec3(0.7,0.8,1.4);
            color=vec3(bgR.x,bgG.y,bgB.z);
            color=pow(color,vec3(0.7))*5.0;
          } else {
            color=getBg(refDir)*2.0;
          }
        }
        vec3 ld=normalize(vec3(1.0,1.0,-1.0));
        vec3 hd=normalize(ld+vd);
        float spec=pow(max(dot(n,hd),0.0),150.0);
        color+=spec*3.5;
        vec3 fc=vec3(
          0.5+0.5*sin(fresnel*TAU+uTime),
          0.5+0.5*sin(fresnel*TAU+uTime+TAU/3.0),
          0.5+0.5*sin(fresnel*TAU+uTime+TAU*2.0/3.0)
        );
        color+=fresnel*fc*1.2;
        float edge=pow(1.0-abs(dot(vd,n)),4.0);
        color+=edge*vec3(0.6,0.7,1.0)*0.7;
        float sss=pow(max(dot(-n,ld),0.0),2.0);
        color+=sss*vec3(1.0,0.6,0.8)*0.5;
        
        // Make the prism crystal itself go black along the transition
        color = mix(color, vec3(0.0), uPulse * 0.95);
      } else {
        color=getBg(rd);
      }
      float vign=1.0-length(uv)*0.4;
      vign=smoothstep(0.3,1.0,vign);
      color*=vign;
      color*=vec3(0.96,0.99,1.06);
      color=pow(color,vec3(0.88))*1.12;
      gl_FragColor=vec4(color,1.0);
    }
  `;

  // ---- Compile & link WebGL program ----
  let prismRAF = 0; // animation frame handle for cleanup

  function initPrismIntro() {
    const canvas = document.getElementById('prism-canvas') as HTMLCanvasElement;
    if (!canvas) { revealMainContent(); return; }

    // Prefer standard WebGL; fall back gracefully
    const gl = (
      canvas.getContext('webgl') ||
      (canvas as HTMLCanvasElement & { getContext(c: 'experimental-webgl'): WebGLRenderingContext | null })
        .getContext('experimental-webgl')
    ) as WebGLRenderingContext | null;

    if (!gl) {
      // No WebGL support — skip straight to main content
      revealMainContent();
      return;
    }

    function resizeCanvas() {
      // Throttle resolution on mobile/tablets to fix heavy GPU lag from the 3D raymarching
      const pixelRatio = window.innerWidth <= 768 ? 0.5 : Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      gl!.viewport(0, 0, canvas.width, canvas.height);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    function compileShader(type: number, src: string): WebGLShader | null {
      const s = gl!.createShader(type);
      if (!s) return null;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        console.error('Shader error:', gl!.getShaderInfoLog(s));
        gl!.deleteShader(s);
        return null;
      }
      return s;
    }

    const vert = compileShader(gl.VERTEX_SHADER, VERT_SRC);
    const frag = compileShader(gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vert || !frag) { revealMainContent(); return; }

    const prog = gl.createProgram();
    if (!prog) { revealMainContent(); return; }
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Link error:', gl.getProgramInfoLog(prog));
      revealMainContent();
      return;
    }

    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uRes = gl.getUniformLocation(prog, 'uResolution');
    const uMou = gl.getUniformLocation(prog, 'uMouse');
    const uPulseLoc = gl.getUniformLocation(prog, 'uPulse');

    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    // Mouse / touch tracking (smooth lerp)
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    canvas.addEventListener('mousemove', (e) => {
      mouse.tx = e.clientX / canvas.width;
      mouse.ty = 1 - e.clientY / canvas.height;
    }, { passive: true });
    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.tx = e.touches[0].clientX / canvas.width;
        mouse.ty = 1 - e.touches[0].clientY / canvas.height;
      }
    }, { passive: true });

    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);

    const startTime = Date.now();
    let destroyed = false;

    function render() {
      if (destroyed) return;
      prismRAF = requestAnimationFrame(render);
      const t = (Date.now() - startTime) * 0.001;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMou, mouse.x, mouse.y);

      // Transition starts at 2.5s and finishes at 6.5s
      let p = Math.max(0, Math.min(1, (t - 2.5) / 4.0));
      // Smoothstep easing for a luxurious fade
      const pulse = p * p * (3.0 - 2.0 * p);
      gl.uniform1f(uPulseLoc, pulse);

      // Sync the DOM transition
      const content = document.querySelector('.prism-content') as HTMLElement;
      if (content) {
        content.style.setProperty('--pulse', pulse.toString());
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Auto-finish intro when transition holds at white
      if (t > 7.5 && !destroyed) {
        revealMainContent();
      }
    }

    render();

    // Expose cleanup so revealMainContent can stop the loop
    return () => {
      destroyed = true;
      cancelAnimationFrame(prismRAF);
      window.removeEventListener('resize', resizeCanvas);
    };
  }

  // ---- Reveal main content & stop WebGL loop ----
  let prismCleanup: (() => void) | undefined;
  let typewriterStarted = false;

  function revealMainContent() {
    if (prismCleanup) { prismCleanup(); prismCleanup = undefined; }
    window.scrollTo(0, 0);
    if (rocketIntro) rocketIntro.classList.add('fade-out');
    if (mainContent) mainContent.classList.add('visible');
    setTimeout(() => {
      if (rocketIntro) rocketIntro.style.display = 'none';
      window.scrollTo(0, 0);
    }, 800);

    if (!typewriterStarted) {
      typewriterStarted = true;
      startHeroTypewriter();
    }
  }

  // ---- Typewriter Animation for Hero ----
  function startHeroTypewriter() {
    const textEl = document.getElementById('hero-typewriter-text');
    if (!textEl) return;

    const part1 = 'BE A PART OF';
    const part2 = 'GDG-VITM 26-27';

    textEl.innerHTML = '<span class="title-dark"></span> <span class="title-cool"></span>';
    const darkSpan = textEl.querySelector('.title-dark') as HTMLElement;
    const coolSpan = textEl.querySelector('.title-cool') as HTMLElement;

    let idx1 = 0;
    let idx2 = 0;

    function typePart1() {
      if (idx1 < part1.length) {
        darkSpan.textContent += part1.charAt(idx1);
        idx1++;
        setTimeout(typePart1, 60);
      } else {
        setTimeout(typePart2, 100);
      }
    }

    function typePart2() {
      if (idx2 < part2.length) {
        coolSpan.textContent += part2.charAt(idx2);
        idx2++;
        setTimeout(typePart2, 70);
      } else {
        // Typing finished: fade out and remove blinking cursor
        const cursorEl = document.querySelector('.typewriter-cursor') as HTMLElement;
        if (cursorEl) {
          cursorEl.style.transition = 'opacity 0.4s ease';
          cursorEl.style.opacity = '0';
          setTimeout(() => {
            cursorEl.style.display = 'none';
          }, 400);
        }
      }
    }

    // Start typing after stream collision
    setTimeout(typePart1, 600);
  }

  // ---- Kick off PRISM intro ----
  prismCleanup = initPrismIntro();

  // ---- Navbar Scroll ----
  function handleNavScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // ---- Mobile Nav Open/Close ----
  function openMobileNav() {
    if (hamburger) hamburger.classList.add('active');
    if (navLinks) navLinks.classList.add('open');
    if (navBackdrop) navBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (hamburger) hamburger.classList.remove('active');
    if (navLinks) navLinks.classList.remove('open');
    if (navBackdrop) navBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleMobileNav() {
    if (navLinks && navLinks.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  // ---- Modal ----
  function openModal(domain?: string) {
    if (domainSelect) {
      domainSelect.value = domain || '';
    }
    const yearSelect = document.getElementById('academic-year') as HTMLSelectElement;
    if (!domain && yearSelect) {
      yearSelect.value = '';
    }
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ---- Form Submit (Connected to Supabase) ----
  async function handleFormSubmit(e: Event) {
    e.preventDefault();
    const fullNameInput = document.getElementById('full-name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const yearSelect = document.getElementById('academic-year') as HTMLSelectElement;
    const domainSelectEl = document.getElementById('domain-select') as HTMLSelectElement;
    const skillsInput = document.getElementById('skills') as HTMLTextAreaElement;
    const expInput = document.getElementById('experience') as HTMLTextAreaElement;
    const motivationInput = document.getElementById('motivation') as HTMLTextAreaElement;
    const submitBtn = form?.querySelector('.btn-submit') as HTMLButtonElement;

    const name = fullNameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const year = yearSelect?.value || '';
    const position = domainSelectEl?.value || '';
    const skills = skillsInput?.value.trim() || '';
    const experience = expInput?.value.trim() || '';
    const motivation = motivationInput?.value.trim() || '';

    // Validation
    if (!name) {
      showToast('⚠️ Please enter your full name');
      fullNameInput?.focus();
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('⚠️ Please enter a valid email address');
      emailInput?.focus();
      return;
    }
    if (!year) {
      showToast('⚠️ Please select your academic year');
      yearSelect?.focus();
      return;
    }
    if (!position) {
      showToast('⚠️ Please select your preferred domain');
      domainSelectEl?.focus();
      return;
    }
    if (!motivation) {
      showToast('⚠️ Please fill in what inspires you to join');
      motivationInput?.focus();
      return;
    }

    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
      }

      // Mock submit for frontend-only
      await delay(500);
      console.log('Form submission successful (Frontend only):', { name, email, year, position });

      // 3. Success UI
      closeModal();
      showToast('🎉 Application submitted successfully! Welcome to GDG VITM!');
      (form as HTMLFormElement)?.reset();

    } catch (error: any) {
      console.error('Submission failed:', error);
      showToast(`❌ Error: ${error?.message || 'Failed to submit. Please try again.'}`);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Application';
      }
    }
  }

  // ---- Toast ----
  function showToast(message: string) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 4000);
  }

  // ---- Event Listeners ----
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  if (hamburger) hamburger.addEventListener('click', toggleMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
  if (navBackdrop) navBackdrop.addEventListener('click', closeMobileNav);

  // Close nav when a link is clicked
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalCancel) modalCancel.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (form) form.addEventListener('submit', handleFormSubmit);

  // Enroll buttons — open modal with domain pre-selected
  document.querySelectorAll('[data-domain]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal((btn as HTMLElement).dataset.domain);
    });
  });

  // Navbar Apply button (Desktop)
  const navApplyBtn = document.getElementById('nav-apply-btn') || document.querySelector('.nav-cta');
  if (navApplyBtn) {
    navApplyBtn.addEventListener('click', () => openModal());
  }

  // Mobile Nav Apply button (Inside hamburger menu)
  const mobileNavApplyBtn = document.getElementById('mobile-nav-apply-btn');
  if (mobileNavApplyBtn) {
    mobileNavApplyBtn.addEventListener('click', () => {
      if (navLinks) navLinks.classList.remove('open');
      if (hamburger) hamburger.classList.remove('active');
      openModal();
    });
  }

  // Skip intro button
  const skipBtn = document.getElementById('prism-skip-btn');
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      skipBtn.classList.add('clicked');
      setTimeout(() => {
        revealMainContent();
      }, 100);
    });
  }

  // Hero CTA button
  const heroCta = document.getElementById('hero-cta');
  if (heroCta) {
    heroCta.addEventListener('click', () => openModal());
  }

  // Mobile touch toggle for hero image
  const heroImgBox = document.getElementById('hero-img-interactive');
  if (heroImgBox) {
    heroImgBox.addEventListener('touchstart', () => {
      heroImgBox.classList.toggle('active');
    }, { passive: true });
  }

  // ---- Scroll Reveal ----
  const revealEls = document.querySelectorAll('.reveal-on-scroll');
  if (revealEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  // ---- Glassmorphic Cursor ----
  const glassCursor = document.getElementById('glass-cursor');
  if (glassCursor && window.matchMedia('(pointer: fine)').matches) {
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx, ty = cy;

    document.addEventListener('mousemove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
    }, { passive: true });

    // Smooth follow
    function animateCursor() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      glassCursor!.style.left = cx + 'px';
      glassCursor!.style.top = cy + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover state on interactive elements
    const hoverEls = document.querySelectorAll('a, button, [data-domain], input, select, textarea, .domain-card, .social-link, .nav-cta');
    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', () => glassCursor!.classList.add('hovered'));
      el.addEventListener('mouseleave', () => glassCursor!.classList.remove('hovered'));
    });
  }

  // ---- Hero Glitters ----
  const glitterContainer = document.getElementById('hero-glitters');
  if (glitterContainer) {
    const GLITTER_COLORS = ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#ffffff'];

    function spawnGlitter() {
      const el = document.createElement('div');
      el.className = 'glitter';
      const size = 2 + Math.random() * 5;
      const left = Math.random() * 100;
      const dur = 2.5 + Math.random() * 3;
      const color = GLITTER_COLORS[Math.floor(Math.random() * GLITTER_COLORS.length)];
      const topStart = Math.random() * 95; // spawn across entire viewport height

      el.style.cssText = `
        width:${size}px;height:${size}px;
        left:${left}%;top:${topStart}%;
        background:${color};
        box-shadow:0 0 ${size * 2}px ${color};
        animation-name:glitterFloat;
        animation-duration:${dur}s;
        animation-timing-function:ease-out;
        animation-fill-mode:forwards;
        opacity:0;
      `;
      glitterContainer.appendChild(el);
      setTimeout(() => el.remove(), dur * 1000 + 200);
    }

    // Spawn continuously
    setInterval(spawnGlitter, 280);
    // Initial burst
    for (let i = 0; i < 12; i++) {
      setTimeout(spawnGlitter, i * 60);
    }
  }

} // end initVanillaJS
