const loader = document.querySelector(".lds-ring");

function showLoading() {
  loader.classList.remove("hidden");
}
function hideLoading() {
  loader.classList.add("hidden");
}
export { showLoading, hideLoading };
