import { showLoading, hideLoading } from "./helpers.js";

const getData = async(URL, countryContainer = false) => {
  try {
    showLoading();
    const response = await fetch(URL);
    if (response.ok) {
      hideLoading();
      if (countryContainer) document.querySelector(".country__container").classList.remove("hidden");
      return await response.json();
    }
  } catch (e) {
    console.log("Error:", e);
    alert("some error appears, please try again");
    showLoading();
  }
};

export default getData;
