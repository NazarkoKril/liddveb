// Burger Toggle --------------------------
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.addEventListener("click", () => {
    menu.classList.toggle("active"); 
});

// Language Dropdown ---------------------------------
const languageButton = document.getElementById("languageButton");
const languageList = document.getElementById("languageList");
const languageText = languageButton.querySelector("p");
let selectedLanguage = "ua";

languageButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (languageList.classList.contains("open")) {
        closeDropdown();
    } else {
        openDropdown();
    }
});

function openDropdown() {
    languageList.classList.add("open");
    document.addEventListener("click", handleOutsideClick);
}

function closeDropdown() {
    languageList.classList.remove("open");
    document.removeEventListener("click", handleOutsideClick);
}

function handleOutsideClick(event) {
    if (!languageList.contains(event.target) && !languageButton.contains(event.target)) {
        closeDropdown();
    }
}

languageList.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) {
        selectedLanguage = button.dataset.lang;
        languageText.textContent = selectedLanguage.toUpperCase();
        updateSelectedLanguage();
        closeDropdown();
    }
});

function updateSelectedLanguage() {
    const buttons = languageList.querySelectorAll("button");
    buttons.forEach((button) => {
        button.classList.toggle("selected", button.dataset.lang === selectedLanguage);
    });
}

updateSelectedLanguage();




// Modal ----------------------------
const contactButton = document.getElementById("contactButton");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

contactButton.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

