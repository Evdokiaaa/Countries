const container = document.querySelector(".countries__container");
const menuItems = document.querySelector(".filters__select-menu");
const menuBtn = document.querySelector(".filters__select-btn");
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
  flag.classList.add("skeleton");
  const imageLink = document.createElement("a");
  imageLink.className = "country__link";
  imageLink.href = `./pages/country.html?name=${country.name}`;
  imageLink.appendChild(flag);
  div.appendChild(imageLink);
  div.appendChild(countriesInfo);

  function createAndAppendElement(el, elName = "", className, text) {
    const element = document.createElement(el);
    const span = document.createElement("span");

    element.className = className;
    element.classList.add("skeleton");
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

//Menu items
menuBtn.addEventListener("click", () => {
  toggleMenu();
});

function toggleMenu() {
  menuItems.classList.toggle("hidden");
}

getCountryInfo();
//dark theme
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
  autoMatchOsTheme: true, // default: true
};
const darkmode = new Darkmode(options);

if (darkmode.isActivated()) {
  theme.children[1].classList.remove("hidden");
  theme.children[0].classList.add("hidden");
} else {
  theme.children[1].classList.add("hidden");
  theme.children[0].classList.remove("hidden");
}

theme.addEventListener("click", () => {
  if (theme.children[1].classList.contains("hidden")) {
    theme.children[1].classList.remove("hidden");
    theme.children[0].classList.add("hidden");
  } else {
    theme.children[1].classList.add("hidden");
    theme.children[0].classList.remove("hidden");
  }

  darkmode.toggle();
});

//input
const input = document.querySelector("input");
input.addEventListener("input", (e) => {
  let value = e.target.value;
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
      menuItems.classList.add("hidden");
    });
  });
};
filterByRegion(regions);
