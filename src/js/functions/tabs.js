import getHash from '../support-modules/getHash';
import dataMediaQueries from '../support-modules/dataMediaQueries';
import scrollDrag from '../components/scrollDrag';
import {
    currentDropImage
} from "../components/dropImage";
import {
    currentDragDrop
} from '../components/dragDrop';
import {
    currentVideoLoad
} from '../components/videoLoad';
import {
    currentFurnishingSets
} from '../components/furnishingSets';
import inputResize from '../modules/inputResize';
import numberReplace from '../modules/numberReplace';
import {
    currentInputText
} from "../components/inputs";
import {
    currentCreateCalc
} from '../components/createCalc';
import { emergingBlockScroll } from '../modules/emergingBlockScroll';
const tabs = () => {
    const metroContainer = document.querySelector('.popup-primary--search-area');
    const metroInnerMoscow = document.querySelector('#map-metro_moscow');
    let metroBooleanStatus = false;

    const tabs = document.querySelectorAll('[data-tabs]');
    let tabsActiveHash = [];
    if (tabs.length > 0) {
        const hash = getHash();
        if (hash && hash.startsWith('tab-')) {
            tabsActiveHash = hash.replace('tab-', '').split('-');
        }
        tabs.forEach((tabsBlock, index) => {
            tabsBlock.classList.add('_tab-init');
            tabsBlock.setAttribute('data-tabs-index', index);
            tabsBlock.addEventListener("click", setTabsAction);
            initTabs(tabsBlock);
        });

        // Получение слойлеров с медиа запросами
        let mdQueriesArray = dataMediaQueries(tabs, "tabs");
        if (mdQueriesArray && mdQueriesArray.length) {
            mdQueriesArray.forEach(mdQueriesItem => {
                // Событие
                mdQueriesItem.matchMedia.addEventListener("change", function () {
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
        }
    }
    // Установка позиций заголовков
    function setTitlePosition(tabsMediaArray, matchMedia) {
        tabsMediaArray.forEach(tabsMediaItem => {
            tabsMediaItem = tabsMediaItem.item;
            let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
            let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
            let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
            let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
            tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
            tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
            tabsContentItems.forEach((tabsContentItem, index) => {
                if (matchMedia.matches) {
                    tabsContent.append(tabsTitleItems[index]);
                    tabsContent.append(tabsContentItem);
                    tabsMediaItem.classList.add('_tab-spoller');
                } else {
                    tabsTitles.append(tabsTitleItems[index]);
                    tabsMediaItem.classList.remove('_tab-spoller');
                }
            });
        });
    }
    // Работа с контентом
    function initTabs(tabsBlock) {
        let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
        let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
        const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
        const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
        if (tabsActiveHashBlock) {
            const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
            tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
        }
        if (tabsContent.length) {
            tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
            tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
            tabsContent.forEach((tabsContentItem, index) => {
                tabsTitles[index].setAttribute('data-tabs-title', '');
                tabsContentItem.setAttribute('data-tabs-item', '');

                if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
                    tabsTitles[index].classList.add('_tab-active');
                }
                tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
            });
        }

        updateTitleEdit(tabsBlock);
    }

    function updateTitleEdit(container) {
        if (container) {
            const items = container.querySelectorAll('.tabs__title--edit');
            items.forEach(item => {
                const input = item.querySelector('._width-auto');
                if (input) {
                    inputResize(input);
                    input.addEventListener('input', () => {
                        inputResize(input);
                    })
                }
            })
        }
    }

    function setTabsStatus(tabsBlock) {
        let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
        let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');

        if (tabsContent.length > 0) {
            tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
            tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
            tabsContent.forEach((tabsContentItem, index) => {
                if (tabsTitles[index].classList.contains('_tab-active')) {
                    tabsContentItem.hidden = false;
                    if (tabsBlock.closest('.object-filter__tabs')) {
                        const filter = tabsBlock.closest('.object-filter').querySelector('.filter');
                        const headerFixed = document.querySelector('.header-fixed');
                        if (tabsTitles[index] === tabsTitles[1]) {

                            const contentLayout = tabsContent[0];
                            const spollersItems = contentLayout.querySelectorAll('.spollers__item');
                            spollersItems.forEach(item => {
                                const itemBtn = item.querySelector('.layouts__item-btn');
                                const itemContent = itemBtn.nextElementSibling;
                                const cardActive = item.querySelector('.card-scheme._active');
                                const content = item.querySelector('.room-body__container');

                                itemBtn.classList.remove('_spoller-active');
                                itemContent.setAttribute('hidden', '')
                                if (cardActive) cardActive.classList.remove('_active');
                                content.setAttribute('hidden', '');
                            })
                        } else if (tabsTitles[index] === tabsTitles[0]) {
                            if (!headerFixed.classList.contains('_active')) headerFixed.classList.add('_active');
                        }
                    }


                } else {
                    tabsContentItem.hidden = true;
                }


                if (tabsBlock.querySelector('.favorites__tabs')) {
                    const favoritesTabs = tabsBlock.querySelectorAll('.favorites__tab');

                    if (tabsTitles[index].classList.contains('_tab-active')) {
                        favoritesTabs[index].hidden = false;
                    } else {
                        favoritesTabs[index].hidden = true;
                    }
                }

            });
        }
    }

    function setTabsAction(e) {
        const el = e.target;
        if (el.closest('[data-tabs-title]')) {
            const tabTitle = el.closest('[data-tabs-title]');
            const tabsBlock = tabTitle.closest('[data-tabs]');
            const editBtn = el.closest('.tabs__title-edit');
            const removeBtn = el.closest('.tabs__title-remove');
            if (removeBtn) {
                const activeTabIndex = Array.prototype.indexOf.call(tabTitle.closest('.tabs__navigation').children, tabTitle);
                const tabActiveBoolean = Boolean(tabTitle.classList.contains('_tab-active'));
                tabTitle.remove();
                tabsBlock.querySelector('.tabs-primary__content').children[activeTabIndex].remove();
                setTabsStatus(tabsBlock);
                if (tabActiveBoolean) {
                    activeFirstTab(tabsBlock.closest('.tabs-primary'));
                }
                return;
            }
            if (editBtn) {
                const input = tabTitle.querySelector('input');
                if (!editBtn.classList.contains('_active')) {
                    editBtn.innerHTML = `
                        <svg>
                            <use xlink:href="img/sprite.svg#save">
                            </use>
                        </svg>
                    `;
                    input.removeAttribute('disabled');
                    editBtn.setAttribute('title', 'Сохранить');
                    if (input.value.length >= 1) {
                        editBtn.classList.remove('_disabled');
                    } else {
                        editBtn.classList.add('_disabled');
                    }
                    editBtn.classList.add('_active');
                    tabTitle.classList.add('_edit');
                    input.focus();
                    input.setSelectionRange(input.value.length, input.value.length);
                    input.addEventListener('input', (e) => {
                        input.setAttribute('value', e.target.value);
                        if (input.value.length >= 1) {
                            editBtn.classList.remove('_disabled');
                        } else {
                            editBtn.classList.add('_disabled');
                        }
                    })
                } else {
                    editBtn.innerHTML = `
                    <svg>
                        <use xlink:href="img/sprite.svg#pencil">
                        </use>
                    </svg>
                    `;
                    input.setAttribute('disabled', '');
                    editBtn.classList.remove('_active');
                    editBtn.setAttribute('title', 'Редактировать');
                    tabTitle.classList.remove('_edit');
                }

            }
            if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide') && !tabTitle.classList.contains('_edit')) {
                let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
                tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock) : null;
                tabActiveTitle.length ? tabActiveTitle[0].classList.remove('_tab-active') : null;
                tabTitle.classList.add('_tab-active');
                setTabsStatus(tabsBlock);

                if (!metroBooleanStatus && metroContainer && metroInnerMoscow) {
                    metroContainer.querySelector('.dragscroll').scrollTo({
                        top: metroInnerMoscow.getBoundingClientRect().height / 3,
                        left: metroInnerMoscow.getBoundingClientRect().width / 3,
                    });
                    metroBooleanStatus = true;
                }
                if (el.closest('.block-stock')) {
                    const topGap = window.pageYOffset + el.closest('.block-stock').getBoundingClientRect().top;
                    const headerFixed = document.querySelector('.header-fixed');
                    const topHeaderMobile = document.querySelector('.top-page-inner');
                    if (window.innerWidth >= 1212) {
                        window.scrollTo({
                            top: headerFixed ? topGap - headerFixed.offsetHeight - 20 : topGap - 20,
                            behavior: 'smooth'
                        })
                    } else {
                        window.scrollTo({
                            top: topHeaderMobile ? topGap - topHeaderMobile.offsetHeight - 20 : topGap - 20,
                            behavior: 'smooth'
                        })
                    }
                }

                const nav = tabTitle.closest('.tabs__navigation');
                if (nav.querySelector('._edit')) {
                    const tabs = nav.querySelectorAll('.tabs__title--edit._edit');
                    tabs.forEach(item => {
                        const input = item.querySelector('input');
                        const editBtn = item.querySelector('.tabs__title-edit');

                        input.setAttribute('disabled', '');
                        editBtn.classList.remove('_active');
                        item.classList.remove('_edit');
                    })

                }
                if (tabTitle.closest('.create-calc-mort')) {
                    emergingBlockScroll('.create-calc .create-calc__btn', '.footer-fixed.create-calc-fixed', 99999999, true,true);
                }
            }
            e.preventDefault();
        }
    }
    document.addEventListener('click', (e) => {
        const target = e.target;
        const createNew = target.closest('.tabs-primary__create-new');
        if (createNew) {
            const currentTabs = createNew.closest('.tabs-primary');
            const nav = currentTabs.querySelector('.tabs__navigation');
            const tabs = currentTabs.querySelector('.tabs-primary__content');
            const tabsBlock = currentTabs.querySelector('[data-tabs]');
            nav.insertAdjacentHTML('beforeend', `
            <button type="button" class="btn btn-reset tabs__title tabs__title--edit" data-tabs-title>
            <input type="text" name="Имя" class="input-reset _width-auto" value="" disabled="">
            <div class="btn btn-reset tabs__title-edit _disabled" title="Сохранить">
                <svg>
                    <use xlink:href="img/sprite.svg#save">
                    </use>
                </svg>
            </div>
            <div class="btn btn-reset tabs__title-remove" title="Удалить">
                <svg>
                    <use xlink:href="img/sprite.svg#trash">
                    </use>
                </svg>
            </div>
        </button>
            `);
            const photoHTML = `
                <div class="tabs__body" data-tabs-item>
                <div class="photo-load">
                    <div class="place-sale-photo__images drag-drop photo-load__images"></div>
                    <div class="place-sale-photo__wrapper photo-load__wrapper">
                        <button type="button" class="btn btn-reset">
                            <p>
                                <span class="btn btn-reset btn-primary">Выберите фото</span> <span>или перетащите в эту область</span>
                            </p>
                        </button>
                        <input type="file" data-upload-drop name="upload" multiple accept=".jpg, .png, .jpeg, .heic" class="input-reset">
                    </div>
                </div>
                <label class="textarea-primary" style="margin-top: 24px;">
                    <textarea class="input-reset textarea-primary__input" placeholder="Описание к фотографии"></textarea>
                </label>
                </div>
            `;
            const furnishingSetsHTML = `
            <div class="tabs__body furnishing-sets__item" data-tabs-item hidden>
            <div class="row">
                <div class="furnishing-sets__btns">
                    <button type="button"
                        class="btn btn-reset furnishing-sets__btn furnishing-sets__btn--studio furnishing-sets__btn--controls _active">
                        <span>Студия</span>
                        <div class="furnishing-sets__btn-remove">
                            <svg>
                                <use xlink:href="img/sprite.svg#trash"></use>
                            </svg>
                        </div>
                    </button>
                    <button type="button" class="btn btn-reset furnishing-sets__btn furnishing-sets__btn--room furnishing-sets__btn--controls">
                        <span>1</span>
                        <div class="furnishing-sets__btn-remove">
                            <svg>
                                <use xlink:href="img/sprite.svg#trash"></use>
                            </svg>
                        </div>
                    </button>
                    <button type="button" class="btn btn-reset furnishing-sets__btn furnishing-sets__btn--room furnishing-sets__btn--controls">
                        <span>2</span>
                        <div class="furnishing-sets__btn-remove">
                            <svg>
                                <use xlink:href="img/sprite.svg#trash"></use>
                            </svg>
                        </div>
                    </button>
                    <button type="button" class="btn btn-reset furnishing-sets__btn furnishing-sets__btn--room furnishing-sets__btn--controls">
                        <span>3</span>
                        <div class="furnishing-sets__btn-remove">
                            <svg>
                                <use xlink:href="img/sprite.svg#trash"></use>
                            </svg>
                        </div>
                    </button>
                    <button type="button" class="btn btn-reset furnishing-sets__btn furnishing-sets__btn--room furnishing-sets__btn--controls">
                        <span>4</span>
                        <div class="furnishing-sets__btn-remove">
                            <svg>
                                <use xlink:href="img/sprite.svg#trash"></use>
                            </svg>
                        </div>
                    </button>
                </div>
                <div class="furnishing-sets__create">
                    <button type="button" class="btn btn-reset furnishing-sets__create--room">
                        <svg>
                            <use xlink:href="img/sprite.svg#plus"></use>
                        </svg>
                        Добавить комнатность
                    </button>
                </div>
            </div>
            <div class="furnishing-sets__tabs">
                <div class="furnishing-sets__tab">
                    <div class="photo-load">
                        <div class="place-sale-photo__images drag-drop photo-load__images">

                        </div>
                        <div class="place-sale-photo__wrapper photo-load__wrapper">
                            <button type="button" class="btn btn-reset">
                                <p>
                                    <span class="btn btn-reset btn-primary">Выберите фото</span> <span>или перетащите в эту область</span>
                                </p>
                            </button>
                            <input type="file" data-upload-drop name="upload" multiple accept=".jpg, .png, .jpeg, .heic" class="input-reset">
                        </div>
                    </div>
                    <label class="textarea-primary" style="margin-top: 24px;">
                        <textarea class="input-reset textarea-primary__input" placeholder="Описание к фотографии"></textarea>
                    </label>
                    <div class="row" style="margin:16px 0 24px;">
                        <div class="input-text input-text--only-number" style="max-width: 350px;">
                            <label class="input-text__label">
                                <span>Стоимость от</span>
                                <input type="text" name="Цена" maxlength="12" class="input-reset input-text__input" placeholder="">
                                <span>₽</span>
                            </label>
                        </div>
                        <div class="place-sale-price__tooltip secondary-tooltip secondary-tooltip--dark" style="margin-left: 8px;">
                            <button type="button" class="btn btn-reset secondary-tooltip__btn">
                                <svg>
                                    <use xlink:href="img/sprite.svg#info"></use>
                                </svg>
                            </button>
                            <div class="secondary-tooltip__content">
                                Стоиомость комплекта меблировки
                            </div>
                        </div>
                    </div>
                    <div class="photo-load">
                        <div class="place-sale-photo__images drag-drop photo-load__images">
                        </div>
                        <div class="place-sale-photo__wrapper photo-load__wrapper">
                            <button type="button" class="btn btn-reset">
                                <p>
                                    <span class="btn btn-reset btn-primary">Добавьте PDF полного состава комплекта </span> <span>или перетащите в
                                        эту область</span>
                                </p>
                            </button>
                            <input type="file" data-upload-drop data-upload-drop-pdf name="upload" accept="application/pdf" class="input-reset">
                        </div>
                    </div>
                </div>
                <div class="furnishing-sets__tab" hidden>
                    <div class="photo-load">
                        <div class="place-sale-photo__images drag-drop photo-load__images">
                        </div>
                        <div class="place-sale-photo__wrapper photo-load__wrapper">
                            <button type="button" class="btn btn-reset">
                                <p>
                                    <span class="btn btn-reset btn-primary">Выберите фото</span> <span>или перетащите в эту область</span>
                                </p>
                            </button>
                            <input type="file" data-upload-drop name="upload" multiple accept=".jpg, .png, .jpeg, .heic" class="input-reset">
                        </div>
                    </div>
                    <label class="textarea-primary" style="margin-top: 24px;">
                        <textarea class="input-reset textarea-primary__input" placeholder="Описание к фотографии"></textarea>
                    </label>
                    <div class="row" style="margin:16px 0 24px;">
                        <div class="input-text input-text--only-number" style="max-width: 350px;">
                            <label class="input-text__label">
                                <span>Стоимость от</span>
                                <input type="text" name="Цена" maxlength="12" class="input-reset input-text__input" placeholder="">
                                <span>₽</span>
                            </label>
                        </div>
                        <div class="place-sale-price__tooltip secondary-tooltip secondary-tooltip--dark" style="margin-left: 8px;">
                            <button type="button" class="btn btn-reset secondary-tooltip__btn">
                                <svg>
                                    <use xlink:href="img/sprite.svg#info"></use>
                                </svg>
                            </button>
                            <div class="secondary-tooltip__content">
                                Стоиомость комплекта меблировки
                            </div>
                        </div>
                    </div>
                    <div class="photo-load">
                        <div class="place-sale-photo__images drag-drop photo-load__images">
                        </div>
                        <div class="place-sale-photo__wrapper photo-load__wrapper">
                            <button type="button" class="btn btn-reset">
                                <p>
                                    <span class="btn btn-reset btn-primary">Добавьте PDF полного состава комплекта </span> <span>или перетащите в
                                        эту область</span>
                                </p>
                            </button>
                            <input type="file" data-upload-drop data-upload-drop-pdf name="upload" accept="application/pdf" class="input-reset">
                        </div>
                    </div>
                </div>
                <div class="furnishing-sets__tab" hidden>
                    <div class="photo-load">
                        <div class="place-sale-photo__images drag-drop photo-load__images">
                        </div>
                        <div class="place-sale-photo__wrapper photo-load__wrapper">
                            <button type="button" class="btn btn-reset">
                                <p>
                                    <span class="btn btn-reset btn-primary">Выберите фото</span> <span>или перетащите в эту область</span>
                                </p>
                            </button>
                            <input type="file" data-upload-drop name="upload" multiple accept=".jpg, .png, .jpeg, .heic" class="input-reset">
                        </div>
                    </div>
                    <label class="textarea-primary" style="margin-top: 24px;">
                        <textarea class="input-reset textarea-primary__input" placeholder="Описание к фотографии"></textarea>
                    </label>
                    <div class="row" style="margin:16px 0 24px;">
                        <div class="input-text input-text--only-number" style="max-width: 350px;">
                            <label class="input-text__label">
                                <span>Стоимость от</span>
                                <input type="text" name="Цена" maxlength="12" class="input-reset input-text__input" placeholder="">
                                <span>₽</span>
                            </label>
                        </div>
                        <div class="place-sale-price__tooltip secondary-tooltip secondary-tooltip--dark" style="margin-left: 8px;">
                            <button type="button" class="btn btn-reset secondary-tooltip__btn">
                                <svg>
                                    <use xlink:href="img/sprite.svg#info"></use>
                                </svg>
                            </button>
                            <div class="secondary-tooltip__content">
                                Стоиомость комплекта меблировки
                            </div>
                        </div>
                    </div>
                    <div class="photo-load">
                        <div class="place-sale-photo__images drag-drop photo-load__images">
                        </div>
                        <div class="place-sale-photo__wrapper photo-load__wrapper">
                            <button type="button" class="btn btn-reset">
                                <p>
                                    <span class="btn btn-reset btn-primary">Добавьте PDF полного состава комплекта </span> <span>или перетащите в
                                        эту область</span>
                                </p>
                            </button>
                            <input type="file" data-upload-drop data-upload-drop-pdf name="upload" accept="application/pdf" class="input-reset">
                        </div>
                    </div>
                </div>
                <div class="furnishing-sets__tab" hidden>
                    <div class="photo-load">
                        <div class="place-sale-photo__images drag-drop photo-load__images">
                        </div>
                        <div class="place-sale-photo__wrapper photo-load__wrapper">
                            <button type="button" class="btn btn-reset">
                                <p>
                                    <span class="btn btn-reset btn-primary">Выберите фото</span> <span>или перетащите в эту область</span>
                                </p>
                            </button>
                            <input type="file" data-upload-drop name="upload" multiple accept=".jpg, .png, .jpeg, .heic" class="input-reset">
                        </div>
                    </div>
                    <label class="textarea-primary" style="margin-top: 24px;">
                        <textarea class="input-reset textarea-primary__input" placeholder="Описание к фотографии"></textarea>
                    </label>
                    <div class="row" style="margin:16px 0 24px;">
                        <div class="input-text input-text--only-number" style="max-width: 350px;">
                            <label class="input-text__label">
                                <span>Стоимость от</span>
                                <input type="text" name="Цена" maxlength="12" class="input-reset input-text__input" placeholder="">
                                <span>₽</span>
                            </label>
                        </div>
                        <div class="place-sale-price__tooltip secondary-tooltip secondary-tooltip--dark" style="margin-left: 8px;">
                            <button type="button" class="btn btn-reset secondary-tooltip__btn">
                                <svg>
                                    <use xlink:href="img/sprite.svg#info"></use>
                                </svg>
                            </button>
                            <div class="secondary-tooltip__content">
                                Стоиомость комплекта меблировки
                            </div>
                        </div>
                    </div>
                    <div class="photo-load">
                        <div class="place-sale-photo__images drag-drop photo-load__images">
                        </div>
                        <div class="place-sale-photo__wrapper photo-load__wrapper">
                            <button type="button" class="btn btn-reset">
                                <p>
                                    <span class="btn btn-reset btn-primary">Добавьте PDF полного состава комплекта </span> <span>или перетащите в
                                        эту область</span>
                                </p>
                            </button>
                            <input type="file" data-upload-drop data-upload-drop-pdf name="upload" accept="application/pdf" class="input-reset">
                        </div>
                    </div>
                </div>
                <div class="furnishing-sets__tab" hidden>
                    <div class="photo-load">
                        <div class="place-sale-photo__images drag-drop photo-load__images">
                        </div>
                        <div class="place-sale-photo__wrapper photo-load__wrapper">
                            <button type="button" class="btn btn-reset">
                                <p>
                                    <span class="btn btn-reset btn-primary">Выберите фото</span> <span>или перетащите в эту область</span>
                                </p>
                            </button>
                            <input type="file" data-upload-drop name="upload" multiple accept=".jpg, .png, .jpeg, .heic" class="input-reset">
                        </div>
                    </div>
                    <label class="textarea-primary" style="margin-top: 24px;">
                        <textarea class="input-reset textarea-primary__input" placeholder="Описание к фотографии"></textarea>
                    </label>
                    <div class="row" style="margin:16px 0 24px;">
                        <div class="input-text input-text--only-number" style="max-width: 350px;">
                            <label class="input-text__label">
                                <span>Стоимость от</span>
                                <input type="text" name="Цена" maxlength="12" class="input-reset input-text__input" placeholder="">
                                <span>₽</span>
                            </label>
                        </div>
                        <div class="place-sale-price__tooltip secondary-tooltip secondary-tooltip--dark" style="margin-left: 8px;">
                            <button type="button" class="btn btn-reset secondary-tooltip__btn">
                                <svg>
                                    <use xlink:href="img/sprite.svg#info"></use>
                                </svg>
                            </button>
                            <div class="secondary-tooltip__content">
                                Стоиомость комплекта меблировки
                            </div>
                        </div>
                    </div>
                    <div class="photo-load">
                        <div class="place-sale-photo__images drag-drop photo-load__images">
                        </div>
                        <div class="place-sale-photo__wrapper photo-load__wrapper">
                            <button type="button" class="btn btn-reset">
                                <p>
                                    <span class="btn btn-reset btn-primary">Добавьте PDF полного состава комплекта </span> <span>или перетащите в
                                        эту область</span>
                                </p>
                            </button>
                            <input type="file" data-upload-drop data-upload-drop-pdf name="upload" accept="application/pdf" class="input-reset">
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `;
            const ecologyParksHTML = `
            <div class="tabs__body" data-tabs-item>
            <div class="photo-load">
                <div class="place-sale-photo__images drag-drop photo-load__images"></div>
                <div class="place-sale-photo__wrapper photo-load__wrapper">
                    <button type="button" class="btn btn-reset">
                        <p>
                            <span class="btn btn-reset btn-primary">Выберите фото</span> <span>или перетащите в эту область</span>
                        </p>
                    </button>
                    <input type="file" data-upload-drop name="upload" multiple accept=".jpg, .png, .jpeg, .heic" class="input-reset">
                </div>
            </div>
            <label class="textarea-primary" style="margin-top: 24px;">
                <textarea class="input-reset textarea-primary__input" placeholder="Описание к фотографии"></textarea>
            </label>
            <div class="input-text input-text--only-number" style="max-width: 350px; margin-top:24px;">
                <label class="input-text__label">
                    <span>Расстояние от комплекса</span>
                    <input type="text" name="Расстояние от комплекса" maxlength="4" class="input-reset input-text__input" placeholder="">
                    <span>мин</span>
                </label>
            </div>
            </div>
            `;
            const createCalcMortHTML = `
            <div class="tabs__body create-calc-mort__field" data-tabs-item>
                <button type="button" class="btn btn-reset create-calc-mort__create-item">
                    <svg>
                        <use xlink:href="img/sprite.svg#plus"></use>
                    </svg>
                    Добавить новое поле
                </button>
                </div>
            </div>
            `;
            if (currentTabs.closest('.furnishing-sets')) {
                tabs.insertAdjacentHTML('beforeend', furnishingSetsHTML);
                setTabsStatus(tabsBlock);
                currentFurnishingSets(tabs.querySelector('.furnishing-sets__item:last-child'));
                update(tabs.querySelector('.furnishing-sets__item:last-child'));
            } else if (currentTabs.closest('.ecology-parks')) {
                tabs.insertAdjacentHTML('beforeend', ecologyParksHTML);
                setTabsStatus(tabsBlock);
                update(tabsBlock.querySelector('.tabs__body:last-child'));
            } else if (currentTabs.closest('.create-calc-mort')) {
                tabs.insertAdjacentHTML('beforeend', createCalcMortHTML);
                setTabsStatus(tabsBlock);
                currentCreateCalc(tabsBlock.querySelector('.tabs__body:last-child'));
                update(tabsBlock.querySelector('.tabs__body:last-child'));
            } else {
                tabs.insertAdjacentHTML('beforeend', photoHTML);
                setTabsStatus(tabsBlock);
                update(tabsBlock.querySelector('.tabs__body:last-child'));
            }
            nav.scrollTo({
                left: nav.scrollWidth,
            });
            scrollDrag(nav, 1000, true);
            const currentTitle = nav.querySelectorAll('.tabs__title')[nav.querySelectorAll('.tabs__title').length - 1];
            const input = currentTitle.querySelector('input');
            const editBtn = currentTitle.querySelector('.tabs__title-edit');
            input.removeAttribute('disabled');
            editBtn.classList.add('_active');
            currentTitle.classList.add('_edit');
            updateTitleEdit(currentTabs);
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
            input.addEventListener('input', (e) => {
                input.setAttribute('value', e.target.value);
                if (input.value.length >= 1) {
                    editBtn.classList.remove('_disabled');
                } else {
                    editBtn.classList.add('_disabled');
                }
            })
            if (!nav.querySelector('.tabs__title._tab-active')) {
                currentTitle.classList.add('_tab-active');
                tabsBlock.querySelector('.tabs__body').removeAttribute('hidden');
            }

            activeCurrentTab(currentTabs, currentTitle, tabsBlock.querySelectorAll('.tabs__body')[tabsBlock.querySelectorAll('.tabs__body').length - 1]);
        }

        function update(content) {
            if (content) {
                const inputs = content.querySelectorAll('.input-text');
                const photoLoads = content.querySelectorAll('.video-load');
                const dropImages = content.querySelectorAll('.photo-load');
                const dragDrops = content.querySelectorAll('.drag-drop');

                photoLoads.forEach(item => currentVideoLoad(item));
                dropImages.forEach(item => currentDropImage(item));
                dragDrops.forEach(item => currentDragDrop(item));
                inputs.forEach(item => currentInputText(item));
            }
        }
    })

    function activeCurrentTab(currentTabs, currentTitle, currentTab) {
        if (currentTabs && currentTitle && currentTab) {
            const titles = currentTabs.querySelectorAll('.tabs__navigation .tabs__title');
            const tabs = currentTabs.querySelectorAll('.tabs__body');

            titles.forEach(title => title.classList.remove('_tab-active'));
            tabs.forEach(tab => tab.setAttribute('hidden', ''));

            currentTitle.classList.add('_tab-active');
            currentTab.removeAttribute('hidden');
        }
    }

    function activeFirstTab(currentTabs) {
        const titles = currentTabs.querySelectorAll('.tabs__navigation .tabs__title');
        const tabs = currentTabs.querySelectorAll('.tabs__body');

        titles.forEach(title => title.classList.remove('_tab-active'));
        tabs.forEach(tab => tab.setAttribute('hidden', ''));

        titles[0].classList.add('_tab-active');
        tabs[0].removeAttribute('hidden');
    }
}

export default tabs;
