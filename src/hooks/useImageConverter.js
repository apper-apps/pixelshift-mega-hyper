import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { formatService } from '@/services/api/formatService'
import { conversionService } from '@/services/api/conversionService'

export const useImageConverter = () => {
  const [files, setFiles] = useState([])
  const [selectedFormat, setSelectedFormat] = useState(null)
  const [isConverting, setIsConverting] = useState(false)
  const [conversionProgress, setConversionProgress] = useState(0)
  const [conversionJob, setConversionJob] = useState(null)
  const [qualitySettings, setQualitySettings] = useState({
    quality: 85,
    compression: 'medium',
    preserveMetadata: false
  })

  const addFiles = useCallback((newFiles) => {
    const validFiles = newFiles.filter(file => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        toast.error(`${file.name} is not a valid image file`)
        return false
      }
      return true
    })

    const processedFiles = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      originalFormat: file.type,
      targetFormat: selectedFormat?.mimeType || '',
      size: file.size,
      status: 'ready',
      preview: URL.createObjectURL(file),
      downloadUrl: null
    }))

    setFiles(prev => [...prev, ...processedFiles])
    
    if (validFiles.length > 0) {
      toast.success(`Added ${validFiles.length} file${validFiles.length > 1 ? 's' : ''} for conversion`)
    }
  }, [selectedFormat])

  const removeFile = useCallback((fileId) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === fileId)
      if (file?.preview) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter(f => f.id !== fileId)
    })
  }, [])

  const clearFiles = useCallback(() => {
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
    })
    setFiles([])
  }, [files])

  const updateFileFormat = useCallback((fileId, format) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId 
        ? { ...file, targetFormat: format.mimeType, status: 'ready' }
        : file
    ))
  }, [])

  const convertFiles = useCallback(async () => {
    if (files.length === 0) {
      toast.error('Please add files to convert')
      return
    }

    if (!selectedFormat) {
      toast.error('Please select a target format')
      return
    }

    setIsConverting(true)
    setConversionProgress(0)

    try {
      const job = await conversionService.startConversion(files, selectedFormat, qualitySettings)
      setConversionJob(job)

      // Simulate conversion progress
      const totalFiles = files.length
      let completedFiles = 0

      const updateProgress = () => {
        completedFiles++
        const progress = (completedFiles / totalFiles) * 100
        setConversionProgress(progress)

        // Update file status
        setFiles(prev => prev.map((file, index) => 
          index < completedFiles 
            ? { ...file, status: 'completed', downloadUrl: `#download-${file.id}` }
            : file
        ))

        if (completedFiles < totalFiles) {
          setTimeout(updateProgress, 1000 + Math.random() * 1000)
        } else {
          setIsConverting(false)
          toast.success(`Successfully converted ${totalFiles} file${totalFiles > 1 ? 's' : ''}!`)
        }
      }

      setTimeout(updateProgress, 500)

    } catch (error) {
      setIsConverting(false)
      toast.error('Conversion failed. Please try again.')
      console.error('Conversion error:', error)
    }
  }, [files, selectedFormat, qualitySettings])

  const downloadFile = useCallback((fileId) => {
    const file = files.find(f => f.id === fileId)
    if (file?.downloadUrl) {
      // In a real app, this would trigger the actual download
      toast.success(`Downloading ${file.name}`)
    }
  }, [files])

  const downloadAllFiles = useCallback(() => {
    const completedFiles = files.filter(f => f.status === 'completed')
    if (completedFiles.length > 0) {
      toast.success(`Downloading ${completedFiles.length} files as ZIP`)
    }
  }, [files])

  const estimateFileSize = useCallback((originalSize) => {
    const compressionRatio = qualitySettings.quality / 100
    const estimatedSize = originalSize * compressionRatio
    return Math.round(estimatedSize)
  }, [qualitySettings])

  return {
    files,
    selectedFormat,
    isConverting,
    conversionProgress,
    conversionJob,
    qualitySettings,
    addFiles,
    removeFile,
    clearFiles,
    setSelectedFormat,
    updateFileFormat,
    convertFiles,
    downloadFile,
    downloadAllFiles,
    setQualitySettings,
    estimateFileSize
  }
}