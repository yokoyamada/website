#!/usr/bin/env python3
"""
Script de vérification post-déploiement
Vérifie que le site fonctionne correctement sur Hostinger
"""

import requests
import sys
from urllib.parse import urljoin

def check_url(url, description):
    """Vérifie si une URL répond correctement"""
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            print(f"✅ {description}: OK ({response.status_code})")
            return True
        else:
            print(f"⚠️  {description}: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ {description}: Erreur - {e}")
        return False

def verify_deployment():
    """Vérifie le déploiement du site"""
    base_url = "https://yokoyamada.com"

    print("🔍 Vérification du déploiement...\n")

    checks = [
        (base_url, "Page d'accueil"),
        (f"{base_url}/styles.css", "Feuille de styles CSS"),
        (f"{base_url}/script.js", "JavaScript"),
        (f"{base_url}/portrait-1.jpg", "Image de portrait"),
        (f"{base_url}/Pagamania_cropped.jpg", "Image d'album"),
    ]

    all_passed = True
    for url, description in checks:
        if not check_url(url, description):
            all_passed = False

    print("\n" + "="*50)

    if all_passed:
        print("🎉 Toutes les vérifications sont passées!")
        print("🌐 Votre site est prêt: https://yokoyamada.com")
    else:
        print("⚠️  Certaines vérifications ont échoué.")
        print("Vérifiez les fichiers manquants dans votre hébergement Hostinger.")

    return all_passed

if __name__ == "__main__":
    success = verify_deployment()
    sys.exit(0 if success else 1)