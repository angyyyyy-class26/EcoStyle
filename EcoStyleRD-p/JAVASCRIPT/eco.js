const buttons = document.querySelectorAll(".cat-btn");
const groups = document.querySelectorAll(".grupo-categoria");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    // Activar botón seleccionado
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Mostrar el grupo correspondiente
    const category = btn.getAttribute("data-group");
    groups.forEach(g => {
      g.classList.remove("active");
      if (g.getAttribute("data-group") === category) {
        g.classList.add("active");
      }
    });

  });
});