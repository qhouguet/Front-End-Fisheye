// import { displayModal, closeModal } from '../utils/contactForm.js'
import { getParam } from '../utils/getParam.js'
import { getPhotographers } from '../utils/getPhotographers.js'
import { getMedias } from '../utils/getMedias.js'

const displayData = (photographer, medias) => {
    console.log(photographer, medias)
}

const init = async () => {
    // Récupère les datas des photographes
    const photographers = await getPhotographers()
    const medias = await getMedias()
    const photographerId = getParam()

    const currentPhotographer = photographers.find((photographer) => photographer.id === photographerId) || {}
    const mediasFromCurrentPhotographer = medias.filter((media) => media.photographerId === photographerId) || []

    displayData(currentPhotographer, mediasFromCurrentPhotographer)
}

init()
