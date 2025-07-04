import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import DownloadItem from '@/components/molecules/DownloadItem'

const DownloadSection = ({ files, onDownloadFile, onDownloadAll }) => {
  const completedFiles = files.filter(f => f.status === 'completed')
  const totalSize = completedFiles.reduce((acc, file) => acc + file.size, 0)

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
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            Download Results
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {completedFiles.length} file{completedFiles.length !== 1 ? 's' : ''} ready for download
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Size</div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {formatFileSize(totalSize)}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {completedFiles.map((file, index) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
            <DownloadItem
              file={file}
              onDownload={() => onDownloadFile(file.id)}
              formatFileSize={formatFileSize}
            />
          </motion.div>
        ))}
      </div>

      {completedFiles.length > 1 && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={onDownloadAll}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white py-4 text-lg font-semibold"
          >
            <ApperIcon name="Download" className="w-5 h-5 mr-3" />
            Download All as ZIP
          </Button>
        </div>
      )}

      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <ApperIcon name="CheckCircle" className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-300">
              Conversion Complete!
            </h3>
            <p className="text-sm text-green-700 dark:text-green-400">
              Your images have been successfully converted and are ready for download.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DownloadSection