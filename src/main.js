const markers = [...document.querySelectorAll('.map-marker')];
const card = document.querySelector('#detailCard');
const toast = document.querySelector('#toast');
const map = document.querySelector('#map');
let zoom = 1;

document.querySelectorAll('[data-filter]').forEach(input => input.addEventListener('change', () => {
  markers.filter(marker => marker.dataset.type === input.dataset.filter)
    .forEach(marker => marker.hidden = !input.checked);
}));

document.querySelector('#reset').addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(input => input.checked = true);
  markers.forEach(marker => marker.hidden = false);
});

document.querySelectorAll('[data-toggle]').forEach(button => button.addEventListener('click', () => {
  const list = document.querySelector(`#${button.dataset.toggle}`);
  list.hidden = !list.hidden;
  button.querySelector('b').textContent = list.hidden ? '⌄' : '⌃';
}));

markers.forEach(marker => marker.addEventListener('click', () => {
  markers.forEach(item => item.classList.remove('selected'));
  marker.classList.add('selected');
  card.style.display = 'block';
}));

document.querySelector('#closeCard').addEventListener('click', () => card.style.display = 'none');
document.querySelector('#markFound').addEventListener('click', event => {
  event.currentTarget.innerHTML = '<span>✓</span> KEŞFEDİLDİ';
  document.querySelector('#foundCount').textContent = '5 / 12';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
});

document.querySelector('#search').addEventListener('input', event => {
  const term = event.target.value.toLocaleLowerCase('tr-TR');
  markers.forEach(marker => marker.style.opacity = !term || `${marker.dataset.type} ${marker.dataset.place || ''}`.includes(term) ? '1' : '.18');
});

function applyZoom() { map.style.transform = `scale(${zoom})`; }
document.querySelector('#zoomIn').addEventListener('click', () => { zoom = Math.min(1.35, zoom + .1); applyZoom(); });
document.querySelector('#zoomOut').addEventListener('click', () => { zoom = Math.max(.8, zoom - .1); applyZoom(); });
document.querySelector('#center').addEventListener('click', () => { zoom = 1; applyZoom(); });

const modal = document.querySelector('#modal');
document.querySelector('#playVideo').addEventListener('click', () => { modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); });
document.querySelector('#closeModal').addEventListener('click', () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); });
modal.addEventListener('click', event => { if (event.target === modal) document.querySelector('#closeModal').click(); });

document.querySelector('[data-jump="axe"]').addEventListener('click', () => {
  card.style.display = 'none';
  const target = document.querySelector('[data-place="axe"]');
  target.classList.add('selected');
  target.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 800 });
});
