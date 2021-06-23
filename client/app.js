import * as api from './components/api.js'

let dataList = document.getElementById('dataList');
let addItemForm = document.getElementById('addItemForm')

function createListItem(data) {
    return `<li data-id="${data._id}" class="data-list-item"><strong>${data.name}</strong>: <em>${data.type}.</em> &nbsp;${data.description} <a href="#" class="delete-item" data-id="${data._id}">delete</a></li>`;
}

function renderList(array) {
    let output = '';
    array.forEach((item) => {
        output += createListItem(item);
    });
    dataList.innerHTML = output
}

async function handleSubmit(e){
    e.preventDefault();
    console.log('form submitted')
    let data = {
        name: document.querySelector('#name').value,
        type: document.querySelector('#type').value,
        description: document.querySelector('#description').value,
    }
    try {
        let updatedList = await api.postItem(data);
        document.querySelector('#name').value = ''
        document.querySelector('#type').value = ''
        document.querySelector('#description').value = ''
        renderList(updatedList)
    } catch (error) {
        console.log(error);
    }
}

async function handleDelete(e){
    if(!e.target.classList.contains('delete-item')) return;
    e.preventDefault()
    try {
        let updatedList = await api.deleteItem(e.target.dataset.id);
        renderList(updatedList)
    } catch (error) {
        console.log(error)
    }
}

async function init(){
    try {
        let data = await api.getItems();
        renderList(data)
    } catch (error) {
        console.log(error);
    }
}

addItemForm.addEventListener('submit', handleSubmit)
dataList.addEventListener('click', handleDelete)

init()