const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");
const modal = document.querySelector("#video-modal");
const modalTitle = document.querySelector("#modal-title");
const modalClose = document.querySelector(".modal-close");

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
