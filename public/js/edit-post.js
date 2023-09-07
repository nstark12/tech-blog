const editPost = document.getElementById('edit-post')
const deletePost = document.getElementById('delete-post')
const postId = document.getElementById('post-id-edit').value
const postTitle = document.getElementById('post-title')
const postBody = document.getElementById('post-body')
const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

deletePost.addEventListener('click', (e) => {
    e.preventDefault()

    fetch(`/api/post/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.status === 200) {
            document.location.replace('/dashboard')
        }
    })
    .catch(err => console.log(err))
    
})

editPost.addEventListener('click', (e) => {
    e.preventDefault()
    
    const editPost = {
        post_id: postId.value,
        title: postTitle.value,
        content: postBody.value
    }
    console.log('POST ID' + id)

    fetch(`/api/post/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editPost)
    })
   

    .then(response => {
        if (response.status === 200) {
            document.location.replace('/dashboard')
        }
    })
    .catch(err => console.log(err))

})