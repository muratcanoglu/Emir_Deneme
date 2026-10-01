const markers = [...document.querySelectorAll('.map-marker')];
const card = document.querySelector('#detailCard');
const toast = document.querySelector('#toast');
const map = document.querySelector('#map');
const markerMenu = document.querySelector('#markerMenu');
const hiddenList = document.querySelector('#hiddenList');
const hiddenCount = document.querySelector('#hiddenCount');
const storageKey = 'dungeon-atlas-hidden-markers';
let zoom = 1;
let activeMarker = null;
let hiddenMarkerIds = new Set(JSON.parse(localStorage.getItem(storageKey) || '[]'));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove('show'), 2200);
}

function renderHiddenMarkers() {
  hiddenMarkerIds = new Set([...hiddenMarkerIds].filter(id => markers.some(marker => marker.dataset.id === id)));
  localStorage.setItem(storageKey, JSON.stringify([...hiddenMarkerIds]));
  markers.forEach(marker => marker.classList.toggle('user-hidden', hiddenMarkerIds.has(marker.dataset.id)));
  hiddenCount.textContent = hiddenMarkerIds.size;
  hiddenList.innerHTML = '';

  if (!hiddenMarkerIds.size) {
    hiddenList.innerHTML = '<p>Henüz gizlenen işaret yok.</p>';
    return;
  }

  hiddenMarkerIds.forEach(id => {
    const marker = markers.find(item => item.dataset.id === id);
    const button = document.createElement('button');
    button.innerHTML = `<span>${marker.textContent.trim().charAt(0)}</span><em>${marker.dataset.name}</em><b>GERİ GETİR</b>`;
    button.addEventListener('click', () => {
      hiddenMarkerIds.delete(id);
      renderHiddenMarkers();
      showToast(`↻ ${marker.dataset.name} yeniden gösteriliyor`);
    });
    hiddenList.append(button);
  });
}

function closeMarkerMenu() {
  markerMenu.classList.remove('open');
  markerMenu.setAttribute('aria-hidden', 'true');
}

renderHiddenMarkers();

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

markers.forEach(marker => {
  marker.addEventListener('click', () => {
    markers.forEach(item => item.classList.remove('selected'));
    marker.classList.add('selected');
    card.style.display = 'block';
  });
  marker.addEventListener('contextmenu', event => {
    event.preventDefault();
    activeMarker = marker;
    document.querySelector('#menuMarkerName').textContent = marker.dataset.name;
    markerMenu.style.left = `${Math.min(event.clientX, window.innerWidth - 286)}px`;
    markerMenu.style.top = `${Math.min(event.clientY, window.innerHeight - 128)}px`;
    markerMenu.classList.add('open');
    markerMenu.setAttribute('aria-hidden', 'false');
  });
});

document.querySelector('#hideMarker').addEventListener('click', () => {
  if (!activeMarker) return;
  hiddenMarkerIds.add(activeMarker.dataset.id);
  activeMarker.classList.remove('selected');
  card.style.display = 'none';
  renderHiddenMarkers();
  closeMarkerMenu();
  showToast(`✓ ${activeMarker.dataset.name} gizlendi`);
});
document.addEventListener('click', event => { if (!markerMenu.contains(event.target)) closeMarkerMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMarkerMenu(); });

document.querySelector('#closeCard').addEventListener('click', () => card.style.display = 'none');
document.querySelector('#markFound').addEventListener('click', event => {
  event.currentTarget.innerHTML = '<span>✓</span> KEŞFEDİLDİ';
  document.querySelector('#foundCount').textContent = '5 / 12';
  showToast('✓ İlerlemen kaydedildi');
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
