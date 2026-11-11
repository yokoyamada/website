# Yoko Yamada — site officiel

Site statique (HTML/CSS/JS, sans étape de build) hébergé sur GitHub Pages : <https://yokoyamada.com>

## Organisation

| Chemin | Rôle |
| --- | --- |
| `index.html`, `styles.css`, `script.js`, images à la racine | version actuellement en ligne |
| `target/` | nouvelle version en cours de validation → <https://yokoyamada.com/target/> |
| `target/index.html` | tout le contenu (biographie, parcours, concerts, CD…) |
| `target/assets/` | `site.css` (couleurs dans `:root`), `site.js` |
| `target/img/` | photos et pochettes (WebP) |
| `robots.txt`, `sitemap.xml` | indexation par les moteurs de recherche |
| `_outils/` | scripts locaux (non publiés par GitHub Pages) |

## Travailler en local

```bash
_outils/serveur-local.sh          # puis ouvrir http://localhost:8000/target/
```

Modifier `target/index.html`, recharger la page, puis `git add`, `git commit`, `git push`.
Les blocs en pointillés « À compléter » (`class="todo"`) signalent le contenu manquant.

## Mise en ligne de la nouvelle version

Tant qu'elle est dans `target/`, la page porte une balise `noindex` : les moteurs de recherche l'ignorent.
Une fois validée :

```bash
_outils/promote.sh                # remplace la racine par target/ et retire le noindex
git add -A && git commit -m "Mise en ligne de la nouvelle version" && git push
```
