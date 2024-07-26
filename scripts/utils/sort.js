export const sortMedias = (sortType, medias) => {
    switch (sortType) {
        case 'date':
            return medias.sort((a, b) => {
                const dateA = new Date(a.date)
                const dateB = new Date(b.date)
                return dateA - dateB
            })
        case 'title':
            return medias.sort((a, b) => {
                const titleA = a.title.toLowerCase()
                const titleB = b.title.toLowerCase()
                return titleA.localeCompare(titleB)
            })
        default:
            return medias.sort((a, b) => a.likes - b.likes)
    }
}
