const lightboxGallery = (function(){
    const productImagesThumbnails = Array.from(document.getElementById('productImagesThumbnails').children)
    galleryImagesThumbnails = Array.from(document.getElementById('productGalleryThumbnails').children)
    closeGalleryButton = document.getElementById('closeGallery')
    previousGalleryButton = document.getElementById('prevGallery')
    nextGalleryButton = document.getElementById('nextGallery')
    allThumbnails = Array.from(document.querySelectorAll('.thumbnail__img'))
    qtyInput = document.querySelector("input[name='quantity']")
    mainImage = document.getElementById('mainImg')
    mainImageGallery = document.getElementById('mainImgGallery')
    imageCounter = 0
    mobileResolution = window.matchMedia("(max-width: 1023px)")

const openLightBox = () => {
    if (!mobileResolution.matches){
        document.querySelector('body').classList.add('noscroll')
        document.getElementById('productGallery').classList.add('gallery__active__desktop')
        document.getElementById('productGallery').classList.remove('gallery__inactive')
    }
}

const closeLightBox = () => {
    if (!mobileResolution.matches){
        document.getElementById('productGallery').classList.add('gallery__inactive')
        document.getElementById('productGallery').classList.remove('gallery__active__desktop')
        document.querySelector('body').classList.remove('noscroll')
    } else {
        document.getElementById('productGallery').classList.add('gallery__active__mobile')
    }
}

window.addEventListener('resize', closeLightBox)

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

const mobileOrDestkopGallery = () => {
    if (mobileResolution.matches) {
        document.getElementById('productGallery').classList.add('gallery__active__mobile')
        document.getElementById('productGallery').classList.remove('gallery__inactive')
    } else {
        document.getElementById('productGallery').classList.add('gallery__inactive')
        document.getElementById('productGallery').classList.remove('gallery__active__mobile')
    } 
}

window.addEventListener('resize', mobileOrDestkopGallery)

previousGalleryButton.addEventListener('click', previousImage)
nextGalleryButton.addEventListener('click', nextImage)
})()
