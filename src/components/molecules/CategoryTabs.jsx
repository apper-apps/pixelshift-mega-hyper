import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'

const CategoryTabs = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <motion.div
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={selectedCategory === category ? 'primary' : 'ghost'}
            onClick={() => onCategoryChange(category)}
            className="capitalize px-4 py-2 text-sm"
          >
            {category === 'all' ? 'All Formats' : category}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}

export default CategoryTabs