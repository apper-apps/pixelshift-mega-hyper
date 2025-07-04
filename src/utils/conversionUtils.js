export const estimateConversionTime = (fileCount, totalSizeInMB) => {
  // Base time per file (in seconds)
  const baseTimePerFile = 1.5
  // Additional time based on file size (seconds per MB)
  const timePerMB = 0.2
  
  const totalTime = (fileCount * baseTimePerFile) + (totalSizeInMB * timePerMB)
  return Math.max(totalTime, 1) // Minimum 1 second
}

export const calculateCompressionRatio = (originalSize, quality) => {
  // Simplified compression ratio calculation
  const baseRatio = quality / 100
  const compressionFactor = 0.1 + (baseRatio * 0.9)
  return compressionFactor
}

export const getQualityRecommendation = (format, useCase = 'general') => {
  const recommendations = {
    'jpeg': {
      'web': 75,
      'print': 95,
      'general': 85
    },
    'png': {
      'web': 6, // PNG compression level 0-9
      'print': 9,
      'general': 6
    },
    'webp': {
      'web': 80,
      'print': 95,
      'general': 85
    },
    'avif': {
      'web': 50,
      'print': 70,
      'general': 60
    }
  }
  
  return recommendations[format]?.[useCase] || 85
}

export const getSupportedFormats = () => {
  return [
    'jpeg', 'jpg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff', 'ico', 'heic', 'avif'
  ]
}

export const getFormatCapabilities = (format) => {
  const capabilities = {
    'jpeg': { transparency: false, animation: false, lossy: true },
    'png': { transparency: true, animation: false, lossy: false },
    'gif': { transparency: true, animation: true, lossy: true },
    'webp': { transparency: true, animation: true, lossy: true },
    'svg': { transparency: true, animation: true, lossy: false },
    'bmp': { transparency: false, animation: false, lossy: false },
    'tiff': { transparency: true, animation: false, lossy: false },
    'ico': { transparency: true, animation: false, lossy: true },
    'heic': { transparency: false, animation: false, lossy: true },
    'avif': { transparency: true, animation: false, lossy: true }
  }
  
  return capabilities[format] || { transparency: false, animation: false, lossy: true }
}