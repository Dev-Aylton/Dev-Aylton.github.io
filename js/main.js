const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navegacao");
const themeColor = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
  const isLight = theme === "light";
  root.dataset.theme = isLight ? "light" : "dark";
  themeButton.textContent = isLight ? "Tema escuro" : "Tema claro";
  themeButton.setAttribute("aria-pressed", String(isLight));
  themeButton.setAttribute("aria-label", isLight ? "Ativar tema escuro" : "Ativar tema claro");
  themeColor.setAttribute("content", isLight ? "#f8fafc" : "#0f1420");
}

let savedTheme = null;
try {
  savedTheme = window.localStorage.getItem("portfolio-theme");
} catch (error) {
  savedTheme = null;
}

setTheme(savedTheme === "light" ? "light" : "dark");
root.classList.add("js");

themeButton.addEventListener("click", () => {
  const theme = root.dataset.theme === "light" ? "dark" : "light";
  setTheme(theme);
  try {
    window.localStorage.setItem("portfolio-theme", theme);
  } catch (error) {
    // O tema continua funcional mesmo quando o armazenamento não está disponível.
  }
});

function closeMenu(returnFocus = false) {
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  if (returnFocus) menuButton.focus();
}

menuButton.hidden = false;
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu(true);
  }
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.add("reveal");
    observer.observe(section);
  });
  root.classList.add("has-reveal");
}
