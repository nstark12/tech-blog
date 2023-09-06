const form = document.querySelector('form')
const usernameInput = document.getElementById('usernameInput')
const passwordInput = document.getElementById('passwordInput')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const userData = {
        username: usernameInput.value.trim(),
        password: passwordInput.value.trim()
    }

    fetch('api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.status === 202) {
            window.location.assign('/')
        }
    })
    .catch(err => console.log(err))
})