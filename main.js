const container = document.querySelector(".countries__container");
const menuItems = document.querySelector(".filters__select-menu");
const menuBtn = document.querySelector(".filters__select-btn");
async function getData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    console.log("Error:", e);
    return null;
  }
}
async function getCountryInfo() {
  const data = await getData("data.json");
  for (const country of data) {
    createCountryBlock(country);
  }
}

function createCountryBlock(country) {
  const div = document.createElement("div");
  div.className = "country";
  const countriesInfo = document.createElement("div");
  countriesInfo.className = "countries__info";
  const flag = document.createElement("img");
  flag.src = country.flag;
  flag.className = "country__image";
  const imageLink = document.createElement("a");
  imageLink.className = "country__link";
  imageLink.appendChild(flag);
  div.appendChild(imageLink);
  div.appendChild(countriesInfo);
  //TODO FIX H2 TAG
  function createAndAppendElement(el, elName = "", className, text) {
    const element = document.createElement(el);
    const span = document.createElement("span");
    element.className = className;
    element.textContent = elName;
    span.textContent = text;
    element.appendChild(span);
    countriesInfo.appendChild(element);
  }
  createAndAppendElement("h2", null, "country__title", country.name);
  createAndAppendElement(
    "p",
    "Population: ",
    "country__population",
    country.population
  );
  createAndAppendElement("p", "Region: ", "country__region", country.region);
  createAndAppendElement("p", "Capital: ", "country__capital", country.capital);

  container.appendChild(div);
}
menuBtn.addEventListener("click", () => {
  toggleMenu();
});
function toggleMenu() {
  menuItems.classList.toggle("hidden");
}
getCountryInfo();
