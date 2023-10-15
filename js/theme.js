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

export default function themeToggle(themeElement) {
  themeElement.addEventListener("click", () => {
    const [light, dark] = themeElement.children;
    const isActivated = darkmode.isActivated();
    light.classList.toggle("hidden", !isActivated);
    dark.classList.toggle("hidden", isActivated);
    darkmode.toggle();
  });
}
//! fix bug that doesn't save img state after refresh
