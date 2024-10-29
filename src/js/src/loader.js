// Function to show a loader when startig the page
export function showLoader() {
  const loaderImage = document.querySelector('#loader img');
  setTimeout(() => { loaderImage.style.opacity = 1; }, 100);
}

// Function to replicate a fadeOut of an element
export function fadeOut(element, duration) {
  element.style.opacity = 1;
  let start = performance.now();
  function animate() {
    let elapsed = performance.now() - start;
    let progress = Math.min(elapsed / duration, 1);
    element.style.opacity = 1 - progress;
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.style.display = 'none';
    }
  }
  requestAnimationFrame(animate);
}