import getHash from '../support-modules/getHash';
import dataMediaQueries from '../support-modules/dataMediaQueries';
import scrollDrag from '../components/scrollDrag';
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
                const activeTabIndex = Array.prototype.indexOf.call(tabTitle.closest('.tabs__navigation').children,tabTitle);
                tabTitle.remove();
                tabsBlock.querySelector('.tabs-primary__content').children[activeTabIndex].remove();
                setTabsStatus(tabsBlock);
                return;
            }
            if (editBtn) {
                const input = tabTitle.querySelector('input');
                if (!editBtn.classList.contains('_active')) {
                    input.removeAttribute('disabled');
                    editBtn.classList.add('_active');
                    tabTitle.classList.add('_edit');
                    input.focus();
                    input.setSelectionRange(input.value.length, input.value.length);
                } else {
                    input.setAttribute('disabled', '');
                    editBtn.classList.remove('_active');
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
            }
            e.preventDefault();
        }
    }


    document.addEventListener('click', (e) => {
        const target = e.target;
        const createNew = target.closest('.tabs-primary__create-new');
        if (!target.closest('.tabs__navigation') && document.querySelector('.tabs__title.tabs__title--edit._edit')) {
            const items = document.querySelectorAll('.tabs__title.tabs__title--edit._edit');
            items.forEach(item => {
                const input = item.querySelector('input');
                const editBtn = item.querySelector('.tabs__title-edit');

                input.setAttribute('disabled', '');
                editBtn.classList.remove('_active');
                item.classList.remove('_edit');
            })
        }
        if (createNew) {
            const currentTabs = createNew.closest('.tabs-primary');
            const nav = currentTabs.querySelector('.tabs__navigation');
            const tabs = currentTabs.querySelector('.tabs-primary__content');
            const tabsBlock = currentTabs.querySelector('[data-tabs]');
            nav.innerHTML += `
            <button type="button" class="btn btn-reset tabs__title tabs__title--edit" data-tabs-title>
                <input type="text" name="Имя" class="input-reset" value="Название" disabled="">
                <div class="btn btn-reset tabs__title-edit" title="Редактировать">
                    <svg>
                        <use xlink:href="img/sprite.svg#pencil">
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
            `;

            const photoHTML = `
            <div class="tabs__body" data-tabs-item>
                <div class="place-sale-photo__wrapper photo-load">
                    <button type="button" class="btn btn-reset photo-load__wrapper">
                        <p>
                            <span class="btn btn-reset btn-primary">Выберите фото</span> <span>или перетащите в эту область</span>
                        </p>
                    </button>
                    <input type="file" data-upload-drop="" name="upload" multiple="" accept=".jpg, .png, .jpeg, .heic" class="input-reset">
                </div>
            </div>
            `;

            tabs.innerHTML += photoHTML;
            setTabsStatus(tabsBlock);
            nav.scrollTo({
                left: nav.scrollWidth,
            });
            scrollDrag(nav, 1000, true);
        }
    })
}

export default tabs;
