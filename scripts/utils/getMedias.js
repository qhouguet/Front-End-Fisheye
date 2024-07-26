import { fetchData } from './fetchData.js'

const validateMedias = (data) => {
    if (!data || typeof data !== 'object' || !Array.isArray(data.media)) {
        throw new Error('Invalid data format')
    }
}

export const getMedias = async () => {
    try {
        const data = await fetchData('data/photographers.json')
        validateMedias(data)
        return data.media
    } catch (error) {
        console.error('Error fetching or validating data: ', error)
        return []
    }
}
