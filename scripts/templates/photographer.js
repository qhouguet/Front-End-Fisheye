import { MediaFactory } from '../factories/media.js'

export const photographerTemplate = (photographer, medias = []) => {
    const { name, portrait, city, tagline, price, id } = photographer

    const picture = `assets/photographers/${portrait}`

    function getUserCardDOM() {
        const article = document.createElement('article')
        const link = document.createElement('a')
        const img = document.createElement('img')
        const nameHeading = document.createElement('h2')
        const cityHeading = document.createElement('h3')
        const taglineParagraph = document.createElement('p')
        const priceParagraph = document.createElement('p')

        article.classList.add('photographer')
        link.classList.add('photographer__link')
        img.classList.add('photographer__image')
        nameHeading.classList.add('photographer__name')
        cityHeading.classList.add('photographer__city')
        taglineParagraph.classList.add('photographer__tagline')
        priceParagraph.classList.add('photographer__price')

        link.href = `./photographer.html?id=${id}`
        link.setAttribute('alt', name)
        link.setAttribute('aria-label', `Voir le profil de ${name}`)

        img.setAttribute('src', picture)
        img.setAttribute('alt', '')

        nameHeading.textContent = name
        cityHeading.textContent = city

        taglineParagraph.textContent = tagline

        priceParagraph.textContent = `${price}€/jour`

        article.append(link, cityHeading, taglineParagraph, priceParagraph)
        link.append(img, nameHeading)

        return article
    }

    function getUserHeaderElementsDOM() {
        const article = document.createElement('article')
        const img = document.createElement('img')
        const nameSpan = document.createElement('span')
        const citySpan = document.createElement('span')
        const taglineSpan = document.createElement('span')

        article.classList.add('about__photographer')
        img.classList.add('about__photographer__image')
        nameSpan.classList.add('about__photographer__name')
        citySpan.classList.add('about__photographer__city')
        taglineSpan.classList.add('about__photographer__tagline')

        img.setAttribute('src', picture)
        img.setAttribute('alt', name)

        nameSpan.textContent = name
        citySpan.textContent = city
        taglineSpan.textContent = tagline

        article.append(nameSpan, citySpan, taglineSpan)

        return { article, img }
    }

    function getUserMediasElementsDOM() {
        const gallery = document.createElement('div')

        gallery.setAttribute('id', 'gallery')
        gallery.classList.add('medias__gallery')

        medias.forEach((media) => {
            const mediaRendered = MediaFactory.createMedia(media, name.split(' ')[0]).createElement()

            const figure = document.createElement('figure')
            const link = document.createElement('a')
            const caption = document.createElement('figcaption')
            const titleMedia = document.createElement('span')
            const likesContainer = document.createElement('p')
            const likesSpan = document.createElement('span')
            const likesButton = document.createElement('button')
            const likesImg = document.createElement('img')

            figure.classList.add('media')
            link.classList.add('media__link')
            caption.classList.add('media__caption')
            titleMedia.classList.add('media__title')
            likesContainer.classList.add('media__likes')
            likesButton.classList.add('media__likes--button')
            likesImg.classList.add('medias__likes--image')

            let mediaLikes = media.likes

            link.setAttribute('href', '#')
            link.setAttribute('id', media.id)
            titleMedia.textContent = media.title
            likesImg.setAttribute('src', '/assets/icons/likes.svg')
            likesSpan.textContent = mediaLikes

            link.append(mediaRendered)
            likesButton.append(likesImg)
            likesContainer.append(likesSpan, likesButton)
            caption.append(titleMedia, likesContainer)
            figure.append(link, caption)

            gallery.append(figure)
        })

        return gallery
    }

    function getUserPriceAndTotalLikesElementsDOM() {
        const totalLikes = medias.reduce((acc, curr) => acc + curr.likes, 0)

        const container = document.createElement('p')
        const likesContainer = document.createElement('p')
        const likesSpan = document.createElement('span')
        const pricePerDay = document.createElement('span')
        const likesImage = document.createElement('img')

        container.classList.add('pricing-likes')
        likesImage.classList.add('total-likes-image')
        likesSpan.classList.add('total-likes')

        likesSpan.textContent = totalLikes
        likesImage.setAttribute('src', '/assets/icons/likes_black.svg')

        pricePerDay.textContent = price + '€ / jour'

        likesContainer.append(likesSpan, likesImage)
        container.append(likesContainer, pricePerDay)

        return container
    }

    return {
        name,
        picture,
        getUserCardDOM,
        getUserHeaderElementsDOM,
        getUserMediasElementsDOM,
        getUserPriceAndTotalLikesElementsDOM,
    }
}
