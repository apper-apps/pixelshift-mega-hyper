import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const DownloadItem = ({ file, onDownload, formatFileSize }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
        <ApperIcon name="CheckCircle" className="w-6 h-6 text-white" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {file.name}
          </p>
          <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
            <ApperIcon name="CheckCircle" className="w-4 h-4" />
            <span className="text-xs">Converted</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {formatFileSize(file.size)} • {file.targetFormat.split('/')[1]?.toUpperCase()}
        </p>
      </div>

      <Button
        onClick={onDownload}
        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-4 py-2"
      >
        <ApperIcon name="Download" className="w-4 h-4 mr-2" />
        Download
      </Button>
    </motion.div>
  )
}

export default DownloadItem