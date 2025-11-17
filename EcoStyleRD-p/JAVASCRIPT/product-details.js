document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('productModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalDesc = document.getElementById('modalDesc');
  const modalBuy = document.getElementById('modalBuy');
  const modalMore = document.getElementById('modalMore');
  const closeBtn = document.querySelector('.modal-close');

  function openModalWithCard(card) {
    const img = card.querySelector('img');
    const title = card.querySelector('h3')?.textContent || 'Producto';
    const price = card.dataset.price ? `Precio: RD$${card.dataset.price}` : (card.querySelector('p')?.textContent || '');
    const desc = card.dataset.description || card.querySelector('.long-desc')?.textContent || `Descripción detallada de ${title} no disponible.`;

    modalImg.src = img ? img.src : '';
    modalImg.alt = img ? img.alt : title;
    modalTitle.textContent = title;
    modalPrice.textContent = price;
    modalDesc.textContent = desc;

  // Configurar acciones: usar el botón principal como Cancelar (cierra el modal)
  modalBuy.textContent = 'Cancelar';
  modalBuy.onclick = closeModal;
    modalMore.href = '#';

    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Attach click to products and their buttons
  const cards = Array.from(document.querySelectorAll('.producto'));
  cards.forEach(card => {
    // If product has a button, open modal on button click
    const btn = card.querySelector('button');
    if (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModalWithCard(card);
      });
    }

    // Also allow clicking the image or title to open details
    const img = card.querySelector('img');
    if (img) img.addEventListener('click', function () { openModalWithCard(card); });
    const title = card.querySelector('h3');
    if (title) title.addEventListener('click', function () { openModalWithCard(card); });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
});