export const photographerTemplate = (data) => {
    const { name, portrait, city, tagline, price, id } = data

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

        img.setAttribute('src', picture)
        img.setAttribute('alt', '')

        nameHeading.textContent = name
        cityHeading.textContent = city

        taglineParagraph.textContent = tagline

        priceParagraph.textContent = `${price}€/jour`

        article.appendChild(link)
        link.appendChild(img)
        link.appendChild(nameHeading)
        article.appendChild(cityHeading)
        article.appendChild(taglineParagraph)
        article.appendChild(priceParagraph)

        return article
    }

    return { name, picture, getUserCardDOM }
}
