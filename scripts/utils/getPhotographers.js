import { fetchData } from './fetchData.js'

const validatePhotographers = (data) => {
    if (!data || typeof data !== 'object' || !Array.isArray(data.photographers)) {
        throw new Error('Invalid data format')
    }
}

export const getPhotographers = async () => {
    try {
        const data = await fetchData('../../data/photographers.json')
        validatePhotographers(data)
        return data.photographers
    } catch (error) {
        console.error('Error fetching or validating data: ', error)
        return []
    }
}
