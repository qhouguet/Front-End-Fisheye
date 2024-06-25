import { photographerTemplate } from '../templates/photographer.js'
import { getPhotographers } from '../utils/getPhotographers.js'

const displayData = (photographers) => {
    const photographersSection = document.querySelector('.photographers_section')

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
