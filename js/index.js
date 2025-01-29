// Burger Toggle
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
burger?.addEventListener("click", () => menu?.classList.toggle("active"));

// Language Dropdown
const languageButton = document.getElementById("languageButton");
const languageList = document.getElementById("languageList");
const languageText = languageButton?.querySelector("p");
let selectedLanguage = "ua";

if (languageButton && languageList) {
    languageButton.addEventListener("click", (event) => {
        event.stopPropagation();
        languageList.classList.toggle("open");
        document[languageList.classList.contains("open") ? "addEventListener" : "removeEventListener"]("click", handleOutsideClick);
    });

    languageList.addEventListener("click", (event) => {
        const button = event.target.closest("button");
        if (button) {
            selectedLanguage = button.dataset.lang;
            if (languageText) languageText.textContent = selectedLanguage.toUpperCase();
            updateSelectedLanguage();
            languageList.classList.remove("open");
            document.removeEventListener("click", handleOutsideClick);
        }
    });

    function handleOutsideClick(event) {
        if (!languageList.contains(event.target) && !languageButton.contains(event.target)) {
            languageList.classList.remove("open");
            document.removeEventListener("click", handleOutsideClick);
        }
    }

    function updateSelectedLanguage() {
        languageList.querySelectorAll("button").forEach((button) => {
            button.classList.toggle("selected", button.dataset.lang === selectedLanguage);
        });
    }

    updateSelectedLanguage();
}

// Modal
const contactButton = document.getElementById("contactButton");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

contactButton?.addEventListener("click", () => modal && (modal.style.display = "flex"));
closeModal?.addEventListener("click", () => modal && (modal.style.display = "none"));

// Quote Section Toggle
const buttons = document.querySelectorAll(".quote_btn");
const texts = document.querySelectorAll(".quote_text h2");

if (buttons.length && texts.length) {
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("quote_active"));
            button.classList.add("quote_active");

            texts.forEach(text => {
                text.style.opacity = "0";
                text.style.transform = "translateY(10px)";
            });

            setTimeout(() => {
                texts.forEach(text => text.style.display = "none");
                texts[index].style.display = "block";
                setTimeout(() => {
                    texts[index].style.opacity = "1";
                    texts[index].style.transform = "translateY(0)";
                }, 10);
            }, 300);
        });
    });

    buttons[0].classList.add("quote_active");
    texts.forEach((text, i) => {
        text.style.opacity = i === 0 ? "1" : "0";
        text.style.display = i === 0 ? "block" : "none";
    });
}

// Header Scroll Behavior
const style = document.createElement('style');
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
const header = document.querySelector('.header');

if (header) {
  window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (currentScrollPosition > lastScrollPosition) {
          header.classList.add('hidden');
        } else {
          header.classList.remove('hidden');
        }
        lastScrollPosition = currentScrollPosition;
        ticking = false;
      });

      ticking = true;
    }
  });
}