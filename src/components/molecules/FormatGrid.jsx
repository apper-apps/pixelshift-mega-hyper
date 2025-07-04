import { motion } from 'framer-motion'
import FormatCard from '@/components/atoms/FormatCard'

const FormatGrid = ({ formats, selectedFormat, onFormatSelect, showDetails }) => {
  if (formats.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 dark:text-gray-500 mb-2">
          No formats found
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Try adjusting your search or category filter
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {formats.map((format, index) => (
        <motion.div
          key={format.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
        >
          <FormatCard
            format={format}
            isSelected={selectedFormat?.id === format.id}
            onClick={() => onFormatSelect(format)}
            showDetails={showDetails}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default FormatGrid