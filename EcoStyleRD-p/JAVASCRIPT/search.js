(function () {
    const form = document.getElementById('filters');
    const input = document.getElementById('q');
    const price = document.getElementById('price');
    const priceOut = document.getElementById('priceOut');
    const sort = document.getElementById('sort');
    const clearBtn = document.getElementById('clearFilters');
    const resultsEl = document.getElementById('resultsCount');
    const container = document.querySelector('.contenedor-productos');
    let cards = Array.from(document.querySelectorAll('.producto'));
    const categoryGroups = Array.from(document.querySelectorAll('.grupo-categoria'));
    const categoryRadios = document.querySelectorAll('input[name="categoryFilter"]');

	function showCard(card) { card.classList.remove('is-hidden'); }
	function hideCard(card) { card.classList.add('is-hidden'); }

	function normalize(text) {
		return (text || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
	}

	function updateCount(count) {
		if (!resultsEl) return;
		resultsEl.textContent = String(count);
	}

	function applySort(cardsToSort) {
		const type = sort?.value || 'relevancia';
		const sorted = [...cardsToSort];
		if (type === 'precio-asc' || type === 'precio-desc') {
			sorted.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
			if (type === 'precio-desc') sorted.reverse();
		} else if (type === 'nombre-asc' || type === 'nombre-desc') {
			sorted.sort((a, b) => normalize(a.querySelector('h3')?.textContent).localeCompare(normalize(b.querySelector('h3')?.textContent)));
			if (type === 'nombre-desc') sorted.reverse();
		}
		return sorted;
	}

	function renderOrder(sortedCards) {
		if (!container) return;
		sortedCards.forEach((c) => container.appendChild(c));
	}

    function setActiveCategory(category) {
        categoryGroups.forEach(group => {
            if (category === 'all') {
                // Si se selecciona "Todas", mostrar todos los grupos
                group.style.display = 'block';
                group.classList.add('active');
            } else {
                // Ocultar/mostrar grupos según la categoría seleccionada
                const isMatchingGroup = group.getAttribute('data-group') === category;
                group.style.display = isMatchingGroup ? 'block' : 'none';
                group.classList.toggle('active', isMatchingGroup);
            }
        });
    }

    function filter() {
        const q = normalize(input?.value || '');
        const maxP = Number(price?.value || Infinity);
        const selectedCategory = Array.from(categoryRadios).find(radio => radio.checked)?.value || 'all';
        let visible = 0;

        // Primero aplicar el filtro de categoría
        setActiveCategory(selectedCategory);

        // Luego aplicar los demás filtros
        cards.forEach((card) => {
            const name = normalize(card.querySelector('h3')?.textContent);
            const p = Number(card.dataset.price || '0');
            const cardCategory = card.dataset.category;
            
            const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;
            const matchesSearch = q ? name.includes(q) : true;
            const matchesPrice = isFinite(maxP) ? p <= maxP : true;
            
            const matches = matchesCategory && matchesSearch && matchesPrice;
            
            if (matches) {
                showCard(card);
                visible += 1;
            } else {
                hideCard(card);
            }
        });

        updateCount(visible);

        // Ordenar solo las tarjetas visibles
        const visibles = cards.filter((c) => !c.classList.contains('is-hidden'));
        const ordenados = applySort(visibles);
        renderOrder(ordenados);
    }

    // Event Listeners
    price?.addEventListener('input', () => { 
        if (priceOut) priceOut.textContent = price.value; 
    });

    [input, price, sort].forEach((el) => el?.addEventListener('change', filter));
    categoryRadios.forEach(radio => radio.addEventListener('change', filter));
    
    input?.addEventListener('input', filter);
    form?.addEventListener('submit', (e) => { 
        e.preventDefault(); 
        filter(); 
    });

    clearBtn?.addEventListener('click', () => {
        if (input) input.value = '';
        if (price) price.value = price.max || '1000';
        if (priceOut) priceOut.textContent = price?.value || '1000';
        if (sort) sort.value = 'relevancia';
        const allCategoryRadio = Array.from(categoryRadios).find(radio => radio.value === 'all');
        if (allCategoryRadio) allCategoryRadio.checked = true;
        filter();
    });

    // Filtrado inicial
    filter();
})();


