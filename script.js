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
      deleteFromCartButton = document.getElementById('deleteFromCart')
      cart = []
      productImagesThumbnails = Array.from(document.querySelectorAll('.thumbnail__img'))
      closeGalleryButton = document.getElementById('closeGallery')
      previousGalleryButton = document.getElementById('prevGallery')
      nextGalleryButton = document.getElementById('nextGallery')

let selectedQuantity = 1
    mainImage = document.getElementById('mainImg')
    mainImageGallery = document.getElementById('mainImgGallery')
    imageCounter = 1

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

const closeMenuWhenClickingOutside = e => {
    const isOutside = !e.target.closest('.menu')
    //close mobile menu when clicking outside of it
    if (isOutside){
        menu.classList.add('menu__hidden')
        menu.classList.remove('menu__active')
        menuOverlay.classList.remove('menu__overlay__active')
    }
}

menuOverlay.addEventListener('click', closeMenuWhenClickingOutside)

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
        isMinicartEmpty()
    } else {
        minicart.classList.remove('minicart__active')
        minicart.classList.add('minicart__hidden')
        minicartButton.classList.remove('button__minicart-active')
    }
}

minicartButton.addEventListener('click', toggleMinicart)

const isMinicartEmpty = () => {
    if (cart.length === 0) {
        document.getElementById('cartEmpty').style.display = 'block'
        document.getElementById('cartFull').style.display = 'none'
    } else {
        document.getElementById('cartEmpty').style.display = 'none'
        document.getElementById('cartFull').style.display = 'block'
        showMinicartContent()
    }
}

const showMinicartContent = () => {
   document.querySelector('.cart__product-name').innerHTML = cart[0].name;
   document.querySelector('.cart__product-price-val').innerHTML = cart[0].price
   document.querySelector('.cart__product-qty-val').innerHTML = cart[0].qty
   document.querySelector('.cart__product-total-val').innerHTML = cart[0].total
}

decreaseQtyButton.addEventListener('click', function selectQty() {
        const qtyInput = document.querySelector("input[name='quantity']")
        qtyInput.stepDown()
        selectedQuantity = parseInt(qtyInput.value);
    }
)

increaseQtyButton.addEventListener('click', function selectQty() {
        const qtyInput = document.querySelector("input[name='quantity']")
        qtyInput.stepUp()
        selectedQuantity = parseInt(qtyInput.value);
    }
)

const updateCart = (quantity, total) => {
    cart[0].qty = quantity
    cart[0].total = total
    toggleMinicart()
}

const deleteItemFromCart = () => {
    cart.length = 0
    isMinicartEmpty()
}

const addToCart = () => {
    const productName = document.querySelector('.product__name').textContent
    const price = parseFloat(document.querySelector('.current__price').textContent.substring(1))
    const quantity = selectedQuantity
    const total = selectedQuantity * price

    const addedProduct = new Product(productName, price, quantity, total)
    const indexOfAddedProduct = cart.findIndex(object => object.id === addedProduct.id)

    //add product to cart array if it doesn't already exist or update quantity and total if it does
   if (indexOfAddedProduct === -1) {
       cart.push(addedProduct);
       toggleMinicart()
    } else if (indexOfAddedProduct !== 1){
        updateCart(quantity, total)
    }
}

addToCartButton.addEventListener('click', addToCart)
deleteFromCart.addEventListener('click', deleteItemFromCart)

const openLightBox = () => {
    document.getElementById('productGallery').style.display = 'block'
}

const closeLightBox = () => {
    document.getElementById('productGallery').style.display = 'none'
}

mainImage.addEventListener('click', openLightBox)
closeGalleryButton.addEventListener('click', closeLightBox)

const toggleByThumbnails = e => {
    const thumbnail = e.target
    const thumbnailSrc = thumbnail.getAttribute('src')
    const selectedImageSrc = thumbnailSrc.replace('-thumbnail','')
    mainImage.src = selectedImageSrc

    toggleActiveThumbnailClass(thumbnailSrc)
}

const toggleActiveThumbnailClass = thumbnailSrc => {
    for (let i=0; i<productImagesThumbnails.length; i++){
        if (productImagesThumbnails[i].getAttribute('src') === thumbnailSrc){
            productImagesThumbnails[i].classList.add('active')
        } else {
            productImagesThumbnails[i].classList.remove('active')
        }
    }
}

productImagesThumbnails.forEach(function(thumbnail){
    thumbnail.addEventListener('click', toggleByThumbnails)      
})

const previousImage = () => {
    console.log(imageCounter)
    imageCounter--
    if (imageCounter < 1){
        imageCounter = 4
    }
    console.log(imageCounter)
    mainImageGallery.src = `./images/image-product-${imageCounter}.jpg`
}

const nextImage = () => {
    console.log(imageCounter)
    imageCounter++
    if (imageCounter > 4){
        imageCounter = 1
    }
    console.log(imageCounter)
    mainImageGallery.src = `./images/image-product-${imageCounter}.jpg`
}

previousGalleryButton.addEventListener('click', previousImage)
nextGalleryButton.addEventListener('click', nextImage)