const form = document.querySelector('form')
const postId = document.getElementById('post-id')
const postTitle = document.getElementById('post-title')
const postBody = document.querySelector('.form-input')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const postData = {
        post_id: postId.value,
        title: postTitle.value,
        content: postBody.value,
    }

    fetch('/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        if (response.status === 200) {
            window.location.reload()
        }
    })
    .catch(err => console.log(err))
    
})