import { MediaFactory } from '../factories/media.js'

const KEYCODE_TO_LISTEN = [9, 27]

//DOM elements
const closeButton = document.getElementById('lightbox__close')
const header = document.querySelector('header')
const main = document.querySelector('main')
const lightbox = document.getElementById('lightbox')
const next = document.querySelector('.lightbox__next')
const previous = document.querySelector('.lightbox__previous')

export const displayLightbox = (media, photographerName, medias) => {
    lightbox.style.display = 'flex'
    header.setAttribute('aria-hidden', 'true')
    main.setAttribute('aria-hidden', 'true')
    lightbox.setAttribute('aria-hidden', 'false')

    next.focus()

    let currentIndex = medias.findIndex((m) => m.id === media.id)
    const mediasLength = medias.length

    const mediaRendered = MediaFactory.createMedia(media, photographerName.split(' ')[0], true).createElement()
    const figcaption = document.createElement('figcaption')
    figcaption.classList.add('lightbox__media--caption')
    figcaption.textContent = media.title
    document.querySelector('.lightbox__media').append(mediaRendered, figcaption)

    next.addEventListener('click', () => {
        currentIndex = goToNextAndReturnNewIndex(currentIndex, mediasLength, medias, photographerName)
    })

    previous.addEventListener('click', () => {
        currentIndex = goToNextAndReturnNewIndex(currentIndex, mediasLength, medias, photographerName)
    })

    window.addEventListener('keydown', (e) => {
        if (e.keyCode === 39)
            currentIndex = goToNextAndReturnNewIndex(currentIndex, mediasLength, medias, photographerName)
        if (e.keyCode === 37)
            currentIndex = goToPreviousAndReturnNewIndex(currentIndex, mediasLength, medias, photographerName)
    })

    window.addEventListener('keydown', handleKeyDown)
}

const closeLightbox = () => {
    lightbox.style.display = 'none'
    header.setAttribute('aria-hidden', 'false')
    main.setAttribute('aria-hidden', 'false')
    lightbox.setAttribute('aria-hidden', 'true')

    clearMedias()

    window.removeEventListener('keydown', handleKeyDown)
}

const clearMedias = () => {
    const image = document.querySelector('.lightbox__media .media__image')
    const video = document.querySelector('.lightbox__media .media__video')
    if (image) image.remove()
    if (video) video.remove()

    document.querySelector('.lightbox__media--caption').remove()
}

const goToNextAndReturnNewIndex = (currentIndex, mediasLength, medias, photographerName) => {
    let newMedia = null
    let newIndex = currentIndex

    if (mediasLength - 1 === currentIndex) {
        newIndex = 0
        newMedia = medias[newIndex]
    } else {
        newIndex++
        newMedia = medias[newIndex]
    }

    if (newMedia) {
        clearMedias()
        const mediaRendered = MediaFactory.createMedia(newMedia, photographerName.split(' ')[0], true).createElement()
        const figcaption = document.createElement('figcaption')
        figcaption.classList.add('lightbox__media--caption')
        figcaption.textContent = newMedia.title
        document.querySelector('.lightbox__media').append(mediaRendered, figcaption)
    }

    return newIndex
}

const goToPreviousAndReturnNewIndex = (currentIndex, mediasLength, medias, photographerName) => {
    let newMedia = null
    let newIndex = currentIndex

    if (currentIndex === 0) {
        newIndex = mediasLength - 1
        newMedia = medias[newIndex]
    } else {
        newIndex--
        newMedia = medias[newIndex]
    }

    if (newMedia) {
        clearMedias()
        const mediaRendered = MediaFactory.createMedia(newMedia, photographerName.split(' ')[0], true).createElement()
        const figcaption = document.createElement('figcaption')
        figcaption.classList.add('lightbox__media--caption')
        figcaption.textContent = newMedia.title
        document.querySelector('.lightbox__media').append(mediaRendered, figcaption)
    }

    return newIndex
}

closeButton.addEventListener('click', closeLightbox)

const handleKeyDown = (e) => {
    if (!KEYCODE_TO_LISTEN.includes(e.keyCode)) return

    const focusable = lightbox.querySelectorAll(
        'button, [href], input, select, textarea, li, a,[tabindex]:not([tabindex="-1"])'
    )
    const firstFocusable = focusable[0]
    const lastFocusable = focusable[focusable.length - 1]

    const keys = {
        9: () => {
            // 9 = tab
            if (e.shiftKey && e.target === firstFocusable) {
                e.preventDefault()
                lastFocusable.focus()
            }

            if (!e.shiftKey && e.target === lastFocusable) {
                e.preventDefault()
                firstFocusable.focus()
            }
        },
        27: () => {
            // 27 = escape
            closeLightbox()
        },
    }

    if (keys[e.keyCode]) {
        keys[e.keyCode]()
    }
}
