# Hack Your Care — refonte du site

Version web de la proposition créative V3. Deux pages : accueil et communauté.

## Structure

- `docs/index.html` : accueil, logo animé au défilement et parcours interactif.
- `docs/communaute.html` : communauté, carte exploratoire et témoignages.
- `docs/assets/` : logos SVG, photographies et polices locales.
- CSS et JavaScript dans `docs/`, sans framework ni compilation.

## Consulter en local

Depuis le dépôt : `python -m http.server 8080 --directory docs`, puis ouvrir `http://localhost:8080`.

## GitHub Pages

La source de publication est la branche `main`, dossier `/docs`.
GitHub Pages sur un dépôt privé dépend du forfait GitHub. Le site publié peut être public même lorsque le dépôt est privé.

## Statut éditorial

Maquette de refonte à valider avant mise en production. La carte est illustrative ; elle ne représente ni densité ni adresse de membres. Les chiffres et contenus sont à réactualiser avant publication définitive. Les formulaires et liens de contact pointent vers les services existants.

Les animations peuvent être réduites via le réglage d’accessibilité du navigateur ou du système. Aucun suivi d’audience ni collecte supplémentaire n’a été ajouté.

## Crédits

Identité et photographies : Hack Your Care et ressources fournies pour la refonte.
Polices Manrope et Caveat : licences SIL Open Font License incluses dans `docs/assets/`.


## État de l’hébergement

Le dépôt est privé. Au moment de sa création, GitHub affiche « Upgrade or make this repository public to enable Pages ». Aucun hébergement public n’a été activé et la confidentialité du dépôt est conservée.
