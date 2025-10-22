#!/bin/bash

# Script de déploiement pour Solene Photographie App
# Usage: ./deploy.sh [environment]

set -e  # Arrêter le script en cas d'erreur

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier si Docker est installé
check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker n'est pas installé. Veuillez l'installer avant de continuer."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose n'est pas installé. Veuillez l'installer avant de continuer."
        exit 1
    fi
    
    log_success "Docker et Docker Compose sont installés"
}

# Vérifier les fichiers requis
check_files() {
    local required_files=(
        "docker-compose.yml"
        "nginx.conf"
        ".env"
        "project/Dockerfile.prod"
        "project/nginx-app.conf"
        "project/backend/Dockerfile"
    )
    
    for file in "${required_files[@]}"; do
        if [[ ! -f "$file" ]]; then
            log_error "Fichier requis manquant: $file"
            exit 1
        fi
    done
    
    log_success "Tous les fichiers requis sont présents"
}

# Créer le fichier .env s'il n'existe pas
create_env_file() {
    if [[ ! -f ".env" ]]; then
        log_warning "Fichier .env non trouvé. Création à partir de .env.example"
        
        if [[ -f ".env.example" ]]; then
            cp .env.example .env
            log_info "Veuillez éditer le fichier .env avec vos valeurs de configuration"
            log_info "Puis relancez le script de déploiement"
            exit 1
        else
            log_error "Fichier .env.example non trouvé. Impossible de créer .env"
            exit 1
        fi
    fi
    
    log_success "Fichier .env trouvé"
}

# Construire les images Docker
build_images() {
    log_info "Construction des images Docker..."
    
    # Construire l'image du backend
    log_info "Construction de l'image backend..."
    docker build -t solene-backend:latest ./project/backend
    
    # Construire l'image du frontend
    log_info "Construction de l'image frontend..."
    docker build -f ./project/Dockerfile.prod -t solene-frontend:latest ./project
    
    log_success "Images Docker construites avec succès"
}

# Démarrer les services
start_services() {
    log_info "Démarrage des services..."
    
    # Arrêter les services existants
    docker-compose down --remove-orphans
    
    # Démarrer les nouveaux services
    docker-compose up -d
    
    log_success "Services démarrés"
}

# Vérifier la santé des services
check_health() {
    log_info "Vérification de la santé des services..."
    
    # Attendre que les services démarrent
    sleep 10
    
    # Vérifier le backend
    if curl -f http://localhost:3001/health &> /dev/null; then
        log_success "Backend en bonne santé"
    else
        log_error "Backend non accessible"
        return 1
    fi
    
    # Vérifier le frontend
    if curl -f http://localhost:3000 &> /dev/null; then
        log_success "Frontend en bonne santé"
    else
        log_error "Frontend non accessible"
        return 1
    fi
    
    log_success "Tous les services sont en bonne santé"
}

# Afficher les logs
show_logs() {
    log_info "Affichage des logs des services..."
    docker-compose logs --tail=50
}

# Afficher le statut des services
show_status() {
    log_info "Statut des services:"
    docker-compose ps
    
    echo ""
    log_info "Utilisation des ressources:"
    docker stats --no-stream
}

# Fonction de nettoyage
cleanup() {
    log_info "Nettoyage des images Docker inutilisées..."
    docker image prune -f
    docker volume prune -f
    log_success "Nettoyage terminé"
}

# Menu principal
show_menu() {
    echo ""
    echo "=== Script de Déploiement Solene Photographie ==="
    echo "1. Déploiement complet"
    echo "2. Construire les images seulement"
    echo "3. Démarrer les services"
    echo "4. Arrêter les services"
    echo "5. Redémarrer les services"
    echo "6. Afficher les logs"
    echo "7. Afficher le statut"
    echo "8. Vérifier la santé"
    echo "9. Nettoyage"
    echo "0. Quitter"
    echo ""
}

# Fonction principale
main() {
    log_info "Démarrage du script de déploiement Solene Photographie"
    
    # Vérifications préliminaires
    check_docker
    check_files
    create_env_file
    
    if [[ $# -eq 0 ]]; then
        # Mode interactif
        while true; do
            show_menu
            read -p "Choisissez une option: " choice
            
            case $choice in
                1)
                    build_images
                    start_services
                    check_health
                    show_status
                    ;;
                2)
                    build_images
                    ;;
                3)
                    start_services
                    ;;
                4)
                    docker-compose down
                    log_success "Services arrêtés"
                    ;;
                5)
                    docker-compose restart
                    log_success "Services redémarrés"
                    ;;
                6)
                    show_logs
                    ;;
                7)
                    show_status
                    ;;
                8)
                    check_health
                    ;;
                9)
                    cleanup
                    ;;
                0)
                    log_info "Au revoir!"
                    exit 0
                    ;;
                *)
                    log_error "Option invalide"
                    ;;
            esac
            
            echo ""
            read -p "Appuyez sur Entrée pour continuer..."
        done
    else
        # Mode automatique
        case $1 in
            "build")
                build_images
                ;;
            "deploy")
                build_images
                start_services
                check_health
                ;;
            "start")
                start_services
                ;;
            "stop")
                docker-compose down
                ;;
            "restart")
                docker-compose restart
                ;;
            "logs")
                show_logs
                ;;
            "status")
                show_status
                ;;
            "health")
                check_health
                ;;
            "clean")
                cleanup
                ;;
            *)
                log_error "Commande inconnue: $1"
                echo "Commandes disponibles: build, deploy, start, stop, restart, logs, status, health, clean"
                exit 1
                ;;
        esac
    fi
}

# Exécuter le script principal
main "$@"