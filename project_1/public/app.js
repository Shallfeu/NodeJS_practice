document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
})

document.addEventListener('click', event => {
    if (event.target.dataset.type === 'save') {
        const id = event.target.dataset.id
        const data = event.target.closest('li').querySelector('.input').value
        edit({id ,data}).then(() => {
            location.reload();
        })
    }
})

document.addEventListener('click', event => {
    if (event.target.dataset.type === 'cancel') {
        location.reload();
    }
})

document.addEventListener('click', event => {
    if (event.target.dataset.type === 'update') {
        const id = event.target.dataset.id
        // Button
        const div =  document.createElement('div')
        div.className = 'buttons'
        const saveBtn = document.createElement('btn')
        saveBtn.innerHTML = 'Save'
        saveBtn.className = 'btn btn-success'
        saveBtn.dataset.type = 'save'
        saveBtn.dataset.id = id
        const cancelBtn = document.createElement('btn')
        cancelBtn.innerHTML = 'Cancel'
        cancelBtn.className = 'btn btn-danger'
        cancelBtn.dataset.type = 'cancel'
        cancelBtn.dataset.id = id
        div.appendChild(saveBtn)
        div.appendChild(cancelBtn)
        // Input
        const input = document.createElement('input')
        input.className = 'input'

        event.target.closest('li').querySelector('.title').replaceWith(input)
        event.target.closest('div').replaceWith(div)

    }
})

async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE'})
}

async function edit({id, data}) {
    console.log(data)
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content
        },
        body: JSON.stringify({ title: data })
    };

    await fetch(`/${id}`, requestOptions)
}


