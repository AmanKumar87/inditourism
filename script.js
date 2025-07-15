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

  // 2. On-scroll reveal animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.1 }
  );
  const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
  elementsToAnimate.forEach((el) => observer.observe(el));

  // 3. "Coming Soon" Modal Logic
  const comingSoonButtons = document.querySelectorAll(".coming-soon-button");
  comingSoonButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const styleName = button.dataset.style;
      if (styleName) {
        createModal(styleName);
      }
    });
  });

  function createModal(styleName) {
    const existingModal = document.querySelector(".modal-overlay");
    if (existingModal) {
      existingModal.remove();
    }
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
    document.body.appendChild(modalOverlay);
    setTimeout(() => modalOverlay.classList.add("is-visible"), 10);
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
        modalContent.innerHTML = `<h3>Thank You!</h3><p>We've added you to our exclusive list.</p>`;
        setTimeout(closeModal, 3000);
      });
  }

  // 4. Interactive Map Tooltip Logic
  const mapDots = document.querySelectorAll(".map-dot");
  const tooltip = document.getElementById("map-tooltip");
  if (mapDots.length > 0 && tooltip) {
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
  }

  // 5. Interactive Map FILTERING Logic
  const filterContainer = document.querySelector(".map-filters");
  if (filterContainer) {
    filterContainer.addEventListener("click", function (e) {
      if (e.target.matches(".filter-btn")) {
        filterContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        const filter = e.target.dataset.filter;
        mapDots.forEach((dot) => {
          const dotCategories = dot.dataset.category;
          if (filter === "all" || dotCategories.includes(filter)) {
            dot.classList.remove("is-hidden");
          } else {
            dot.classList.add("is-hidden");
          }
        });
      }
    });
  }

  // 6. Hero Video Slideshow Logic
  const videoElement1 = document.getElementById("video-1");
  const videoElement2 = document.getElementById("video-2");
  if (videoElement1 && videoElement2) {
    const videoSources = [
      "assets/videos/1.mp4",
      "assets/videos/2.mp4",
      "assets/videos/3.mp4",
    ];
    let currentVideoIndex = 0;
    let activeVideo = videoElement1;
    let inactiveVideo = videoElement2;
    setInterval(() => {
      currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
      inactiveVideo.src = videoSources[currentVideoIndex];
      inactiveVideo.play();
      activeVideo.style.opacity = 0;
      inactiveVideo.style.opacity = 1;
      const temp = activeVideo;
      activeVideo = inactiveVideo;
      inactiveVideo = temp;
    }, 5000);
  }
});
