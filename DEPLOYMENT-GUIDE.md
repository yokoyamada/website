# Guide de Déploiement - Site Web Yoko Yamada

## Prérequis
- Compte Hostinger actif
- Domaine yokoyamada.com configuré chez Hostinger
- Plan d'hébergement web (partagé recommandé pour site statique)

## Étape 1: Préparation des fichiers

Tous les fichiers nécessaires sont dans ce dossier :
- `index.html` - Page principale
- `styles.css` - Styles CSS
- `script.js` - JavaScript
- Images (JPG, PNG, WebP) - Assets du site

## Étape 2: Connexion au panneau Hostinger

1. Connectez-vous à votre compte Hostinger : https://www.hostinger.fr/
2. Accédez au panneau de contrôle hPanel

## Étape 3: Configuration du domaine

1. Dans hPanel, allez dans "Domaines" > "Domaines"
2. Assurez-vous que yokoyamada.com pointe vers votre hébergement
3. Vérifiez les DNS si nécessaire

## Étape 4: Upload des fichiers via FTP

### Option A: File Manager (Recommandé)
1. Dans hPanel, allez dans "Fichiers" > "Gestionnaire de fichiers"
2. Naviguez vers le dossier `public_html` (ou le dossier racine de votre domaine)
3. Upload tous les fichiers du projet :
   - index.html
   - styles.css
   - script.js
   - Tous les fichiers image

### Option B: FTP Client
1. Dans hPanel, allez dans "Fichiers" > "Accès FTP"
2. Notez les informations FTP :
   - Hôte: ftp.yokoyamada.com ou votre domaine
   - Utilisateur: votre nom d'utilisateur FTP
   - Mot de passe: votre mot de passe FTP
   - Port: 21
3. Utilisez un client FTP (FileZilla recommandé) pour uploader les fichiers

## Étape 5: Configuration HTTPS

Hostinger offre Let's Encrypt SSL gratuit :

1. Dans hPanel, allez dans "Sécurité" > "SSL"
2. Cliquez sur "SSL gratuit"
3. Sélectionnez yokoyamada.com
4. Cliquez sur "Installer"
5. Attendez la validation (peut prendre quelques minutes)

## Étape 6: Configuration du site par défaut

Si nécessaire, configurez le domaine pour pointer vers le bon dossier :
1. Dans hPanel, allez dans "Domaines" > "Domaines"
2. Sélectionnez yokoyamada.com
3. Assurez-vous que le "Dossier racine" pointe vers `public_html`

## Étape 7: Test et vérification

1. Visitez https://yokoyamada.com
2. Vérifiez que :
   - Le site se charge correctement
   - HTTPS fonctionne (cadenas vert)
   - Toutes les images s'affichent
   - Les vidéos YouTube fonctionnent
   - La navigation mobile fonctionne
   - Les liens sociaux fonctionnent

## Dépannage

### Le site ne se charge pas
- Vérifiez que index.html est dans le dossier racine
- Vérifiez les permissions des fichiers (devraient être 644 pour fichiers, 755 pour dossiers)

### HTTPS ne fonctionne pas
- Attendez 24h pour la propagation DNS
- Vérifiez dans hPanel > Sécurité > SSL que le certificat est actif

### Images ne s'affichent pas
- Vérifiez que tous les fichiers image ont été uploadés
- Vérifiez les chemins dans le HTML (devraient être relatifs)

## Support Hostinger
- Centre d'aide: https://support.hostinger.fr/
- Chat en direct disponible 24/7

---
Site déployé avec succès le: [Date]
Testé sur: [Navigateurs/Appareils]