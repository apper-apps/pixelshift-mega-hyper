import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const FormatCard = ({ format, isSelected, onClick, showDetails }) => {
  const getFormatIcon = (extension) => {
    const iconMap = {
      'jpg': 'FileImage',
      'jpeg': 'FileImage',
      'png': 'FileImage',
      'gif': 'FileImage',
      'webp': 'FileImage',
      'svg': 'FileText',
      'pdf': 'FileText',
      'bmp': 'FileImage',
      'tiff': 'FileImage',
      'ico': 'FileImage',
      'avif': 'FileImage',
      'heic': 'FileImage'
    }
    return iconMap[extension.toLowerCase()] || 'FileImage'
  }

  const getFormatColor = (category) => {
    const colorMap = {
      'raster': 'from-blue-500 to-blue-600',
      'vector': 'from-green-500 to-green-600',
      'web': 'from-purple-500 to-purple-600',
      'raw': 'from-orange-500 to-orange-600',
      'document': 'from-red-500 to-red-600'
    }
    return colorMap[category] || 'from-gray-500 to-gray-600'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className={`
        relative cursor-pointer p-4 rounded-lg border-2 transition-all duration-200
        ${isSelected 
          ? 'border-primary bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg' 
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
        }
      `}
    >
      <div className="text-center">
        <div className={`
          w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center
          ${isSelected 
            ? 'bg-gradient-to-br from-primary to-secondary' 
            : `bg-gradient-to-br ${getFormatColor(format.category)}`
          }
        `}>
          <ApperIcon 
            name={getFormatIcon(format.extension)} 
            className="w-5 h-5 text-white" 
          />
        </div>
        
        <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
          {format.name}
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400">
          .{format.extension}
        </div>

        {showDetails && (
          <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            <div className="capitalize">{format.category}</div>
            {format.supportsTransparency && (
              <div className="text-green-500">✓ Transparency</div>
            )}
          </div>
        )}
      </div>

      {isSelected && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
          <ApperIcon name="Check" className="w-3 h-3 text-white" />
        </div>
      )}
    </motion.div>
  )
}

export default FormatCard