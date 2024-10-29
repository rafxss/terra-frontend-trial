// Abrir/Cerrar Menú
const menuToggle = document.getElementById("menu-toggle");
const navbarMenu = document.getElementById('navbar-menu');

// Agrega el evento de clic para alternar clases
menuToggle.addEventListener("click", function() {
  navbarMenu.classList.toggle("navbar__menu--open");
  menuToggle.classList.toggle("navbar__menu-toggle--open");
});