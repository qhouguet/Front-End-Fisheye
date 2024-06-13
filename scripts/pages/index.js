import { photographerTemplate } from '../templates/photographer.js'
import { validatePhotographers } from '../utils/validatePhotographers.js'
import { fetchData } from '../utils/fetchData.js'

const getPhotographers = async () => {
    try {
        const data = await fetchData('../../data/photographers.json')
        validatePhotographers(data)
        return data.photographers
    } catch (error) {
        console.error('Error fetching or validating data: ', error)
        return []
    }
}

const displayData = (photographers) => {
    const photographersSection = document.querySelector('.photographer_section')

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer)
        const userCardDOM = photographerModel.getUserCardDOM()
        photographersSection.appendChild(userCardDOM)
    })
}

const init = async () => {
    // Récupère les datas des photographes
    const photographers = await getPhotographers()
    displayData(photographers)
}

init()
