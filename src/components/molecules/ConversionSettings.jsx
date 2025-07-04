import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const ConversionSettings = ({ settings, onChange, disabled }) => {
  const compressionOptions = [
    { value: 'none', label: 'None', description: 'No compression' },
    { value: 'low', label: 'Low', description: 'Minimal compression' },
    { value: 'medium', label: 'Medium', description: 'Balanced compression' },
    { value: 'high', label: 'High', description: 'Maximum compression' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2 mb-4">
        <ApperIcon name="Sliders" className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Advanced Options
        </h3>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Compression Level
          </label>
          <div className="grid grid-cols-2 gap-2">
            {compressionOptions.map((option) => (
              <Button
                key={option.value}
                variant={settings.compression === option.value ? 'primary' : 'ghost'}
                onClick={() => onChange({ ...settings, compression: option.value })}
                disabled={disabled}
                className="text-sm p-2"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Preserve Metadata
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Keep EXIF data, color profiles, etc.
            </p>
          </div>
          <Button
            variant={settings.preserveMetadata ? 'primary' : 'ghost'}
            onClick={() => onChange({ ...settings, preserveMetadata: !settings.preserveMetadata })}
            disabled={disabled}
            className="px-4 py-2"
          >
            <ApperIcon 
              name={settings.preserveMetadata ? "Check" : "X"} 
              className="w-4 h-4 mr-2" 
            />
            {settings.preserveMetadata ? 'On' : 'Off'}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default ConversionSettings