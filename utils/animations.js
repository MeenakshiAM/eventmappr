const initAnimations = () => {
  // Make sure GSAP is available
  if (typeof window === 'undefined' || !window.gsap) {
    // Load GSAP dynamically if not available
    const loadGSAP = async () => {
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
      gsapScript.async = true;
      
      const scrollTriggerScript = document.createElement('script');
      scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
      scrollTriggerScript.async = true;
      
      const scrollToPluginScript = document.createElement('script');
      scrollToPluginScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js';
      scrollToPluginScript.async = true;
      
      document.body.appendChild(gsapScript);
      document.body.appendChild(scrollTriggerScript);
      document.body.appendChild(scrollToPluginScript);
      
      // Wait for scripts to load
      await new Promise(resolve => {
        gsapScript.onload = () => {
          scrollTriggerScript.onload = () => {
            scrollToPluginScript.onload = resolve;
          };
        };
      });
      
      // Initialize animations after scripts are loaded
      setupAnimations();
    };
    
    loadGSAP();
    return;
  }
  
  setupAnimations();
};

const setupAnimations = () => {
  const { gsap } = window;
  
  if (!gsap) return;
  
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Navbar animation
  gsap.from('.navbar', { opacity: 0, y: -40, duration: 1, ease: 'power3.out' });
  
  // Hero section animations
  gsap.from('.hero-title', { opacity: 0, y: 40, duration: 1, ease: 'power3.out' });
  gsap.from('.hero-subtitle', { opacity: 0, y: 40, duration: 1, delay: 0.2, ease: 'power3.out' });
  gsap.from('.hero-btn-group', { opacity: 0, y: 30, duration: 0.8, delay: 0.5, ease: 'power3.out' });
  
  // Stats counter animation
  const statCounters = document.querySelectorAll('.stat-value');
  statCounters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 1.5;

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.fromTo(counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: duration,
            ease: 'power1.out',
            snap: { innerText: 1 },
            onUpdate: function () {
              counter.innerText = Math.floor(counter.innerText).toLocaleString();
            },
            onComplete: function () {
              counter.innerText = target.toLocaleString() + '+';
            }
          });
      }
    });
  });
  
  // Hero image animations
  gsap.from('.hero-img-box', { opacity: 0, scale: 0.85, duration: 1, delay: 0.7, ease: 'power3.out' });

  // Floating icons animation
  gsap.utils.toArray('.hero-float-icon').forEach((icon, i) => {
    gsap.to(icon, {
      y: 18,
      repeat: -1,
      yoyo: true,
      duration: 2 + i,
      ease: 'sine.inOut',
      delay: i * 0.3
    });
  });

  // Feature cards animation
  gsap.utils.toArray('.feature-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      delay: i * 0.15,
      ease: 'power3.out'
    });
  });

  // How it works steps animation
  gsap.utils.toArray('.step-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      delay: i * 0.15,
      ease: 'power3.out'
    });
  });
  
  // FAQ accordion functionality
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      document.querySelectorAll('.faq-item').forEach(i => {
        if (i !== item) i.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });
};

export default initAnimations; 