const KEYCODE_TO_LISTEN = [9, 27]

//DOM elements
const openButton = document.querySelector('.contact-button')
const closeButton = document.getElementById('modal-close')
const header = document.querySelector('header')
const main = document.querySelector('main')
const modal = document.getElementById('contact-modal')
const firstNameInput = document.getElementById('first-name')
const lastNameInput = document.getElementById('last-name')
const emailInput = document.getElementById('email')
const messageInput = document.getElementById('message')
const submitButton = modal.querySelector('button[type="submit"]')

const displayModal = () => {
    modal.style.display = 'flex'
    header.setAttribute('aria-hidden', 'true')
    main.setAttribute('aria-hidden', 'true')
    modal.setAttribute('aria-hidden', 'false')

    firstNameInput.focus()

    submitButton.addEventListener('click', handleSubmit)
    window.addEventListener('keydown', handleKeyDown)
}

const closeModal = () => {
    modal.style.display = 'none'
    header.setAttribute('aria-hidden', 'false')
    main.setAttribute('aria-hidden', 'false')
    modal.setAttribute('aria-hidden', 'true')

    submitButton.removeEventListener('click', handleSubmit)
    window.removeEventListener('keydown', handleKeyDown)
}

openButton.addEventListener('click', displayModal)
closeButton.addEventListener('click', closeModal)

const handleSubmit = (e) => {
    e.preventDefault()
    closeModal()

    console.log(lastNameInput.value, firstNameInput.value, emailInput.value, messageInput.value)
    modal.querySelector('form').reset()
}

const handleKeyDown = (e) => {
    if (!KEYCODE_TO_LISTEN.includes(e.keyCode)) return

    const focusable = modal.querySelectorAll(
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
            closeModal()
        },
    }

    if (keys[e.keyCode]) {
        keys[e.keyCode]()
    }
}
