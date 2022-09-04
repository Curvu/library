const page = document.querySelector('.page')

//? Blur function
function blur() {
    page.style.opacity = 0.3
    page.style.userSelect = 'none'
}

//? Login function
const profileContainer = document.querySelector('.profile')
const login = document.querySelector('.login')
const loginContainer = document.querySelector('.login-container')

login.addEventListener('click', () => {
    loginContainer.style.display = 'flex'
    blur()
})

const submitLogin = document.getElementById('submit-login')
const inputName = document.getElementById('get-name')

let user
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

const books = document.getElementById('books-container')
const addBook = document.querySelector('.add-book')
const bookContainer = document.querySelector('.add-book-container')
const submitBook = document.getElementById('submit-book')

let shelf = []

function Book() {
    this.title = ''
    this.author = ''
    this.pages = 0
    this.state = ''
    this.liked = true
}

if (canAddBook) {
    addBook.addEventListener('click', () => {
        blur()
        bookContainer.style.display = 'flex'
    })
}

if (localStorage.getItem('shelf') === null || localStorage.getItem('shelf') === '') localStorage.setItem('shelf', shelf)
else shelf = JSON.parse(localStorage.getItem('shelf'))

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
        
        location.reload() // reload page
    } else {
        // TODO: Show error?
    }
})

//? Render function
const render = (shelf) => {
    shelf.forEach((book, index) => {
        books.innerHTML += `
            <div class="book" id="book-${index}">
                <p class="title">${book.title}</p>
                <p class="author">${book.author}</p>
                <p class="pages">${book.pages}</p>
                <p class="state">${book.state}</p>
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
}

//? Remove book
const removeBook = (removeBtn) => {
    removeBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            shelf.splice(parseInt(e.currentTarget.parentNode.parentNode.id.split('-')[1]), 1)
            localStorage.setItem('shelf', JSON.stringify(shelf))
            location.reload() // reload page
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
            location.reload() // reload page
        })
    })
}

//? Render All books
window.addEventListener('DOMContentLoaded', () => {
    render(shelf)

    // Allow to remove btn
    const removeBtn = document.querySelectorAll('.remove-book')
    removeBook(removeBtn)

    // Allow to like book
    const likeBtn = document.querySelectorAll('.like-book')
    likeBook(likeBtn)
})