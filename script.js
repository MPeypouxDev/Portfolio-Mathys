// Variables pour l'état de la musique
let musicState = "stopped";

document.addEventListener("DOMContentLoaded", function () {
  console.log("Portfolio JavaScript chargé !");

  // Initialiser les fonctionnalités
  initSmoothScroll();
  initMainButton();
  initFooter();
  initAnimations();
  initCardEffects();
  initNavBarAnimation();
  initDynamicStyles();
  initErrorHandling();
  initMusicButton();
});

// Boutons de la playlist
function initMusicButton() {
  // Créer le bouton musique
  const musicButton = document.createElement("div");
  musicButton.id = "musicButton";
  musicButton.innerHTML = "🎵";

  // Styles du bouton
  musicButton.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: var(--border-glass);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-medium);
        user-select: none;
    `;

  // Ajouter au body
  document.body.appendChild(musicButton);

  // Configuration de la playlist
  const playlistData = {
    url: "https://www.youtube.com/watch?v=sF80I-TQiW0&list=PLnYQHW31BxfUXA6rD3b6zqbhXJHSKxrgQ",
    title: "Ma Playlist de Dev 🎧",
    description: "Musique pour coder et se concentrer",
  };

  musicButton.addEventListener("click", function () {
    // Animation du bouton
    this.style.transform = "scale(0.9)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);

    if (musicState === "stopped") {
      // Première fois : ouvrir la playlist
      showMusicModal(playlistData);
      musicState = "playing";
    } else if (musicState === "playing") {
      // Musique en cours : minimiser
      const existingModal = document.querySelector("#musicModal");
      if (existingModal && existingModal.style.display !== "none") {
        minimizePlayer();
        musicState = "minimized";
      }
    } else if (musicState === "minimized") {
      // Musique minimisée : ARRÊTER complètement
      stopMusic();
      musicState = "stopped";
    }
  });

  // Animation d'entrée du bouton
  setTimeout(() => {
    musicButton.style.opacity = "0";
    musicButton.style.transform = "translateX(100px)";
    musicButton.style.transition = "all 0.5s ease";

    setTimeout(() => {
      musicButton.style.opacity = "1";
      musicButton.style.transform = "translateX(0)";
    }, 500);
  }, 2000);
}

// ===== MODAL MUSIQUE =====
function showMusicModal(playlistData) {
  const existingModal = document.querySelector("#musicModal");
  if (existingModal) {
    document.body.removeChild(existingModal);
  }

  const playlistId = extractPlaylistId(playlistData.url);

  const modal = document.createElement("div");
  modal.id = "musicModal";
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10001;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

  modal.innerHTML = `
        <div style="
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: var(--border-glass);
            border-radius: 20px;
            padding: 1.5rem;
            max-width: 800px;
            width: 95%;
            max-height: 85vh;
            text-align: center;
            transform: scale(0.8);
            transition: transform 0.3s ease;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
        ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-shrink: 0;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.5rem;">🎵</span>
                    <h3 style="color: var(--text-primary); margin: 0;">${
                      playlistData.title
                    }</h3>
                </div>
                <button id="closeMusicPlayer" style="
                    background: var(--glass-bg);
                    border: var(--border-glass);
                    color: var(--text-primary);
                    font-size: 1.2rem;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 8px;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">✕</button>
            </div>
            
            <div style="
                background: #000;
                border-radius: 12px;
                overflow: hidden;
                margin-bottom: 1rem;
                flex-shrink: 0;
            ">
                ${
                  playlistId
                    ? `<iframe 
                        width="100%" 
                        height="350" 
                        src="https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&loop=1" 
                        frameborder="0" 
                        allow="autoplay; encrypted-media" 
                        allowfullscreen
                        style="border-radius: 12px;">
                    </iframe>`
                    : `<div style="height: 350px; display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
                        <p>URL de playlist non valide</p>
                    </div>`
                }
            </div>
            
            <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; flex-shrink: 0;">
                <button id="minimizePlayer" style="
                    padding: 0.75rem 1.25rem;
                    background: var(--gradient-1);
                    border: var(--border-glass);
                    border-radius: 8px;
                    color: white;
                    cursor: pointer;
                    font-size: 0.9rem;
                    font-weight: 600;
                ">📐 Réduire</button>
                
                <button id="openInYoutube" style="
                    padding: 0.75rem 1.25rem;
                    background: var(--glass-bg);
                    border: var(--border-glass);
                    border-radius: 8px;
                    color: var(--text-secondary);
                    cursor: pointer;
                    font-size: 0.9rem;
                ">🔗 YouTube</button>
            </div>
        </div>
    `;

  document.body.appendChild(modal);

  setTimeout(() => {
    modal.style.opacity = "1";
    modal.querySelector("div").style.transform = "scale(1)";
  }, 10);


  const closeModal = () => {
    modal.style.opacity = "0";
    modal.querySelector("div").style.transform = "scale(0.8)";
    setTimeout(() => {
      if (document.body.contains(modal)) {
        document.body.removeChild(modal);
      }
      stopMusic(); // Appelle stopMusic au lieu de remettre le bouton normal
    }, 300);
  };

  modal
    .querySelector("#closeMusicPlayer")
    .addEventListener("click", closeModal);
  modal
    .querySelector("#minimizePlayer")
    .addEventListener("click", minimizePlayer);
  modal.querySelector("#openInYoutube").addEventListener("click", () => {
    window.open(playlistData.url, "_blank");
    showNotification("🔗 Ouvert sur YouTube", "info");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) minimizePlayer();
  });
}

// ===== FONCTIONS POUR GÉRER LA MUSIQUE - NOUVELLES =====
function stopMusic() {

  // Supprimer complètement le modal (et donc l'iframe YouTube)
  const existingModal = document.querySelector("#musicModal");
  if (existingModal) {
    document.body.removeChild(existingModal);
  }

  // Remettre le bouton à l'état initial
  const musicButton = document.querySelector("#musicButton");
  if (musicButton) {
    musicButton.innerHTML = "🎵";
    musicButton.style.background = "var(--glass-bg)";
    musicButton.style.animation = "none";
    musicButton.title = "Écouter de la musique";
  }

  musicState = 'stopped';
  showNotification("🔇 Musique arrêtée", "info");
}

function minimizePlayer() {
  const modal = document.querySelector("#musicModal");
  if (modal) {
    modal.style.opacity = "0";
    modal.querySelector("div").style.transform = "scale(0.8)";
    setTimeout(() => {
      modal.style.display = "none";
      const musicButton = document.querySelector("#musicButton");
      if (musicButton) {
        musicButton.innerHTML = "🎧";
        musicButton.style.background = "var(--gradient-1)";
        musicButton.style.animation = "pulse 2s infinite";
        musicButton.title = "Cliquer pour arrêter la musique";
      }

      musicState = 'minimized';
      
      showNotification(
        "🎵 Musique en arrière-plan (clic pour arrêter)",
        "info"
      );
    }, 300);
  }
}

// ===== UTILITAIRES =====
function extractPlaylistId(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("list");
  } catch (error) {
    console.error("URL de playlist invalide:", url);
    return null;
  }
}

// Vérifier au chargement
window.addEventListener("load", checkSavedPlaylist);

// Animations
function initAnimations() {
  // Observer pour les animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Eléments à animer
  const elementsToAnimate = document.querySelectorAll(
    ".skill-card, .project-card"
  );

  elementsToAnimate.forEach((element) => {
    // Etat invisible
    element.style.opacity = "0";
    element.style.transform = "translateY(50px)";
    element.style.transition = "all 0.8s ease-out";

    observer.observe(element);
  });
}

// Effets des cards
function initCardEffects() {
  // Cards statiques
  const statCards = document.querySelectorAll(
    ".first-card, .second-card, .third-card"
  );
  statCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Animation de rebond
      this.style.animation = "none";
      setTimeout(() => {
        this.style.animation = "bounce 0.6s ease";
      }, 10);
    });
  });

  // Cards de projets et de compétences
  const cards = document.querySelectorAll(".project-card, .skill-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });
}

function initNavBarAnimation() {
  const navbar = document.querySelector(".nav-bar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop =
      this.window.pageYOffset || this.document.documentElement.scrollTop;

    // Transparence marqué au scroll
    if (scrollTop > 100) {
      navbar.style.background = "rgba(15, 15, 35, 0.98)";
      navbar.style.backdropFilter = "blur(25px)";
    } else {
      navbar.style.background = "rgba(15, 15, 35, 0.95)";
      navbar.style.backdropFilter = "blur(20px)";
    }

    // Cacher ou montrer la navbar selon le scroll
    if (scrollTop > lastScrollTop && scrollTop > 300) {
      // Scroll vers le bas
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scroll vers le haut
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });
}

function initDynamicStyles() {
  // Ajout des keyframes pour les animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { 
                transform: translateY(0); 
            }
            40% { 
                transform: translateY(-10px); 
            }
            60% { 
                transform: translateY(-5px); 
            }
        }
        
        @keyframes pulse {
            0% { 
                transform: scale(1); 
            }
            50% { 
                transform: scale(1.05); 
            }
            100% { 
                transform: scale(1); 
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Animation pour le status dot */
        .status-dot {
            animation: pulse 2s infinite;
        }
        
        /* Amélioration des transitions */
        .nav-links a,
        .card-button,
        .cta-button,
        .social-link {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Effet de hover sur les boutons */
        button:not(.modal button):hover {
            transform: translateY(-2px);
        }
    `;

  document.head.appendChild(style);
}

function initErrorHandling() {
  // Gestion des erreurs
  window.addEventListener("error", function (e) {
    console.error("Erreur JavaScript:", e.error);
  });

  let ticking = false;

  function updateScrollEffects() {
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      this.requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  });
}

function showNotification(message, type = "info") {
  // Système de notifications simple
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: var(--border-glass);
        border-radius: 12px;
        padding: 1rem 1.5rem;
        color: var(--text-primary);
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: var(--shadow-medium);
    `;

  if (type === "success") {
    notification.style.borderLeft = "4px solid var(--accent-green)";
  } else if (type === "error") {
    notification.style.borderLeft = "4px solid var(--accent-pink)";
  } else {
    notification.style.borderLeft = "4px solid var(--accent-blue)";
  }

  document.body.appendChild(notification);

  // Animation d'entrée
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 10);

  // Animation de sortie
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

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
