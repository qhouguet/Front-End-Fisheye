import { getParam } from '../utils/getParam.js'
import { getPhotographers } from '../utils/getPhotographers.js'
import { getMedias } from '../utils/getMedias.js'
import { displayLightbox } from '../utils/lightbox.js'
import { photographerTemplate } from '../templates/photographer.js'
import { sortMedias } from '../utils/sort.js'

const toggleFilters = (select, dropdown, filters, open = true) => {
    if (select.classList.contains('open')) select.classList.remove('open')
    else select.classList.add('open')

    if (dropdown.classList.contains('hidden')) dropdown.classList.remove('hidden')
    else dropdown.classList.add('hidden')

    dropdown.setAttribute('aria-hidden', !open)

    filters.forEach((filter) => {
        const filterChild = filter?.children[0]

        if (filter && !filter.classList.contains('hidden')) {
            filterChild.setAttribute('tabindex', open ? '0' : '-1')
            filter.setAttribute('aria-hidden', false)
        } else {
            filter.setAttribute('aria-hidden', true)
        }
    })
}

const changeFilters = (newFilterNode, filters) => {
    document.getElementById('current_filter').textContent = newFilterNode.textContent

    filters.forEach((filter) => {
        const filterChild = filter?.children[0]
        if (filterChild && filterChild.dataset.btnTitle === newFilterNode.dataset.btnTitle)
            filter.classList.add('hidden')
        else if (filter.classList.contains('hidden')) filter.classList.remove('hidden')
    })
}

const cleanDom = () => {
    const article = document.querySelector('.about__photographer')
    const photo = document.querySelector('.about__photographer__image')
    const gallery = document.getElementById('gallery')
    const pricing = document.querySelector('.pricing-likes')

    if (article) article.remove()
    if (photo) photo.remove()
    if (gallery) gallery.remove()
    if (pricing) pricing.remove()
}

const displayData = (photographerWithMedias, sortType = 'popularity') => {
    const { photographer, medias } = photographerWithMedias

    const headerButton = document.querySelector('.contact-button')
    const main = document.getElementById('main')

    const header = headerButton.parentNode

    // popularity is the default setting
    const sortedMedias = sortMedias(sortType, medias)

    const photographerWithMediasModel = photographerTemplate(photographer, sortedMedias)

    const { article, img } = photographerWithMediasModel.getUserHeaderElementsDOM()
    const userMediasElementsDOM = photographerWithMediasModel.getUserMediasElementsDOM()
    const userPriceAndTotalLikesElementsDOM = photographerWithMediasModel.getUserPriceAndTotalLikesElementsDOM()

    header.insertBefore(article, headerButton)
    headerButton.insertAdjacentElement('afterend', img)

    main.append(userMediasElementsDOM, userPriceAndTotalLikesElementsDOM)

    const mediaLikesButtons = document.querySelectorAll('.media__likes--button')
    const totalMediasLikes = document.querySelector('.total-likes')

    mediaLikesButtons.forEach((mediaLikesButton) => {
        mediaLikesButton.addEventListener('click', () => {
            const mediaLikesSpan = mediaLikesButton.parentNode.querySelector('span')
            mediaLikesSpan.textContent = !mediaLikesSpan.dataset.isLiked
                ? parseInt(mediaLikesSpan.textContent) + 1
                : mediaLikesSpan.textContent

            totalMediasLikes.textContent = !mediaLikesSpan.dataset.isLiked
                ? parseInt(totalMediasLikes.textContent) + 1
                : totalMediasLikes.textContent

            mediaLikesSpan.dataset.isLiked = true
        })
    })

    const allMedias = document.querySelectorAll('.media__link')

    allMedias.forEach((media) => {
        media.addEventListener('click', () => {
            const currentMedia = medias.find((m) => JSON.stringify(m.id) === media.id)
            displayLightbox(currentMedia, photographer.name, sortedMedias)
        })
    })
}

const init = async () => {
    // Récupère les datas des photographes
    const photographers = await getPhotographers()
    const medias = await getMedias()
    const photographerId = getParam()

    const currentPhotographer = photographers.find((photographer) => photographer.id === photographerId) || {}
    const mediasFromCurrentPhotographer = medias.filter((media) => media.photographerId === photographerId) || []

    if (currentPhotographer.name) document.getElementById('dialog-title').append(currentPhotographer.name)

    const photographersAndMedias = {
        photographer: { ...currentPhotographer },
        medias: mediasFromCurrentPhotographer,
    }

    displayData(photographersAndMedias)

    const selectElement = document.getElementById('select')
    const dropdownContent = document.getElementById('sort-dropdown')
    const filters = document.querySelectorAll('#sort-dropdown li')

    selectElement.addEventListener('click', () => toggleFilters(selectElement, dropdownContent, filters))

    filters.forEach((filter) => {
        filter.addEventListener('click', () => {
            const filterChild = filter?.children[0]
            const filterToApply = filterChild ? filterChild.dataset?.btnTitle : ''
            toggleFilters(selectElement, dropdownContent, filters, false)
            changeFilters(filterChild, filters)
            cleanDom()
            displayData(photographersAndMedias, filterToApply)
        })
    })
}

init()
