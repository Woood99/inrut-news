import dataMediaQueries from '../support-modules/dataMediaQueries';
import {
    _slideUp,
    _slideDown,
    _slideToggle,
    _displayFadeToggle
} from '../support-modules/slide';
import {
    cardSchemeTag
} from '../components/controlCards';
const spollers = () => {
    const spollersArray = document.querySelectorAll('[data-spollers]');
    let speed = 500;
    if (spollersArray.length > 0) {
        // Получение обычных слойлеров
        const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
            return !item.dataset.spollers.split(",")[0];
        });
        // Инициализация обычных слойлеров
        if (spollersRegular.length) {
            initSpollers(spollersRegular);
        }
        // Получение слойлеров с медиа запросами
        let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
        if (mdQueriesArray && mdQueriesArray.length) {
            mdQueriesArray.forEach(mdQueriesItem => {
                // Событие
                mdQueriesItem.matchMedia.addEventListener("change", function () {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
        }

        // Инициализация
        function initSpollers(spollersArray, matchMedia = false) {
            spollersArray.forEach(spollersBlock => {
                spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                if (matchMedia.matches || !matchMedia) {
                    spollersBlock.classList.add('_spoller-init');
                    initSpollerBody(spollersBlock);
                    spollersBlock.addEventListener("click", setSpollerAction);
                } else {
                    spollersBlock.classList.remove('_spoller-init');
                    initSpollerBody(spollersBlock, false);
                    spollersBlock.removeEventListener("click", setSpollerAction);
                }
            });
        }
        // Работа с контентом
        function initSpollerBody(spollersBlock, hideSpollerBody = true) {
            let spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
            if (spollerTitles.length) {
                spollerTitles = Array.from(spollerTitles).filter(item => item.closest('[data-spollers]') === spollersBlock);
                spollerTitles.forEach(spollerTitle => {
                    if (hideSpollerBody) {
                        spollerTitle.removeAttribute('tabindex');
                        if (!spollerTitle.classList.contains('_spoller-active')) {
                            spollerTitle.nextElementSibling.hidden = true;
                        }
                    } else {
                        spollerTitle.setAttribute('tabindex', '-1');
                        spollerTitle.nextElementSibling.hidden = false;
                    }
                });
            }
        }

        function setSpollerAction(e) {
            const el = e.target;
            if (el.closest('[data-spoller]')) {
                const spollerTitle = el.closest('[data-spoller]');
                const spollersBlock = spollerTitle.closest('[data-spollers]');
                const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;

                if (!spollersBlock.querySelectorAll('._slide').length) {
                    if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
                        hideSpollersBody(spollersBlock);
                    }
                    spollerTitle.classList.toggle('_spoller-active');
                    if (spollerTitle.closest('.spollers__item')) {
                        spollerTitle.closest('.spollers__item').classList.toggle('_active');
                    }
                    if (el.closest('.layouts__item-btn')) speed = 0;

                    if (spollersBlock.hasAttribute('data-spollers-fade')) {
                        _displayFadeToggle(spollerTitle.nextElementSibling, 300);
                    } else {
                        _slideToggle(spollerTitle.nextElementSibling, speed);
                    }

                    if (spollerTitle.classList.contains('_spoller-active') && el.closest('.layouts__item-btn')) {
                        setTimeout(() => {
                            const headerFixed = document.querySelector('.header-fixed');
                            const topHeaderMobile = document.querySelector('.top-page-inner');
                            const topGap = spollerTitle.offsetTop;
                            window.scrollTo({
                                top: topGap - (window.innerWidth > 1212 ? headerFixed.offsetHeight : topHeaderMobile.offsetHeight) - 16,
                                behavior: 'smooth'
                            })
                            cardSchemeTag(spollerTitle.nextElementSibling);
                        }, speed);
                    }
                    if (spollerTitle.classList.contains('_spoller-active') && el.closest('.record-viewing__object')) {
                        const popup = document.querySelector('.popup-primary--record-viewing');
                        setTimeout(() => {
                            const topGap = spollerTitle.offsetTop;
                            popup.scrollTo({
                                top: topGap - 140,
                                behavior: 'smooth'
                            })
                        }, speed);
                    }
                }

                if (el.closest('.layouts__item-btn')) {
                    const activeBodyBlock = spollersBlock.querySelector('.room-body__container:not([hidden])');
                    const activeCard = spollersBlock.querySelector('.room-body__items .card-scheme._active');
                    if (activeBodyBlock && activeCard) {
                        activeCard.classList.remove('_active');
                        activeBodyBlock.setAttribute('hidden', '');
                    }
                }
               const tagsHeightItems = spollerTitle.nextElementSibling.querySelectorAll('[data-tags-in-height]');
               tagsHeightItems.forEach(item => {
                item.tagsInHeight.update()
               })
                e.preventDefault();
            }
        }

        function hideSpollersBody(spollersBlock) {
            const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active');
            if (spollerActiveTitle) {
                spollerActiveTitle.classList.remove('_spoller-active');
                _slideUp(spollerActiveTitle.nextElementSibling, speed);
            }
        }
    }
}

export default spollers;
