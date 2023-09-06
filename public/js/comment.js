const form = document.querySelector('form')
const postId = document.getElementById('post-id')
const commentBody = document.querySelector('.form-input')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const commentData = {
        user_id: postId.value.trim,
        content: commentBody.value
    }

    if (commentBody) {
        fetch('/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        })
        .then(response => {
            if (response.status === 200) {
                window.location.reload()

            }
        })
        .catch(err => console.log(err))
    }

})
