import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Header = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="relative z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold gradient-text">
                PixelShift Pro
              </h1>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center space-x-8"
          >
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200">
              Features
            </a>
            <a href="#formats" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200">
              Formats
            </a>
            <a href="#help" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200">
              Help
            </a>
          </motion.nav>

          {/* Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center space-x-4"
          >
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              <ApperIcon 
                name={theme === 'light' ? 'Moon' : 'Sun'} 
                className="w-5 h-5 text-gray-600 dark:text-gray-300" 
              />
            </Button>
            
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  )
}

export default Header