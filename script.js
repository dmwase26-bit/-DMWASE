const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");
const modal = document.querySelector("#video-modal");
const modalTitle = document.querySelector("#modal-title");
const modalClose = document.querySelector(".modal-close");
const bookingForm = document.querySelector("#booking-form");
const toast = document.querySelector("#toast");

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll(".video-thumb").forEach((button) => {
  button.addEventListener("click", () => {
    modalTitle.textContent = button.dataset.videoTitle || "Client story";
    modal.hidden = false;
    modalClose.focus();
  });
});

const closeModal = () => {
  modal.hidden = true;
};

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeModal();
});

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 4200);
};

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const name = formData.get("name");
  const option = formData.get("bookingOption");

  showToast(`Thanks ${name}! Your ${option} request is ready to send.`);
  bookingForm.reset();
});
