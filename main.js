// keep profile name with localstorage
const page = document.querySelector('.page')

// Blur function
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
}

if (canAddBook) {
    addBook.addEventListener('click', () => {
        blur()
        bookContainer.style.display = 'flex'
    })
}

if (localStorage.getItem('shelf') === null || localStorage.getItem('shelf') === '') localStorage.setItem('shelf', shelf)
else shelf = JSON.parse(localStorage.getItem('shelf'))

console.log(shelf)

submitBook.addEventListener('click', () => {
    const book = new Book()
    book.title = document.getElementById('get-title').value
    book.author = document.getElementById('get-author').value
    book.pages = document.getElementById('get-pages').value 
    book.state = document.getElementById('book-state').value

    shelf.push(book)

    localStorage.setItem('shelf', JSON.stringify(shelf))

    // console.log(shelf)
    // console.log(book)
    
    location.reload() // reload page
})

// Render All books
window.addEventListener('DOMContentLoaded', () => {
    shelf.forEach((book) => {
        books.innerHTML += `
        <div class="book">
            <p class="title">${book.title}</p>
            <p class="author">${book.author}</p>
            <p class="pages">${book.pages}</p>
            <p class="state">${book.state}</p>
            <img src="./src/heart.svg">
        </div>
        `
    })
})