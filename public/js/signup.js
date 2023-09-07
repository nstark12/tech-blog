const form = document.querySelector('form')
const usernameInput = document.getElementById('usernameSignInput')
const passwordInput = document.getElementById('passwordSignInput')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const userData = {
        username: usernameInput.value.trim(),
        password: passwordInput.value.trim()
    }

    console.log(usernameInput.value, passwordInput.value)

    fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.status === 200) {
            window.location.assign('/')
        } 
    })
    .catch(err => console.log(err))
})