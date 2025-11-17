// Verificar si hay una sesión activa
function checkSession() {
  const sesion = localStorage.getItem("sesion");
  const paginaActual = window.location.pathname.split('/').pop();
  
  // Si estamos en login.html o registro.html y hay sesión, redirigir a productos
  if ((paginaActual === "login.html" || paginaActual === "registro.html") && sesion) {
    window.location.href = "Productos.html";
    return;
  }
}

// Ejecutar verificación de sesión al cargar la página
document.addEventListener('DOMContentLoaded', checkSession);

// Mostrar / ocultar contraseña
function togglePass(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}


// Mostrar mensajes
function showMessage(text, success = false) {
  const msg = document.getElementById("msg");
  msg.innerHTML = text;
  msg.style.background = success ? "#d4edda" : "#f8d7da";
  msg.style.color = success ? "#155724" : "#721c24";
  msg.style.padding = "10px";
  msg.style.borderRadius = "8px";
  msg.style.marginBottom = "10px";
}

// Registro
if (document.getElementById("registroForm")) {
    
  document.getElementById("registroForm").addEventListener("submit", e => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const password = document.getElementById("password").value;
    const confirmar = document.getElementById("confirmar").value;

    if (password !== confirmar) {
      showMessage("❌ Las contraseñas no coinciden");
      return;
    }

    if (localStorage.getItem("usuario_"+email)) {
      showMessage("⚠️ Este correo ya está registrado");
      return;
    }

    const usuario = { nombre, email, telefono, password };
    
    localStorage.setItem("usuario_"+email, JSON.stringify(usuario));
    
    showMessage("✅ Registro exitoso. ¡Bienvenido!", true);
    
    // Guardar la sesión del usuario directamente después del registro
    localStorage.setItem("sesion", JSON.stringify(usuario));
    
    setTimeout(() => { window.location.href = "Productos.html"; }, 1500);
  });
}


// Login
if (document.getElementById("loginForm")) {

  document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = localStorage.getItem("usuario_"+email);

    if (!user) {
      showMessage("❌ Usuario no encontrado");
      return;
    }

    const data = JSON.parse(user);

    if (data.password !== password) {
      showMessage("❌ Contraseña incorrecta");
      return;
    }

    localStorage.setItem("sesion", JSON.stringify(data));

    showMessage("✅ Bienvenido "+data.nombre, true);

    setTimeout(() => { window.location.href = "Productos.html"; }, 1500);
  });
}
