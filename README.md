Portfolio - Mathys P. | Développeur Web
Un portfolio moderne et interactif présentant mes compétences et réalisations en développement web frontend.
Description :
Portfolio personnel développé en HTML, CSS et JavaScript vanilla, mettant en avant une interface utilisateur moderne avec des effets visuels immersifs et une expérience utilisateur soignée.
Fonctionnalités :
Interface et Design

Design glassmorphism avec effets de transparence et de flou
Animations fluides et transitions CSS avancées
Responsive design adaptatif pour tous les appareils
Navigation smooth scroll entre les sections

Effets Visuels

Pluie de code animée en arrière-plan (activable/désactivable)
Effets parallax et animations au scroll
Cartes interactives avec transformations 3D
Système de notifications toast

Fonctionnalités Interactives

Lecteur de musique intégré avec playlist YouTube
Sauvegarde de l'état via localStorage
Bouton retour en haut avec animation
Effets de survol avancés sur tous les éléments

Technologies Utilisées :

HTML5 - Structure sémantique
CSS3 - Animations, glassmorphism, responsive design
JavaScript ES6+ - Interactivité et animations dynamiques
API Web - LocalStorage pour la persistance
YouTube Embed API - Intégration musicale

Structure du Projet :
portfolio/
│
├── entry.html          # Page d'accueil avec effet de pluie de code
├── portfolio.html      # Page principale du portfolio
├── style.css          # Styles globaux avec variables CSS
├── entry.js           # Scripts pour la page d'entrée
├── script.js          # Scripts pour le portfolio principal
└── README.md          # Documentation
Installation et Utilisation :
Prérequis

Navigateur web moderne supportant ES6+
Serveur web local (optionnel pour le développement)

Installation

Clonez le repository

bashgit clone https://github.com/MPeypouxDev/portfolio
cd portfolio

Ouvrez entry.html dans votre navigateur ou servez via un serveur local

bash# Avec Python
python -m http.server 8000

# Avec Node.js (live-server)
npx live-server
Déploiement
Le portfolio est optimisé pour un déploiement sur des plateformes statiques comme :

Netlify
Vercel
GitHub Pages

Sections du Portfolio :

Accueil - Présentation avec effets visuels
À propos - Informations personnelles et parcours
Compétences - Stack technique avec cartes interactives
Projets - Réalisations avec liens vers démos et code source
Contact - Informations de contact et liens sociaux

Personnalisation :
Variables CSS
Le thème peut être personnalisé via les variables CSS définies dans :root :
css:root {
  --primary-bg: rgba(15, 15, 35, 0.85);
  --accent-purple: #8b5cf6;
  --accent-blue: #06b6d4;
  /* ... autres variables */
}
Contenu

Modifiez les textes directement dans les fichiers HTML
Remplacez les images par vos propres visuels
Adaptez les liens de projets dans portfolio.html

Responsivité :
Le portfolio est entièrement responsive avec :

Breakpoints optimisés pour mobile, tablette et desktop
Navigation adaptative
Grilles flexibles avec CSS Grid et Flexbox
Images et médias adaptatifs

Fonctionnalités Avancées :
Système de Musique

Intégration YouTube avec autoplay
États persistants (lecture/pause/minimisé)
Interface modale responsive
Notifications utilisateur

Effets Visuels

Animations CSS keyframes personnalisées
Transformations 3D sur hover
Intersection Observer pour les animations au scroll
Particules de code animées

Compatibilité Navigateurs :

Chrome 70+
Firefox 65+
Safari 12+
Edge 79+

Performance :

Chargement optimisé avec images compressées
CSS et JS minifiés en production
Animations GPU pour des performances fluides
Lazy loading pour les sections non visibles

Contribution :
Les contributions sont les bienvenues ! N'hésitez pas à :

Fork le projet
Créer une branche feature (git checkout -b feature/amelioration)
Commit vos changements (git commit -m 'Ajout d'une fonctionnalité')
Push sur la branche (git push origin feature/amelioration)
Ouvrir une Pull Request

Licence :
Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
Contact :
Mathys P. - Développeur Web
📧 m.peypouxdev@gmail.com
🔗 LinkedIn
🐙 GitHub
📍 Grenoble, France
