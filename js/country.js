import themeToggle from "./theme.js";
import getData from "./api.js";

const countryName = new URLSearchParams(location.search).get("name");
const theme = document.querySelector(".header__theme");

const flag = document.querySelector(".country__flag");
const name = document.querySelector(".country__right-name");
const nativeName = document.querySelector(".native__name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const capital = document.querySelector(".capital");
const subRegion = document.querySelector(".sub__region");
const domain = document.querySelector(".domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");

async function createCountryInfo() {
  const [country] = await getData(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`, true);
  flag.src = country.flags.png;
  flag.alt = country.name;
  name.textContent = country.name.common;
  nativeName.textContent = country.name.nativeName ? Object.values(country.name.nativeName)[0].common : country.name.common;
  population.textContent = country.population.toLocaleString();
  region.textContent = country.region;
  capital.textContent = country.capital
    ? country.capital
    : "There is no capital";
  subRegion.textContent = country.subregion
    ? country.subregion
    : "There is no sub region";
  domain.textContent = country.tld.join(",");
  currencies.textContent = country.currencies
    ? Object.values(country.currencies).map((item) => item.name)
    : "There no official currencies";
  languages.textContent = country.languages
    ? Object.values(country.languages).join(",")
    : "-";
}
createCountryInfo();
themeToggle(theme);
