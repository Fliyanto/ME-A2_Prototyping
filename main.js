document.addEventListener("DOMContentLoaded", () => {
  const zoomableImages = document.querySelectorAll(".zoomable-image");

  if (!zoomableImages.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.setAttribute("aria-hidden", "true");

  lightbox.innerHTML = `
    <div class="image-lightbox-inner">
      <button class="image-lightbox-close" type="button" aria-label="Close enlarged image">✕</button>
      <img src="" alt="" />
    </div>
  `;

  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector(".image-lightbox-close");

  function openLightbox(image) {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || "Expanded screenshot";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    document.body.style.overflow = "";
  }

  zoomableImages.forEach((image) => {
    image.addEventListener("click", () => {
      openLightbox(image);
    });

    image.setAttribute("tabindex", "0");

    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
});
