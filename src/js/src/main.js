import { showLoader } from './loader.js';
import { initializeApp } from './api.js';
import { addNavbarEventListeners } from './navbar.js';

document.addEventListener("DOMContentLoaded", () => {
  // Start the loader section
  showLoader();

  // Initialize the app, when is completed the api add the event listeners of the menu
  initializeApp()
    .then(() => {
      addNavbarEventListeners();
    });
});
