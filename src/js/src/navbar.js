// Toggle menu open/close
const menuToggle = document.getElementById("menu-toggle");
const navbarMenu = document.getElementById('navbar-menu');

menuToggle.addEventListener("click", function() {
  navbarMenu.classList.toggle("navbar__menu--open");
  menuToggle.classList.toggle("navbar__menu-toggle--open");
});
