import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import FileItem from '@/components/molecules/FileItem'

const UploadZone = ({ onFilesAdded, files, onRemoveFile, onClearFiles }) => {
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    onFilesAdded(acceptedFiles)
    setIsDragActive(false)
  }, [onFilesAdded])

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.bmp', '.tiff', '.svg']
    },
    multiple: true,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false)
  })

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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
          Upload Images
        </h2>
        {files.length > 0 && (
          <Button
            variant="ghost"
            onClick={onClearFiles}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer
          ${isDragActive ? 'border-primary bg-primary/5 scale-105' : 'border-gray-300 dark:border-gray-600'}
          ${isDragReject ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''}
          hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10
        `}
      >
        <input {...getInputProps()} />
        
        <motion.div
          animate={{ 
            scale: isDragActive ? 1.1 : 1,
            rotate: isDragActive ? 5 : 0
          }}
          transition={{ duration: 0.2 }}
          className="mb-4"
        >
          <ApperIcon 
            name={isDragActive ? "Upload" : "Image"} 
            className={`w-16 h-16 mx-auto ${
              isDragActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
            }`} 
          />
        </motion.div>

        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            {isDragActive ? 'Drop your images here' : 'Drag & drop images here'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            or click to browse your files
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Supports: JPEG, PNG, GIF, WebP, BMP, TIFF, SVG
          </p>
        </div>
      </div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Selected Files ({files.length})
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total: {formatFileSize(files.reduce((acc, file) => acc + file.size, 0))}
              </div>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {files.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <FileItem
                    file={file}
                    onRemove={() => onRemoveFile(file.id)}
                    formatFileSize={formatFileSize}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default UploadZone