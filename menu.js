const menu = (function(){
    const mobileResolution = window.matchMedia("(max-width: 1023px)")
        menuBody = document.getElementById('menu')
        openMenuButton = document.getElementById('openMenu')
        closeMenuButton = document.getElementById('closeMenu')
        menuOverlay = document.getElementById('menuOverlay')

    const toggleMobileMenu = () => {
        menuBody.style.visibility = 'visible'
        if (menuBody.classList.contains('menu__active')){
            menuBody.classList.add('menu__hidden')
            menuBody.classList.remove('menu__active')
            menuOverlay.classList.remove('menu__overlay__active')

        } else {
            menuBody.classList.add('menu__active')
            menuBody.classList.remove('menu__hidden')
            menuOverlay.classList.add('menu__overlay__active')
        }
    }
    
    openMenuButton.addEventListener('click', toggleMobileMenu)
    closeMenuButton.addEventListener('click', toggleMobileMenu)
    
    const closeMenuWhenClickingOutside = e => {
        const isOutside = !e.target.closest('.menu')
        //close mobile menu when clicking outside of it
        if (isOutside){
            menuBody.classList.add('menu__hidden')
            menuBody.classList.remove('menu__active')
            menuOverlay.classList.remove('menu__overlay__active')
        }
    }
    
    menuOverlay.addEventListener('click', closeMenuWhenClickingOutside)
    
    //if resolution is mobile and the menu is not hidden hide it otherwise show it on desktop
    const mobileOrDesktopMenu = () => {
        if (mobileResolution.matches) {
           if (!menuBody.classList.contains('menu__hidden')){
                menuBody.classList.add('menu__hidden')
           }
        } else {
            menuBody.classList.remove('menu__hidden')
        } 
    }
    
    window.addEventListener('load', mobileOrDesktopMenu)
    window.addEventListener('resize', mobileOrDesktopMenu)
})()