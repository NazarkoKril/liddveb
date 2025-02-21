// Burger Toggle
const toggleMenu = (burgerId, menuId) => {
  const burger = document.getElementById(burgerId);
  const menu = document.getElementById(menuId);

  if (!burger || !menu) return;

  burger.addEventListener("click", () => {
    const isActive = menu.classList.toggle("active");
    burger.classList.toggle("open", isActive);
    document.body.classList.toggle("no-scroll", isActive);
    document.documentElement.classList.toggle("no-scroll", isActive);
  });
};

toggleMenu("burger", "menu");

toggleMenu("burger_mob", "menu_mob");



// Language Dropdown
const languageButton = document.getElementById("languageButton");
const languageList = document.getElementById("languageList");
const languageText = languageButton?.querySelector("p");
let selectedLanguage = "ua";

if (languageButton && languageList) {
  languageButton.addEventListener("click", (event) => {
    event.stopPropagation();
    languageList.classList.toggle("open");
    document[
      languageList.classList.contains("open")
        ? "addEventListener"
        : "removeEventListener"
    ]("click", handleOutsideClick);
  });

  languageList.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) {
      selectedLanguage = button.dataset.lang;
      if (languageText)
        languageText.textContent = selectedLanguage.toUpperCase();
      updateSelectedLanguage();
      languageList.classList.remove("open");
      document.removeEventListener("click", handleOutsideClick);
    }
  });

  function handleOutsideClick(event) {
    if (
      !languageList.contains(event.target) &&
      !languageButton.contains(event.target)
    ) {
      languageList.classList.remove("open");
      document.removeEventListener("click", handleOutsideClick);
    }
  }

  function updateSelectedLanguage() {
    languageList.querySelectorAll("button").forEach((button) => {
      button.classList.toggle(
        "selected",
        button.dataset.lang === selectedLanguage
      );
    });
  }

  updateSelectedLanguage();
}

// select project
document.querySelectorAll(".select_work").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    button.classList.toggle("checked");
  });
});
//price
document.querySelectorAll(".select_price").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    document
      .querySelectorAll(".select_price")
      .forEach((btn) => btn.classList.remove("checked"));
    button.classList.add("checked");
  });
});
//selector
document.querySelectorAll(".select-box").forEach((selectBox) => {
  selectBox.addEventListener("click", function (e) {
    e.stopPropagation();
    const dropdown = this.closest(".select-wrapper");
    dropdown.classList.toggle("active");
  });
});

document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", function () {
    const selectBox =
      this.closest(".select-wrapper").querySelector(".selected");
    selectBox.textContent = this.textContent;
    selectBox.dataset.value = this.dataset.value;
    this.closest(".select-wrapper").classList.remove("active");
  });
});

document.addEventListener("click", function (e) {
  const isDropdown = e.target.closest(".select-wrapper");
  if (!isDropdown) {
    document.querySelectorAll(".select-wrapper.active").forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }
});
// Header Scroll Behavior
const style = document.createElement("style");
style.textContent = `
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    transition: transform 0.6s ease-in-out;
  }
  .header.hidden {
    transform: translateY(-100%);
  }
`;
document.head.appendChild(style);

let lastScrollPosition = 0;
let ticking = false;
const header = document.querySelector(".header");
const SCROLL_THRESHOLD = 40;

if (header) {
  window.addEventListener("scroll", () => {
    const currentScrollPosition = window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (currentScrollPosition <= 20) {
          header.classList.remove("hidden");
        } else if (Math.abs(currentScrollPosition - lastScrollPosition) >= SCROLL_THRESHOLD) {
          currentScrollPosition > lastScrollPosition ? header.classList.add("hidden") : header.classList.remove("hidden");
          lastScrollPosition = currentScrollPosition;
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}
