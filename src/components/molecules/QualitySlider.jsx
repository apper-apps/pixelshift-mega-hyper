import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const QualitySlider = ({ value, onChange, disabled }) => {
  const getQualityLabel = (quality) => {
    if (quality >= 90) return 'Highest'
    if (quality >= 70) return 'High'
    if (quality >= 50) return 'Medium'
    if (quality >= 30) return 'Low'
    return 'Lowest'
  }

  const getQualityColor = (quality) => {
    if (quality >= 70) return 'text-green-600 dark:text-green-400'
    if (quality >= 50) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Settings" className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Quality
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}%
          </span>
          <span className={`text-sm font-medium ${getQualityColor(value)}`}>
            {getQualityLabel(value)}
          </span>
        </div>
      </div>

      <div className="relative">
        <input
          type="range"
          min="10"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          disabled={disabled}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer quality-slider"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>10%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400">
        Higher quality = larger file size. Lower quality = smaller file size.
      </div>
    </motion.div>
  )
}

export default QualitySlider