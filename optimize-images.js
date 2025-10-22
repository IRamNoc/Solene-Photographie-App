#!/usr/bin/env node

/**
 * Script d'optimisation des images pour Solène Photographie
 * Compresse automatiquement les images PNG lourdes
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const IMAGES_DIR = './public/images';
const OPTIMIZED_DIR = './public/images-optimized';
const MAX_SIZE_MB = 1; // Taille max en MB
const QUALITY = 85; // Qualité de compression (0-100)

// Créer le dossier optimisé s'il n'existe pas
if (!existsSync(OPTIMIZED_DIR)) {
  mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

function getFileSizeMB(filePath) {
  const stats = statSync(filePath);
  return stats.size / (1024 * 1024);
}

function optimizeImage(inputPath, outputPath) {
  try {
    console.log(`🔄 Optimisation: ${inputPath}`);
    
    const sizeBefore = getFileSizeMB(inputPath);
    
    // Utiliser ImageMagick pour optimiser (si disponible)
    try {
      execSync(`magick "${inputPath}" -quality ${QUALITY} -strip -resize 1920x1080> "${outputPath}"`, { stdio: 'pipe' });
    } catch (magickError) {
      // Fallback: copier le fichier si ImageMagick n'est pas disponible
      console.log('⚠️  ImageMagick non disponible, copie du fichier original');
      execSync(`cp "${inputPath}" "${outputPath}"`);
      return;
    }
    
    if (existsSync(outputPath)) {
      const sizeAfter = getFileSizeMB(outputPath);
      const reduction = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);
      console.log(`✅ ${inputPath}: ${sizeBefore.toFixed(1)}MB → ${sizeAfter.toFixed(1)}MB (-${reduction}%)`);
    }
  } catch (error) {
    console.error(`❌ Erreur lors de l'optimisation de ${inputPath}:`, error.message);
  }
}

function processDirectory(dir, outputDir) {
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const outputPath = join(outputDir, item);
    
    if (statSync(fullPath).isDirectory()) {
      // Créer le dossier de sortie
      if (!existsSync(outputPath)) {
        mkdirSync(outputPath, { recursive: true });
      }
      processDirectory(fullPath, outputPath);
    } else if (['.png', '.jpg', '.jpeg'].includes(extname(item).toLowerCase())) {
      const sizeMB = getFileSizeMB(fullPath);
      
      if (sizeMB > MAX_SIZE_MB) {
        optimizeImage(fullPath, outputPath);
      } else {
        // Copier les petites images sans modification
        execSync(`cp "${fullPath}" "${outputPath}"`);
        console.log(`📋 Copié: ${item} (${sizeMB.toFixed(1)}MB - déjà optimisé)`);
      }
    } else {
      // Copier les autres fichiers
      execSync(`cp "${fullPath}" "${outputPath}"`);
    }
  }
}

console.log('🚀 Début de l\'optimisation des images...\n');
processDirectory(IMAGES_DIR, OPTIMIZED_DIR);
console.log('\n✨ Optimisation terminée !');
console.log(`📁 Images optimisées disponibles dans: ${OPTIMIZED_DIR}`);
console.log('\n💡 Pour utiliser les images optimisées:');
console.log('1. Sauvegardez le dossier images actuel: mv public/images public/images-backup');
console.log('2. Remplacez par les images optimisées: mv public/images-optimized public/images');