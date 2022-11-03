const mobileResolution = window.matchMedia("(max-width: 1023px)")
      menu = document.getElementById('menu')
      openMenuButton = document.getElementById('openMenu')
      closeMenuButton = document.getElementById('closeMenu')
      menuOverlay = document.getElementById('menuOverlay')
      minicart = document.getElementById('minicartContainer')
      minicartButton = document.getElementById('showCart')
      decreaseQtyButton = document.getElementById('decreaseQty')
      increaseQtyButton = document.getElementById('increaseQty')
      addToCartButton = document.getElementById('addToCart')
      cart = []

let selectedQuantity = 1;

function Product(name, price, qty, total) {
    this.name = name;
    this.price = price;
    this.qty = qty;
    this.total = total;
}

const toggleMobileMenu = () => {
    if (menu.classList.contains('menu__active')){
        menu.classList.add('menu__hidden')
        menu.classList.remove('menu__active')
        menuOverlay.classList.remove('menu__overlay__active')

    } else {
        menu.classList.add('menu__active')
        menu.classList.remove('menu__hidden')
        menuOverlay.classList.add('menu__overlay__active')
    }
}

openMenuButton.addEventListener('click', toggleMobileMenu)
closeMenuButton.addEventListener('click', toggleMobileMenu)

menuOverlay.addEventListener('click', function(e){
    const isOutside = !e.target.closest('.menu')
    //close mobile menu when clicking outside of it
    if (isOutside){
        menu.classList.add('menu__hidden')
        menu.classList.remove('menu__active')
        menuOverlay.classList.remove('menu__overlay__active')
    }
})

//if resolution is mobile and the menu is not hidden hide it otherwise show it on desktop
const mobileOrDesktopMenu = () => {
    if (mobileResolution.matches) {
       if (!menu.classList.contains('menu__hidden')){
            menu.classList.add('menu__hidden')
       }
    } else {
        menu.classList.remove('menu__hidden')
    } 
}

window.addEventListener('load', mobileOrDesktopMenu)
window.addEventListener('resize', mobileOrDesktopMenu)

const toggleMinicart = () => {
    if (minicart.classList.contains('minicart__hidden')){
        minicart.classList.add('minicart__active')
        minicart.classList.remove('minicart__hidden')
        minicartButton.classList.add('button__minicart-active')
    } else {
        minicart.classList.remove('minicart__active')
        minicart.classList.add('minicart__hidden')
        minicartButton.classList.remove('button__minicart-active')
    }
}

minicartButton.addEventListener('click', toggleMinicart)

decreaseQtyButton.addEventListener('click', function selectQty() {
        const qtyInput = document.querySelector("input[name='quantity']")
        qtyInput.stepDown()
        updateCart(qtyInput.value)
    }
)

increaseQtyButton.addEventListener('click', function selectQty() {
        const qtyInput = document.querySelector("input[name='quantity']")
        qtyInput.stepUp()
        updateCart(qtyInput.value)
    }
)

const updateCart = (qty) => {
    console.log(qty)
    selectedQuantity = qty;
}


function Product(name, price, qty, total) {
    this.name = name
    this.price = price
    this.qty = qty
    this.total = total
}

const addToCart = () => {
    const productName = document.querySelector('.product__name').textContent
    const price = parseFloat(document.querySelector('.current__price').textContent.substring(1))
    const quantity = selectedQuantity
    const total = selectedQuantity * price

    const addedProduct = new Product(productName, price, quantity, total)
    const indexOfAddedProduct = cart.findIndex(object => object.id === addedProduct.id)

    //add product to cart array if it doesn't already exist
    if (indexOfAddedProduct === -1) {
        cart.push(addedProduct);
    }

    console.log(addedProduct, cart.length)
}

addToCartButton.addEventListener('click', addToCart)



   




