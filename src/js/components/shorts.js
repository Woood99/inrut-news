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
        mousewheel: true,
        keyboard: true,
        forceToAxis: true,
        navigation: {
            prevEl: container.querySelector('.shorts__prev'),
            nextEl: container.querySelector('.shorts__next'),
        },
    });



    function setIndex() {
        const shorts = list.querySelectorAll('.short');
        shorts.forEach((item, index) => {
            item.setAttribute('data-short-index', index);
        })
    }
};

export default shorts;
