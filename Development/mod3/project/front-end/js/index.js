// http://localhost:3000/line_items/84

document.addEventListener('DOMContentLoaded', getFromLocalStorage);

const BASE_URL = "http://localhost:3000"
const INSTRUMENT_URL = `${BASE_URL}/instruments`
const LINE_ITEMS = `${BASE_URL}/line_items`

let showCart = false

const shoppingCartContent = document.querySelector('#cart-content tbody')
const clearCartBtn = document.getElementById('clear-cart')
const cart = document.getElementById('img-cart')
const addPhoto = document.getElementById('img-photo')
const cartWindow = document.getElementById('shopping-cart')

const contentContainer = document.getElementById('content')
const productContainer = document.getElementById('products')
const footerContainer = document.getElementById('site-info')

getGuitars(INSTRUMENT_URL)

cart.addEventListener("click", () => {
    showCart = !showCart;
    if (showCart) {
        cartWindow.style.display = "block"
    } else {
        cartWindow.style.display = "none";
    }
})

function getGuitars(url){
    return fetch(url)
    .then(res => res.json())
    .then(instruments => instruments.forEach(instrument => buildGuitar(instrument)))
}

const buildCreateForm = () => {
    addPhotoToSell()
    let form1 = document.querySelector('form')
    form1.addEventListener('submit', (e) => handleSubmit(e, 'create'))
}

function handleSubmit(e, value){
    debugger
    e.preventDefault()
    let guitar = {
        title: e.target.Title.value,
        brand: e.target.Brand.value,
        description: e.target.Description.value,
        condition: e.target.Condition.value,
        finish: e.target.Finish.value,
        price: e.target.Price.value,
        image: e.target.Image.value
    }
    if(value != 'create'){
        makePatch(guitar, value.id)
    } else {
        makePost(guitar)
    }
}

function makePost(instrument){

    fetch(INSTRUMENT_URL,{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            title: instrument.Title,
            brand: instrument.Brand,
            description: instrument.Description,
            condition: instrument.Condition,
            finish: instrument.Finish,
            price: parseInt(instrument.price),
            image: instrument.Image
        })
    })
    .then(res => res.json())
    .then(instrument => {
        console.log(instrument)
       sellPage()
    })
    .catch(error => {
        console.error('Errors: ', error)
    })
}

function makePatch(guitar){
    debugger
    return fetch(`${LINE_ITEMS}/${guitar.id}`, {
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quantity: guitar.quantity
        })
        })
        .then(res => res.json())
        .then(data => {
            // addIntoCart(data)
            updateCart(data)
        })
        
        .catch(error => {
            console.error('Errors: ', error)
        })
}

function buildGuitar(instrument){
    let productImageContainer = document.createElement('div')
    productImageContainer.className = 'product-image'
    let image = document.createElement('img')
    image.src = instrument.image
    let productDescription = document.createElement('div')
    productDescription.className = 'product-description'
    productDescription.id = `instrument-${instrument.id}`
    productDescription.textContent = instrument.name
    let productName = document.createElement('h3')
    productName.className = 'product-name'
    productName.textContent = instrument.description
    let productModel = document.createElement('h3')
    productModel.className = 'product-model'
    productModel.textContent = instrument.model
    let productBrand = document.createElement('h3')
    productBrand.className = 'product-brand'
    productBrand.textContent = instrument.brand
    let productFinish = document.createElement('h3')
    productFinish.className = 'product-finish'
    productFinish.textContent = instrument.finish
    const productPrice = document.createElement('p')
    productPrice.className = 'product-price'
    productPrice.textContent = instrument.price
    let productTitle = document.createElement('p')
    productTitle.className = 'product-title'
    
    let formDiv = document.createElement('div')
    let label = document.createElement('label')
    let el1 = document.createElement('input')
    el1.defaultValue = 1
    let ul = document.createElement('ul')
    let li = document.createElement('li')
    li.id = `instrument-${instrument.id}`

    let cartForm = document.createElement('form')
    cartForm.className = 'add-to-cart'
    let addToCartBtn = document.createElement('button')
    addToCartBtn.className = 'btn'
    addToCartBtn.textContent = 'Add to cart'

    cartForm.setAttribute('method', 'post')
    cartForm.setAttribute('action', 'submit')


    cartForm.append(formDiv, label, el1)

    productImageContainer.append(image)
    productDescription.append(productBrand, productModel, productPrice, productTitle, productFinish, cartForm, addToCartBtn)
    ul.append(li)
    li.append(productImageContainer,productDescription)
    
    productContainer.append(li)
    contentContainer.append(productContainer)

    addToCartBtn.addEventListener('click', (e) => buyGuitar(e))
}

function buyGuitar(e){
    fetch(LINE_ITEMS, {
        method:'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            instrument_id: parseInt(e.target.parentElement.id.split('-')[1]),
            cart_id: 1,
            quantity: parseInt(e.target.parentElement.querySelector('input').value)

        })
    })
    .then(res => res.json())
    .then(item => {
        // console.log(item)
        addIntoCart(item)
    })    
}

let homePage = document.getElementById('img-guitar')

homePage.addEventListener('click', sellPage)

function sellPage(){
    contentContainer.innerHTML = ''
    getGuitars(INSTRUMENT_URL)
}

function cartTotal(){

}

function plusOneQuantity(guitar,e){
    // debugger
    const quantity = parseInt(e.target.parentElement.parentElement.querySelectorAll('td')[5].innerText.split('')[10]) +1
    guitar.quantity = quantity
    console.log(guitar)
    makePatch(guitar)
}

// function minOneQuantity(guitar, e){
//     debugger
//     const quantity = parseInt(e.target.parentElement.parentElement.querySelectorAll('td')[5].innerText.split('')[10]) -1
//     guitar.quantity = quantity
//     console.log(guitar)
//     if (guitar.quantity == 0) {
//         debugger
//         removeGuitar(guitar, e)
//     }else{
//     makePatch(guitar)
// }}

function seperateArr(data){
    debugger

}



function updateCart(data){
    debugger
    shoppingCartContent.innerHTML= ''
    data.forEach(data => {
        
    
    const row1 = document.createElement('tr')
    row1.innerHTML = `
    <tr>
    <td>
    <img src="${data.instrument.image}" width=100>
    </td>
    <td> ${data.instrument.brand} ${data.instrument.model} </td>
    <td> <button id="remove" class="remove" data-id="${data.id}" type="button">X</td>
    <td> <button id="minus-update-cart" type="button">-</td>
    <td> <button id="plus-update-cart" type="button">+</td>
    <td> quantity: ${data.quantity} </td>
    <td> total: ${data.instrument.price}</td>
    </tr>
    `;   
    
    shoppingCartContent.append(row1);

    saveIntoStorage(data);
    })
}

function showAllCart(data){
    data.forEach(data => {
        
    
        const row1 = document.createElement('tr')
        row1.innerHTML = `
        <tr>
        <td>
        <img src="${data.instrument.image}" width=100>
        </td>
        <td> ${data.instrument.brand} ${data.instrument.model} </td>
        <td> <button id="remove" class="remove" data-id="${data.id}" type="button">X</td>
        <td> <button id="minus-update-cart" type="button">-</td>
        <td> <button id="plus-update-cart" type="button">+</td>
        <td> quantity: ${data.quantity} </td>
        <td> total: ${data.instrument.price}</td>
        </tr>
        `;   
        
        shoppingCartContent.append(row1);
    
        saveIntoStorage(data);
        })

}

function addIntoCart(guitar){
    debugger
    const row = document.createElement('tr');
    row.innerHTML= ` 
    <tr>
    <td>
    <img src="${guitar.instrument.image}" width=100>
    </td>
    <td> ${guitar.instrument.brand} ${guitar.instrument.model} </td>
    <td> <button id="remove" class="remove" data-id="${guitar.id}" type="button">X</td>
    <td> <button id="minus-update-cart" type="button">-</td>
    <td> <button id="plus-update-cart" type="button">+</td>
    <td> quantity: ${guitar.quantity} </td>
    <td> total: $ ${guitar.instrument.price}</td>
    </tr>
    `;
    shoppingCartContent.appendChild(row);

    let plusUpdate = document.getElementById('plus-update-cart')

    // let minUpdate = document.getElementById('minus-update-cart')

    let removeBtn = document.getElementById('remove')

    // minUpdate.addEventListener('click', e => {
    //     minOneQuantity(guitar, e)
    // })

    plusUpdate.addEventListener('click', e => {
        plusOneQuantity(guitar, e)
    })

    removeBtn.addEventListener('click', e => {
        removeGuitar(guitar, e)
    })
    saveIntoStorage(guitar);
}

function removeGuitar(guitar, e){
    debugger
    return fetch(`${LINE_ITEMS}/${parseInt(e.target.dataset.id)}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        e.target.parentElement.parentElement.remove()
    })
    .then(data => {
        updateCart(data)
    })
    .then(removeFromLocalStorage())
    .catch((error) => {
        console.error['Error:', error];
    })
    
}

addPhoto.addEventListener('click', () => buildCreateForm())

function addPhotoToSell() {
    console.log('it registered')
    contentContainer.innerHTML = ''

    let formItems = ['Title', 'Description', 'Brand', 'Model', 'Condition', 'Finish', 'Price', 'Image' ]

    let photoForm = document.createElement('form')
    let h3 = document.createElement('h3')
    let img = document.createElement('img')
    let p = document.createElement('p')
    let div = document.createElement('div')
    let submit = document.createElement('input')

    submit.type = 'submit'

    formItems.forEach(item => {
        let label = document.createElement('label')
        let input = document.createElement('input')
        label.for = item 
        label.textContent = item.toUpperCase()
        input.type = 'text'
        input.name = item 

        photoForm.appendChild(label)
        photoForm.appendChild(input)
    })

    photoForm.appendChild(submit)
    contentContainer.appendChild(h3, img, p, div)
    contentContainer.appendChild(photoForm)
}


    //let condArr = ['New', 'Excellent', 'Fair', 'Good' 'Used']


clearCartBtn.addEventListener('click', clearCart)


function clearCart(e){
    e.target.parentElement.remove()
}

function saveIntoStorage(guitar){
    let guitars= []
    
    guitars.push(guitar);
    
    localStorage.setItem('guitars', JSON.stringify(guitars));
    }
    
function getGuitarsFromStorage(){
    let guitars; 

    if(localStorage.getItem('guitars')===null){
        guitars=[];
    } else{
        guitars= JSON.parse(localStorage.getItem('guitars'));
    
    }
    return guitars;
}
    
function getFromLocalStorage(){
    let guitarsLS = getGuitarsFromStorage(); 

    guitarsLS.forEach(function(guitar) {
        addIntoCart(guitar)
        });
}

function removeFromLocalStorage(){
    localStorage.removeItem('guitars');
}

