document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
})

document.addEventListener('click', event => {
    if (event.target.dataset.type === 'edit') {
        const data = window.prompt('How would you like to edit note?')
        const id = event.target.dataset.id
        if (data) {
            edit({id, data}).then(() => {
                location.reload();
            })
        }
    }
})

async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE'})
}

async function edit({id, data}) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content
        },
        body: JSON.stringify({ title: data })
    };

    await fetch(`/${id}`, requestOptions)
}


