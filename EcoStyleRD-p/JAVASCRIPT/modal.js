// Función para verificar si hay una sesión activa
function checkUserSession() {
    return localStorage.getItem("sesion") !== null;
}

// Función para redirigir según el estado de la sesión
function handleDetallesClick() {
    if (checkUserSession()) {
        // Si hay sesión activa, ir directamente a productos
        window.location.href = "Productos.html";
    } else {
        // Si no hay sesión, mostrar el modal
        modal.style.display = "flex";
        modal.classList.add("show-modal");
    }
}

// Seleccionar elementos del DOM
const btnDetalles = document.getElementById("btnDetalles");
const modal = document.getElementById("modalLogin");
const btnCancelar = document.getElementById("cancelarModal");

// 🟢 ABRIR MODAL O REDIRIGIR
btnDetalles.addEventListener("click", handleDetallesClick);

// 🔴 CERRAR MODAL (botón Cancelar)
btnCancelar.addEventListener("click", () => {
  cerrarModal();
});

// ❌ Cerrar modal haciendo clic fuera de la caja
window.addEventListener("click", (e) => {
  if (e.target === modal) cerrarModal();
});

// Función para cerrar modal
function cerrarModal() {
  modal.classList.remove("show-modal");
  
  setTimeout(() => {
    modal.style.display = "none";
  }, 200); // tiempo para animación
}
