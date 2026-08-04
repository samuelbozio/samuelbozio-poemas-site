(() => {
  const progressFill = document.getElementById('progressFill');
  const navHint = document.getElementById('navHint');

  if (!progressFill) return;

  /* ---------- barra de progresso vertical ---------- */

  let ticking = false;

  function updateProgress() {
    const doc = document.documentElement;
    const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
    const scrollTop = window.scrollY || window.pageYOffset || 0;
    const pct = maxScroll > 0
      ? Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100))
      : 0;

    progressFill.style.width = `${pct}%`;

    if (navHint) {
      navHint.classList.toggle('hide', scrollTop > 80);
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateProgress, { passive: true });

  updateProgress();

  /* ---------- botão de continuar ---------- */

  if (navHint) {
    navHint.addEventListener('click', () => {
      window.scrollBy({
        top: Math.round(window.innerHeight * 0.82),
        behavior: 'smooth'
      });
    });
  }

  /* ---------- teclado ---------- */

  window.addEventListener('keydown', (event) => {
    // Não interfere enquanto o usuário estiver digitando.
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    const step = Math.round(window.innerHeight * 0.72);

    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault();
      window.scrollBy({ top: step, behavior: 'smooth' });
    }

    if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault();
      window.scrollBy({ top: -step, behavior: 'smooth' });
    }

    if (event.key === 'Home') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (event.key === 'End') {
      event.preventDefault();
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  });

  /* ---------- cursor minimalista apenas em desktops ---------- */

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (finePointer) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    window.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }, { passive: true });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      window.requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll('a, button').forEach((element) => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
      });

      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
      });
    });
  }
})();
