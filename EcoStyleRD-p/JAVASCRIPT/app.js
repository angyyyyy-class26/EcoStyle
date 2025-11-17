(function () {
	const searchForm = document.getElementById('searchForm');
	const qInput = document.getElementById('q');
	const categorySelect = document.getElementById('category');
	const priceRange = document.getElementById('price');
	const priceOut = document.getElementById('priceOut');
	const clearBtn = document.getElementById('clearFilters');
	const products = Array.from(document.querySelectorAll('.producto'));

	if (priceRange && priceOut) {
		priceOut.textContent = priceRange.value;
		priceRange.addEventListener('input', () => (priceOut.textContent = priceRange.value));
	}

	function normalize(text) {
		return (text || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
	}

	function applyFilters(evt) {
		if (evt) evt.preventDefault();
		const q = normalize(qInput?.value || '');
		const cat = categorySelect?.value || '';
		const maxPrice = Number(priceRange?.value || Infinity);

		products.forEach((card) => {
			const name = normalize(card.querySelector('h3')?.textContent);
			const p = Number(card.getAttribute('data-price') || '0');
			const c = card.getAttribute('data-category') || '';
			const matchesQ = q ? name.includes(q) : true;
			const matchesC = cat ? c === cat : true;
			const matchesP = isFinite(maxPrice) ? p <= maxPrice : true;
			card.style.display = matchesQ && matchesC && matchesP ? '' : 'none';
		});
	}

	searchForm?.addEventListener('submit', applyFilters);
	qInput?.addEventListener('input', applyFilters);
	categorySelect?.addEventListener('change', applyFilters);
	priceRange?.addEventListener('change', applyFilters);
	clearBtn?.addEventListener('click', () => {
		qInput.value = '';
		categorySelect.value = '';
		priceRange.value = priceRange.max;
		priceOut.textContent = priceRange.value;
		applyFilters();
	});

	// Formulario de contacto (validación básica)
	const contactForm = document.getElementById('contactForm');
	contactForm?.addEventListener('submit', function (e) {
        e.preventDefault();
        // Aquí iría la lógica del formulario de contacto
    });

    // Manejo de sesión
    function initSession() {
        const sesion = localStorage.getItem("sesion");
        const nav = document.querySelector('nav');
        
        if (nav && sesion) {
            const userData = JSON.parse(sesion);
            
            // Agregar el menú de usuario si no existe
            if (!document.querySelector('.user-menu')) {
                const userMenu = document.createElement('div');
                userMenu.className = 'user-menu';
                userMenu.style.marginLeft = 'auto';
                userMenu.innerHTML = `
                    <span style="margin-right: 10px;">Hola, ${userData.nombre}</span>
                    <button onclick="cerrarSesion()" class="btn-logout" 
                            style="padding: 5px 10px; background: #e74c3c; color: white; 
                                   border: none; border-radius: 4px; cursor: pointer;">
                        Cerrar sesión
                    </button>
                `;
                nav.appendChild(userMenu);
            }
        }
    }

    // Función global para cerrar sesión
    window.cerrarSesion = function() {
        localStorage.removeItem("sesion");
        window.location.href = "EcoStyleRD.html";
    };

    // Inicializar sesión al cargar la página
    initSession();
		e.preventDefault();
		const nombre = document.getElementById('nombre');
		const email = document.getElementById('email');
		const mensaje = document.getElementById('mensaje');
		if (!nombre.value || !email.value || !mensaje.value) {
			alert('Por favor, completa todos los campos.');
			return;
		}
		// Aquí podrías enviar los datos a un backend o a un servicio (Formspree, etc.)
		alert('¡Gracias! Tu mensaje fue enviado.');
		contactForm.reset();
	});
;


