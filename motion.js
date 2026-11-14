const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const progress = document.querySelector('.scroll-progress');
const hero = document.querySelector('.hero');
const revealItems = document.querySelectorAll(
  '.section-title, .grid article, .garden .split > *, .rental > *, .review-strip, .faq > *, .booking .split > *'
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('motion-pending');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.08 });

if (!motionPreference.matches) {
  revealItems.forEach(item => {
    if (item.getBoundingClientRect().top < innerHeight) return;
    item.classList.add('motion-item', 'motion-pending');
    revealObserver.observe(item);
  });
}

function updateScrollEffects() {
  const scrollRange = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${scrollRange > 0 ? scrollY / scrollRange : 0})`;
  const offset = motionPreference.matches ? 0 : Math.min(scrollY * .12, hero.offsetHeight * .045);
  hero.style.setProperty('--hero-offset', `${offset}px`);
}

let scrollFrame;
function scheduleScrollUpdate() {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = undefined;
    updateScrollEffects();
  });
}

addEventListener('scroll', scheduleScrollUpdate, { passive: true });
addEventListener('resize', scheduleScrollUpdate);
addEventListener('load', scheduleScrollUpdate);
motionPreference.addEventListener('change', scheduleScrollUpdate);
updateScrollEffects();
