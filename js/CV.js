//modal--
const modalMain1 = document.getElementById("modal_main3");
const modalSuccess1 = document.getElementById("modal_main2");
const closeModalButton1 = document.getElementById("closeModal3");
const form1= document.getElementById("form_main_big3");
const submitButton1 = document.getElementById("form_main_submit3");
const successButton1 = document.getElementById("contact_button");
const openModalButtons1 = document.querySelectorAll(".form_cv");
let modalTransitioning1 = false;

const updateScrollLock1 = () => {
  const isLocked =
    modalMain1.classList.contains("active") ||
    modalSuccess1.classList.contains("active") ||
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

    if (window.innerWidth <= 950) {
      window.location.href = "../page/mobileForm.html"; 
    } else {
      openModal(modalMain);
    }
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

modalSuccess1.addEventListener("click", e => {
  if (e.target === modalSuccess1) {
    closeModalFunction(modalSuccess1);
  }
});

submitButton1.addEventListener("click", e => {
  e.preventDefault();
  e.stopPropagation();
  modalTransitioning = true;
  closeModalFunction(modalMain);
  setTimeout(() => {
    openModal(modalSuccess1);
    modalTransitioning = false;
  }, 400);
});

successButton1.addEventListener("click", e => {
  e.stopPropagation();
  closeModalFunction(modalSuccess1);
});
