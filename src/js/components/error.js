// Function to show the error section and log the specific message
export function showError(message = "") {
  const errorMessage = document.getElementById('error-message');
  errorMessage.style.display = "flex";
  document.body.style.overflow = "hidden";
  console.error(message);
}