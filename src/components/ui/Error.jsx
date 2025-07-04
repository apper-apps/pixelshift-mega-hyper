import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertCircle" className="w-10 h-10 text-red-500" />
        </div>
        
        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
          Something went wrong
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {message || 'We encountered an error while loading the application. Please try again.'}
        </p>
        
        <div className="space-y-4">
          <Button
            onClick={onRetry}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => window.location.reload()}
            className="w-full"
          >
            <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
            Reload Page
          </Button>
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            If the problem persists, please check your internet connection or try refreshing the page.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Error