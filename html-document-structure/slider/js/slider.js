const sliderNav = document.querySelector('.slider-nav');
const slides = document.querySelectorAll('.slide');

function init() {
    slides[0].classList.add('slide-current');
    updateBtnState();
}

function handleNextBtnClick(event) {
    const currentSlide = document.querySelector('.slide-current');
    const nextSlide = currentSlide.nextElementSibling;
    const prevSlide = currentSlide.previousElementSibling;
    
    switch(event.target.dataset.action) {
        case 'next':
            nextSlide.classList.add('slide-current');
            break;
        case 'prev':
            prevSlide.classList.add('slide-current');
            break;
        case 'first':
            currentSlide.parentElement.firstElementChild.classList.add('slide-current');
            break;
        case 'last':
            currentSlide.parentElement.lastElementChild.classList.add('slide-current');
            break;
    }

    currentSlide.classList.remove('slide-current');
    updateBtnState();
}

function disableBtns(...arguments) {
    for (btn of sliderNav.children) {
        for (dataActionName of arguments) {
            if (btn.dataset.action === dataActionName) {
                btn.classList.add('disabled');
                btn.removeEventListener('click', handleNextBtnClick);
            }
        }
    }
}

function updateBtnState() {
    const currentSlide = document.querySelector('.slide-current');
    const isCurrentSlideFirst = !(currentSlide.previousElementSibling);
    const isCurrentSlideLast = !(currentSlide.nextElementSibling);

    Array.from(sliderNav.children).forEach(btn => {
        btn.classList.remove('disabled');
        btn.addEventListener('click', handleNextBtnClick);
    });

    if (isCurrentSlideFirst) {
        disableBtns('prev', 'first');
    }

    if (isCurrentSlideLast) {
        disableBtns('next', 'last');
    }
};

init();