import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const FileItem = ({ file, onRemove, formatFileSize }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 dark:text-green-400'
      case 'converting': return 'text-blue-600 dark:text-blue-400'
      case 'error': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle'
      case 'converting': return 'Loader'
      case 'error': return 'AlertCircle'
      default: return 'Clock'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
        <ApperIcon name="FileImage" className="w-6 h-6 text-white" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {file.name}
          </p>
          <div className={`flex items-center space-x-1 ${getStatusColor(file.status)}`}>
            <ApperIcon 
              name={getStatusIcon(file.status)} 
              className={`w-4 h-4 ${file.status === 'converting' ? 'animate-spin' : ''}`}
            />
            <span className="text-xs capitalize">{file.status}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {formatFileSize(file.size)} • {file.originalFormat.split('/')[1]?.toUpperCase()}
        </p>
      </div>

      <Button
        variant="ghost"
        onClick={onRemove}
        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 p-2"
      >
        <ApperIcon name="X" className="w-4 h-4" />
      </Button>
    </motion.div>
  )
}

export default FileItem