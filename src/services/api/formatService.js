import formatsData from '@/services/mockData/formats.json'

export const formatService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...formatsData]
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    const format = formatsData.find(f => f.Id === parseInt(id))
    if (!format) throw new Error('Format not found')
    return { ...format }
  },

  getByCategory: async (category) => {
    await new Promise(resolve => setTimeout(resolve, 250))
    return formatsData.filter(f => f.category === category).map(f => ({ ...f }))
  },

  search: async (query) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    const lowercaseQuery = query.toLowerCase()
    return formatsData.filter(f => 
      f.name.toLowerCase().includes(lowercaseQuery) ||
      f.extension.toLowerCase().includes(lowercaseQuery)
    ).map(f => ({ ...f }))
  }
}