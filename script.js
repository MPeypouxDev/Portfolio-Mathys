document.addEventListener("DOMContentLoaded", function () {
  console.log("Portfolio JavaScript chargé !");

  // Initialiser la navigation
  initSmoothScroll();

  // Initialiser le bouton principal
  initMainButton();
  // Initialiser le footer
  initFooter();
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

      // Afficher le formulaire de contact
      showContactForm();
    });
  }
}

function showContactForm() {
  const modal = document.createElement("div");
  modal.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  `;

  modal.innerHTML = `
  <div style="
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: var(--border-glass);
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  ">
  </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; color: var(--text-secondary); margin-bottom: 0.5rem;">Email *</label>
                    <input type="email" name="email" required style="
                        width: 100%;
                        padding: 0.75rem;
                        background: var(--glass-bg);
                        border: var(--border-glass);
                        border-radius: 8px;
                        color: var(--text-primary);
                        font-family: inherit;
                    ">
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; color: var(--text-secondary); margin-bottom: 0.5rem;">Sujet</label>
                    <input type="text" name="subject" style="
                        width: 100%;
                        padding: 0.75rem;
                        background: var(--glass-bg);
                        border: var(--border-glass);
                        border-radius: 8px;
                        color: var(--text-primary);
                        font-family: inherit;
                    ">
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; color: var(--text-secondary); margin-bottom: 0.5rem;">Message *</label>
                    <textarea name="message" rows="5" required style="
                        width: 100%;
                        padding: 0.75rem;
                        background: var(--glass-bg);
                        border: var(--border-glass);
                        border-radius: 8px;
                        color: var(--text-primary);
                        font-family: inherit;
                        resize: vertical;
                    "></textarea>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button type="submit" style="
                        padding: 0.75rem 1.5rem;
                        background: var(--gradient-1);
                        border: var(--border-glass);
                        border-radius: 8px;
                        color: white;
                        cursor: pointer;
                        font-weight: 600;
                    ">Envoyer</button>
                    <button type="button" id="cancelForm" style="
                        padding: 0.75rem 1.5rem;
                        background: var(--glass-bg);
                        border: var(--border-glass);
                        border-radius: 8px;
                        color: var(--text-secondary);
                        cursor: pointer;
                    ">Annuler</button>
                </div>
            </form>
        </div>
  `;

  document.body.appendChild(modal);

  // Fermeture
  const closeModal = () => {
    document.body.removeChild(modal);
  };

  modal.querySelector('#closeModal').addEventListener('click', closeModal);
  modal.querySelector('#cancelForm').addEventListener('click', closeModal);

  // Fermeture en cliquant à l'extérieur
  modal.addEventListener('click', (e) => {
    if (e.target ===  modal) closeModal();
  });

  // Gestion du formulaire
  modal.querySelector('#contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    alert('Message envoyé avec succès !')

    closeModal();
  });
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
