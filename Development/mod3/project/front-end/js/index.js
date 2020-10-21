// http://localhost:3000/instruments

const BASE_URL = "http://localhost:3000"
const INSTRUMENT_URL = `${BASE_URL}/instruments`
const LINE_ITEMS = `${BASE_URL}/line_items`

let showCart = false

const shoppingCartContent = document.querySelector('#cart-content tbody')
const clearCartBtn = document.getElementById('clear-cart')
const cart = document.getElementById('img-cart')
const addPhoto = document.getElementById('img-photo')
const cartWindow = document.getElementById('shopping-cart')

document.addEventListener('DOMContentLoaded', getFromLocalStorage);

const contentContainer = document.getElementById('content')
const productContainer = document.getElementById('products')
const footerContainer = document.getElementById('site-info')

getGuitars(INSTRUMENT_URL)

function toggleMenu(x) {
    x.classList.toggle("change");
    let y = document.getElementById('panel')
    if (y.style.display === 'block'){
        y.style.display = 'none';
    } else {
        y.style.display = 'block';
    }
}

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

function buildGuitar(instrument){
    // debugger
    let productImageContainer = document.createElement('div')
    productImageContainer.className = 'product-image'
    let image = document.createElement('img')
    image.src = instrument.image
    let productDescription = document.createElement('div')
    productDescription.className = 'product-description'
    productDescription.id = `instrument-${instrument.id}`
    productDescription.textContent = instrument.name
    let productName = document.createElement('h3')//.textContent = instruments.description
    productName.className = 'product-name'
    productName.textContent = instrument.description
    let productModel = document.createElement('h3')//.textContent = instrument.model
    productModel.className = 'product-model'
    productModel.textContent = instrument.model
    let productBrand = document.createElement('h3')//.textContent = instrument.brand
    productBrand.className = 'product-brand'
    productBrand.textContent = instrument.brand
    let productFinish = document.createElement('h3')//.textContent = instrument.finish
    productFinish.className = 'product-finish'
    productFinish.textContent = instrument.finish
    const productPrice = document.createElement('p')//.textContent = instrument.price
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
    productDescription.append(productBrand, productModel, productName, productPrice, productTitle, productFinish, cartForm, addToCartBtn)
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
        addIntoCart(item)
    })    
}

let homePage = document.getElementById('img-guitar')

homePage.addEventListener('click', sellPage)

function sellPage(){
    contentContainer.innerHTML = ''
    getGuitars(INSTRUMENT_URL)
}

function getGuitarInfo(guitar){
    const guitarInfo={

        image: guitar.querySelector('img').src,
        title: guitar.querySelector('h3').textContent,
        price: guitar.querySelector('product-price').textContent,
        id: guitar.querySelector('li').getAttribute('li.id')

    }
    addIntoCart(guitarInfo);
}

function addIntoCart(guitar){
    // debugger
    const row = document.createElement('tr');
    row.innerHTML= ` 
    <tr>
    <td>
    <img src="${guitar.instrument.image}" width=100>
    </td>
    <td> ${guitar.instrument.brand} ${guitar.instrument.model} </td>
    <td> ${guitar.instrument.price} </td>
    <td> <a href ="#" class="remove" data-id="${guitar.instrument.id}">X</a></td>
    </tr>
    `;
    shoppingCartContent.appendChild(row);

    // saveIntoStorage(guitar);

    shoppingCartContent.addEventListener('click', removeGuitar)
}

function removeGuitar(guitar){
    guitar.target.parentElement.parentElement.remove()
}

addPhoto.addEventListener('click', addPhotoToSell)

function addPhotoToSell() {
    console.log('it registered')
    contentContainer.innerHTML = ''

    //let condArr = ['New', 'Excellent', 'Fair', 'Good' 'Used']
    let photoForm = document.createElement('form')
    // let photoDiv = document.createElement('div')
    // let photoLabel = document.createElement('label')
    let titleEl = document.createElement('input')
    let brandEl = document.createElement('input')
    let modelEl = document.createElement('input')
    let descriptionEl = document.createElement('input')
    let conditionEl = document.createElement('input')
    let finishEl = document.createElement('input')
    let priceEl = document.createElement('input')
    let imageEl = document.createElement('input')
    let addPhotoBtn = document.createElement('button')

    //[...select.condArr].filter(option => option.selected).map(option => option.value)

    photoForm.setAttribute('id', 'photoForm')
    contentContainer.appendChild(photoForm)

    titleEl.setAttribute('type', 'text')
    titleEl.setAttribute('value', 'title')
    titleEl.className = 'add-photo-title'
    brandEl.setAttribute('type', 'text')
    brandEl.setAttribute('value', 'brand')
    brandEl.className = 'add-photo-brand'
    modelEl.setAttribute('type', 'text')
    modelEl.setAttribute('value', 'model')
    modelEl.className = 'add-photo-model'
    descriptionEl.setAttribute('type', 'text')
    descriptionEl.setAttribute('value', 'description')
    descriptionEl.className = 'add-photo-description'
    conditionEl.setAttribute('type', 'text')
    conditionEl.setAttribute('value', 'condition')
    conditionEl.className = 'add-photo-condition'
    finishEl.setAttribute('type', 'text')
    finishEl.setAttribute('value', 'finish')
    finishEl.className = 'add-photo-finish'
    priceEl.setAttribute('type', 'text')
    priceEl.setAttribute('value', 'price')
    priceEl.className = 'add-photo-price'
    imageEl.setAttribute('type', 'text')
    imageEl.setAttribute('value', 'image url')
    imageEl.className = 'add-photo-image'
    contentContainer.append(titleEl, brandEl, modelEl, descriptionEl, conditionEl, finishEl, priceEl, imageEl, addPhotoBtn)

    titleEl.addEventListener

}

clearCartBtn.addEventListener('click', clearCart)

function clearCart(e){
    shoppingCartContent.innerHTML = ''
}

function saveIntoStorage(guitar){

    let guitars= getGuitarsFromStorage();
    
    guitars.push(guitar);
    
    localStorage.setItem('guitars', JSON.stringify(guitars));
    }
    
    function getGuitarsFromStorage(){
        let guitars; 
    
        if(localStorage.getItem('guitars')===null){
            guitars=[];
        } else{
            guitar= JSON.parse(localStorage.getItem('guitars'));
        
        }
        return guitars;
    }
    
    function getFromLocalStorage(){
        let guitarsLS= getCoursesFromStorage(); 
    
    
        guitarsLS.forEach(function(guitar) {
    
    
            const row= document.createElement('tr');
            row.innerHTML= ` 
            <tr>
            <td>
            <img src="${guitar.instrument.image}" width=100>
            </td>
            <td> ${guitar.instrument.brand} ${guitar.instrument.model} </td>
            <td> ${guitar.instrument.price} </td>
            <td> <a href ="#" class="remove" data-id="${guitar.instrument.id}">X</a></td>
            </tr>
        `;
            shoppingCartContent.appendChild(row);
         }); 
    
    }

