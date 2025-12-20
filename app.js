/* app.js */

/* Page morph transition: when nav link clicked, show overlay then navigate */
document.addEventListener('DOMContentLoaded', ()=>{
  // overlay element is in each page markup with id #page-overlay
  const overlay = document.getElementById('page-overlay');
  document.querySelectorAll('a[data-morph]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      // if anchor same-page (starts with #) skip morph
      if(href && href.startsWith('#')) return;
      e.preventDefault();
      overlay.classList.add('active');
      // delay then navigate
      setTimeout(()=>{ window.location.href = href }, 650);
    });
  });

  // Lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('img');
  document.querySelectorAll('[data-light]').forEach(img=>{
    img.addEventListener('click', ()=> {
      lbImg.src = img.dataset-src || img.src;
      lb.classList.add('show');
    });
  });
  lb.addEventListener('click', ()=> lb.classList.remove('show'));

  // Booking form: fake submit and show success morph
  const bookingForm = document.getElementById('booking-form');
  const successBox = document.getElementById('success-box');
  if(bookingForm){
    bookingForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      // Gather info (optional)
      const name = bookingForm.querySelector('[name="name"]').value || "Guest";
      const service = bookingForm.querySelector('[name="service"]').value || "Service";
      // show success morph
      successBox.querySelector('.name').textContent = name;
      successBox.querySelector('.service').textContent = service;
      successBox.classList.add('show');
      // pretend send - hide after 3.2s
      setTimeout(()=> successBox.classList.remove('show'), 3200);
      bookingForm.reset();
    });
  }

  // WhatsApp quick book buttons
  document.querySelectorAll('[data-wa]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const phone = btn.dataset-wa || '2340000000000';
      const text = encodeURIComponent(btn.dataset-text || 'Hi, I want to book a session.');
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    });
  });

});







// responsive dropdown hamburger
(function(){
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav-links');

  if(!toggle || !nav) return;

  // toggle open/close
  toggle.addEventListener('click', (e)=>{
    const isOpen = nav.classList.toggle('show');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // close when clicking a link
  nav.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> {
      nav.classList.remove('show');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    });
  });

  // close when clicking outside
  document.addEventListener('click', (e)=>{
    const clickedInside = e.composedPath().includes(nav) || e.composedPath().includes(toggle);
    if(!clickedInside && nav.classList.contains('show')){
      nav.classList.remove('show');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    }
  });

  // close on Escape
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && nav.classList.contains('show')){
      nav.classList.remove('show');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    }
  });
})();





// Cinematic page loader transitions
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("page-loader");
  const overlay = document.querySelector(".loader-overlay");
  const glow = document.querySelector(".loader-glow");
  const body = document.body;

  // Show entry animation
  body.classList.add("fade-in");

  document.querySelectorAll("a").forEach(link => {
    const target = link.getAttribute("href");
    if (
      target &&
      !target.startsWith("#") &&
      !target.startsWith("mailto:") &&
      !target.startsWith("tel:")
    ) {
      link.addEventListener("click", e => {
        e.preventDefault();
        const url = link.href;

        loader.style.display = "block";
        overlay.style.animation = "loaderShow 0.6s forwards";
        glow.style.animation = "glowPulse 0.6s forwards";

        setTimeout(() => {
          window.location.href = url;
        }, 600); // delay matches animation time
      });
    }
  });

  // On page load, hide loader with smooth exit
  window.addEventListener("load", () => {
    loader.style.display = "block";
    overlay.style.animation = "loaderHide 0.6s forwards";
    glow.style.animation = "none";

    setTimeout(() => {
      loader.style.display = "none";
    }, 600);
  });
});



// Scroll-trigger animations with LOOP
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      // Remove the show class when out of view
      entry.target.classList.remove("show");
    }
  });
}, {
  threshold: 0.2 // triggers when 20% of element is visible
});

document
  .querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .zoom-in')
  .forEach((el) => observer.observe(el));

