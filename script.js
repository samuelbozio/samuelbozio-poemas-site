(() => {
  const track = document.getElementById('track');
  const progressFill = document.getElementById('progressFill');
  const navHint = document.getElementById('navHint');

  /* ---------- roda do mouse move o scroll horizontal ---------- */
  track.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    track.scrollLeft += e.deltaY;
  }, { passive: false });

  /* ---------- arrastar com o mouse ---------- */
  let isDown = false, startX = 0, startScroll = 0;
  track.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX;
    startScroll = track.scrollLeft;
    track.style.cursor = 'grabbing';
  });
  window.addEventListener('mouseup', () => {
    isDown = false;
    track.style.cursor = '';
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    track.scrollLeft = startScroll - (e.pageX - startX);
  });

  /* ---------- setas do teclado: rolagem contínua, sem encaixe ---------- */
  window.addEventListener('keydown', (e) => {
    const step = track.clientWidth * 0.6;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      track.scrollBy({ left: step, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      track.scrollBy({ left: -step, behavior: 'smooth' });
    }
  });

  navHint.addEventListener('click', () => {
    track.scrollBy({ left: track.clientWidth * 0.6, behavior: 'smooth' });
  });

  /* ---------- barra de progresso ---------- */
  function updateProgress() {
    const max = track.scrollWidth - track.clientWidth;
    const pct = max > 0 ? (track.scrollLeft / max) * 100 : 0;
    progressFill.style.width = pct + '%';

    if (track.scrollLeft > 40) {
      navHint.classList.add('hide');
    } else {
      navHint.classList.remove('hide');
    }
  }

  track.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateProgress);
  }, { passive: true });

  updateProgress();
  window.addEventListener('resize', updateProgress);
})();

// Função ativada pelas zonas de clique (tap-prev e tap-next)
function navSlide(direction) {
    const slider = document.getElementById('slider');
    
    // Calcula a largura atual exata da tela (1 slide = 100vw)
    const slideWidth = window.innerWidth; 
    
    // Rola o slider horizontalmente
    // Se direction for -1, rola para a esquerda. Se for 1, rola para a direita.
    slider.scrollBy({
        left: slideWidth * direction,
        behavior: 'smooth'
    });
}

const cursor = document.createElement("div");
cursor.className = "cursor";
document.body.appendChild(cursor);

window.addEventListener("mousemove",(e)=>{
    cursor.style.left = e.clientX+"px";
    cursor.style.top = e.clientY+"px";
});

document.querySelectorAll("a,button").forEach(el=>{
    el.addEventListener("mouseenter",()=>cursor.classList.add("active"));
    el.addEventListener("mouseleave",()=>cursor.classList.remove("active"));
});

const isMobile = window.matchMedia("(max-width:860px)").matches;

if(!isMobile){

    track.addEventListener('wheel',(e)=>{
        if(Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

        e.preventDefault();

        track.scrollLeft += e.deltaY;

    },{passive:false});

}