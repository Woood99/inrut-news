import modal from '../modules/modal';

import Swiper, {
    Navigation,
} from 'swiper';
Swiper.use([Navigation]);

const reviewModal = () => {

    const triggers = document.querySelectorAll('[data-review-modal]');
    if (triggers.length <= 0) return;
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.closest('.review-item');
            const sliderItems = item.querySelectorAll('.review-item__photo .swiper-slide');
            let slideHTML = '';
            const sliderBtnsNavHTML = `
            <button type="button"
            class="btn btn-reset review-slider-body__navigation nav-arrow-primary nav-arrow-primary--prev">
            <div class="nav-arrow-primary__wrapper">
                <svg>
                    <use xlink:href="./img/sprite.svg#arrow-right"></use>
                </svg>
            </div>
        </button>
        <button type="button"
            class="btn btn-reset review-slider-body__navigation nav-arrow-primary nav-arrow-primary--next">
            <div class="nav-arrow-primary__wrapper">
                <svg>
                    <use xlink:href="./img/sprite.svg#arrow-right"></use>
                </svg>
            </div>
        </button>
            `
            sliderItems.forEach(el => {
                slideHTML += `
                <div class="swiper-slide">
                    ${el.innerHTML}
                </div>
                `;
            });
            const sliderHTML = `
            <div class="swiper review-modal-content__slider">
                <div class="swiper review-modal-content__slider-wrapper">
                    <div class="swiper-wrapper">
                        ${slideHTML}
                    </div>
                    ${sliderBtnsNavHTML}
                </div>
            </div>
            `;
            let modalHTML = '';
            modalHTML = `
            <div class="review-modal">
            <div class="review-modal__container">
                <button class="btn-reset review-modal__close" aria-label="Закрыть модальное окно">
                    <svg>
                        <use xlink:href="./img/sprite.svg#x"></use>
                    </svg>
                    <span>Закрыть</span>
                </button>
                 <div class="review-modal__content review-modal-content">
                     <h2 class="review-modal-content__title title-2">
                         Отзыв клиента
                     </h2>
                     <div class="review-modal-content__container ${sliderItems.length >= 1 ? '' : '_no-slider'}">
                         <div class="review-modal-content__body">
                            ${item.outerHTML}
                         </div>
                            ${sliderItems.length >= 1 ? sliderHTML : ''}
                         <div class="review-modal-content__mobile">
                            ${item.querySelector('.review-item__answer') ? item.querySelector('.review-item__answer').outerHTML : ''}
                            ${item.querySelector('.review-item__bottom') ? item.querySelector('.review-item__bottom').outerHTML : ''}
                         </div>
                     </div>
                 </div>
            </div>
            </div>
            `;
            modal(modalHTML, '.review-modal', 300);
            if (document.querySelector('.review-modal-content__slider')) {
                const slider = new Swiper('.review-modal-content__slider-wrapper', {
                    observer: true,
                    observeParents: true,
                    slidesPerView: 1,
                    spaceBetween: 8,
                    speed: 500,
                    navigation: {
                        prevEl: document.querySelector('.review-modal-content .nav-arrow-primary--prev'),
                        nextEl: document.querySelector('.review-modal-content .nav-arrow-primary--next'),
                    }
                });
            }
        });
    })
};


export default reviewModal;
