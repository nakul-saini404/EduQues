 
    document.getElementById('chatToggleBtn').addEventListener('click', function() {
      var win = document.getElementById('chatWindow');
      win.style.display = win.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('DOMContentLoaded', () => {
      /* Navbar scroll */
      const navbar = document.getElementById('navbar');
      const backToTop = document.getElementById('backToTop');
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
        backToTop.classList.toggle('visible', window.scrollY > 400);
      }, { passive: true });

      /* Mobile menu */
      const hamburger = document.getElementById('hamburger');
      const mobileNav = document.getElementById('mobileNav');
      hamburger.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });
      mobileNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          mobileNav.classList.remove('open'); hamburger.classList.remove('open');
          document.body.style.overflow = '';
        });
      });

      /* Search */
      const searchItems = ['SAT Coaching','ACT Coaching','AP Coaching','PSAT Coaching','TMUA Coaching','UCAT Coaching','LSAT Coaching','IELTS Coaching','TOEFL Coaching','Study in USA','Study in UK','Study in Canada','Profile Building','Mock Test Prep','Scholarships','IB Programme'];
      const searchToggle = document.getElementById('searchToggle');
      const searchBox = document.getElementById('searchBox');
      const searchInput = document.getElementById('searchInput');
      const searchResults = document.getElementById('searchResults');
      searchToggle.addEventListener('click', (e) => { e.stopPropagation(); const open = searchBox.classList.toggle('open'); searchToggle.setAttribute('aria-expanded', open); if (open) searchInput.focus(); });
      document.addEventListener('click', (e) => { if (!searchBox.contains(e.target) && e.target !== searchToggle) { searchBox.classList.remove('open'); } });
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.toLowerCase().trim(); searchResults.innerHTML = '';
        if (!q) return;
        const matches = searchItems.filter(i => i.toLowerCase().includes(q));
        matches.slice(0,6).forEach(m => {
          const div = document.createElement('div'); div.className = 'search-result-item'; div.textContent = m;
          div.addEventListener('click', () => { const section = m.toLowerCase().includes('study') ? '#destinations' : m.toLowerCase().includes('mock') ? '#mock-test' : '#courses'; document.querySelector(section)?.scrollIntoView({ behavior:'smooth' }); searchBox.classList.remove('open'); searchInput.value = ''; searchResults.innerHTML = ''; });
          searchResults.appendChild(div);
        });
        if (!matches.length) { const div = document.createElement('div'); div.className = 'search-result-item'; div.style.color='var(--muted)'; div.style.cursor='default'; div.textContent='No results found'; searchResults.appendChild(div); }
      });

      /* Timeline tabs */
      document.querySelectorAll('.timeline-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.dataset.tab;
          document.querySelectorAll('.timeline-tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
          document.querySelectorAll('.timeline-content').forEach(c => c.classList.remove('active'));
          tab.classList.add('active'); tab.setAttribute('aria-selected','true');
          document.getElementById(target).classList.add('active');
          document.querySelectorAll('.timeline-detail').forEach(d => d.classList.remove('show'));
        });
      });

      /* Timeline step detail */
      document.querySelectorAll('.timeline-step').forEach(step => {
        step.addEventListener('click', () => {
          const detailId = step.dataset.detail; if (!detailId) return;
          const detail = document.getElementById(detailId); if (!detail) return;
          const isShown = detail.classList.contains('show');
          step.closest('.timeline-content').querySelectorAll('.timeline-detail').forEach(d => d.classList.remove('show'));
          if (!isShown) detail.classList.add('show');
        });
      });

      /* FAQ */
      document.querySelectorAll('.faq-item').forEach(item => {
        const q = item.querySelector('.faq-question');
        q.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-question').setAttribute('aria-expanded','false'); });
          if (!isOpen) { item.classList.add('open'); q.setAttribute('aria-expanded','true'); }
        });
        q.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); q.click(); } });
      });

      /* Counter animation */
      const counters = document.querySelectorAll('.counter');
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target; const end = parseFloat(el.dataset.target);
          const duration = 2000; const start = performance.now();
          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = String(end).includes('.') ? (end * eased).toFixed(1) : Math.floor(end * eased);
            if (progress < 1) requestAnimationFrame(animate);
            else el.textContent = String(end).includes('.') ? end.toFixed(1) : end;
          };
          requestAnimationFrame(animate); counterObserver.unobserve(el);
        });
      }, { threshold: 0.6 });
      counters.forEach(c => counterObserver.observe(c));

      /* Scroll reveal */
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target); } });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

      /* Duplicate scrollers */
      document.querySelectorAll('.achievers-track, .unis-track').forEach(track => { track.innerHTML += track.innerHTML; });

      /* Form submission */
      document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const btn = form.querySelector('button[type="submit"]'); const original = btn.textContent;
          btn.textContent = '✓ Submitted! We\'ll call you soon.'; btn.style.background = '#2a9d60';
          setTimeout(() => { btn.textContent = original; btn.style.background = ''; form.reset(); }, 4000);
        });
      });

      /* Back to top */
      backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

      /* Calc card click */
      document.querySelectorAll('.calc-card').forEach(card => {
        card.addEventListener('click', () => { window.open('https://test.eduquest.org.in/', '_blank'); });
      });
    });

    /* Navbar hide on scroll */
    window.addEventListener("scroll", function() {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 0) { navbar.classList.add("hide"); }
      else { navbar.classList.remove("hide"); }
    });
