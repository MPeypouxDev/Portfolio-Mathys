document.addEventListener("DOMContentLoaded", function () {
  console.log("Portfolio JavaScript chargé !");

  // Initialiser les fonctionnalités
  initSmoothScroll();
  initMainButton();
  initFooter();
  initAnimations();
  initCardEffects();
  initNavBarAnimation();
});

function initFooter() {
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", function (e) {
      e.preventDefault();

      // Animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  }
}

// Fonction de scroll
function scrollToSection(targetSection) {
  targetSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// ===== BOUTON "VOIR MES PROJETS" =====
function initMainButton() {
  const myProjectBtn = document.getElementById("myProject");

  console.log("Recherche du bouton #myProject:", myProjectBtn);

  if (myProjectBtn) {
    myProjectBtn.addEventListener("click", function () {
      console.log("Clic détecté sur le bouton !");

      // Animation du bouton (feedback visuel)
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);

      // Scroll vers la section projets
      const projectsSection = document.querySelector(".projects-content");
      console.log("Section projets trouvée:", projectsSection);

      if (projectsSection) {
        console.log("Position de la section:", projectsSection.offsetTop);
        scrollToSection(projectsSection);
        console.log("Scroll vers les projets lancé");
      } else {
        console.error("Section projets non trouvée !");
      }
    });

    console.log("Bouton principal initialisé");
  } else {
    console.error("Bouton #myProject non trouvé !");
  }
}

// Navigation
function initSmoothScroll() {
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      let targetSection;

      switch (targetId) {
        case "#home":
          targetSection = document.querySelector(".intro-content");
          break;
        case "#about":
          targetSection = document.querySelector(".about-me-content");
          break;
        case "#skills":
          targetSection = document.querySelector(".skills-content");
          break;
        case "#projects":
          targetSection = document.querySelector(".projects-content");
          break;
        case "#contact":
          targetSection = document.querySelector(".footer-portfolio");
          break;
      }

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}
