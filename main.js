// keep profile name with localstorage
const page = document.querySelector('.page')
const books = document.getElementById('books-container')
const add = document.querySelector('.add-book')

//? Login function
const profileContainer = document.querySelector('.profile')
const login = document.querySelector('.login')
const loginContainer = document.querySelector('.login-container')

login.addEventListener('click', () => {
    loginContainer.style.display = 'flex'
    page.style.opacity = 0.3
    page.style.userSelect = 'none'
})

const submitLogin = document.getElementById('submit-login')
const inputName = document.getElementById('get-name')

let user;
submitLogin.addEventListener('click', () => {
    user = inputName.value
    page.style.opacity = 1
    page.style.userSelect = 'all'
    loginContainer.style.display = 'none'
    localStorage.setItem('user', user)
    location.reload() // reload page
})

user = localStorage.getItem('user')
// console.log(user)

if (user !== null) {
    profileContainer.innerHTML = user + `<button class="logout">Logout</button>`;
    const logout = document.querySelector('.logout')
    logout.addEventListener('click', () => {
        localStorage.removeItem('user')
        location.reload() // reload page
    })
}



//? Add book
add.addEventListener('click', () => {

})