import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Loading = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
        >
          <ApperIcon name="Zap" className="w-8 h-8 text-white" />
        </motion.div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            Loading PixelShift Pro
          </h2>
          
          <div className="space-y-3 max-w-md mx-auto">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.2, repeat: Infinity, repeatType: "reverse" }}
                  className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full"
                />
              ))}
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400">
            Preparing your image conversion workspace...
          </p>
        </div>
      </div>
    </div>
  )
}

export default Loading