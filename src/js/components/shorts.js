import Swiper, {
    Navigation,
    Pagination,
    Mousewheel,
    Keyboard
} from 'swiper';
Swiper.use([Navigation, Pagination, Mousewheel, Keyboard]);

const shorts = () => {
    const container = document.querySelector('.shorts');
    if (!container) return;
    const list = container.querySelector('.shorts__list');
    setIndex();
    const slider = new Swiper(list, {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 16,
        speed: 800,

        allowTouchMove: false,
        direction: 'vertical',
        keyboard: true,
        forceToAxis: true,
        grabCursor: true,
        navigation: {
            prevEl: container.querySelector('.shorts__prev'),
            nextEl: container.querySelector('.shorts__next'),
        },
    });
    slider.on('slideNextTransitionStart', function () {
        const video = slider.slides[slider.realIndex - 1].querySelector('.shorts__item');
        videojs(video).pause();
        videojs(video).currentTime(0);
    });
    slider.on('slidePrevTransitionStart', function () {
        const video = slider.slides[slider.realIndex + 1].querySelector('.shorts__item');
        videojs(video).pause();
        videojs(video).currentTime(0);
    });
    slider.on('slideChange', function () {
        const video = slider.slides[slider.realIndex].querySelector('.shorts__item');
        setTimeout(() => {
            videojs(video).play();
        }, 500);
    });

    let scrolling = true;
    container.addEventListener('mousewheel', (e) => {
        const y = e.wheelDelta;
        const next = container.querySelector('.shorts__next').hasAttribute('disabled');
        const prev = container.querySelector('.shorts__prev').hasAttribute('disabled');
        if (scrolling) {
            scrolling = false;
            if (y > 0 && !prev) {
                e.preventDefault();
                slider.slidePrev();
            }
            if (y <= 0 && !next) {
                e.preventDefault();
                slider.slideNext();
            }
            setTimeout(() => {
                scrolling = true;
            }, 500);
        }
    })


    function setIndex() {
        const shorts = list.querySelectorAll('.short');
        shorts.forEach((item, index) => {
            item.setAttribute('data-short-index', index);
        })
    }
};

export default shorts;
