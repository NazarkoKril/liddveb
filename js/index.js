// Burger Toggle --------------------------
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.addEventListener("click", () => {
    if (!menu.classList.contains("active") && !menu.classList.contains("closing")) {
        burger.classList.add("open");
        menu.classList.remove("closing");
        menu.classList.add("active");
    } else {
        closeMenu();
    }
});

document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !burger.contains(e.target) && menu.classList.contains("active")) {
        closeMenu();
    }
});

function closeMenu() {
    burger.classList.remove("open");
    menu.classList.remove("active");
    menu.classList.add("closing");

    menu.addEventListener(
        "animationend",
        () => {
            menu.classList.remove("closing");
        },
        { once: true }
    );
}

// submenu --------------------
const submenus = document.querySelectorAll(".submenu");

submenus.forEach((submenu) => {
    const items = submenu.querySelectorAll("a");
    if (items.length > 5) {
        const seeMoreButton = document.createElement("button");
        seeMoreButton.textContent = "See More";
        seeMoreButton.classList.add("see-more");
        submenu.appendChild(seeMoreButton);

        items.forEach((item, index) => {
            if (index >= 4) {
                item.style.display = "none";
                item.style.opacity = "0";
                item.style.transition = "opacity 0.5s ease";
            }
        });

        seeMoreButton.addEventListener("click", () => {
            items.forEach((item) => {
                item.style.display = "block";
                setTimeout(() => {
                    item.style.opacity = "1";
                }, 10);
            });
            submenu.classList.add("scroll");
            submenu.classList.add("active");
            submenu.scrollTop = 0;
            seeMoreButton.style.display = "none";
        });
    }
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

