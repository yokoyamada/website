#!/usr/bin/env python3
"""
Script de déploiement automatique pour Hostinger
Utilise FTP pour uploader les fichiers du site web
"""

import ftplib
import os
import sys
from pathlib import Path

# Configuration FTP - À modifier avec vos informations
FTP_CONFIG = {
    'host': 'ftp.yokoyamada.com',  # ou votre domaine
    'user': 'votre_username',      # à récupérer dans hPanel
    'password': 'votre_password',  # à récupérer dans hPanel
    'remote_dir': 'public_html'    # dossier racine du site
}

# Fichiers à exclure du déploiement
EXCLUDE_FILES = {
    '.git',
    '.gitignore',
    'DEPLOYMENT-GUIDE.md',
    'deploy.py',
    'donnees scrap from internet.txt',
    'liens cd.txt',
    'mail info.txt',
    'plan.md',
    'CHANGELOG.md'
}

def upload_file(ftp, local_path, remote_path):
    """Upload un fichier via FTP"""
    try:
        with open(local_path, 'rb') as file:
            ftp.storbinary(f'STOR {remote_path}', file)
        print(f"✓ Uploadé: {remote_path}")
    except Exception as e:
        print(f"✗ Erreur upload {remote_path}: {e}")

def create_remote_dir(ftp, remote_dir):
    """Crée un dossier distant s'il n'existe pas"""
    try:
        ftp.mkd(remote_dir)
        print(f"✓ Dossier créé: {remote_dir}")
    except ftplib.error_perm:
        # Le dossier existe déjà
        pass

def deploy_to_hostinger():
    """Déploie le site sur Hostinger via FTP"""
    print("🚀 Début du déploiement sur Hostinger...")

    # Vérification de la configuration
    if FTP_CONFIG['user'] == 'votre_username':
        print("❌ Veuillez configurer vos informations FTP dans le script!")
        print("Récupérez-les dans hPanel > Fichiers > Accès FTP")
        return False

    try:
        # Connexion FTP
        print(f"📡 Connexion à {FTP_CONFIG['host']}...")
        ftp = ftplib.FTP(FTP_CONFIG['host'])
        ftp.login(FTP_CONFIG['user'], FTP_CONFIG['password'])
        ftp.cwd(FTP_CONFIG['remote_dir'])

        print("📁 Scan des fichiers locaux...")

        # Upload des fichiers
        project_root = Path('.')
        uploaded_count = 0

        for file_path in project_root.rglob('*'):
            if file_path.is_file():
                # Vérifier si le fichier doit être exclu
                if file_path.name in EXCLUDE_FILES:
                    continue

                # Chemin relatif
                relative_path = file_path.relative_to(project_root)
                remote_path = str(relative_path).replace('\\', '/')

                # Créer les dossiers parents si nécessaire
                remote_dir = os.path.dirname(remote_path)
                if remote_dir and remote_dir != '.':
                    create_remote_dir(ftp, remote_dir)
                    ftp.cwd(FTP_CONFIG['remote_dir'])  # Retour à la racine

                # Upload du fichier
                upload_file(ftp, str(file_path), remote_path)
                uploaded_count += 1

        ftp.quit()

        print(f"\n✅ Déploiement terminé! {uploaded_count} fichiers uploadés.")
        print("🌐 Testez votre site: https://yokoyamada.com")
        return True

    except Exception as e:
        print(f"❌ Erreur de déploiement: {e}")
        return False

if __name__ == "__main__":
    success = deploy_to_hostinger()
    sys.exit(0 if success else 1)