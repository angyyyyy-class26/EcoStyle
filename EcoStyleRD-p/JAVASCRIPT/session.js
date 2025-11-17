// Función para manejar la sesión en todas las páginas
function initSessionHandler() {
    const sesion = localStorage.getItem("sesion");
    const nav = document.querySelector('nav');
    
    if (nav) {
        // Si hay una sesión activa
        if (sesion) {
            const userData = JSON.parse(sesion); 
            
            // Verificar si ya existe el menú de usuario
            if (!document.querySelector('.user-session')) {
                const sessionDiv = document.createElement('div');
                sessionDiv.className = 'user-session';
                
                // Crear el menú del usuario
                const userMenu = `
                    <span class="user-name">Hola, ${userData.nombre}</span>
                    <button onclick="cerrarSesion()" class="btn-cerrar-sesion">Cerrar sesión</button>
                `;
                
                sessionDiv.innerHTML = userMenu;
                nav.appendChild(sessionDiv);
            }
        } else {
            // Si no hay sesión, mostrar botones de login/registro
            if (!document.querySelector('.auth-buttons')) {
                const authDiv = document.createElement('div');
                authDiv.className = 'auth-buttons';
                
                const authButtons = `
                    <a href="login.html" class="btn-login">Iniciar Sesión</a>
                    <a href="registro.html" class="btn-registro">Registrarse</a>
                `;
                
                authDiv.innerHTML = authButtons;
                nav.appendChild(authDiv);
            }
        }
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("sesion");
    window.location.href = "EcoStyleRD.html";
}

// Inicializar el manejador de sesión cuando se carga la página
document.addEventListener('DOMContentLoaded', initSessionHandler);