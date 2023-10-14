const countriesContainer = document.querySelector(".countries__container");
const filterMenu = document.querySelector(".filters__select-menu");
const filter = document.querySelector(".filters__select-btn");
const regions = document.querySelectorAll(".region__list-item");
const theme = document.querySelector(".header__theme");

document.querySelector(".lds-ring").classList.remove("hidden");

async function getData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      document.querySelector(".lds-ring").classList.add("hidden");
      return await response.json();
    }
  } catch (e) {
    console.log("Error:", e);
    document.querySelector(".lds-ring").classList.remove("hidden");
    return null;
  }
}

async function getCountryInfo() {
  const data = await getData("data.json");
  for (const country of data) {
    createCountryBlock(country); //! dont like this too mych
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
  flag.classList.add("skeleton");
  const imageLink = document.createElement("a");
  imageLink.className = "country__link";
  imageLink.href = `./pages/country.html?name=${country.name}`;
  imageLink.appendChild(flag);
  div.append(imageLink, countriesInfo);

  function createAndAppendElement({ element, elementName = "", elementClass, elementText }) {
    const elementType = document.createElement(element);
    const span = document.createElement("span");

    elementType.className = elementClass;
    elementType.classList.add("skeleton");
    elementType.textContent = elementName;
    span.textContent = elementText;
    elementType.appendChild(span);
    countriesInfo.appendChild(elementType);
  }

  createAndAppendElement({
    element: "h2",
    elementName: null,
    elementClass: "country__title",
    elementText: country.name
  });
  createAndAppendElement({
    element: "p",
    elementName: "Population: ",
    elementClass: "country__population",
    elementText: country.population
  });
  createAndAppendElement({
    element: "p",
    elementName: "Region: ",
    elementClass: "country__region",
    elementText: country.region
  });
  createAndAppendElement({
    element: "p",
    elementName: "Capital: ",
    elementClass: "country__capital",
    elementText: country.capital
  });

  countriesContainer.appendChild(div);
}

// Menu items
const toggleFilterMenu = () => {
  filterMenu.classList.toggle("hidden");
};

filter.addEventListener("click", toggleFilterMenu);
getCountryInfo();

// Dark theme
const options = {
  bottom: "64px", // default: '32px'
  right: "unset", // default: '32px'
  left: "32px", // default: 'unset'
  time: "0.1s", // default: '0.3s'
  mixColor: "#fff", // default: '#fff'
  backgroundColor: "#fff", // default: '#fff'
  buttonColorDark: "#100f2c", // default: '#100f2c'
  buttonColorLight: "#fff", // default: '#fff'
  saveInCookies: true, // default: true,
  label: "🌓", // default: ''
  autoMatchOsTheme: true // default: true
};

const darkmode = new Darkmode(options);

theme.addEventListener("click", () => {
  const [light, dark] = theme.children;
  const isActivated = darkmode.isActivated(); // false
  light.classList.toggle("hidden", !isActivated); // При первом клики добавляется классс хидден из за усл
  dark.classList.toggle("hidden", isActivated);
  darkmode.toggle();
});

// Input
const input = document.querySelector("input");
input.addEventListener("input", (e) => {
  const value = e.target.value;
  const countries = document.querySelectorAll(".country");
  countries.forEach((country) => {
    const countryTitle = country.querySelector(".country__title");
    if (countryTitle) {
      const titleText = countryTitle.textContent.toLowerCase();
      if (titleText.startsWith(value.toLowerCase())) {
        country.classList.remove("hidden");
      } else {
        country.classList.add("hidden");
      }
    }
  });
  if (value === "") {
    countries.forEach((country) => {
      country.classList.remove("hidden");
    });
  }
});

//! Filter by region

function sortRegion(region) {
  const countries = document.querySelectorAll(".country");
  countries.forEach((country) => {
    const countryRegion = country.querySelector(".country__region").textContent;
    if (!countryRegion.includes(region)) {
      country.classList.add("hidden");
    } else {
      country.classList.remove("hidden");
    }
  });
}

const filterByRegion = (menu) => {
  menu.forEach((menuItem) => {
    menuItem.addEventListener("click", () => {
      sortRegion(menuItem.textContent);
      filterMenu.classList.add("hidden");
    });
  });
};
filterByRegion(regions);
