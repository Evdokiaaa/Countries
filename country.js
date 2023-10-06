const countryName = new URLSearchParams(location.search).get("name");

const flag = document.querySelector(".country__flag");
const name = document.querySelector(".country__right-name");
const nativeName = document.querySelector(".native__name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const capital = document.querySelector(".capital");
const subRegion = document.querySelector(".sub__region");
const domain = document.querySelector(".domain");
const curriencies = document.querySelector(".curriencies");
const languages = document.querySelector(".languages");

const fetching = async () => {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
  );
  return await response.json();
};

async function createCountryInfo() {
  let [country] = await fetching();
  console.log(country);
  flag.src = country.flags.png;
  flag.alt = country.name;
  name.textContent = country.name.common;
  if (country.name.nativeName) {
    nativeName.textContent = Object.values(country.name.nativeName)[0].common;
  } else country.name.common;
  population.textContent = country.population.toLocaleString();
  region.textContent = country.region;
  capital.textContent = country.capital
    ? country.capital
    : "There is no capital";
  subRegion.textContent = country.subregion
    ? country.subregion
    : "There is no sub region";
  domain.textContent = country.tld.join(",");
  curriencies.textContent = country.currencies
    ? Object.values(country.currencies).map((item) => item.name)
    : "There no official currencies";
  languages.textContent = country.languages
    ? Object.values(country.languages).join(",")
    : "-";
}
createCountryInfo();
//TODO Сдераем границы , добавим лоадеры  + анимации. Возможно адаптив
