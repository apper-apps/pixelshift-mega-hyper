import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  icon = 'FileImage', 
  title = 'No data found', 
  description = 'There is no data to display at this time.',
  action
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-12"
    >
      <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
        <ApperIcon name={icon} className="w-10 h-10 text-gray-400 dark:text-gray-500" />
      </div>
      
      <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
        {description}
      </p>
      
      {action && (
        <div className="flex justify-center">
          {action}
        </div>
      )}
    </motion.div>
  )
}

export default Empty