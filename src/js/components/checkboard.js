import modal from '../modules/modal';
import disableScroll from '../modules/disableScroll';
import enableScroll from '../modules/enableScroll';
import {
    createPopper
} from '@popperjs/core';
const checkboard = () => {
    checkboardPopup();
    const container = document.querySelector('.checkboard');
    if (!container) return;
    const items = container.querySelectorAll('.checkboard__item--free');
    if (items.length === 0) return;
    const innerWidth = 1212;
    items.forEach(item => {
        let popper;
        item.addEventListener('mouseenter', () => {
            if (window.innerWidth <= innerWidth) return;
            item.classList.add('_active');
            const btn = item.querySelector('.checkboard__link');
            const content = item.querySelector('.checkboard__card');
            popper = createPopper(btn, content, {
                placement: 'bottom-start',
            });
        });
        item.addEventListener('mouseleave', () => {
            if (window.innerWidth <= innerWidth) return;
            item.classList.remove('_active');
            setTimeout(() => {
                if (!item.classList.contains('_active')) popper.destroy();
            }, 500);
        });
        item.addEventListener('click', (e) => {
            if (window.innerWidth > innerWidth) return;
            e.preventDefault();
            const cardContainer = item.querySelector('.checkboard__card').querySelector('.card-scheme__container');
            const favorite = item.querySelector('.card-scheme__favorite');
            const href = item.querySelector('.checkboard__link').getAttribute('href');
            const modalHTML = `
            <div class="checkboard-popup-card">
            <div class="checkboard-popup-card__container">
                <button class="btn-reset checkboard-popup-card__close" aria-label="Закрыть модальное окно">
                    <svg>
                        <use xlink:href="img/sprite.svg#x"></use>
                    </svg>
                    <span>Закрыть</span>
                </button>
                 <div class="checkboard-popup-card__content">
                    <article class="card-scheme">
                        <div class="card-scheme__container">
                            ${favorite.outerHTML}
                            ${cardContainer.innerHTML}
                        </div>
                    </article>
                    <a href="${href}" class="btn btn-reset btn-primary checkboard-popup-card__link">Перейти на страницу квартиры</a>
                 </div>
            </div>
            </div>
            `;

            modal(modalHTML, '.checkboard-popup-card', 300);
        });
    });

    function checkboardPopup() {
        const popup = document.querySelector('.checkboard-cst-popup');
        if (!popup) return;
        const settingsPopup = {
            popup,
            container: popup.querySelector('.checkboard-cst-popup__container'),
            close: popup.querySelector('.checkboard-cst-popup__close'),
            isOpen: false,
            speed: 300,
            animation: 'fade',
        }


        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target.closest('[data-popup-checkboard-target]')) {
                const popupCard = document.querySelector('.genplan-popup-card');
                if (popupCard) popupCard.remove();
                popupOpen(settingsPopup);
            }
        })


        settingsPopup.close.addEventListener('click', () => {
            popupClose(settingsPopup);
        });
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 27 && settingsPopup.isOpen) popupClose(settingsPopup);
        })

        function popupOpen(settingsPopup) {
            if (!settingsPopup.isOpen) {
                settingsPopup.container.scrollTo(0, 0);
                settingsPopup.popup.style.setProperty('--transition-time', `${settingsPopup.speed / 1000}s`);
                settingsPopup.popup.classList.add('is-open');
                document.body.style.scrollBehavior = 'auto';
                document.documentElement.style.scrollBehavior = 'auto';
                disableScroll();
                settingsPopup.container.classList.add('open');
                settingsPopup.container.classList.add(settingsPopup.animation);
                setTimeout(() => {
                    settingsPopup.container.classList.add('animate-open');
                }, settingsPopup.speed);
                settingsPopup.isOpen = true;
            }
        }


        function popupClose(settingsPopup) {
            if (settingsPopup.isOpen) {
                settingsPopup.container.classList.remove('animate-open');
                settingsPopup.container.classList.remove(settingsPopup.animation);
                settingsPopup.popup.classList.remove('is-open');
                settingsPopup.container.classList.remove('open');
                if (document.querySelector('.popup-genplan') && !document.querySelector('.popup-genplan').classList.contains('is-open')) {
                    enableScroll();
                    document.body.style.scrollBehavior = 'auto';
                    document.documentElement.style.scrollBehavior = 'auto';
                }
                settingsPopup.isOpen = false;
            }
        }
    }

    function checkboardNav() {
        const container = document.querySelector('.checkboard-cst-popup__container');
        const checkboard = document.querySelector('.checkboard');
        const navPrev = checkboard.querySelector('.checkboard__prev');
        const navNext = checkboard.querySelector('.checkboard__next');
        const navBottom = checkboard.querySelector('.checkboard__go-bottom');
        const navTop = checkboard.querySelector('.checkboard__go-top');

        container.addEventListener('scroll', () => {
            if (window.innerWidth <= innerWidth) return;
            if (container.scrollHeight === container.scrollTop + container.clientHeight || container.scrollHeight - 1 <= container.scrollTop + container.clientHeight) {
                navBottom.setAttribute('hidden', '');
                navTop.removeAttribute('hidden');
            } else {
                navTop.setAttribute('hidden', '');
                navBottom.removeAttribute('hidden');
            }
        })

        navTop.addEventListener('click', () => {
            container.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        })
        navBottom.addEventListener('click', () => {
            container.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
        })

        setTimeout(() => {
            const containerSimplebar = checkboard.querySelector('.simplebar-content-wrapper');
            navPrev.addEventListener('click', () => {
                containerSimplebar.scrollTo({
                    left: containerSimplebar.scrollLeft - 200,
                    behavior: 'smooth',
                })
            });
            navNext.addEventListener('click', () => {
                containerSimplebar.scrollTo({
                    left: containerSimplebar.scrollLeft + 200,
                    behavior: 'smooth',
                })
            });
        }, 500);

    }


    checkboardNav();
};

export default checkboard;
