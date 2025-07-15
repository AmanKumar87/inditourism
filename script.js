document.addEventListener("DOMContentLoaded", function () {
  // 1. Header background change on scroll
  const header = document.querySelector(".main-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });

  // 2. On-scroll reveal animations using Intersection Observer API
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is visible
    }
  );

  const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
  elementsToAnimate.forEach((el) => observer.observe(el));

  // 3. "Coming Soon" Modal Logic
  const comingSoonCards = document.querySelectorAll(".coming-soon");

  comingSoonCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const styleName = card.dataset.style;
      createModal(styleName);
    });
  });

  function createModal(styleName) {
    // Remove existing modal if any
    const existingModal = document.querySelector(".modal-overlay");
    if (existingModal) {
      existingModal.remove();
    }

    // Create modal structure
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    modalContent.innerHTML = `
            <button class="modal-close">&times;</button>
            <h3>${styleName} Journeys</h3>
            <p>Our bespoke ${styleName.toLowerCase()} experiences are being perfected by our curators and will be launching soon.</p>
            <p>Be the first to know. Enter your email for exclusive launch updates.</p>
            <form class="email-form">
                <input type="email" placeholder="your.email@example.com" required>
                <button type="submit" class="btn btn-primary">Notify Me</button>
            </form>
        `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Animate in
    setTimeout(() => modalOverlay.classList.add("is-visible"), 10);

    // Add event listeners for closing
    const closeModal = () => {
      modalOverlay.classList.remove("is-visible");
      modalOverlay.addEventListener(
        "transitionend",
        () => modalOverlay.remove(),
        { once: true }
      );
    };

    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    modalContent
      .querySelector(".modal-close")
      .addEventListener("click", closeModal);

    modalContent
      .querySelector(".email-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        modalContent.innerHTML = `<h3>Thank You!</h3><p>We've added you to our exclusive list. We'll be in touch soon!</p>`;
        setTimeout(closeModal, 3000);
      });
  }

  // 4. NEW: Interactive Map Tooltip Logic
  const mapDots = document.querySelectorAll(".map-dot");
  const tooltip = document.getElementById("map-tooltip");

  mapDots.forEach((dot) => {
    dot.addEventListener("mouseover", function () {
      tooltip.textContent = this.dataset.region;
      tooltip.style.left = `${this.offsetLeft}px`;
      tooltip.style.top = `${this.offsetTop}px`;
      tooltip.classList.add("is-visible");
    });

    dot.addEventListener("mouseout", function () {
      tooltip.classList.remove("is-visible");
    });
  });
});
