(function () {
  "use strict";

  const welcomeOverlay = document.getElementById("welcome-overlay");
  const welcomeOpen = document.querySelector(".welcome-open");

  if (welcomeOverlay && welcomeOpen) {
    welcomeOpen.addEventListener("click", () => {
      welcomeOverlay.classList.add("is-closing");
      document.body.classList.remove("welcome-active");

      welcomeOverlay.addEventListener(
        "transitionend",
        () => {
          welcomeOverlay.remove();
        },
        { once: true }
      );
    });
  }

  const revealItems = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
})();
