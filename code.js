document.getElementById("ratings-see-more").addEventListener("click", () => { // load more rating comments
    document.getElementById("rating-card-hidden").style.display = "block";
    document.getElementById("ratings-see-more").style.display = "none";

})

document.addEventListener('DOMContentLoaded', () => { // load entire html content before showing slideshow
    const SLIDETIME = 500; //ms
    const backButton = document.querySelector('.wbn-slider-back-btn');
    const forwardButton = document.querySelector('.wbn-slider-next-btn');
    const allSlides = [...document.querySelectorAll('.wbn-slide')]; // Select all slides and convert node to array for easy handling
    let clickable = true;
    let active = null;
    let newActive = null;
  
    function initSlider() {
        allSlides.forEach(slide => 
            slide.setAttribute('style',`transition: transform ${SLIDETIME}ms ease;animation-duration: ${SLIDETIME}ms`,),);
    }
  
    function changeSlide(forward) {
        if (clickable) {
            clickable = false;
            active = document.querySelector('.active');
            const activeSlideIndex = allSlides.indexOf(active);
    
            if (forward) { // button next slide
                newActive = allSlides[(activeSlideIndex + 1) % allSlides.length];
                active.classList.add('slideOutLeft'); // reset actual slide class
                newActive.classList.add('slideInRight', 'active'); // set next slide class
            } else { // button previous slide
                newActive = allSlides[(activeSlideIndex - 1 + allSlides.length) % allSlides.length];
                active.classList.add('slideOutRight'); // reset actual slide class
                newActive.classList.add('slideInLeft', 'active'); // set previous slide class
            }
        }
    }
    
    allSlides.forEach(slide => {
        slide.addEventListener('transitionend', e => {
            // Check for the old active transition and if clickable is false
            // to not trigger it more than once
            if (slide === active && !clickable) {
                clickable = true;
                active.className = 'wbn-slide'; // Remove all CSS animation classes on old active
            }
        });
    });
    
    //Event listeners
    forwardButton.addEventListener('click', () => {
      changeSlide(true);
    });
    backButton.addEventListener('click', () => {
      changeSlide(false);
    });
  
    initSlider(); // call Init function
});