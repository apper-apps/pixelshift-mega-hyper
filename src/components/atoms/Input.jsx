const Input = ({ 
  type = 'text',
  label,
  error,
  className = '',
  ...props
}) => {
  const inputClasses = `
    w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
    focus:ring-2 focus:ring-primary focus:border-transparent
    placeholder-gray-400 dark:placeholder-gray-500
    transition-all duration-200
    ${error ? 'border-red-500 focus:ring-red-500' : ''}
    ${className}
  `

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        type={type}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export default Input