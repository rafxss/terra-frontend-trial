import { showLoader } from './loader.js';
import { initializeApp } from './api.js';
import { addNavbarEventListeners } from './navbar.js';

document.addEventListener("DOMContentLoaded", () => {
  // Start the loader section
  showLoader();

  // Initialize the app, when completed, add the event listeners for the menu
  initializeApp()
    .then(() => {
      addNavbarEventListeners();
    });
});