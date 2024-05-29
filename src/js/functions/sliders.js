// =========================================================================================
import Swiper, {
    Navigation,
    Pagination,
    Thumbs,
    EffectFade,
    EffectCreative,
    Autoplay
} from 'swiper';
Swiper.use([Navigation, Pagination, Thumbs, EffectFade, EffectCreative, Autoplay]);

import modal from '../modules/modal';
import {
    createPopper
} from '@popperjs/core';
import {
    _slideDown,
    _slideUp,
    _slideToggle,
} from '../support-modules/slide';
// =========================================================================================




function initSliders() {
    if (document.querySelector('.place-sale-sale__cards .swiper')) {
        const items = document.querySelectorAll('.place-sale-sale__cards .swiper');
        items.forEach(slider => {
            new Swiper(slider, {
                observer: true,
                observeParents: true,
                slidesPerView: 3,
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: slider.closest('.place-sale-sale__cards').querySelector('.nav-arrow-primary--prev'),
                    nextEl: slider.closest('.place-sale-sale__cards').querySelector('.nav-arrow-primary--next'),
                    lockClass: '_hidden',
                },
            });
        })
    }
    if (document.querySelector('.popular-instructions__slider .swiper')) {
        const items = document.querySelectorAll('.popular-instructions__slider .swiper');
        items.forEach(slider => {
            new Swiper(slider, {
                observer: true,
                observeParents: true,
                slidesPerView: 3,
                spaceBetween: 12,
                speed: 800,
                navigation: {
                    prevEl: slider.closest('.popular-instructions').querySelector('.nav-arrow-primary--prev'),
                    nextEl: slider.closest('.popular-instructions').querySelector('.nav-arrow-primary--next'),
                },
            });
        })
    }
    if (document.querySelector('.place-sale-sale__shorts .swiper')) {
        const items = document.querySelectorAll('.place-sale-sale__shorts .swiper');
        items.forEach(slider => {
            new Swiper(slider, {
                observer: true,
                observeParents: true,
                slidesPerView: 5,
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: slider.closest('.place-sale-sale__shorts').querySelector('.nav-arrow-primary--prev'),
                    nextEl: slider.closest('.place-sale-sale__shorts').querySelector('.nav-arrow-primary--next'),
                    lockClass: '_hidden',
                },
            });
        })
    }
    if (document.querySelector('.book-consultation__agents')) {
        const slider = document.querySelector('.book-consultation__agents');
        new Swiper(slider, {
            observer: true,
            observeParents: true,
            autoHeight: true,
            slidesPerView: 1,
            spaceBetween: 16,
            speed: 800,
            navigation: {
                prevEl: slider.closest('.book-consultation').querySelector('.nav-arrow-secondary--prev'),
                nextEl: slider.closest('.book-consultation').querySelector('.nav-arrow-secondary--next'),
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
            },
            breakpoints: {
                1112: {
                    slidesPerView: 3,
                },
            },
        });
    }
    if (document.querySelector('.record-viewing__agents')) {
        const slider = document.querySelector('.record-viewing__agents');
        new Swiper(slider, {
            observer: true,
            observeParents: true,
            autoHeight: true,
            slidesPerView: 1,
            spaceBetween: 16,
            speed: 800,
            navigation: {
                prevEl: slider.closest('.record-viewing__choices').querySelector('.nav-arrow-secondary--prev'),
                nextEl: slider.closest('.record-viewing__choices').querySelector('.nav-arrow-secondary--next'),
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
            },
            breakpoints: {
                1112: {
                    slidesPerView: 3,
                },
            },
        });
    }
    if (document.querySelector('.home-stories__items')) {
        const slider = document.querySelector('.home-stories__items');
        new Swiper(slider, {
            observer: true,
            observeParents: true,
            autoHeight: true,
            slidesPerView: 1.15,
            spaceBetween: 8,
            speed: 800,
            breakpoints: {
                650: {
                    slidesPerView: 1.4,
                },
                950: {
                    slidesPerView: 4,
                },
            },
            navigation: {
                prevEl: slider.closest('.home-stories').querySelector('.nav-arrow-primary--prev'),
                nextEl: slider.closest('.home-stories').querySelector('.nav-arrow-primary--next'),
            },
        });
    }
    if (document.querySelector('.header-main__banners')) {
        new Swiper('.header-main__banners', {
            observer: true,
            observeParents: true,
            autoHeight: true,
            slidesPerView: 1.15,
            spaceBetween: 16,
            speed: 800,
            breakpoints: {
                650: {
                    slidesPerView: 1.4,
                    spaceBetween: 24,
                },
                950: {
                    slidesPerView: 2,
                    spaceBetween: 32,
                },
            },
        });
    }
    if (document.querySelector('.history-changes__items')) {
        const slider = document.querySelector('.history-changes__items');
        new Swiper(slider, {
            observer: true,
            observeParents: true,
            slidesPerView: 1.1,
            spaceBetween: 16,
            speed: 800,
            navigation: {
                prevEl: slider.closest('.history-changes').querySelector('.nav-arrow-primary--prev'),
                nextEl: slider.closest('.history-changes').querySelector('.nav-arrow-primary--next'),
            },
            breakpoints: {
                1212: {
                    slidesPerView: 2,
                    spaceBetween: 32,
                    allowTouchMove: false,
                },
            },
        });
    }
    if (document.querySelector('.main-banners__container')) {
        const slider = document.querySelector('.main-banners__container');
        new Swiper(slider, {
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 16,
            autoHeight: true,
            speed: 800,
            autoplay: {
                delay: 6000,
            },
            navigation: {
                prevEl: slider.closest('.main-banners').querySelector('.nav-arrow-secondary--prev'),
                nextEl: slider.closest('.main-banners').querySelector('.nav-arrow-secondary--next'),
            },
        });
    }
    if (document.querySelector('.home-banners__items')) {
        const sliderEl = document.querySelector('.home-banners__items');
        if (!sliderEl) return;
        const slider = new Swiper(sliderEl, {
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 16,
            autoplay: {
                delay: 6000,
            },
            speed: 800,
            init: false,
            navigation: {
                prevEl: sliderEl.closest('.home-banners').querySelector('.nav-arrow-primary--prev') || sliderEl.closest('.home-banners').querySelector('.nav-arrow-secondary--prev'),
                nextEl: sliderEl.closest('.home-banners').querySelector('.nav-arrow-primary--next') || sliderEl.closest('.home-banners').querySelector('.nav-arrow-secondary--next'),
            },
        });
        slider.on("slideChange afterInit init", function() {
            const counterEl = sliderEl.closest('.home-banners').querySelector('.home-banners__counter');
            const lineEl = sliderEl.closest('.home-banners').querySelector('.home-banners__line');

            sliderCounter(slider, counterEl);
            sliderLine(slider, lineEl);
        });
        slider.init();
    }
    if (document.querySelector('.swiper.home-price__items')) {
        const sliders = document.querySelectorAll('.swiper.home-price__items');
        sliders.forEach(slider => {
            new Swiper(slider, {
                observer: true,
                observeParents: true,
                slidesPerView: 1.1,
                spaceBetween: 16,
                speed: 800,
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                    },
                    1212: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    },
                },
                navigation: {
                    prevEl: slider.closest('.home-price').querySelector('.nav-arrow-primary--prev') || slider.closest('.tabs__body').querySelector('.nav-arrow-primary--prev'),
                    nextEl: slider.closest('.home-price').querySelector('.nav-arrow-primary--next') || slider.closest('.tabs__body').querySelector('.nav-arrow-primary--next'),
                },
                on: {
                    init: function() {
                        const tags = slider.querySelectorAll('[data-tags-in-height]');
                        tags.forEach(item => {
                            if (item.tagsInHeight) {
                                item.tagsInHeight.body();
                            }
                        })
                    }
                }
            });
        })
    }
    if (document.querySelector('.home-spec__items')) {
        const sliders = document.querySelectorAll('.home-spec__items');
        sliders.forEach(slider => {
            new Swiper(slider, {
                observer: true,
                observeParents: true,
                slidesPerView: 1.1,
                spaceBetween: 10,
                speed: 800,
                breakpoints: {
                    576: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    },
                    1212: {
                        slidesPerView: 4,
                        spaceBetween: 16,
                    },
                },
                navigation: {
                    prevEl: slider.closest('.home-spec').querySelector('.nav-arrow-primary--prev') || slider.closest('.tabs__body').querySelector('.nav-arrow-primary--prev'),
                    nextEl: slider.closest('.home-spec').querySelector('.nav-arrow-primary--next') || slider.closest('.tabs__body').querySelector('.nav-arrow-primary--next'),
                },
            });
        })
    }

    objectSlider();
    mainSlider();
    if (document.querySelector('.review-item__photo')) {
        const sliders = document.querySelectorAll('.review-item__photo');
        sliders.forEach(el => {
            const slider = new Swiper(el, {
                observer: true,
                observeParents: true,
                slidesPerView: 2.2,
                spaceBetween: 8,
                speed: 800,
                breakpoints: {
                    768: {
                        slidesPerView: 4,
                    },
                },
            });
        })
    }

    if (document.querySelector('.interest-rate__slider')) {
        const sliders = document.querySelectorAll('.interest-rate__slider');
        sliders.forEach(el => {
            const slider = new Swiper(el, {
                observer: true,
                observeParents: true,
                slidesPerView: 'auto',
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: el.closest('.interest-rate').querySelector('.nav-arrow-secondary--prev'),
                    nextEl: el.closest('.interest-rate').querySelector('.nav-arrow-secondary--next'),
                },
            });
        })
    }
    if (document.querySelector('.block-stock')) {
        const container = document.querySelectorAll('.block-stock');
        container.forEach(el => {
            const sliderEl = el.querySelector('.block-stock__slider');
            const bodySlider = {
                observer: true,
                observeParents: true,
                slidesPerView: 1.1,
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: el.closest('.block-stock').querySelector('.nav-arrow-secondary--prev'),
                    nextEl: el.closest('.block-stock').querySelector('.nav-arrow-secondary--next'),
                },
                breakpoints: {
                    577: {
                        slidesPerView: 1.8,
                    },
                    769: {
                        slidesPerView: 2.4,
                    },
                    1213: {
                        slidesPerView: 3
                    }
                },
            }
            // 2  fasfsafsasfafsaafsfsafsa
            let slider = new Swiper(sliderEl, bodySlider);
            sliderMoreItem();

            function sliderMoreItem() {
                const btn = el.querySelector('.block-stock__btn');
                if (btn && !btn.hasAttribute('data-popup-path') && !btn.hasAttribute('href')) {
                    btn.addEventListener('click', () => {
                        el.classList.toggle('_active');
                        if (el.classList.contains('_active')) {
                            btn.classList.add('_active');
                            slider.destroy();
                        } else {
                            btn.classList.remove('_active');
                            const topGap = window.pageYOffset + el.getBoundingClientRect().top;
                            const headerFixed = document.querySelector('.header-fixed');
                            const topHeaderMobile = document.querySelector('.top-page-inner');
                            if (window.innerWidth >= 1212) {
                                window.scrollTo({
                                    top: headerFixed ? topGap - headerFixed.offsetHeight - 20 : topGap - 20,
                                })
                            } else {
                                window.scrollTo({
                                    top: topHeaderMobile ? topGap - topHeaderMobile.offsetHeight - 20 : topGap - 20,
                                })
                            }
                            slider = new Swiper(sliderEl, bodySlider);
                        }
                    });
                }
            }
        })
    }
    if (document.querySelector('.object-other-apartment__items')) {
        const sliders = document.querySelectorAll('.object-other-apartment__items');
        sliders.forEach(el => {
            const slider = new Swiper(el, {
                observer: true,
                observeParents: true,
                slidesPerView: 1.1,
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: el.querySelector('.nav-arrow-primary--prev'),
                    nextEl: el.querySelector('.nav-arrow-primary--next'),
                },
                breakpoints: {
                    577: {
                        slidesPerView: 2,
                    },
                },
            });
        })
    }
    if (document.querySelector('.block-stock__ribbon-slider')) {
        const sliders = document.querySelectorAll('.block-stock__ribbon-slider');
        sliders.forEach(el => {
            const slider = new Swiper(el, {
                observer: true,
                observeParents: true,
                slidesPerView: 2,
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: el.querySelector('.nav-arrow-primary--prev'),
                    nextEl: el.querySelector('.nav-arrow-primary--next'),
                },
                breakpoints: {
                    577: {
                        slidesPerView: 3,
                    },
                    769: {
                        slidesPerView: 4,
                    },
                },
            });
            const cards = el.querySelectorAll('.news-card');
            cards.forEach(card => {
                const btn = card.querySelector('.news-card__wrapper');
                btn.addEventListener('click', () => {
                    const modalHTML = `
                    <div class="news-card-popup">
                    <div class="news-card-popup__container">
                        <button class="btn-reset news-card-popup__close" aria-label="Закрыть модальное окно">
                            <svg>
                                <use xlink:href="./img/sprite.svg#x"></use>
                            </svg>
                            <span>Закрыть</span>
                        </button>
                         <div class="news-card-popup__content">
                            <article class="news-card">
                                <div class="news-card__wrapper">
                                ${btn.innerHTML}
                                </div>
                            </article>
                         </div>
                    </div>
                    </div>
                    `;

                    modal(modalHTML, '.news-card-popup', 300, card);
                });
            })
        })
    }
    if (document.querySelector('.block-stock__video-slider')) {
        const sliders = document.querySelectorAll('.block-stock__video-slider');
        sliders.forEach(el => {
            const count = el.closest('.home__ribbon') ? 3 : 2;
            const slider = new Swiper(el, {
                observer: true,
                observeParents: true,
                slidesPerView: 1.1,
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: el.querySelector('.nav-arrow-primary--prev'),
                    nextEl: el.querySelector('.nav-arrow-primary--next'),
                },
                breakpoints: {
                    577: {
                        slidesPerView: 1.8,
                    },
                    769: {
                        slidesPerView: 2.4,
                    },
                    1213: {
                        slidesPerView: count
                    }
                },
            });
        })
    }
    if (document.querySelector('.object-apart-renov__images')) {
        const sliders = document.querySelectorAll('.object-apart-renov__images:not(._no-swiper)');
        sliders.forEach(el => {
            const slider = new Swiper(el, {
                observer: true,
                lazy: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 800,
                navigation: {
                    prevEl: el.parentElement.querySelector('.nav-arrow-primary--prev'),
                    nextEl: el.parentElement.querySelector('.nav-arrow-primary--next'),
                },
                pagination: {
                    el: el.closest('.furnishing-sets__tab') ?
                        el.closest('.furnishing-sets__tab').querySelector('.pagination-primary') : el.closest('.object-apart-renov__item').querySelector('.pagination-primary'),
                    type: 'fraction',
                    renderFraction: function(currentClass, totalClass) {
                        return `
                            <span class="${currentClass}"></span>
                            <span class="swiper-pagination-word">из</span>
                            <span class="${totalClass}"></span>
                            `;
                    }
                },
                breakpoints: {
                    1212: {
                        spaceBetween: 16,
                    },
                },
            });
            const marks = el.querySelectorAll('.object-apart-renov__mark:not(._edit)');
            marks.forEach(mark => {
                let popper;
                mark.addEventListener('mouseenter', () => {
                    mark.classList.add('_active');
                    const btn = mark.querySelector('button');
                    const content = mark.querySelector('div');
                    popper = createPopper(btn, content, {
                        placement: 'bottom-start',
                        modifiers: [{
                            name: 'offset',
                            options: {
                                offset: [5, 5]
                            }
                        }]
                    });
                })
                mark.addEventListener('mouseleave', () => {
                    mark.classList.remove('_active');
                    setTimeout(() => {
                        if (!mark.classList.contains('_active')) popper.destroy();
                    }, 500);
                })
            });
        })
    }
    if (document.querySelector('.object-construct-progress')) {
        const container = document.querySelectorAll('.object-construct-progress');
        container.forEach(el => {
            const sliderEl = el.querySelector('.object-construct-progress__items');
            const bodySlider = {
                observer: true,
                observeParents: true,
                slidesPerView: 1.1,
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: el.querySelector('.nav-arrow-primary--prev'),
                    nextEl: el.querySelector('.nav-arrow-primary--next'),
                },
                breakpoints: {
                    577: {
                        slidesPerView: 2,
                    },
                },
            }

            const complexSelect = el.querySelector('[data-construct-complex-select]');
            const yearSelect = el.querySelector('[data-construct-year-select]');
            const quarterSelect = el.querySelector('[data-construct-quarter-select]');
            let slider;
            filterCards(false);
            slider = new Swiper(sliderEl, bodySlider);

            [complexSelect, yearSelect, quarterSelect].forEach(select => {
                if (select) {
                    select.addEventListener('change', () => {
                        filterCards(true);
                    })
                }
            })

            function filterCards(updatePermit) {
                let complexValue = '';
                let yearValue = '';
                let quarterValue = '';
                if (complexSelect) {
                    complexValue = complexSelect.querySelector('.choices__list.choices__list--single .choices__item.choices__item--selectable').dataset.value;
                }
                if (yearSelect) {
                    yearValue = yearSelect.querySelector('.choices__list.choices__list--single .choices__item.choices__item--selectable').dataset.value;
                }
                if (quarterSelect) {
                    quarterValue = quarterSelect.querySelector('.choices__list.choices__list--single .choices__item.choices__item--selectable').dataset.value;
                }

                const slides = el.querySelectorAll('.swiper-slide');
                slides.forEach(slide => slide.setAttribute('hidden', ''));
                const slidesValidate = Array.from(slides).filter(el => {
                    return (complexValue === '' || el.dataset.constructComplex === complexValue) &&
                        (yearValue === '' || el.dataset.constructYear === yearValue) &&
                        (quarterValue === '' || el.dataset.constructQuarter === quarterValue);
                })
                slidesValidate.length > 0 ? el.classList.add('_slider-visible') : el.classList.remove('_slider-visible');
                slidesValidate.forEach(slide => slide.removeAttribute('hidden'));
                if (updatePermit) slider.update();
            }
        })
    }
    if (document.querySelector('.construct-progress-popup__images')) {
        const sliders = document.querySelectorAll('.construct-progress-popup__images');
        sliders.forEach(el => {
            const slider = new Swiper(el, {
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: '.nav-arrow-primary--prev',
                    nextEl: '.nav-arrow-primary--next',
                },
                pagination: {
                    el: el.querySelector('.pagination-primary'),
                    type: 'fraction',
                    renderFraction: function(currentClass, totalClass) {
                        return `
                            <span class="${currentClass}"></span>
                            <span class="swiper-pagination-word">из</span>
                            <span class="${totalClass}"></span>
                            `;
                    }
                },
            });
        })
    }

    if (document.querySelector('.object-advantages')) {
        const container = document.querySelectorAll('.object-advantages');
        container.forEach(el => {
            const sliderEl = el.querySelector('.object-advantages__slider');
            const bodySlider = {
                observer: true,
                observeParents: true,
                slidesPerView: 1.1,
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: el.querySelector('.nav-arrow-primary--prev'),
                    nextEl: el.querySelector('.nav-arrow-primary--next'),
                },
                breakpoints: {
                    577: {
                        slidesPerView: 1.8,
                    },
                    769: {
                        slidesPerView: 2.4,
                    },
                    1213: {
                        slidesPerView: 3,
                    }
                },
            }
            let slider = new Swiper(sliderEl, bodySlider);
            const objectAdvantages = () => {
                sliderMoreItem();
                itemPopup();

                function sliderMoreItem() {
                    const btn = el.querySelector('.object-advantages__btn');
                    btn.addEventListener('click', () => {
                        el.classList.toggle('_active');
                        if (el.classList.contains('_active')) {
                            btn.classList.add('_active');
                            slider.destroy();
                        } else {
                            btn.classList.remove('_active');
                            const topGap = window.pageYOffset + el.getBoundingClientRect().top;
                            const headerFixed = document.querySelector('.header-fixed');
                            const topHeaderMobile = document.querySelector('.top-page-inner');
                            if (window.innerWidth >= 1212) {
                                window.scrollTo({
                                    top: headerFixed ? topGap - headerFixed.offsetHeight - 20 : topGap - 20,
                                })
                            } else {
                                window.scrollTo({
                                    top: topHeaderMobile ? topGap - topHeaderMobile.offsetHeight - 20 : topGap - 20,
                                })
                            }
                            slider = new Swiper(sliderEl, bodySlider);
                        }
                    });
                }

                function itemPopup() {
                    const items = el.querySelectorAll('.object-advantages__card');
                    items.forEach(item => {
                        item.addEventListener('click', () => {
                            item.classList.add('_active');
                            const modalHTML = `
                            <div class="advantages-popup">
                            <div class="advantages-popup__container">
                                <button class="btn-reset advantages-popup__close" aria-label="Закрыть модальное окно">
                                    <svg>
                                        <use xlink:href="./img/sprite.svg#x"></use>
                                    </svg>
                                    <span>Закрыть</span>
                                </button>
                                 <div class="advantages-popup__content">
                                        ${item.outerHTML}
                                 </div>
                            </div>
                            </div>
                            `;

                            modal(modalHTML, '.advantages-popup', 300, item);
                            document.querySelector('.advantages-popup .advantages-card').classList.remove('_active');
                        })
                    })
                }
            }
            objectAdvantages();
        })
    }

    const layoutsItems = document.querySelector('.layouts__items');
    if (layoutsItems) {
        const items = layoutsItems.querySelectorAll('.layouts__item');
        items.forEach(el => {
            const body = el.querySelector('.room-body__items');
            createSlider(body, el);
        })

        function createSlider(body, el) {
            if (!(body && body.closest('.room-body'))) return;
            const slider = new Swiper(body, {
                observer: true,
                observeParents: true,
                slidesPerView: 1.08,
                spaceBetween: 8,
                speed: 800,
                navigation: {
                    prevEl: body.closest('.room-body').querySelector('.nav-arrow-primary--prev'),
                    nextEl: body.closest('.room-body').querySelector('.nav-arrow-primary--next'),
                },
                breakpoints: {
                    577: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                    },
                    1213: {
                        slidesPerView: 2.6,
                        spaceBetween: 16,
                    }
                }
            });
            showContainer(body);
            el.classList.add('_init');
        }

        function showContainer(el) {
            const btns = el.querySelectorAll('.card-scheme');
            const containers = el.closest('.room-body').querySelectorAll('.room-body__container');
            btns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const currentSlide = btn.closest('.swiper-slide');
                    const currentSlideIndex = Array.prototype.slice.call(el.querySelector('.swiper-wrapper').children).indexOf(currentSlide);
                    const currentContainer = containers[currentSlideIndex];
                    btns.forEach(el => {
                        if (e.currentTarget !== el) el.classList.remove('_active');
                    });
                    btn.classList.toggle('_active');

                    const headerFixed = document.querySelector('.header-fixed');
                    const topHeaderMobile = document.querySelector('.top-page-inner');
                    containers.forEach(container => {
                        if (container !== currentContainer) {
                            container.setAttribute('hidden', '');
                        }
                    })
                    if (currentContainer) {
                        if (btn.classList.contains('_active')) {
                            _slideDown(currentContainer, 300);
                            const topGap = window.pageYOffset + currentContainer.getBoundingClientRect().top;
                            if (window.innerWidth >= 1212) {
                                window.scrollTo({
                                    top: headerFixed ? topGap - headerFixed.offsetHeight : topGap,
                                    behavior: 'smooth',
                                })
                            } else {
                                window.scrollTo({
                                    top: topHeaderMobile ? topGap - topHeaderMobile.offsetHeight : topGap,
                                    behavior: 'smooth',
                                })
                            }

                        } else {
                            _slideUp(currentContainer, 300);
                            const topGap = window.pageYOffset + btn.closest('.layouts__item').querySelector('.layouts__item-btn').getBoundingClientRect().top;
                            if (window.innerWidth >= 1212) {
                                window.scrollTo({
                                    top: headerFixed ? topGap - headerFixed.offsetHeight : topGap,
                                    behavior: 'smooth',
                                })
                            } else {
                                window.scrollTo({
                                    top: topHeaderMobile ? topGap - topHeaderMobile.offsetHeight : topGap,
                                    behavior: 'smooth',
                                })
                            }
                        }
                    }
                });
            })
        }


        const observerCallback = function(mutationsList, observer) {
            for (var mutation of mutationsList) {
                if (mutation.type == 'childList') {
                    const items = layoutsItems.querySelectorAll('.layouts__item');
                    items.forEach(item => {
                        if (!item.classList.contains('_init')) {
                            const body = item.querySelector('.room-body__items');
                            createSlider(body, item);
                        }
                    })
                }
            }
        };

        const observer = new MutationObserver(observerCallback);
        observer.observe(layoutsItems, {
            attributes: true,
            childList: true,
            subtree: true
        });
    }



    if (document.querySelector('.object-slider-two')) {
        const sliders = document.querySelectorAll('.object-slider-two');
        sliders.forEach(el => {
            const slider = el.querySelector('.object-slider-body__wrapper');
            new Swiper(slider, {
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 16,
                navigation: {
                    prevEl: el.querySelector('.nav-arrow-primary--prev'),
                    nextEl: el.querySelector('.nav-arrow-primary--next'),
                },
                pagination: {
                    el: el.querySelector('.pagination-primary'),
                    type: 'fraction',
                    renderFraction: function(currentClass, totalClass) {
                        return `
                            <span class="${currentClass}"></span>
                            <span class="swiper-pagination-word">из</span>
                            <span class="${totalClass}"></span>
                            `;
                    }
                },
            });

            const moreBtn = el.querySelector('.object-slider-body__more');
            const topBtns = document.querySelectorAll('.top-page-inner__btn');
            if (moreBtn) {
                if (topBtns.length === 0) moreBtn.remove();
                topBtns.forEach(btn => {
                    btn.classList.add('js-popup-close');
                })
                moreBtn.addEventListener('click', () => {
                    const modalHTML = `
                    <div class="nav-btns-popup">
                    <div class="nav-btns-popup__container">
                        <button class="btn-reset nav-btns-popup__close" aria-label="Закрыть модальное окно">
                            <svg>
                                <use xlink:href="./img/sprite.svg#x"></use>
                            </svg>
                            <span>Закрыть</span>
                        </button>
                         <div class="nav-btns-popup__content">
                         </div>
                    </div>
                    </div>
                    `;

                    modal(modalHTML, '.nav-btns-popup', 300);
                    const container = document.querySelector('.nav-btns-popup');
                    const content = container.querySelector('.nav-btns-popup__content');
                    topBtns.forEach(btn => {
                        content.insertAdjacentElement('beforeend', btn);
                    });
                })
            }
        })
    }

    if (document.querySelector('.promo-slider__slider')) {
        const sliders = document.querySelectorAll('.promo-slider__slider');
        sliders.forEach(sliderEl => {
            const perView = +sliderEl.dataset.slideLength || 1.2;
            const slider = new Swiper(sliderEl, {
                observer: true,
                observeParents: true,
                init: false,
                slidesPerView: perView,
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: sliderEl.closest('.promo-slider').querySelector('.nav-arrow-secondary--prev'),
                    nextEl: sliderEl.closest('.promo-slider').querySelector('.nav-arrow-secondary--next'),
                },
            });
    
            slider.on("slideChange afterInit init", function() {
                const counterEl = sliderEl.closest('.promo-slider').querySelector('.promo-slider__counter');
                sliderCounter(slider, counterEl);
            });
            slider.init();
        })
    }
}


function objectSlider() {
    const container = document.querySelector('.object-slider');
    if (!container) return;
    const nav = container.querySelector('.object-slider-nav__wrapper');
    const body = container.querySelector('.object-slider-body__wrapper');
    let navSlider = new Swiper(nav, {
        slidesPerView: 2.6,
        spaceBetween: 5,
        observer: true,
        observeParents: true,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        direction: 'vertical',
        navigation: {
            prevEl: nav.closest('.object-slider-nav').querySelector('.nav-arrow-primary--prev'),
            nextEl: nav.closest('.object-slider-nav').querySelector('.nav-arrow-primary--next'),
        },
    });
    let bodySlider = new Swiper(body, {
        spaceBetween: 15,
        observer: true,
        observeParents: true,
        navigation: {
            prevEl: body.closest('.object-slider-body').querySelector('.nav-arrow-primary--prev'),
            nextEl: body.closest('.object-slider-body').querySelector('.nav-arrow-primary--next'),
        },
        pagination: {
            el: container.querySelector('.pagination-primary'),
            type: 'fraction',
            renderFraction: function(currentClass, totalClass) {
                return `
                    <span class="${currentClass}"></span>
                    <span class="swiper-pagination-word">из</span>
                    <span class="${totalClass}"></span>
                    `;
            }
        },
        thumbs: {
            swiper: navSlider,
        },
    })


    const moreBtn = container.querySelector('.object-slider-body__more');
    const topBtns = document.querySelectorAll('.top-page-inner__btn');
    if (moreBtn) {
        if (topBtns.length === 0) moreBtn.remove();
        topBtns.forEach(btn => {
            btn.classList.add('js-popup-close');
        })
        moreBtn.addEventListener('click', () => {
            const modalHTML = `
            <div class="nav-btns-popup">
            <div class="nav-btns-popup__container">
                <button class="btn-reset nav-btns-popup__close" aria-label="Закрыть модальное окно">
                    <svg>
                        <use xlink:href="./img/sprite.svg#x"></use>
                    </svg>
                    <span>Закрыть</span>
                </button>
                 <div class="nav-btns-popup__content">
                 </div>
            </div>
            </div>
            `;

            modal(modalHTML, '.nav-btns-popup', 300);
            const container = document.querySelector('.nav-btns-popup');
            const content = container.querySelector('.nav-btns-popup__content');
            topBtns.forEach(btn => {
                content.insertAdjacentElement('beforeend', btn);
            });
        })
    }
}

function mainSlider() {
    const container = document.querySelector('[main-slider]');
    if (!container) return;
    const items = container.querySelectorAll('.main-slider__item');
    const previews = container.querySelectorAll('[main-slider-previews] .swiper-slide');
    createIndex(items, previews);
    init(items, previews);
    createBodySliders(items, previews);
    createPreviewSlider(container);
    tabs(container, items, previews);

    function createIndex(items, previews) {
        items.forEach((item, index) => {
            item.setAttribute('data-main-slider-item', index + 1);
        })
        previews.forEach((item, index) => {
            item.setAttribute('data-main-slider-preview', index + 1);
        })
    }

    function init(items, previews) {
        items.forEach(item => {
            const currentIndex = item.dataset.mainSliderItem;
            if (currentIndex != 1) {
                item.setAttribute('hidden', '');
            }
        })
        previews.forEach(item => {
            const currentIndex = item.dataset.mainSliderPreview;
            currentIndex == 1 ? item.classList.add('_active') : item.classList.remove('_active');
        })
    }

    function createBodySliders(items, previews) {
        items.forEach(item => {
            const currentIndexTab = Number(item.dataset.mainSliderItem);
            const currentPreview = container.querySelector(`[data-main-slider-preview="${currentIndexTab}"]`);
            const nextPreview = container.querySelector(`[data-main-slider-preview="${currentIndexTab+1}"]`);
            const nextTab = container.querySelector(`[data-main-slider-item="${currentIndexTab+1}"]`);

            let value = false;
            const slider = new Swiper(item, {
                slidesPerView: 1,
                spaceBetween: 15,
                observer: true,
                observeParents: true,
                init: false,
                navigation: {
                    prevEl: '.nav-arrow-secondary--prev',
                    nextEl: '.nav-arrow-secondary--next',
                },
                // pagination: {
                //     el: '.pagination-primary',
                //     type: 'fraction',
                //     renderFraction: function(currentClass, totalClass) {
                //         return `
                //             <span class="${currentClass}"></span>
                //             <span class="swiper-pagination-word">из</span>
                //             <span class="${totalClass}"></span>
                //             `;
                //     }
                // },
            })
            slider.on("slideChange afterInit init", function() {
                const counterEl = item.querySelector('.main-slider__counter');
                const lineEl = item.querySelector('.main-slider__line');
                sliderCounter(slider, counterEl);
                sliderLine(slider,lineEl);
            });
            slider.init();
            setTimeout(() => {
                slider.navigation.update();
            }, 1);
        })
    }

    function createPreviewSlider(container) {
        const preview = container.querySelector('[main-slider-previews]');
        const slidesLength = previews.length;
        let slidesPerView = slidesLength <= 2 ? slidesLength : 2.6;
        const slider = new Swiper(preview, {
            slidesPerView: slidesPerView,
            spaceBetween: 5,
            observer: true,
            observeParents: true,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            direction: 'vertical',
            navigation: {
                prevEl: '.nav-arrow-primary--prev',
                nextEl: '.nav-arrow-primary--next',
            },
        })
        setTimeout(() => {
            slider.navigation.update();
        }, 1);
    }

    function tabs(container, items, previews) {
        const previewsContainer = container.querySelector('[main-slider-previews]');
        previewsContainer.addEventListener('click', (e) => {
            const target = e.target;
            const preview = target.closest('[data-main-slider-preview]');
            if (preview) {
                const currentIndex = preview.dataset.mainSliderPreview;
                const currentTab = container.querySelector(`[data-main-slider-item='${currentIndex}']`);
                items.forEach(item => {
                    item === currentTab ? item.removeAttribute('hidden') : item.setAttribute('hidden', '');
                })
                previews.forEach(item => {
                    item === preview ? item.classList.add('_active') : item.classList.remove('_active');
                })
            }
        })
    }

    const moreBtn = container.querySelector('.object-slider-body__more');
    const topBtns = document.querySelectorAll('.top-page-inner__btn');
    if (moreBtn) {
        if (topBtns.length === 0) moreBtn.remove();
        topBtns.forEach(btn => {
            btn.classList.add('js-popup-close');
        })
        moreBtn.addEventListener('click', () => {
            const modalHTML = `
            <div class="nav-btns-popup">
            <div class="nav-btns-popup__container">
                <button class="btn-reset nav-btns-popup__close" aria-label="Закрыть модальное окно">
                    <svg>
                        <use xlink:href="./img/sprite.svg#x"></use>
                    </svg>
                    <span>Закрыть</span>
                </button>
                 <div class="nav-btns-popup__content">
                 </div>
            </div>
            </div>
            `;

            modal(modalHTML, '.nav-btns-popup', 300);
            const container = document.querySelector('.nav-btns-popup');
            const content = container.querySelector('.nav-btns-popup__content');
            topBtns.forEach(btn => {
                content.insertAdjacentElement('beforeend', btn);
            });
        })
    }
}

function sliderCounter(slider, el) {
    if (!el) return;
    const currentSlide = slider.activeIndex + 1;
    const length = slider.slides.length;

    el.innerHTML = `
    <span class="slider-counter__current">
        ${currentSlide}
    </span> 
    / 
    <span class="slider-counter__total">
        ${length}
    </span>`;
}

function sliderLine(slider, el) {
    if (!el) return;
    const currentSlide = slider.activeIndex + 1;
    const length = slider.slides.length;

    const lineSpan = el.querySelector('span');
    lineSpan.style.width = `${80 / length * currentSlide}px`;
}

// =========================================================================================





window.addEventListener("load", function(e) {
    initSliders();
});





// =========================================================================================