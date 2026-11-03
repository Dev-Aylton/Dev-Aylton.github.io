const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navegacao");
const themeColor = document.querySelector('meta[name="theme-color"]');
const floatingTop = document.querySelector(".floating-top");
const statusTimers = new WeakMap();

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
function showStatus(status, message) {
  const timer = statusTimers.get(status);
  if (timer) window.clearTimeout(timer);
  status.textContent = message;
  statusTimers.set(status, window.setTimeout(() => {
    status.textContent = "";
    statusTimers.delete(status);
  }, 4000));
}

document.querySelectorAll(".action-group").forEach((group) => {
  const status = group.querySelector(".action-status");
  group.addEventListener("click", async (event) => {
    if (!(event.target instanceof Element)) return;
    const copyButton = event.target.closest(".copy-email");
    if (copyButton) {
      try {
        if (!navigator.clipboard || typeof navigator.clipboard.writeText !== "function") {
          throw new Error("Clipboard API indisponível");
        }
        await navigator.clipboard.writeText("desenvolvedor.aylton@gmail.com");
        showStatus(status, "E-mail copiado");
      } catch (error) {
        showStatus(status, "Não foi possível copiar o e-mail");
      }
      return;
    }

    const externalLink = event.target.closest('a[target="_blank"]');
    if (externalLink) {
      showStatus(status, navigator.onLine === false ? "Sem conexão" : "Abrindo…");
    }
  });
});

floatingTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
});

function updateFloatingTop() {
  floatingTop.hidden = window.scrollY < window.innerHeight;
}

window.addEventListener("scroll", updateFloatingTop, { passive: true });
window.addEventListener("resize", updateFloatingTop);
updateFloatingTop();

const sectionLinks = Array.from(navigation.querySelectorAll('a[href^="#"]'));
const observedSections = Array.from(document.querySelectorAll("main section[id]"))
  .filter((section) => sectionLinks.some((link) => link.hash === `#${section.id}`));

if ("IntersectionObserver" in window && observedSections.length > 0) {
  const visibleSections = new Map();
  const headerHeight = document.querySelector(".site-header").getBoundingClientRect().height;
  const navigationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visibleSections.set(entry.target, true);
      else visibleSections.delete(entry.target);
    });

    const activeSection = Array.from(visibleSections.entries())
      .sort((left, right) => right[0].getBoundingClientRect().top - left[0].getBoundingClientRect().top)[0];
    sectionLinks.forEach((link) => {
      if (activeSection && link.hash === `#${activeSection[0].id}`) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, {
    rootMargin: `-${headerHeight}px 0px -65% 0px`,
    threshold: [0, 0.1, 0.25, 0.5]
  });
  observedSections.forEach((section) => navigationObserver.observe(section));
}

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
