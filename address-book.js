
const submitForm = document.querySelector('#form')
const app = document.querySelector('#app')
let nameInput = document.querySelector('#name')
let addressInput = document.querySelector('#address')
let emailInput = document.querySelector('#email')
let phoneInput = document.querySelector('#phone')
const showFavorites = document.querySelector('#showFavorites')
const showAll = document.querySelector('#showAll')
const searchInput = document.querySelector('#search')
const delChecked = document.querySelector('#del-checked')
const sortAZ = document.querySelector('#sort-A-Z')

let savedData = localStorage.getItem('savedData') ? JSON.parse(localStorage.getItem('savedData')) : []

window.addEventListener('DOMContentLoaded',() => {
    if (savedData) {objArr = [...savedData]}
    renderAll(objArr)
})

function sendToLocalStorage(key,arr) {
    localStorage.setItem(key,JSON.stringify(arr))
}

let objArr = []

submitForm.addEventListener('submit',(e) => {
    e.preventDefault()
    document.querySelector('#fill-all-fields').innerHTML = null
    const entry = {
        name: nameInput.value,
        address: addressInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        favorites: false,
        checked: false
    }
    if (nameInput.value.trim() !== '' && addressInput.value.trim() !== ''
        && emailInput.value.trim() !== '' && phoneInput.value.trim() !== '') {

        objArr.push(entry)
        nameInput.value = ''
        addressInput.value = ''
        emailInput.value = ''
        phoneInput.value = ''
    } else {
        pleaseFillAllFields()
    }
    renderAll(objArr)
    sendToLocalStorage('savedData',objArr)
})

function pleaseFillAllFields() {
    const p = document.createElement('p')
    p.textContent = 'Please fill all fields'
    const fillAllDiv = document.querySelector('#fill-all-fields')
    fillAllDiv.append(p)
}

showFavorites.addEventListener('click',(e) => {
    e.preventDefault()
    renderFav(objArr)
})
showAll.addEventListener('click',(e) => {
    e.preventDefault()
    renderAll(objArr)
})

function createEl(element,arr) {
    const container = document.createElement('div')
    container.className = 'generated-card-wrapper'
    const topDiv = document.createElement('div')
    topDiv.className = 'check-fav-del-window'
    const checkBox = document.createElement('input')
    checkBox.type = 'checkbox'
    if (element.checked === true) {
        checkBox.checked = true
    }
    checkBox.addEventListener('click',() => {
        element.checked = checkBox.checked;
        sendToLocalStorage('savedData',arr)
    })
    const del = document.createElement('i')
    del.className = 'fas fa-minus-square'
    del.addEventListener('click',() => {
        deleteItem(arr,element,container)
        sendToLocalStorage('savedData',arr)
    })
    const addToFav = document.createElement('i')
    addToFav.className = 'far fa-star'
    addToFav.addEventListener('click',() => {
        element.favorites = true
        sendToLocalStorage('savedData',arr)
        renderAll(arr)
    })
    const name = document.createElement('p')
    const address = document.createElement('p')
    const email = document.createElement('p')
    const phone = document.createElement('p')
    const edit = document.createElement('button')
    edit.textContent = 'Edit'
    edit.className = 'edit'
    edit.addEventListener('click', () => {
        nameInput.value = element.name
        addressInput.value = element.address
        emailInput.value = element.email
        phoneInput.value = element.phone
    })
    name.textContent = 'Name:' + element.name
    address.textContent = 'Address:' + element.address
    email.textContent = 'Email:' + element.email
    phone.textContent = 'Phone:' + element.phone
    topDiv.append(checkBox,addToFav,del)
    container.append(topDiv,name,address,email,phone,edit)
    app.append(container)
}
let searchAll = []
searchInput.addEventListener('input',(e) => {
    if (searchInput.value.length > 1) {
    const searchValue = e.target.value.toLowerCase()
    searchAll = objArr.filter((e) => {
        return e.name.toLowerCase().includes(searchValue)
    })
        renderInSearchAll(searchAll)
    } else {
        renderAll(objArr)
    }
})
delChecked.addEventListener('click',() => {
    deleteChecked(objArr)
    renderAll(objArr)
    sendToLocalStorage('savedData',objArr)
})

sortAZ.addEventListener('click',() => {
    objArr.sort((a,b) => (a.name > b.name ? 1 : -1))
    renderAll(objArr)
})

function deleteChecked() {
    objArr = objArr.filter(e => e.checked !== true)
    return objArr
}

function deleteItem(arr,element,divToRemove) {
    const index = arr.indexOf(element)
    arr.splice(index,1)
    divToRemove.remove()
}

function renderInSearchAll(arr) {
    app.innerHTML = null
    arr.forEach((element) => {
        createEl(element,arr)
    })
}
function renderAll(arr) {
    app.innerHTML = null
    arr.forEach((element) => {
        if (element.favorites === false) {
            createEl(element,arr)
        }
    })
}
function renderFav(arr) {
    app.innerHTML = null
    arr.forEach((element) => {
        if (element.favorites === true) {
            createEl(element,arr)
        }
    })
}
