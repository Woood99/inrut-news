import Swiper, {
    Navigation,
    Pagination,
} from 'swiper';
Swiper.use([Navigation, Pagination]);
import metroItems from './metroItems';
import {
    _slideDown,
    _slideUp
} from '../support-modules/slide'
import modal from '../modules/modal';
export const cardSecondaryActions = () => {
    const cards = document.querySelectorAll('.card-secondary');
    if (cards.length === 0) return;
    cards.forEach(card => {

        const imageSwitchItems = card.querySelectorAll('.card-secondary__item');
        const imagePagination = card.querySelector('.card-secondary__pagination');


        if (window.innerWidth > 1212 && imageSwitchItems.length > 1) {
            imageSwitchItems.forEach((el, index) => {
                el.setAttribute('data-index', index);
                if (card.querySelector('.card-secondary__item--limit')) {
                    if (index !== imageSwitchItems.length - 1) {
                        imagePagination.innerHTML += `<li class="image-pagination__item ${index == 0 ? 'image-pagination__item--active' : ''}" data-index="${index}"></li>`;
                    }
                } else {
                    imagePagination.innerHTML += `<li class="image-pagination__item ${index == 0 ? 'image-pagination__item--active' : ''}" data-index="${index}"></li>`;
                }
                el.addEventListener('mouseenter', (e) => {
                    if (window.innerWidth > 1212) {
                        card.querySelectorAll('.image-pagination__item').forEach(el => el.classList.remove('image-pagination__item--active'));
                        if (el.classList.contains('card-secondary__item--limit')) {
                            card.querySelector(`.image-pagination__item[data-index="${e.currentTarget.dataset.index - 1}"]`).classList.add('image-pagination__item--active');
                        } else {
                            card.querySelector(`.image-pagination__item[data-index="${e.currentTarget.dataset.index}"]`).classList.add('image-pagination__item--active');
                        }
                    }
                });

                el.addEventListener('mouseleave', (e) => {
                    if (window.innerWidth > 1212) {
                        card.querySelectorAll('.image-pagination__item').forEach(el => {
                            el.classList.remove('image-pagination__item--active')
                        });
                        card.querySelector(`.image-pagination__item[data-index="0"]`).classList.add('image-pagination__item--active');
                    }
                });

            });
        }
        cardSliderMobile(card.querySelector('.card-secondary__top'), card.querySelector('.card-secondary__images'), card.querySelectorAll('.card-secondary__item'));
        card.addEventListener('click', (e) => {
            const favorite = e.target.closest('.card-secondary__info--favorite');
            if (favorite && !(favorite.dataset.popupPath && favorite.dataset.popupPath === 'favorite-two')) {
                e.preventDefault();
                card.querySelectorAll('.card-secondary__info--favorite').forEach(el => {
                    if (!el.classList.contains('_active')) {
                        el.classList.add('_active');
                        el.setAttribute('title', 'Удалить с избранного');
                        el.querySelector('svg use').setAttribute('xlink:href', 'img/sprite.svg#favorite');
                    } else {
                        el.classList.remove('_active');
                        el.setAttribute('title', 'Добавить в избранное');
                        el.querySelector('svg use').setAttribute('xlink:href', 'img/sprite.svg#favorite-stroke');
                    }
                });
            }
            const tooltip = e.target.closest('.secondary-tooltip');
            if (tooltip && window.innerWidth <= 1212) {
                e.preventDefault();
                const content = tooltip.querySelector('.secondary-tooltip__content');
                const modalHTML = `
                <div class="tooltip-modal">
                    <div class="tooltip-modal__container">
                        <button class="btn-reset tooltip-modal__close" aria-label="Закрыть модальное окно">
                            <svg>
                                <use xlink:href="./img/sprite.svg#x"></use>
                            </svg>
                            <span>Закрыть</span>
                        </button>
                        <div class="tooltip-modal__content">
                            ${content.innerHTML}
                        </div>
                    </div>
                </div>
                `;
                modal(modalHTML, '.tooltip-modal', 300);
                const tooltipModal = document.querySelector('.tooltip-modal');
                tooltipModal.classList.add('_card-tooltip-options');
            }
        })

    })
    favoriteMobile();
    tagsMobile();
    tagsTwoMobile();
    cardSecondaryMetro();
    window.addEventListener('resize', () => {
        favoriteMobile();
        tagsMobile();
        tagsTwoMobile();
        cardSecondaryMetro();
    });

    function favoriteMobile() {
        cards.forEach(card => {
            if (window.innerWidth <= 1212) {
                const favorite = card.querySelector('.card-secondary__info--favorite');
                const path = card.querySelector('.card-secondary__content');
                if (favorite && path) {
                    path.insertAdjacentElement('afterbegin', favorite);
                }
            } else {
                const favorite = card.querySelector('.card-secondary__info--favorite');
                const path = card.querySelector('.card-secondary__info--btns-right');
                if (favorite && path) {
                    path.insertAdjacentElement('afterbegin', favorite);
                }
            }
        })
    }

    function tagsMobile() {
        cards.forEach(card => {
            if (window.innerWidth <= 1212) {
                const tags = card.querySelector('.card-secondary__info--tags');
                const path = card.querySelector('.card-secondary__item');
                if (tags && path) {
                    path.insertAdjacentElement('afterbegin', tags);
                }
            } else {
                const tags = card.querySelector('.card-secondary__info--tags');
                const path = card.querySelector('.card-secondary__info');
                if (tags && path) {
                    path.insertAdjacentElement('afterbegin', tags);
                }
            }
        })
    }

    function tagsTwoMobile() {
        cards.forEach(card => {
            if (window.innerWidth <= 1212) {
                const options = card.querySelector('.card-secondary__options');
                const path = card.querySelector('.card-secondary__item');
                if (options && path) {
                    path.insertAdjacentElement('afterbegin', options);
                }
            } else {
                const options = card.querySelector('.card-secondary__options');
                const path = card.querySelector('.card-secondary__top');
                if (options && path) {
                    path.insertAdjacentElement('beforeend', options);
                }
            }
        })
    }
};
export const cardPrimaryActions = () => {
    const cards = document.querySelectorAll('.card-primary');
    if (cards.length === 0) return;
    cards.forEach(card => {

        const imageSwitchItems = card.querySelectorAll('.card-primary__item');
        const imagePagination = card.querySelector('.card-primary__pagination');


        if (!(window.innerWidth <= 1212 && imageSwitchItems.length <= 1)) {
            imageSwitchItems.forEach((el, index) => {
                el.setAttribute('data-index', index);
                if (card.querySelector('.card-primary__item--limit')) {
                    if (index !== imageSwitchItems.length - 1) {
                        imagePagination.innerHTML += `<li class="image-pagination__item ${index == 0 ? 'image-pagination__item--active' : ''}" data-index="${index}"></li>`;
                    }
                } else {
                    imagePagination.innerHTML += `<li class="image-pagination__item ${index == 0 ? 'image-pagination__item--active' : ''}" data-index="${index}"></li>`;
                }
                el.addEventListener('mouseenter', (e) => {
                    if (window.innerWidth > 1212) {
                        card.querySelectorAll('.image-pagination__item').forEach(el => el.classList.remove('image-pagination__item--active'));
                        if (el.classList.contains('card-primary__item--limit')) {
                            card.querySelector(`.image-pagination__item[data-index="${e.currentTarget.dataset.index - 1}"]`).classList.add('image-pagination__item--active');
                        } else {
                            card.querySelector(`.image-pagination__item[data-index="${e.currentTarget.dataset.index}"]`).classList.add('image-pagination__item--active');
                        }
                    }
                });

                el.addEventListener('mouseleave', (e) => {
                    if (window.innerWidth > 1212) {
                        card.querySelectorAll('.image-pagination__item').forEach(el => {
                            el.classList.remove('image-pagination__item--active')
                        });
                        card.querySelector(`.image-pagination__item[data-index="0"]`).classList.add('image-pagination__item--active');
                    }
                });

            });
        }


        cardSliderMobile(card.querySelector('.card-primary__top'), card.querySelector('.card-primary__images'), card.querySelectorAll('.card-primary__item'));
        card.addEventListener('click', (e) => {
            const favorite = e.target.closest('.card-primary__info--favorite');
            const copiesBtn = e.target.closest('.card-primary__copies-btn');
            const copiesClose = e.target.closest('.card-primary__copies-close');
            const dislikeBtn = e.target.closest('.card-primary__info--dislike-btn');
            const likeBtn = e.target.closest('.card-primary__info--like-btn');

            const dislike = e.target.closest('.card-primary__info--dislike');
            const comment = e.target.closest('.card-primary__info--comment');

            if (favorite && !(favorite.dataset.popupPath && favorite.dataset.popupPath === 'favorite-two')) {
                e.preventDefault();
                card.querySelectorAll('.card-primary__info--favorite').forEach(el => {
                    if (!el.classList.contains('_active')) {
                        el.classList.add('_active');
                        el.setAttribute('title', 'Удалить с избранного');
                        el.querySelector('svg use').setAttribute('xlink:href', 'img/sprite.svg#favorite');
                    } else {
                        el.classList.remove('_active');
                        el.setAttribute('title', 'Добавить в избранное');
                        el.querySelector('svg use').setAttribute('xlink:href', 'img/sprite.svg#favorite-stroke');
                    }
                });
            }
            if (copiesBtn || copiesClose) {
                e.preventDefault();
                copiesBlock(card, card.querySelector('.card-primary__copies-btn'), card.querySelector('.card-primary__copies'));
            }
            if (dislikeBtn || likeBtn) {
                e.preventDefault();
            }
            if ((dislike || comment) && window.innerWidth <= 1212) {
                const currentTarget = dislike || comment;
                e.preventDefault();
                if (currentTarget.querySelector('.secondary-tooltip__content')) {
                    const modalHTML = `
                    <div class="tooltip-modal">
                        <div class="tooltip-modal__container">
                            <button class="btn-reset tooltip-modal__close" aria-label="Закрыть модальное окно">
                                <svg>
                                    <use xlink:href="./img/sprite.svg#x"></use>
                                </svg>
                                <span>Закрыть</span>
                            </button>
                            <div class="tooltip-modal__content">
                                ${currentTarget.querySelector('.secondary-tooltip__content').innerHTML}
                            </div>
                        </div>
                    </div>
                    `;
                    modal(modalHTML, '.tooltip-modal', 300);
                    const tooltipModal = document.querySelector('.tooltip-modal');
                    tooltipModal.classList.add('_card-tooltip');
                }
            }

            const tooltip = e.target.closest('.secondary-tooltip');
            if (tooltip && window.innerWidth <= 1212) {
                e.preventDefault();
                const content = tooltip.querySelector('.secondary-tooltip__content');
                const modalHTML = `
                <div class="tooltip-modal">
                    <div class="tooltip-modal__container">
                        <button class="btn-reset tooltip-modal__close" aria-label="Закрыть модальное окно">
                            <svg>
                                <use xlink:href="./img/sprite.svg#x"></use>
                            </svg>
                            <span>Закрыть</span>
                        </button>
                        <div class="tooltip-modal__content">
                            ${content.innerHTML}
                        </div>
                    </div>
                </div>
                `;
                modal(modalHTML, '.tooltip-modal', 300);
                const tooltipModal = document.querySelector('.tooltip-modal');
                tooltipModal.classList.add('_card-tooltip-options');
            }


            const pointSystem = e.target.closest('.point-system');
            if (pointSystem) {
                e.preventDefault();
                const content = pointSystem.querySelector('.point-system__container');
                const modalHTML = `
                <div class="point-system-popup">
                    <div class="point-system-popup__container">
                        <button class="btn-reset point-system-popup__close" aria-label="Закрыть модальное окно">
                            <svg>
                                <use xlink:href="./img/sprite.svg#x"></use>
                            </svg>
                            <span>Закрыть</span>
                        </button>
                        <div class="point-system-popup__content point-system">
                            ${content.innerHTML}
                        </div>
                    </div>
                </div>
                `;
                modal(modalHTML, '.point-system-popup', 300);
            }
        })
    })

    favoriteMobile();
    tagsMobile();
    infoMobile();
    cardPrimaryMetro();
    window.addEventListener('resize', () => {
        favoriteMobile();
        tagsMobile();
        infoMobile();
        cardPrimaryMetro();
    });

    function favoriteMobile() {
        cards.forEach(card => {
            if (window.innerWidth <= 1212) {
                const favorite = card.querySelector('.card-primary__info--favorite');
                const path = card.querySelector('.card-primary__content');
                if (favorite && path) {
                    path.insertAdjacentElement('afterbegin', favorite);
                }
            } else {
                const favorite = card.querySelector('.card-primary__info--favorite');
                const path = card.querySelector('.card-primary__info--btns-right');
                if (favorite && path) {
                    path.insertAdjacentElement('afterbegin', favorite);
                }
            }
        })
    }

    function tagsMobile() {
        cards.forEach(card => {
            if (window.innerWidth <= 1212) {
                const tags = card.querySelector('.card-primary__info--tags');
                const path = card.querySelector('.card-primary__item');
                if (tags && path) {
                    path.insertAdjacentElement('afterbegin', tags);
                }
            } else {
                const tags = card.querySelector('.card-primary__info--tags');
                const path = card.querySelector('.card-primary__info');
                if (tags && path) {
                    path.insertAdjacentElement('afterbegin', tags);
                }
            }
        })
    }

    function copiesBlock(card, target, block) {
        if (!block) return;
        if (!card.classList.contains('_copies-visible')) {
            card.classList.add('_copies-visible');
            target.classList.add('_active');
            _slideDown(block);
        } else {
            card.classList.remove('_copies-visible');
            target.classList.remove('_active');
            _slideUp(block);
        }
    }


    function infoMobile() {
        cards.forEach(card => {
            if (window.innerWidth <= 1212) {
                const info = card.querySelector('.card-primary__info');
                const path = card.querySelector('.card-primary__item');
                if (info && path) {
                    path.insertAdjacentElement('afterbegin', info);
                }
            } else {
                const info = card.querySelector('.card-primary__item .card-primary__info');
                const path = card.querySelector('.card-primary__top');
                if (info && path) {
                    path.insertAdjacentElement('beforeend', info);
                }
            }
        })
    }
};

export const cardSecondaryMetro = () => {
    const cards = document.querySelectorAll('.card-secondary');
    if (cards.length === 0) return;
    cards.forEach(card => {
        const container = card.querySelector('.card-secondary__metro');
        metroItems(container, card.querySelector('.card-secondary__content'))
    })

}
export const cardPrimaryMetro = () => {
    const cards = document.querySelectorAll('.card-primary');
    if (cards.length === 0) return;
    cards.forEach(card => {
        const container = card.querySelector('.card-primary__metro');
        metroItems(container, card.querySelector('.card-primary__content'))
    })

}


function cardSliderMobile(cardImageWrapper, imagesBody, cardItems) {
    let slider;
    body();
    window.addEventListener('resize', body);

    function body() {
        if (window.innerWidth <= 1212) {
            if (!cardImageWrapper.classList.contains('swiper-initialized')) {
                cardImageWrapper.classList.add('swiper');
                imagesBody.classList.add('swiper-wrapper');
                cardItems.forEach(item => item.classList.add('swiper-slide'));

                slider = new Swiper(cardImageWrapper, {
                    observer: true,
                    observeParents: true,
                    slidesPerView: 1.12,
                    spaceBetween: 8,
                    speed: 800,
                    breakpoints: {
                        768: {
                            slidesPerView: 1,
                        },
                    },
                });
            }
        } else {
            if (cardImageWrapper.classList.contains('swiper-initialized')) {
                slider.destroy();
                cardImageWrapper.classList.remove('swiper');
                imagesBody.classList.remove('swiper-wrapper');
                cardItems.forEach(item => item.classList.remove('swiper-slide'));
            }
        }
    }
}
