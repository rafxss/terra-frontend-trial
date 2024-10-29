// Function to show the error section and add a console.log with the specific message
export function showError(message = "") {
  const errorMessage = document.getElementById('error-message');
  errorMessage.style.display = "flex";
  document.body.style.overflow = "hidden";
  console.error(message);
}
