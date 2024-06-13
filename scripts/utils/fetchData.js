export const fetchData = async (url, options = {}) => {
    try {
        const response = await fetch(url, options)

        if (!response.ok) {
            throw new Error('Response was not ok : ' + response.statusText)
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.error('Error while fetching data : ', error)
    }
}
