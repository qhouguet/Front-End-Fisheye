export const validatePhotographers = (data) => {
    if (!data || typeof data !== 'object' || !Array.isArray(data.photographers)) {
        throw new Error('Invalid data format')
    }

    data.photographers.forEach((photographer) => {
        if (
            typeof photographer.name !== 'string' ||
            typeof photographer.id !== 'number' ||
            typeof photographer.city !== 'string' ||
            typeof photographer.country !== 'string' ||
            typeof photographer.tagline !== 'string' ||
            typeof photographer.price !== 'number' ||
            typeof photographer.portrait !== 'string'
        ) {
            throw new Error('Invalid photographer format')
        }
    })
}
