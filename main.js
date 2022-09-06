const page = document.querySelector('.page')
const profileContainer = document.querySelector('.profile')
const login = document.querySelector('.login')
const loginContainer = document.querySelector('.login-container')
const submitLogin = document.getElementById('submit-login')
const inputName = document.getElementById('get-name')
const books = document.getElementById('books-container')
const addBook = document.querySelector('.add-book')
const bookContainer = document.querySelector('.add-book-container')
const submitBook = document.getElementById('submit-book')
const readingC = document.getElementById('reading-counter')
const plannedC = document.getElementById('planned-counter')
const completedC = document.getElementById('completed-counter')
const allBtn = document.getElementById('all-section')
const readingBtn = document.getElementById('reading-section')
const completedBtn = document.getElementById('completed-section')
const plannedBtn = document.getElementById('planned-section')
const close = document.querySelectorAll('.close')

let user = ''
let lastPage = 'all'

//? Blur function
function blur(container) {
    page.style.opacity = 0.3
    page.style.userSelect = 'none'
    container.style.display = 'flex'
}

//? Unblur function
function unblur(container) {
    page.style.opacity = 1
    page.style.userSelect = 'all'
    container.style.display = 'none'
}

//? Login function
login.addEventListener('click', () => {
    blur(loginContainer)
})

submitLogin.addEventListener('click', () => {
    user = inputName.value
    localStorage.setItem('user', user)
    location.reload() // reload page
})

user = localStorage.getItem('user')
// console.log(user)

if (user !== null) {
    profileContainer.innerHTML = user + `<button class="logout">Logout</button>`
    const logout = document.querySelector('.logout')
    logout.addEventListener('click', () => {
        localStorage.clear()
        location.reload() // reload page
    })
}

//? Add book
const canAddBook = localStorage.getItem('user') === null ? false : true
let shelf = []

function Book() {
    this.title = ''
    this.author = ''
    this.pages = 0
    this.state = ''
    this.liked = false
}

if (canAddBook) {
    addBook.addEventListener('click', () => {
        blur(bookContainer)
    })
}

if (localStorage.getItem('shelf') === null || localStorage.getItem('shelf') === '') localStorage.setItem('shelf', shelf)
else shelf = JSON.parse(localStorage.getItem('shelf'))

//? Submit book
submitBook.addEventListener('click', () => {
    let title = document.getElementById('get-title').value
    let author = document.getElementById('get-author').value
    let pages = document.getElementById('get-pages').value

    if (title !== '' && author !== '' && pages !== '' && pages > 0) {
        const book = new Book()
        book.title = title
        book.author = author
        book.pages = pages
        book.state = document.getElementById('book-state').value

        shelf.push(book)

        localStorage.setItem('shelf', JSON.stringify(shelf))
        
        render(shelf, shelf)
        unblur(submitBook.parentNode)

        // reset inputs
        document.getElementById('get-title').value = ''
        document.getElementById('get-author').value = ''
        document.getElementById('get-pages').value = ''

    } else {
        // TODO: Show error?
    }
})

//? Check last page and render
const checkRender = () => {
    console.log(lastPage)
    if (lastPage === 'all') {
        render(shelf, shelf)
    } else if (lastPage === 'reading') {
        booksReading = shelf.filter((book) => book.state === 'Reading')
        render(shelf, booksReading)
    } else if (lastPage === 'completed') {
        booksCompleted = shelf.filter((book) => book.state === 'Completed')
        render(shelf, booksCompleted)
    } else {
        booksPlanned = shelf.filter((book) => book.state === 'Planned to Read')
        render(shelf, booksPlanned)
    }
}

//? Remove book
const removeBook = (removeBtn) => {
    removeBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            shelf.splice(parseInt(e.currentTarget.parentNode.parentNode.id.split('-')[1]), 1)
            localStorage.setItem('shelf', JSON.stringify(shelf))
            
            // Check what page to render
            checkRender()
        })
    })
}

//? Like a book
const likeBook = (likeBtn) => {
    likeBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let temp = e.currentTarget.parentNode.parentNode.id.split('-')[1]
            shelf[temp].liked = !shelf[temp].liked
            localStorage.setItem('shelf', JSON.stringify(shelf))

            // Check what page to render
            checkRender()
        })
    })
}

//? Change state
const changeState = (stateSelect) => {
    stateSelect.forEach((select) => {
        select.addEventListener('change', (e) => {
            console.log(shelf)

            let temp = e.currentTarget.parentNode.id.split('-')[1]
            shelf[temp].state = e.currentTarget.value

            console.log(shelf[temp].state)

            console.log(shelf)
            localStorage.setItem('shelf', JSON.stringify(shelf))
            
            // Check what page to render
            checkRender()
        })
    })
}

//? Render function
let booksReading = []
let booksCompleted = []
let booksPlanned = []

const renderCounter = () => {
    readingC.textContent = booksReading.length
    completedC.textContent = booksCompleted.length
    plannedC.textContent = booksPlanned.length
}

const render = (shelf, division) => {
    books.innerHTML = ''
    division.forEach((book) => {
        let index = shelf.indexOf(book)

        books.innerHTML += `
            <div class="book" id="book-${index}">
                <p class="title">${book.title}</p>
                <p class="author">${book.author}</p>
                <p class="pages">${book.pages}</p>
                <select class="state">
                    <option value="Reading" ${book.state === 'Reading' ? 'selected' : ''}>Reading</option>
                    <option value="Planned to Read" ${book.state === 'Planned to Read' ? 'selected' : ''}>Planned to Read</option>
                    <option value="Completed" ${book.state === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
                <div class="images">
                    <div class="like-book">
                        <img src="./src/heart.svg" style="${book.liked ? 'filter: grayscale(0%);' : 'filter: grayscale(100%);'}">
                    </div>
                    <div class="remove-book">
                        <img src="./src/trash.svg">
                    </div>
                </div>
            </div>
        `
    })

    // Change counter
    booksReading = shelf.filter(book => book.state === 'Reading')
    booksCompleted = shelf.filter(book => book.state === 'Completed')
    booksPlanned = shelf.filter(book => book.state === 'Planned to Read')

    renderCounter()

    // Allow to like book
    const likeBtn = document.querySelectorAll('.like-book')
    likeBook(likeBtn)

    // Allow to remove btn
    const removeBtn = document.querySelectorAll('.remove-book')
    removeBook(removeBtn)

    // Allow to change state
    let state = document.querySelectorAll('.state')
    changeState(state)
}

//? Render specific books
// All
allBtn.addEventListener('click', () => {
    render(shelf, shelf)
    lastPage = 'all'
})

// Reading
readingBtn.addEventListener('click', () => {
    render(shelf, booksReading)
    lastPage = 'reading'
})

// Completed
completedBtn.addEventListener('click', () => {
    render(shelf, booksCompleted)
    lastPage = 'completed'
})

// Planned to read
plannedBtn.addEventListener('click', () => {
    render(shelf, booksPlanned)
    lastPage = 'planned'
})

//? Close container (login, addBook)
close.forEach(btn => {
    btn.addEventListener('click', (e) => {
        unblur(e.currentTarget.parentNode)
    })
})

//! Render Page
window.addEventListener('DOMContentLoaded', () => {
    render(shelf, shelf)
})