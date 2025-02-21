const buttons = document.querySelectorAll(".quote_btn");
const texts = document.querySelectorAll(".quote_text h2");
const quoteTextContainer = document.querySelector(".quote_text");

function updateQuoteContainerHeight() {
  let maxHeight = 0;
  texts.forEach(text => {
    const currentDisplay = text.style.display;
    if (getComputedStyle(text).display === "none") {
      text.style.display = "block";
    }
    const h = text.offsetHeight;
    if (h > maxHeight) maxHeight = h;
    text.style.display = currentDisplay;
  });
  quoteTextContainer.style.minHeight = maxHeight + "px";
}

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
        texts.forEach(text => (text.style.display = "none"));
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

window.addEventListener("load", updateQuoteContainerHeight);
window.addEventListener("resize", updateQuoteContainerHeight);

  
// Swiper feedback ------------
    const swiper = new Swiper(".swiper_feedback", {
      effect: "fade",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      
      slidesPerView: 1,
      spaceBetween: 30,

      speed: 1000,

    });

// FAQ ----------
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq_item");
  let activeItem = null;

  faqItems.forEach(item => {
      const content = item.querySelector(".faq_content");
      const text = content.querySelector("p");
      text.style.opacity = "0";
      
      item.addEventListener("click", function () {
          if (item === activeItem) {
              closeItem(item, content, text);
              activeItem = null;
          } else {
              if (activeItem) {
                  const activeContent = activeItem.querySelector(".faq_content");
                  const activeText = activeContent.querySelector("p");
                  closeItem(activeItem, activeContent, activeText);
              }
              openItem(item, content, text);
              activeItem = item;
          }
      });
  });

  function openItem(item, content, text) {
      item.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.opacity = "1";
      content.style.transform = "translateY(0)";
      setTimeout(() => {
          text.style.opacity = "1";
          text.style.transition = "opacity 0.35s ease-in-out";
      }, 400);
  }

  function closeItem(item, content, text) {
      text.style.opacity = "0";
      setTimeout(() => {
          content.style.maxHeight = "0px";
          content.style.opacity = "0";
          content.style.transform = "translateY(-10px)";
      }, 10);
      setTimeout(() => {
          item.classList.remove("active");
      }, 600);
  }
});
// serv animation 
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 950) return;
  const serviceItems = document.querySelectorAll(".service_item");
  const closedHeight = 200;
  serviceItems.forEach(item => {
    item.style.height = closedHeight + "px";
    const boxLeft = item.querySelector(".box_left");
    if (boxLeft) {
      boxLeft.addEventListener("click", e => {
        e.preventDefault();
        serviceItems.forEach(other => {
          if (other !== item && other.classList.contains("active")) closeService(other);
        });
        item.classList.contains("active") ? closeService(item) : openService(item);
        boxLeft.blur();
      });
    }
  });
  function openService(item) {
    item.classList.add("active");
    item.style.height = "auto";
    const fullHeight = item.scrollHeight;
    item.style.height = closedHeight + "px";
    item.offsetHeight;
    item.style.height = fullHeight + "px";
    item.addEventListener("transitionend", function handler(e) {
      if (e.propertyName === "height") {
        item.style.height = "auto";
        item.removeEventListener("transitionend", handler);
      }
    });
  }
  function closeService(item) {
    const fullHeight = item.scrollHeight;
    item.style.height = fullHeight + "px";
    item.offsetHeight;
    item.classList.remove("active");
    item.style.height = closedHeight + "px";
    item.addEventListener("transitionend", function handler(e) {
      if (e.propertyName === "height") {
        item.removeEventListener("transitionend", handler);
      }
    });
  }
});

