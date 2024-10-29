import { showLoader } from './loader.js';
import { initializeApp } from './api.js';

document.addEventListener("DOMContentLoaded", () => {
  // Start the loader
  showLoader();

  // Initialize the app
  initializeApp();
});