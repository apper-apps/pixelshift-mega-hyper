export const conversionService = {
  startConversion: async (files, targetFormat, settings) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const job = {
      id: Date.now().toString(),
      files: files.map(f => ({ ...f })),
      targetFormat: { ...targetFormat },
      settings: { ...settings },
      status: 'processing',
      createdAt: new Date().toISOString(),
      progress: 0
    }

    return job
  },

  getConversionStatus: async (jobId) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return {
      id: jobId,
      status: 'completed',
      progress: 100,
      completedAt: new Date().toISOString()
    }
  },

  cancelConversion: async (jobId) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return {
      id: jobId,
      status: 'cancelled',
      cancelledAt: new Date().toISOString()
    }
  },

  downloadFile: async (fileId) => {
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // In a real application, this would return a download URL or blob
    return {
      url: `#download-${fileId}`,
      filename: `converted-${fileId}.jpg`
    }
  }
}