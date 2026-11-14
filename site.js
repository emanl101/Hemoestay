const form = document.querySelector('#booking-form');
const suite = document.querySelector('#suite');
const arrival = document.querySelector('#arrival');
const departure = document.querySelector('#departure');
const requestedSuite = new URLSearchParams(window.location.search).get('suite');
if (Array.from(suite.options).some(option => option.value === requestedSuite)) {
  suite.value = requestedSuite;
}

function validateDates() {
  const invalid = arrival.value && departure.value && arrival.value >= departure.value;
  departure.setCustomValidity(invalid ? 'Choose a check-out date after check-in.' : '');
}

arrival.addEventListener('input', validateDates);
departure.addEventListener('input', validateDates);

form.addEventListener('submit', event => {
  event.preventDefault();
  validateDates();
  if (!form.reportValidity()) return;

  const apartment = suite.value || 'any available apartment';
  const message = `Hello Homestay Beauty Day, is ${apartment} available from ${arrival.value} to ${departure.value}? Could you confirm the rate? Thank you!`;
  const url = new URL(form.action);
  url.searchParams.set('text', message);
  window.location.assign(url);
});

const mapDialog = document.querySelector('#map-dialog');
const mapTrigger = document.querySelector('#open-maps');
const reduceMapMotion = matchMedia('(prefers-reduced-motion: reduce)');

mapTrigger.addEventListener('click', () => {
  const trigger = mapTrigger.getBoundingClientRect();
  mapDialog.showModal();
  if (reduceMapMotion.matches) return;

  const dialog = mapDialog.getBoundingClientRect();
  const offsetX = trigger.left + trigger.width / 2 - dialog.left - dialog.width / 2;
  const offsetY = trigger.top + trigger.height / 2 - dialog.top - dialog.height / 2;

  mapDialog.animate([
    {
      transform: `translate(${offsetX}px, ${offsetY}px) scale(${trigger.width / dialog.width}, ${trigger.height / dialog.height})`,
      opacity: 0.18,
    },
    { transform: 'none', opacity: 1 },
  ], { duration: 360, easing: 'cubic-bezier(.2,.8,.25,1)' });
});
mapDialog.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mapDialog.close());
});

const siteMenu = document.querySelector('.site-menu');
const menuToggle = siteMenu.querySelector('summary');

siteMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteMenu.open = false;
  });
});

document.addEventListener('click', event => {
  if (siteMenu.open && !siteMenu.contains(event.target)) siteMenu.open = false;
});

siteMenu.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !siteMenu.open) return;
  siteMenu.open = false;
  menuToggle.focus();
});
