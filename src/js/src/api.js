import { getApiUrl, getStorageKey, getPostCount } from './config.js';
import { fadeOut } from './loader.js';
import { showError } from './error.js';
import { populatePage } from './populate.js';

export function initializeApp() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlApi = getApiUrl(urlParams);
  const storageKey = getStorageKey(urlParams);
  const postCount = getPostCount(urlParams);

  let data = urlParams.get('refresh') === 'true' ? null : localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : null;

  if (data) {
    populatePage(data);
    setTimeout(() => { fadeOut(document.getElementById('loader'), 300); }, 1000);
  } else {
    fetch(urlApi, {
      method: "GET",
      headers: { ...(postCount && { "X-Post-Count": postCount }) }
    })
    .then(response => {
      if (!response.ok) {
        showError();
        setTimeout(() => { fadeOut(document.getElementById('loader'), 300); }, 1000);
        throw new Error('Error API response');
      }
      return response.json();
    })
    .then(apiData => {
      if (apiData) {
        localStorage.setItem(storageKey, JSON.stringify(apiData));
        populatePage(apiData);
      }
      setTimeout(() => { fadeOut(document.getElementById('loader'), 300); }, 1000);
    })
    .catch(error => {
      showError();
      console.error('Error:', error);
      setTimeout(() => { fadeOut(document.getElementById('loader'), 300); }, 1000);
    });
  }
}
