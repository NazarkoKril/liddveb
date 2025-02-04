// Burger Toggle
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger?.addEventListener("click", () => {
  menu?.classList.toggle("active");
  burger?.classList.toggle("open");
  const disableScroll = menu?.classList.contains("active");
  document.body.classList.toggle("no-scroll", disableScroll);
  document.documentElement.classList.toggle("no-scroll", disableScroll);
});


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
//modal--
const modalMain = document.getElementById("modal_main1");
const modalSuccess = document.getElementById("modal_main2");
const closeModalButton = document.getElementById("closeModal");
const form = document.getElementById("form_main_big");
const submitButton = document.getElementById("form_main_submit");
const successButton = document.getElementById("contact_button");
const openModalButtons = document.querySelectorAll(".form_main");
let modalTransitioning = false;

const updateScrollLock = () => {
  const isLocked =
    modalMain.classList.contains("active") ||
    modalSuccess.classList.contains("active") ||
    modalTransitioning;
  if (isLocked) {
    document.body.classList.add("no-scroll");
    document.documentElement.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
    document.documentElement.classList.remove("no-scroll");
  }
};

const closeModalFunction = modal => {
  if (!modal) return;
  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
    updateScrollLock();
  }, 350);
};

const openModal = modal => {
  if (!modal) return;
  modal.style.display = "flex";
  requestAnimationFrame(() => {
    modal.classList.add("active");
    updateScrollLock();
  });
};

openModalButtons.forEach(button => {
  button.addEventListener("click", e => {
    e.stopPropagation();
    openModal(modalMain);
  });
});

closeModal.addEventListener("click", e => {
  e.stopPropagation();
  e.preventDefault();
  closeModalFunction(modalMain);
});

modalMain.addEventListener("click", e => {
  if (e.target === modalMain) {
    closeModalFunction(modalMain);
  }
});

modalSuccess.addEventListener("click", e => {
  if (e.target === modalSuccess) {
    closeModalFunction(modalSuccess);
  }
});

submitButton.addEventListener("click", e => {
  e.preventDefault();
  e.stopPropagation();
  modalTransitioning = true;
  closeModalFunction(modalMain);
  setTimeout(() => {
    openModal(modalSuccess);
    modalTransitioning = false;
  }, 400);
});

successButton.addEventListener("click", e => {
  e.stopPropagation();
  closeModalFunction(modalSuccess);
});

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
document.querySelector(".select-box").addEventListener("click", function () {
  const dropdown = this.closest(".select-wrapper");
  dropdown.classList.toggle("active");
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

if (header) {
  window.addEventListener("scroll", () => {
    const currentScrollPosition = window.pageYOffset;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (currentScrollPosition > lastScrollPosition) {
          header.classList.add("hidden");
        } else {
          header.classList.remove("hidden");
        }
        lastScrollPosition = currentScrollPosition;
        ticking = false;
      });

      ticking = true;
    }
  });
}
