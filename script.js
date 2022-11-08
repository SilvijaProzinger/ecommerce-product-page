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
      productImagesThumbnails = Array.from(document.getElementById('productImagesThumbnails').children)
      galleryImagesThumbnails = Array.from(document.getElementById('productGalleryThumbnails').children)
      closeGalleryButton = document.getElementById('closeGallery')
      previousGalleryButton = document.getElementById('prevGallery')
      nextGalleryButton = document.getElementById('nextGallery')
      allThumbnails = Array.from(document.querySelectorAll('.thumbnail__img'))

let selectedQuantity = 1
    mainImage = document.getElementById('mainImg')
    mainImageGallery = document.getElementById('mainImgGallery')
    imageCounter = 0

function Product (name, price, qty, total) {
    this.name = name;
    this.price = price;
    this.qty = qty;
    this.total = total;
}

const toggleMobileMenu = () => {
    menu.style.visibility = 'visible'
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
    minicart.style.visibility = 'visible'
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
    if (!mobileResolution.matches){
        document.getElementById('productGallery').style.display = 'flex'
    }
}

const closeLightBox = () => {
    if (!mobileResolution.matches){
        document.getElementById('productGallery').style.display = 'none'
    } else {
        document.getElementById('productGallery').style.display = 'block'
    }
}

mainImage.addEventListener('click', openLightBox)
closeGalleryButton.addEventListener('click', closeLightBox)

productImagesThumbnails.forEach(function toggleByThumbnails(thumbnail,index){
    thumbnail.addEventListener('click', function(){
        const thumbnailSrc = thumbnail.getAttribute('src')
        const selectedImageSrc = thumbnailSrc.replace('-thumbnail','')
        mainImage.src = selectedImageSrc
        mainImageGallery.src = selectedImageSrc
        imageCounter = index

        toggleActiveThumbnailClass(thumbnail,index)
    })      
})

galleryImagesThumbnails.forEach(function toggleByThumbnailsGallery(thumbnail,index){
    thumbnail.addEventListener('click', function(){ 
        const thumbnailSrc = thumbnail.getAttribute('src')
        const selectedImageSrc = thumbnailSrc.replace('-thumbnail','')
        mainImageGallery.src = selectedImageSrc
        imageCounter = index

        toggleActiveThumbnailClass(thumbnail,index)
    })      
})

const toggleActiveThumbnailClass = (thumbnail,index) => {
    let thumbnailGroup

    //toggle active class based on whether the thumbnail is in gallery or not
    if (thumbnail.parentElement === document.getElementById('productImagesThumbnails')){
        thumbnailGroup = productImagesThumbnails
    } else {
        thumbnailGroup = galleryImagesThumbnails
    }
    for (let i=0; i < thumbnailGroup.length; i++){
        if (i === index){
            thumbnailGroup[i].classList.add('active')
        } else {
            thumbnailGroup[i].classList.remove('active')
        }
    }
}

const previousImage = () => {
    imageCounter--
    if (imageCounter < 0){
        imageCounter = 3
    }
    mainImageGallery.src = `./images/image-product-${imageCounter+1}.jpg`

    toggleActiveThumbnailClass(galleryImagesThumbnails, imageCounter)
}

const nextImage = () => {
    imageCounter++
    if (imageCounter > 3){
        imageCounter = 0
    }
    mainImageGallery.src = `./images/image-product-${imageCounter+1}.jpg`
    
    toggleActiveThumbnailClass(galleryImagesThumbnails, imageCounter)  
}

previousGalleryButton.addEventListener('click', previousImage)
nextGalleryButton.addEventListener('click', nextImage)