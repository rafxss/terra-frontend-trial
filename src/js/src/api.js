import { getApiUrl, getStorageKey, getPostCount } from './config.js';
import { fadeOut } from './loader.js';
import { showError } from './error.js';
import { populatePage } from './populate.js';

// Initialize the page
export function initializeApp() {

  // Add a promise to start another functions when is completed
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlApi = getApiUrl(urlParams);
    const storageKey = getStorageKey(urlParams);
    const postCount = getPostCount(urlParams);

    // If the url includes refresh=true the data is not storage in localStorage
    let data = urlParams.get('refresh') === 'true' ? null : localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : null;

    // Populate with the data in localStorage
    if (data) {
      populatePage(data);
      setTimeout(() => {
        fadeOut(document.getElementById('loader'), 300);
        resolve();
      }, 1000);
    } else {
      // Populate with API (For my personal API if the header inculdes a post_count, more posts are added)
      fetch(urlApi, {
        method: "GET",
        headers: { ...(postCount && { "X-Post-Count": postCount }) }
      })
        .then(response => {
          if (!response.ok) {
            showError();
            setTimeout(() => {
              fadeOut(document.getElementById('loader'), 300);
              reject();
            }, 1000);
            throw new Error('Error API response');
          }
          return response.json();
        })
        .then(apiData => {
          if (apiData) {
            localStorage.setItem(storageKey, JSON.stringify(apiData));
            populatePage(apiData);
          }
          setTimeout(() => {
            fadeOut(document.getElementById('loader'), 300);
            resolve();
          }, 1000);
        })
        .catch(error => {
          showError();
          console.error('Error:', error);
          setTimeout(() => {
            fadeOut(document.getElementById('loader'), 300);
            reject();
          }, 1000);
        });
    }
  });
}
