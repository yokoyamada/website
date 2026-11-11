#!/usr/bin/env bash
# Mise en ligne de la nouvelle version : remplace la page principale par le contenu de target/.
# À lancer une fois la version /target validée. Ne fait ni commit ni push : relire `git status` avant.
set -euo pipefail
cd "$(dirname "$0")/.."

[ -f target/index.html ] || { echo "target/index.html introuvable"; exit 1; }

# Ancienne version (fichiers à la racine)
rm -f index.html styles.css script.js .htaccess ./*.jpg ./*.png ./*.webp

cp -r target/. .
rm -rf target

# La version de travail est en noindex : on retire la balise pour l'indexation
sed -i '/data-staging/d; /STAGING :/d' index.html
sed -i "s|<lastmod>.*</lastmod>|<lastmod>$(date +%F)</lastmod>|" sitemap.xml

echo "Fait. Vérifier en local (_outils/serveur-local.sh), puis commit et push."
