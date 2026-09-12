/* ============================================================
   MAIN — rendering, GSAP animations, cursor, interactions
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ---------- 1. RENDER COLLECTIONS ---------- */
function productCard(p, i) {
  return `
    <div class="card" data-id="${p.id}" style="animation-delay:${0.05 + i*0.08}s">
      <div class="card-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${p.tag ? `<div class="card-badge ${p.tag === 'Sale' ? 'sale' : ''}">${p.tag}</div>` : ''}
      </div>
      <div class="card-info">
        <div class="top-row">
          <h3>${p.name}</h3>
          <div class="price">
            ₹${p.price.toLocaleString('en-IN')}
            ${p.oldPrice ? `<small>₹${p.oldPrice.toLocaleString('en-IN')}</small>` : ''}
          </div>
        </div>
        <div class="meta">
          ${p.sizes.map(s => `<span>${s}</span>`).join('')}
        </div>
        <button class="add-btn" data-id="${p.id}">Add to Cart</button>
      </div>
    </div>
  `;
}

function renderCollection(collectionName, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const items = products.filter(p => p.collection === collectionName);
  container.innerHTML = items.map(productCard).join('');
}

renderCollection('denim',  'denimGrid');
renderCollection('waffle', 'waffleGrid');
renderCollection('boxy',   'boxyGrid');

/* ---------- 2. HERO ANIMATION TIMELINE ---------- */
window.addEventListener('load', () => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.hero-title .line', {
      y: 120, opacity: 0, duration: 1.1, stagger: 0.12
    })
    .from('[data-anim="fade-up"]', {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.1
    }, '-=0.7');

  /* ---------- 3. SCROLL REVEALS ---------- */
  gsap.utils.toArray('.collection').forEach(section => {
    gsap.from(section.querySelectorAll('.card'), {
      y: 60, opacity: 0, duration: 0.8, stagger: 0.08,
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });
  });

  gsap.utils.toArray('.article-card').forEach((card, i) => {
    gsap.from(card, {
      y: 60, opacity: 0, duration: 0.8, delay: i * 0.08,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  gsap.utils.toArray('.section-head').forEach(head => {
    gsap.from(head, {
      y: 40, opacity: 0, duration: 0.9,
      scrollTrigger: { trigger: head, start: 'top 85%' }
    });
  });

  /* Story + Newsletter */
  gsap.from('.story h2, .story p, .story .section-tag', {
    y: 50, opacity: 0, duration: 1, stagger: 0.15,
    scrollTrigger: { trigger: '.story', start: 'top 70%' }
  });

  /* ---------- 4. PARALLAX BLOBS ---------- */
  const blobs = document.querySelectorAll('.hero-blob');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    blobs.forEach(b => {
      const speed = parseFloat(b.dataset.speed || 0.3);
      b.style.transform = `translateY(${y * speed}px)`;
    });
  });

  /* ---------- 5. CUSTOM CURSOR ---------- */
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  let mouseX = 0, mouseY = 0, curX = 0, curY = 0;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.15;
    curY += (mouseY - curY) * 0.15;
    cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .card, .article-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  /* ---------- 6. NAV SCROLL ---------- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ---------- 7. SMOOTH ANCHOR SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});