import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/organisms/Header'
import HeroSection from '@/components/organisms/HeroSection'
import UploadZone from '@/components/organisms/UploadZone'
import FormatSelector from '@/components/organisms/FormatSelector'
import ConversionPanel from '@/components/organisms/ConversionPanel'
import PreviewPanel from '@/components/organisms/PreviewPanel'
import ProgressIndicator from '@/components/organisms/ProgressIndicator'
import DownloadSection from '@/components/organisms/DownloadSection'
import { useImageConverter } from '@/hooks/useImageConverter'
import { formatService } from '@/services/api/formatService'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'

const HomePage = () => {
  const [formats, setFormats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const {
    files,
    selectedFormat,
    isConverting,
    conversionProgress,
    qualitySettings,
    addFiles,
    removeFile,
    clearFiles,
    setSelectedFormat,
    convertFiles,
    downloadFile,
    downloadAllFiles,
    setQualitySettings,
    estimateFileSize
  } = useImageConverter()

  useEffect(() => {
    loadFormats()
  }, [])

  const loadFormats = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await formatService.getAll()
      setFormats(data)
    } catch (err) {
      setError('Failed to load image formats')
      console.error('Format loading error:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredFormats = formats.filter(format => {
    const matchesCategory = selectedCategory === 'all' || format.category === selectedCategory
    const matchesSearch = format.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         format.extension.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categories = ['all', ...new Set(formats.map(format => format.category))]

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadFormats} />
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Main Conversion Interface */}
        <section className="relative z-10 -mt-20 px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Left Column - Upload and Format Selection */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <UploadZone
                    onFilesAdded={addFiles}
                    isDragActive={false}
                    files={files}
                    onRemoveFile={removeFile}
                    onClearFiles={clearFiles}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <FormatSelector
                    formats={filteredFormats}
                    categories={categories}
                    selectedFormat={selectedFormat}
                    selectedCategory={selectedCategory}
                    searchQuery={searchQuery}
                    onFormatSelect={setSelectedFormat}
                    onCategoryChange={setSelectedCategory}
                    onSearchChange={setSearchQuery}
                  />
                </motion.div>
              </div>

              {/* Right Column - Preview and Controls */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <PreviewPanel
                    files={files}
                    selectedFormat={selectedFormat}
                    estimateFileSize={estimateFileSize}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <ConversionPanel
                    files={files}
                    selectedFormat={selectedFormat}
                    qualitySettings={qualitySettings}
                    isConverting={isConverting}
                    onConvert={convertFiles}
                    onQualityChange={setQualitySettings}
                  />
                </motion.div>
              </div>
            </div>

            {/* Progress Indicator */}
            {isConverting && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                <ProgressIndicator
                  progress={conversionProgress}
                  totalFiles={files.length}
                  completedFiles={files.filter(f => f.status === 'completed').length}
                  isConverting={isConverting}
                />
              </motion.div>
            )}

            {/* Download Section */}
            {files.some(f => f.status === 'completed') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-8"
              >
                <DownloadSection
                  files={files}
                  onDownloadFile={downloadFile}
                  onDownloadAll={downloadAllFiles}
                />
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage