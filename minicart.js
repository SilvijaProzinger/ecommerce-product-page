const minicart = (function(){
    const products = [
        {
            id: "0",
            name: 'Fall Limited Edition Sneakers',
            price: 125.00
        }
    ]

      decreaseQtyButton = document.getElementById('decreaseQty')
      increaseQtyButton = document.getElementById('increaseQty')
      qtyInput = document.querySelector("input[name='quantity']")
      addToCartButton = document.querySelector('.button__add-to-cart')
      minicartBody = document.getElementById('minicartContainer')
      minicartButton = document.getElementById('showCart')
      deleteFromCartButton = document.querySelector('.button__delete-item')
      cart = []

let selectedQuantity = parseInt(qtyInput.value)

function SelectedProduct (id, name, price, qty, total) {
    this.id = id
    this.name = name
    this.price = price
    this.qty = qty
    this.total = total
}

const toggleMinicart = () => {
    minicartBody.style.visibility = 'visible'
    if (minicartBody.classList.contains('minicart__hidden')){
        minicartBody.classList.add('minicart__active')
        minicartBody.classList.remove('minicart__hidden')
        isMinicartEmpty()
    } else {
        minicartBody.classList.remove('minicart__active')
        minicartBody.classList.add('minicart__hidden')
    }

    if (cart.length !== 0){
        document.querySelector('.minicart__qty-badge').style.display = 'block'
        document.querySelector('.minicart__qty-badge').innerHTML = selectedQuantity
    } else {
        document.querySelector('.minicart__qty-badge').style.display = 'none'
    }

}

minicartButton.addEventListener('click', toggleMinicart)

const isMinicartEmpty = () => {
    if (cart.length === 0) {
        document.getElementById('cartEmpty').style.display = 'block'
        document.getElementById('cartFull').style.display = 'none'
        minicartButton.classList.remove('button__minicart-active')
    } else {
        document.getElementById('cartEmpty').style.display = 'none'
        document.getElementById('cartFull').style.display = 'block'
        minicartButton.classList.add('button__minicart-active')
        showMinicartContent()
    }
}

const showMinicartContent = () => {
   cart.forEach(item => {
    document.querySelector('.cart__product-name').innerHTML = item.name;
    document.querySelector('.cart__product-price-val').innerHTML = item.price
    document.querySelector('.cart__product-qty-val').innerHTML = item.qty
    document.querySelector('.cart__product-total-val').innerHTML = item.total
   })
}

decreaseQtyButton.addEventListener('click', function selectQty() { 
        qtyInput.stepDown()
        selectedQuantity--
    }
)

increaseQtyButton.addEventListener('click', function selectQty() {
        qtyInput.stepUp()
        selectedQuantity++
    }
)

const updateCart = (productId, quantity, total) => {
    let productToUpdate = cart.find(item => {
        return item.id === productId
    })
    productToUpdate.qty = quantity
    productToUpdate.total = total
    toggleMinicart()
}

const deleteItemFromCart = e => {
    document.querySelector('.minicart__qty-badge').style.display = 'none'
    cart.splice(cart.findIndex(product => product.id === Number(e.currentTarget.id)), 1);
    isMinicartEmpty()
}

const addToCart = e => {
    const productId = e.currentTarget.id
    const productName = products[productId].name
    const price = products[productId].price
    const quantity = selectedQuantity
    const total = selectedQuantity * price
    const addedProduct = new SelectedProduct(productId, productName, price, quantity, total)
    
    const indexOfAddedProduct = cart.findIndex(object => object.id === addedProduct.id)

    //add product to cart if it's not already added or update quantity and total if it is   
    if (indexOfAddedProduct === -1) {
        cart.push(addedProduct);
        toggleMinicart()
    } else {
        updateCart(productId, quantity, total)
    }
}

addToCartButton.addEventListener('click', addToCart)
deleteFromCartButton.addEventListener('click', deleteItemFromCart)
})()




