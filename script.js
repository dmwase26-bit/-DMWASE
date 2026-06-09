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
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 4200);
};

bookingForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const name = formData.get("name");
  const option = formData.get("bookingOption");
  const submitButton = bookingForm.querySelector('button[type="submit"]');

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  }

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    });

    if (!response.ok) throw new Error("Form submission failed");

    showToast(`Thanks ${name}! Your ${option} request has been sent.`);
    bookingForm.reset();
  } catch (error) {
    showToast("Sorry, the request could not be sent. Please try again.");
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Request booking";
    }
  }
});
