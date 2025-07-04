import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import QualitySlider from '@/components/molecules/QualitySlider'
import ConversionSettings from '@/components/molecules/ConversionSettings'

const ConversionPanel = ({
  files,
  selectedFormat,
  qualitySettings,
  isConverting,
  onConvert,
  onQualityChange
}) => {
  const canConvert = files.length > 0 && selectedFormat && !isConverting

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
          Conversion Settings
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <ApperIcon name="Settings" className="w-4 h-4" />
          <span>Quality Control</span>
        </div>
      </div>

      <div className="space-y-6">
        <QualitySlider
          value={qualitySettings.quality}
          onChange={(quality) => onQualityChange({ ...qualitySettings, quality })}
          disabled={isConverting}
        />

        <ConversionSettings
          settings={qualitySettings}
          onChange={onQualityChange}
          disabled={isConverting}
        />

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Ready to Convert
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {files.length} file{files.length !== 1 ? 's' : ''} selected
                {selectedFormat && ` → ${selectedFormat.name}`}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Est. processing time
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {files.length * 2}s
              </div>
            </div>
          </div>

          <Button
            onClick={onConvert}
            disabled={!canConvert}
            className={`w-full py-4 text-lg font-semibold ${
              canConvert
                ? 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isConverting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Converting...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <ApperIcon name="Zap" className="w-5 h-5 mr-3" />
                Start Conversion
              </div>
            )}
          </Button>

          {!canConvert && !isConverting && (
            <div className="mt-3 text-sm text-center text-gray-500 dark:text-gray-400">
              {files.length === 0 && 'Upload images to begin'}
              {files.length > 0 && !selectedFormat && 'Select a target format'}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ConversionPanel