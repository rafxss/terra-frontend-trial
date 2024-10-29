// Event to open/close the menu only if exists
export function addNavbarEventListeners() {
  const menuToggle = document.getElementById("menu-toggle");
  const navbarMenu = document.getElementById('navbar-menu');

  if (menuToggle && navbarMenu) {
    menuToggle.addEventListener("click", function() {
      navbarMenu.classList.toggle("navbar__menu--open");
      menuToggle.classList.toggle("navbar__menu-toggle--open");
    });
  };
}
