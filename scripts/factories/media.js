class ImageMedia {
    constructor(image, title, photographerName) {
        this.image = image
        this.title = title
        this.photographerName = photographerName
    }

    createElement() {
        const image = document.createElement('img')
        image.setAttribute('src', `assets/medias/${this.photographerName}/${this.image}`)
        image.setAttribute('lang', 'en-GB')
        image.setAttribute('alt', this.title)
        image.classList.add('media__image')
        return image
    }
}

class VideoMedia {
    constructor(video, title, photographerName, lightbox) {
        this.video = video
        this.title = title
        this.photographerName = photographerName
        this.lightbox = lightbox
    }

    createElement() {
        const video = document.createElement('video')
        video.setAttribute('src', `assets/medias/${this.photographerName}/${this.video}`)
        if (this.lightbox) {
            video.setAttribute('controls', true)
            video.setAttribute('autoplay', true)
        }
        video.setAttribute('lang', 'en-GB')
        video.setAttribute('alt', this.title)
        video.classList.add('media__video')
        return video
    }
}

export class MediaFactory {
    static createMedia(media, photographerName, lightbox = false) {
        let type = null

        if ('image' in media) type = 'image'
        if ('video' in media) type = 'video'

        switch (type) {
            case 'image':
                return new ImageMedia(media.image, media.title, photographerName)
            case 'video':
                return new VideoMedia(media.video, media.title, photographerName, lightbox)
            default:
                throw new Error('Type de media non supporté')
        }
    }
}
