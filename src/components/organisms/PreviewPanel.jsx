import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Empty from '@/components/ui/Empty'

const PreviewPanel = ({ files, selectedFormat, estimateFileSize }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewMode, setPreviewMode] = useState('single') // 'single' or 'compare'
  const [zoomLevel, setZoomLevel] = useState(1)

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const currentFile = selectedFile || files[0]

  if (files.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6">
          Preview
        </h2>
        <Empty
          icon="Image"
          title="No Images Selected"
          description="Upload some images to see a preview here"
        />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
          Preview
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant={previewMode === 'single' ? 'primary' : 'ghost'}
            onClick={() => setPreviewMode('single')}
            className="px-3 py-1 text-sm"
          >
            Single
          </Button>
          <Button
            variant={previewMode === 'compare' ? 'primary' : 'ghost'}
            onClick={() => setPreviewMode('compare')}
            className="px-3 py-1 text-sm"
          >
            Compare
          </Button>
        </div>
      </div>

      {/* File Selector */}
      {files.length > 1 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {files.map((file) => (
              <Button
                key={file.id}
                variant={selectedFile?.id === file.id ? 'primary' : 'ghost'}
                onClick={() => setSelectedFile(file)}
                className="whitespace-nowrap text-sm"
              >
                {file.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Preview Area */}
      <div className="relative bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden" style={{ minHeight: '400px' }}>
        {previewMode === 'single' ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={currentFile.preview}
              alt={currentFile.name}
              className="max-w-full max-h-96 object-contain"
              style={{ transform: `scale(${zoomLevel})` }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Original ({currentFile.originalFormat.split('/')[1]?.toUpperCase()})
              </div>
              <img
                src={currentFile.preview}
                alt={currentFile.name}
                className="w-full h-48 object-contain bg-white dark:bg-gray-700 rounded-lg"
              />
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Converted ({selectedFormat?.extension?.toUpperCase() || 'Select Format'})
              </div>
              <div className="w-full h-48 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
                {selectedFormat ? (
                  <img
                    src={currentFile.preview}
                    alt={`${currentFile.name} preview`}
                    className="max-w-full max-h-full object-contain opacity-80"
                  />
                ) : (
                  <div className="text-gray-400 dark:text-gray-500">
                    <ApperIcon name="FileImage" className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Select a format to preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/50 rounded-lg p-2">
          <Button
            variant="ghost"
            onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
            className="p-1 text-white hover:bg-white/20"
          >
            <ApperIcon name="ZoomOut" className="w-4 h-4" />
          </Button>
          <span className="text-white text-sm px-2">
            {Math.round(zoomLevel * 100)}%
          </span>
          <Button
            variant="ghost"
            onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.25))}
            className="p-1 text-white hover:bg-white/20"
          >
            <ApperIcon name="ZoomIn" className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* File Info */}
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Original Size:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatFileSize(currentFile.size)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Format:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {currentFile.originalFormat.split('/')[1]?.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Estimated Size:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {selectedFormat ? formatFileSize(estimateFileSize(currentFile.size)) : '—'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Target Format:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {selectedFormat?.extension?.toUpperCase() || 'Not Selected'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PreviewPanel