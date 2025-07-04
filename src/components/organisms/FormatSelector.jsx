import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import SearchBar from '@/components/molecules/SearchBar'
import FormatGrid from '@/components/molecules/FormatGrid'
import CategoryTabs from '@/components/molecules/CategoryTabs'

const FormatSelector = ({
  formats,
  categories,
  selectedFormat,
  selectedCategory,
  searchQuery,
  onFormatSelect,
  onCategoryChange,
  onSearchChange
}) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
          Select Format
        </h2>
        <Button
          variant="ghost"
          onClick={() => setShowDetails(!showDetails)}
          className="text-primary hover:text-primary/80"
        >
          <ApperIcon name="Info" className="w-4 h-4 mr-2" />
          {showDetails ? 'Hide' : 'Show'} Details
        </Button>
      </div>

      <div className="space-y-6">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search formats (e.g., JPEG, PNG, WebP)"
        />

        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />

        <FormatGrid
          formats={formats}
          selectedFormat={selectedFormat}
          onFormatSelect={onFormatSelect}
          showDetails={showDetails}
        />

        {selectedFormat && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="FileImage" className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {selectedFormat.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  .{selectedFormat.extension} • {selectedFormat.category}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">Transparency:</span>
                <span className={`ml-2 ${selectedFormat.supportsTransparency ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedFormat.supportsTransparency ? 'Supported' : 'Not Supported'}
                </span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">Max Colors:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {selectedFormat.maxColors === -1 ? 'Unlimited' : selectedFormat.maxColors.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default FormatSelector