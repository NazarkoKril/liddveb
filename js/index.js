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

