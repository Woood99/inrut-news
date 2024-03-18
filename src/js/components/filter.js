import noUiSlider from 'nouislider';
import enableScroll from '../modules/enableScroll';
import disableScroll from '../modules/disableScroll';
import inputResize from '../modules/inputResize';
import numberReplace from '../modules/numberReplace';
import {
    _slideToggle,
    _slideDown,
    _slideUp
} from '../support-modules/slide';
import modal from '../modules/modal';
import {
    mapPrimary,
    itsReadyMap
} from './maps';
import {
    currentSimplebar
} from './simplebar';
import {
    actionForCards
} from './controlCards';
import { convertSum } from '../modules/convertSum';
export const filterDropdownChoice = () => {
    const items = document.querySelectorAll('.filter-dropdown__dropdown');
    if (!items.length >= 1) return;
    items.forEach(item => {
        item.querySelectorAll('.filter-dropdown__checkbox').forEach(el => {
            el.addEventListener('change', () => {
                if (!el.closest('.filter-dropdown__item').classList.contains('active')) {
                    item.querySelectorAll('.filter-dropdown__item').forEach(itemTwo => {
                        itemTwo.classList.remove('active');
                        itemTwo.querySelector('.filter-dropdown__checkbox input').checked = false;
                    });
                    el.querySelector('input').checked = true;
                    el.closest('.filter-dropdown__item').classList.add('active');
                    item.querySelectorAll('.filter-dropdown__item').forEach(itemTwo => {
                        if (!itemTwo.classList.contains('active')) {
                            const inputs = itemTwo.querySelectorAll('.input-text');
                            inputs.forEach(inputContainer => {
                                inputContainer.classList.remove('_active');
                                inputContainer.querySelector('input').value = '';
                            })
                        }
                    });

                } else {
                    el.querySelector('input').checked = true;
                }
            })
        })
    })
}


export const filterSum = () => {
    const container = document.querySelectorAll('.filter-dropdown');
    if (!container.length >= 1) return;
    container.forEach(el => {
        const defaultItem = el.querySelector('.filter-dropdown__item.active');
        const btn = el.querySelector('.filter-dropdown__button');
        const inputs = el.querySelectorAll('.filter-range__nav input');
        const close = el.querySelector('.filter-dropdown__close');
        checkChangeTitle(el) ? changeTitleOne(el) : changeTitle(el);
        btn.addEventListener('click', () => {
            container.forEach(elTwo => {
                if (elTwo !== el) elTwo.classList.remove('active')
            });
            el.classList.toggle('active');
            if (!el.classList.contains('active')) {
                checkChangeTitle(el) ? changeTitleOne(el) : changeTitle(el);
            } else {
                if (filterModalScreenWidthCheck() && el.classList.contains('active')) {
                    const modalHTML = `
                    <div class="filter-modal">
                        <div class="filter-modal__container">
                            <button class="btn-reset filter-modal__close" aria-label="Закрыть модальное окно">
                                <svg>
                                    <use xlink:href="./img/sprite.svg#x"></use>
                                </svg>
                                <span>Закрыть</span>
                            </button>
                            <div class="filter-modal__content">
                            </div>
                        </div>
                    </div>
                    `;
                    modal(modalHTML, '.filter-modal', 300, el, el.dataset.modalScroll);
                    const filterModal = document.querySelector('.filter-modal');
                    filterModal.querySelector('.filter-modal__content').insertAdjacentElement('beforeend', el.querySelector('.filter-dropdown__dropdown'));
                    const currentEl = filterModal.querySelector('.filter-dropdown__dropdown');
                    filterModal.querySelectorAll('.filter-range__nav input').forEach(input => {
                        input.addEventListener('change', () => {
                            checkChangeTitle(currentEl, el) ? changeTitleOne(currentEl, el) : changeTitle(currentEl, el);
                        });
                        input.addEventListener('input', () => {
                            input.value = numberReplace(input.value);
                            checkChangeTitle(currentEl, el) ? changeTitleOne(currentEl, el) : changeTitle(currentEl, el);
                        });
                    })
                }
            }
        })
        document.addEventListener('click', (e) => {
            if (el.classList.contains('active') && !e.target.closest('.filter-dropdown') && !filterModalScreenWidthCheck()) {
                el.classList.remove('active');
                if (checkChangeTitle(el)) {
                    changeTitleOne(el);
                } else {
                    changeTitle(el);
                }
                setTimeout(() => {
                    const items = el.querySelectorAll('.filter-dropdown__item');
                    const currentItem = el.querySelector('.filter-dropdown__item.active');
                    if (currentItem) {
                        let value = false;
                        const inputs = currentItem.querySelectorAll('.filter-range__nav input');
                        for (let i = 0; i < inputs.length; i++) {
                            const input = inputs[i];
                            if (input.value !== '') {
                                value = true;
                                break;
                            }
                        }
                        if (value === false) {
                            if (el.querySelector('.checkbox-secondary__input')) {
                                items.forEach(item => {
                                    item.classList.remove('active');
                                    item.querySelector('.checkbox-secondary__input').checked = false;
                                });
                                defaultItem.classList.add('active');
                                defaultItem.querySelector('.checkbox-secondary__input').checked = true;

                            }
                            const calcProper = document.querySelector('.submit-app-options__item--calc-proper');
                            if (calcProper) {
                                const cash = calcProper.querySelector('[data-name="cash"]');
                                cash.removeAttribute('disabled');
                            }
                        }
                    }
                }, 150);
            } else if (e.target.closest('.filter-dropdown') || e.target.closest('.filter-modal')) {
                if (filterModalScreenWidthCheck() && el.classList.contains('active')) {
                    const currentEl = document.querySelector('.filter-modal .filter-modal__content');
                    checkChangeTitle(currentEl, el) ? changeTitleOne(currentEl, el) : changeTitle(currentEl, el);
                } else {
                    checkChangeTitle(el) ? changeTitleOne(el) : changeTitle(el);
                }
            }
        })
        if (close) {
            close.addEventListener('click', () => {
                el.classList.remove('active');
            });
        }
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                if (!filterModalScreenWidthCheck()) {
                    checkChangeTitle(el) ? changeTitleOne(el) : changeTitle(el);
                }
            });
            input.addEventListener('input', () => {
                if (!filterModalScreenWidthCheck()) {
                    input.value = numberReplace(input.value);
                    checkChangeTitle(el) ? changeTitleOne(el) : changeTitle(el);
                }
            });
        })
    })

    function changeTitle(el, currentElMobile) {
        setTimeout(() => {
            const itemActive = !currentElMobile ? el.querySelector('.filter-dropdown__item.active') : document.querySelector('.filter-modal .filter-dropdown__item.active');
            if (!itemActive) return;
            const inputs = itemActive.querySelectorAll('.filter-range__nav input');
            const buttonWrapper = !currentElMobile ? el.querySelector('.filter-dropdown__button-wrapper') : currentElMobile.querySelector('.filter-dropdown__button-wrapper');
            let html = ``;
            if (((inputs[0].value || inputs[0].value == 0) || (inputs[1].value == 0 || inputs[1].value)) && (inputs[0].value !== '' || inputs[1].value !== '')) {
                if (el.dataset.filterDropdownName === 'Цена' || el.dataset.filterDropdownName === 'Сумма' || el.dataset.filterDropdownName === 'Стоимость объекта') {
                    html = `
                    <div>
                        ${!el.dataset.filterDropdownNoTitle ? el.dataset.filterDropdownName : ''}
                    </div>
                    ${inputs[0].value ? `<div>от ${convertSum(inputs[0].value)}</div>` : ''}
                    ${inputs[0].value && inputs[1].value ? '<div>-</div>' : ''}
                    ${inputs[1].value ? `<div>до ${convertSum(inputs[1].value)}</div>` : ''}
                `;
                    if (inputs[0].value !== '') {
                        el.setAttribute('data-filter-dropdown-price-from', inputs[0].value.replace(/\s/g, ''));
                    }
                    if (inputs[1].value !== '') {
                        el.setAttribute('data-filter-dropdown-price-to', inputs[1].value.replace(/\s/g, ''));
                    }
                }
                if (el.dataset.filterDropdownName === 'Площадь' || el.dataset.filterDropdownName === 'Площадь кухни') {
                    html = `
                    <div>
                    ${!el.dataset.filterDropdownNoTitle ? el.dataset.filterDropdownName : ''}
                    </div>
                    ${inputs[0].value ? `<div>от ${inputs[0].value} м²</div>` : ''}
                    ${inputs[0].value && inputs[1].value ? '<div>-</div>' : ''}
                    ${inputs[1].value ? `<div>до ${inputs[1].value} м²</div>` : ''}
                `;
                }
                if (el.dataset.filterDropdownName === 'Этаж') {
                    html = `
                    <div>
                    ${!el.dataset.filterDropdownNoTitle ? el.dataset.filterDropdownName : ''}
                    </div>
                    ${inputs[0].value ? `<div>от ${inputs[0].value} эт.</div>` : ''}
                    ${inputs[0].value && inputs[1].value ? '<div>-</div>' : ''}
                    ${inputs[1].value ? `<div>до ${inputs[1].value} эт.</div>` : ''}
                `;
                }

                if (currentElMobile) {
                    if (currentElMobile.dataset.filterDropdownName === 'Цена' || currentElMobile.dataset.filterDropdownName === 'Сумма' || currentElMobile.dataset.filterDropdownName === 'Стоимость объекта') {
                        html = `
                        <div>
                        ${!el.dataset.filterDropdownNoTitle ? currentElMobile.dataset.filterDropdownName : ''}
                        </div>
                        <div>
                           от ${convertSum(inputs[0].value)}
                        </div>
                        <div>
                            -
                        </div>
                        <div>
                        до ${convertSum(inputs[1].value)}
                        </div>
                    `;
                    }

                    if (currentElMobile.dataset.filterDropdownName === 'Площадь' || currentElMobile.dataset.filterDropdownName === 'Площадь кухни') {
                        html = `
                    <div>
                    ${!el.dataset.filterDropdownNoTitle ? currentElMobile.dataset.filterDropdownName : ''}
                    </div>
                        <div>
                           от ${inputs[0].value} м²
                        </div>
                        <div>
                            -
                        </div>
                        <div>
                            до ${inputs[1].value} м²
                        </div>
                    `;
                    }
                    if (currentElMobile.dataset.filterDropdownName === 'Этаж') {
                        html = `
                        <div>
                            ${!el.dataset.filterDropdownNoTitle ? currentElMobile.dataset.filterDropdownName : ''}
                        </div>
                        <div>
                           от ${inputs[0].value} эт.
                        </div>
                        <div>
                            -
                        </div>
                        <div>
                            до ${inputs[1].value} эт.
                        </div>
                    `;
                    }
                }


                buttonWrapper.classList.add('_active')
            } else {
                if (!filterModalScreenWidthCheck()) {
                    html = `
                    <div>${!el.dataset.filterDropdownNoTitle ? el.dataset.filterDropdownName : ''}</div>
                    <div>${el.dataset.filterDropdownSubtitle}</div>
                    `;
                } else {
                    if (currentElMobile) {
                        html = `
                        <div>${!el.dataset.filterDropdownNoTitle ? currentElMobile.dataset.filterDropdownName : ''}</div>
                        <div>${currentElMobile.dataset.filterDropdownSubtitle}</div>
                        `;
                    } else {
                        html = `
                        <div>${!el.dataset.filterDropdownNoTitle ? el.dataset.filterDropdownName : ''}</div>
                        <div>${el.dataset.filterDropdownSubtitle}</div>
                        `;
                    }
                }
                buttonWrapper.classList.remove('_active');
            }
            if (el.dataset.filterDropdownName === 'Цена' || el.dataset.filterDropdownName === 'Сумма' || el.dataset.filterDropdownName === 'Стоимость объекта') {
                if (inputs[0].value === '') {
                    el.removeAttribute('data-filter-dropdown-price-from');
                }
                if (inputs[1].value === '') {
                    el.removeAttribute('data-filter-dropdown-price-to');
                }
            }
            const offerRoomClue = document.querySelectorAll('.offer-room-clue');
            if (offerRoomClue.length > 0) {
                offerRoomClue.forEach(item => {
                    item.classList.remove('_active');
                })
            }
            buttonWrapper.innerHTML = html;
        }, 0);
    }

    function changeTitleOne(el) {
        setTimeout(() => {
            const itemActive = el.querySelector('.filter-dropdown__item.active');
            const input = itemActive.querySelector('.filter-range-one__nav input');
            const buttonWrapper = el.querySelector('.filter-dropdown__button-wrapper');
            let html = ``;
            if (input.value) {
                html = `
            <div>
                ${!el.dataset.filterDropdownNoTitle ? el.dataset.filterDropdownName : ''}
            </div>
            <div>
                ${convertSum(input.value)}
            </div>
            `;
                buttonWrapper.classList.add('_active');
                el.setAttribute('data-name', itemActive.querySelector('.filter-dropdown__subtitle').textContent.trim());
            } else {
                html = `
            <div>
                ${!el.dataset.filterDropdownNoTitle ? el.dataset.filterDropdownName : ''}
            </div>
            <div>
                0
            </div>
            `;
                buttonWrapper.classList.remove('_active');
            }
            buttonWrapper.innerHTML = html;
        }, 0);
    }
    function checkChangeTitle(container, currentContainer) {
        return (container || currentContainer).classList.contains('filter-dropdown--one');
    }
}


export const searchSelect = () => {
    const containers = document.querySelectorAll('.search-select');
    if (!containers.length >= 1) return;
    containers.forEach(container => {
        const btn = container.querySelector('.search-select__button');
        const body = container.querySelector('.search-select__dropdown');
        const close = container.querySelector('.search-select__close');
        const search = container.querySelector('.search-select__input');

        const itemsInput = body.querySelectorAll('.search-select__item .checkbox-secondary__input');
        const items = body.querySelectorAll('.search-select__item');
        const btnWrapper = btn.querySelector('.search-select__button-wrapper')
        const btnList = btnWrapper.querySelector('div:nth-child(2)');
        let arrSelected = [];
        const imgLeft = container.classList.contains('search-select--img-left');
        init();
        itemsInput.forEach(input => {
            input.addEventListener('change', () => {
                const currentElem = imgLeft ?
                    input.closest('.search-select__item').querySelector('.checkbox-secondary__text').innerHTML.trim() :
                    input.closest('.search-select__item').querySelector('.checkbox-secondary__text span:nth-child(1)').textContent.trim();
                if (container.hasAttribute('data-search-select-single')) {
                    itemsInput.forEach(currentInput => {
                        if (currentInput !== input) currentInput.checked = false;
                    })
                    arrSelected = [];
                    input.checked ? arrSelected.push(currentElem) : arrSelected = [];
                } else if (container.classList.contains('search-select--img-left')) {
                    if (input.checked) {
                        arrSelected.push(currentElem);
                    } else {
                        const index = arrSelected.indexOf(currentElem);
                        if (index !== -1) {
                            arrSelected.splice(index, 1);
                        }
                    }
                } else {
                    if (input.checked) {
                        arrSelected.push(currentElem);
                    } else {
                        const index = arrSelected.indexOf(currentElem);
                        if (index !== -1) {
                            arrSelected.splice(index, 1);
                        }
                    }
                }
                updatePlaceholder();
            })
        })
        const controls = container.querySelector('.search-select__control');
        const btnAll = container.querySelector('.search-select__all');
        const btnClear = container.querySelector('.search-select__clear');
        const selectorErrorText = 'search-select__error-text';

        btn.addEventListener('click', () => {
            containers.forEach(el => {
                if (el !== container) el.classList.remove('_active')
            });
            container.classList.toggle('_active');
            if (filterModalScreenWidthCheck() && container.classList.contains('_active')) {
                const modalHTML = `
                <div class="filter-modal">
                    <div class="filter-modal__container">
                        <button class="btn-reset filter-modal__close" aria-label="Закрыть модальное окно">
                            <svg>
                                <use xlink:href="./img/sprite.svg#x"></use>
                            </svg>
                            <span>Закрыть</span>
                        </button>
                        <div class="filter-modal__content">
                        </div>
                    </div>
                </div>
                `;
                modal(modalHTML, '.filter-modal', 300, container, container.dataset.modalScroll);
                const filterModal = document.querySelector('.filter-modal');
                filterModal.querySelector('.filter-modal__content').insertAdjacentElement('beforeend', container.querySelector('.search-select__dropdown'));

            }
        })
        document.addEventListener('click', (e) => {
            if (container.classList.contains('_active') && !e.target.closest('.search-select')) {
                container.classList.remove('_active');
            }
        })
        if (close) {
            close.addEventListener('click', () => {
                container.classList.remove('_active');
            });
        }

        if (container.hasAttribute('data-search-select-single') && controls) {
            controls.remove();
        }
        if (btnAll) {
            btnAll.addEventListener('click', () => {
                selectAll();
            });
        }
        if (btnClear) {
            btnClear.addEventListener('click', () => {
                clearAll();
            });
        }
        if (search) {
            const input = search.querySelector('input');
            input.addEventListener('input', () => {
                const validateItems = searchFilterItems(input.value, Array.from(items));
                if (body.querySelector(`.${selectorErrorText}`)) {
                    body.querySelector(`.${selectorErrorText}`).remove();
                }
                if (input.value === '') {
                    items.forEach(item => item.removeAttribute('hidden'));
                } else {
                    items.forEach(item => {
                        item.setAttribute('hidden', '');
                        const validateIndex = validateItems.indexOf(item);
                        if (validateIndex !== -1) validateItems[validateIndex].removeAttribute('hidden');
                    });
                    if (validateItems.length === 0) {
                        if (!body.querySelector(`.${selectorErrorText}`)) {
                            const text = 'Ничего не найдено';
                            const htmlText = `
                                <div class="${selectorErrorText}">${text}</div>
                            `;
                            body.insertAdjacentHTML('beforeend', htmlText);
                        }
                    }
                }
            })
        }

        function clearAll() {
            itemsInput.forEach(input => input.checked = false);
            arrSelected.splice(0, arrSelected.length);
            updateItems();
            updatePlaceholder()
        }

        function selectAll() {
            itemsInput.forEach(input => {
                const currentElem = input.closest('.search-select__item').querySelector('.checkbox-secondary__text span:nth-child(1)').textContent.trim();
                if (arrSelected.indexOf(currentElem) === -1) {
                    arrSelected.push(currentElem);
                    input.checked = true;
                }
            });
            updateItems();
            updatePlaceholder()
        }

        function updateItems() {
            items.forEach(item => item.removeAttribute('hidden'));
            if (body.querySelector(`.${selectorErrorText}`)) {
                body.querySelector(`.${selectorErrorText}`).remove();
            }
            if (search) {
                const searchInput = search.querySelector('input');
                searchInput.value = '';
            }
        }

        function updatePlaceholder() {
            if (arrSelected.length >= 1) {
                btnList.textContent = '';
                btnWrapper.classList.add('_active');
            } else {
                btnList.textContent = container.dataset.searchSelectSubtitle;
                btnWrapper.classList.remove('_active');
            }
            if (imgLeft) {
                arrSelected.forEach(el => {
                    btnList.innerHTML += `${el},`;
                });
                if (btnList.innerHTML !== container.dataset.searchSelectSubtitle) {
                    btnList.innerHTML = btnList.innerHTML.slice(0, -2);
                }
            } else {
                arrSelected.forEach(el => {
                    btnList.textContent += `${el}, `;
                });
                if (btnList.textContent !== container.dataset.searchSelectSubtitle) {
                    btnList.textContent = btnList.textContent.slice(0, -2);
                }
            }
        }

        function searchFilterItems(value, items) {
            return items.filter(item => {
                const text = item.querySelector('.checkbox-secondary__text span').textContent;
                const regex = new RegExp(value, 'gi')
                return text.match(regex);
            })
        }

        function init() {
            itemsInput.forEach(input => {
                if (imgLeft) {
                    if (input.checked) {
                        const currentElem = input.closest('.search-select__item').querySelector('.checkbox-secondary__text').innerHTML.trim();
                        arrSelected.push(currentElem);
                    }
                } else {
                    if (input.checked) {
                        const currentElem = input.closest('.search-select__item').querySelector('.checkbox-secondary__text span:nth-child(1)').textContent.trim();
                        arrSelected.push(currentElem);
                    }
                }
            })
            updatePlaceholder();
        }
    });
}
export const searchSelectOne = () => {
    const containers = document.querySelectorAll('.search-select-one');
    if (!containers.length >= 1) return;
    containers.forEach(container => {
        searchSelectOneBody(container);
    });
}
export const uiSliderOne = () => {
    const items = document.querySelectorAll('.filter-range-one__inner');
    if (!items.length >= 1) return;
    items.forEach(el => {
        const container = el.closest('.filter-range-one');
        const minValue = el.dataset.min;
        const maxValue = el.dataset.max;
        const defaultValue = container.querySelector('[data-default]');

        const input = defaultValue.querySelector('input');
        const step = el.dataset.step;
        noUiSlider.create(el, {
            start: [Number(defaultValue.dataset.default)],
            connect: 'lower',
            range: {
                'min': Number(minValue),
                'max': Number(maxValue),
            },
            step: step ? Number(step) : 0,
        });
        el.noUiSlider.on('update', function (values, handle) {
            input.value = numberReplace(values[handle])
            inputResize(input);
        });
        input.addEventListener('change', function () {
            const numberString = this.value.replace(/\s/g, "")
            el.noUiSlider.set([numberString]);
            inputResize(input);
        })
        input.addEventListener('input', () => {
            const val = input.value.replace(/\D/g, '');
            input.value = numberReplace(val);
            inputResize(input);
        })
    });
}
export const filterControl = () => {
    const containers = document.querySelectorAll('.filter--more');
    if (containers.length === 0) return;
    containers.forEach(container => {
        const itemsHidden = container.querySelectorAll('.filter__row[hidden]');
        const moreBtn = container.querySelector('.filter__btn-control');
        const hiddenBtn = container.querySelector('.filter__btn-hidden');
        if (moreBtn) {
            const btnTextMap = {
                more: moreBtn.querySelector('span').textContent,
                none: 'Скрыть фильтры'
            }
            if (itemsHidden.length === 0) {
                moreBtn.remove();
                return;
            };
            moreBtn.addEventListener('click', () => {
                if (container.classList.contains('_active')) {
                    itemsHidden.forEach(item => {
                        _slideToggle(item, 700);
                    });
                    container.classList.remove('_active');
                    if (!container.classList.contains('filter--new-style')) {
                        moreBtn.querySelector('span').textContent = btnTextMap.more;
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        })
                    }
                } else {
                    itemsHidden.forEach(item => {
                        _slideToggle(item, 700);
                    });
                    container.classList.add('_active');
                    if (!container.classList.contains('filter--new-style')) {
                        moreBtn.querySelector('span').textContent = btnTextMap.none;
                    }
                }
            });
        }
        if (hiddenBtn) {
            hiddenBtn.addEventListener('click', () => {
                if (container.classList.contains('_active')) {
                    itemsHidden.forEach(item => {
                        _slideToggle(item, 700);
                    });
                    container.classList.remove('_active');
                    if (!container.closest('.object-body__filter') && !hiddenBtn.classList.contains('_no-scroll-to')) {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        })
                    }
                }
            })
        }
    })
}
export const filterMobile = () => {
    const containers = document.querySelectorAll('.filter');
    containers.forEach(filter => {
        const btn = filter.querySelector('.filter__btn');
        const container = filter.querySelector('.filter__container');
        if (!(btn && container)) return;
        const close = filter.querySelector('.filter__close');
        const mask = filter.querySelector('.filter__mask');
        const filterRowMain = btn.nextElementSibling;
        const filterClear = filter.querySelector('.filter__clear');
        const inner = container.querySelector('.filter__inner');
        btn.addEventListener('click', () => {
            mask ? mask.classList.add('active') : container.classList.add('active');
            if (filterRowMain.classList.contains('filter__row')) {
                inner.insertAdjacentElement('afterbegin', filterRowMain);
                inner.insertAdjacentElement('afterend', filterClear);
            }
            disableScroll();
        });
        close.addEventListener('click', () => {
            if (container.classList.contains('active')) {
                container.classList.remove('active');
                btn.insertAdjacentElement('afterend', filterRowMain);
                filterRowMain.insertAdjacentElement('beforeend', filterClear);
            }
            if (mask && mask.classList.contains('active')) mask.classList.remove('active');
            if (!exceptionEnableScroll()) enableScroll();
            if (document.querySelector('.filter-modal-map')) {
                document.querySelector('.filter-modal-map').classList.remove('_small-index');
            }
        });
        filter.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('filter__mask') && target.classList.contains('active')) {
                mask.classList.remove('active');
                if (!exceptionEnableScroll()) enableScroll();
            }
        })
        const filterMap = filter.querySelector('.filter__map');
        const map = document.querySelector('.control-cards__maps');
        if (filterMap && map) {
            filterMap.addEventListener('click', () => {
                const modalHTML = `
                <div class="filter-modal-map">
                    <div class="filter-modal-map__container">
                        <button class="btn btn-reset filter-modal-map__close" aria-label="Закрыть модальное окно">
                            <svg>
                                <use xlink:href="./img/sprite.svg#x"></use>
                            </svg>
                        </button>
                        <button type="button" class="btn btn-reset filter-modal-map__filter">
                            <svg>
                                <use xlink:href="./img/sprite.svg#filter"></use>
                            </svg>
                        </button>
                        <div class="filter-modal-map__content">
                            <div id="filter-modal-map__map" class="map-primary remove-copyrights-pane _hidden-map"></div>
                        </div>
                    </div>
                </div>
                `;
                modal(modalHTML, '.filter-modal-map', 300);
                const mapContainer = document.querySelector('.filter-modal-map');
                const filterBtn = mapContainer.querySelector('.filter-modal-map__filter');
                mapPrimary();
                let interval = setInterval(() => {
                    if (itsReadyMap()) {
                        clearInterval(interval);
                        app();
                    }
                }, 500);

                function app() {
                    function init() {
                        let map = new ymaps.Map('filter-modal-map__map', {
                            center: [55.77171185651524, 37.62811179984117],
                            zoom: 10,
                        });
                        map.controls.remove('geolocationControl');
                        map.controls.remove('searchControl');
                        map.controls.remove('trafficControl');
                        map.controls.remove('typeSelector');
                        map.controls.remove('rulerControl');
                        map.behaviors.enable(['scrollZoom']);
                        map.controls.remove('fullscreenControl');

                        map.controls.get('zoomControl').options.set({
                            position: {
                                top: 20,
                                right: 20
                            },
                            maxWidth: '44'
                        })
                    }
                    ymaps.ready(init);
                }

                filterBtn.addEventListener('click', () => {
                    mask ? mask.classList.add('active') : container.classList.add('active');
                    setTimeout(() => {
                        mapContainer.classList.add('_small-index');
                    }, 150);
                    disableScroll();
                });
            });
        }

        function exceptionEnableScroll() {
            return filter.closest('.checkboard-cst-popup') || filter.closest('.popup-primary');
        }
    })
}
export const filterCustomSelectCheckboxes = () => {
    const items = document.querySelectorAll('.select-dropdown-checkbox');
    if (items.length <= 0) return;
    items.forEach(item => {
        const btn = item.querySelector('.select-dropdown-checkbox__button');
        const title = item.querySelector('.select-dropdown-checkbox__title');
        const close = item.querySelector('.select-dropdown-checkbox__close');
        btn.addEventListener('click', () => {
            item.classList.toggle('_active');

            if (window.innerWidth <= mobileWidth) {
                const modalHTML = `
            <div class="filter-modal">
                <div class="filter-modal__container">
                    <button class="btn-reset filter-modal__close" aria-label="Закрыть модальное окно">
                        <svg>
                            <use xlink:href="./img/sprite.svg#x"></use>
                        </svg>
                        <span>Закрыть</span>
                    </button>
                    <div class="filter-modal__content">
                        <div class="select-dropdown-checkbox"></div>
                    </div>
                </div>
            </div>
            `;
                modal(modalHTML, '.filter-modal', 300, item, item.dataset.modalScroll);
                const filterModal = document.querySelector('.filter-modal');

                filterModal.querySelector('.select-dropdown-checkbox').insertAdjacentElement('beforeend', item.querySelector('.select-dropdown-checkbox__dropdown'));


            }
        });
        document.addEventListener('click', (e) => {
            if (item.classList.contains('_active') && !e.target.closest('.select-dropdown-checkbox') && !e.target.closest('.filter-modal__container')) {
                item.classList.remove('_active');
            }
        })
        if (close) {
            close.addEventListener('click', () => {
                item.classList.remove('_active');
            });
        }
        const mobileWidth = 1212;
        const dropdownContainerList = item.querySelector('.select-dropdown-checkbox__dropdown div');
        const checkboxes = item.querySelectorAll('.checkbox-secondary__input');
        const cash = item.querySelector('[data-name="cash"]');
        const mortgageYesBank = item.querySelector('[data-name="mortgage_yes-bank"]');
        const mortgageNoBank = item.querySelector('[data-name="mortgage_no-bank"]');
        const mortgageNoFee = item.querySelector('[data-name="mortgage_no-fee"]');
        const certificate = item.querySelector('[data-name="certificate"]');
        const titleDefault = title.textContent;
        let certificateBoolean = false;
        let mortgageNoFeeBoolean = false;
        init();
        cash.addEventListener('change', () => {
            cashUpdate();
        });
        mortgageYesBank.addEventListener('change', () => {
            mortgageYesBankUpdate();
        });
        mortgageNoBank.addEventListener('change', () => {
            mortgageNoBankUpdate();
        });

        certificate.addEventListener('change', () => {
            certificateUpdate();
        });
        mortgageNoFee.addEventListener('change', () => {
            mortgageNoFeeUpdate();
        });

        const mortgageField = document.querySelector('[data-mortgage-field]');
        if (mortgageField) {
            [mortgageYesBank, mortgageNoBank].forEach(item => {
                item.addEventListener('change', () => {
                    if (mortgageYesBank.checked || mortgageNoBank.checked) {
                        mortgageField.removeAttribute('hidden');
                    } else {
                        mortgageField.setAttribute('hidden', '');
                    }
                });
            })
        }

        function movingCheckbox(index, element) {
            dropdownContainerList.children[index].insertAdjacentElement('beforebegin', element.closest('.checkbox-secondary'));
        }

        function movingCheckboxDefault() {
            checkboxes.forEach((checkbox, index) => movingCheckbox(index, checkbox));
        }

        function init() {
            if (cash.checked) {
                cashUpdate();
            }
            if (mortgageYesBank.checked) {
                mortgageYesBankUpdate();
            }
            if (mortgageNoBank.checked) {
                mortgageNoBankUpdate();
            }
            if (certificate.checked) {
                certificateUpdate();
            }
            if (mortgageNoFee.checked) {
                mortgageNoFeeUpdate();
            }
        }

        function cashUpdate() {
            if (cash.checked) {
                item.classList.add('_selected');

                mortgageYesBank.setAttribute('disabled', true);
                mortgageNoBank.setAttribute('disabled', true);
                mortgageNoFee.setAttribute('disabled', true);

                certificate.removeAttribute('disabled');

                movingCheckbox(1, certificate);

                title.textContent = cash.closest('.checkbox-secondary').querySelector('.checkbox-secondary__text').textContent;
            } else {
                item.classList.remove('_selected');

                mortgageYesBank.removeAttribute('disabled');
                mortgageNoBank.removeAttribute('disabled');

                mortgageNoFee.setAttribute('disabled', true);
                certificate.setAttribute('disabled', true);

                movingCheckboxDefault();
                title.textContent = titleDefault;
                if (certificate.checked) certificate.checked = false;

                certificateBoolean = false;
                mortgageNoFeeBoolean = false;
            }
        }

        function mortgageYesBankUpdate() {
            if (mortgageYesBank.checked) {
                item.classList.add('_selected');
                cash.setAttribute('disabled', true);
                mortgageNoBank.setAttribute('disabled', true);

                mortgageNoFee.removeAttribute('disabled');
                certificate.removeAttribute('disabled');

                movingCheckbox(0, mortgageYesBank);
                movingCheckbox(1, mortgageNoFee);
                movingCheckbox(2, certificate);

                title.textContent = mortgageYesBank.closest('.checkbox-secondary').querySelector('.checkbox-secondary__text').textContent;
            } else {
                item.classList.remove('_selected');

                cash.removeAttribute('disabled');
                mortgageNoBank.removeAttribute('disabled');

                mortgageNoFee.setAttribute('disabled', true);
                certificate.setAttribute('disabled', true);

                movingCheckboxDefault();

                title.textContent = titleDefault;
                if (mortgageNoFee.checked) mortgageNoFee.checked = false;
                if (certificate.checked) certificate.checked = false;

                certificateBoolean = false;
                mortgageNoFeeBoolean = false;
            }
        }

        function mortgageNoBankUpdate() {
            if (mortgageNoBank.checked) {
                item.classList.add('_selected');

                cash.setAttribute('disabled', true);
                mortgageYesBank.setAttribute('disabled', true);

                mortgageNoFee.removeAttribute('disabled');
                certificate.removeAttribute('disabled');

                movingCheckbox(0, mortgageNoBank);
                movingCheckbox(1, mortgageNoFee);
                movingCheckbox(2, certificate);

                title.textContent = mortgageNoBank.closest('.checkbox-secondary').querySelector('.checkbox-secondary__text').textContent;
            } else {
                item.classList.remove('_selected');

                cash.removeAttribute('disabled');
                mortgageYesBank.removeAttribute('disabled');

                mortgageNoFee.setAttribute('disabled', true);
                certificate.setAttribute('disabled', true);

                title.textContent = titleDefault;

                movingCheckboxDefault();

                if (mortgageNoFee.checked) mortgageNoFee.checked = false;
                if (certificate.checked) certificate.checked = false;

                certificateBoolean = false;
                mortgageNoFeeBoolean = false;
            }
        }

        function certificateUpdate() {
            const value = certificate.nextElementSibling.querySelector('.checkbox-secondary__text').textContent.trim();
            if (!certificateBoolean) {
                title.textContent += `, ${value}`;
                certificateBoolean = true;
            } else {
                title.textContent = title.textContent.replace(`, ${value}`, '');
                certificateBoolean = false;
            }
        }

        function mortgageNoFeeUpdate() {
            const value = mortgageNoFee.nextElementSibling.querySelector('.checkbox-secondary__text').textContent.trim();
            if (!mortgageNoFeeBoolean) {
                title.textContent += `, ${value}`;
                mortgageNoFeeBoolean = true;
            } else {
                title.textContent = title.textContent.replace(`, ${value}`, '');
                mortgageNoFeeBoolean = false;
            }
        }
    });
};
export const dropdownDefault = (containerEl, targetEl, dropdownEl) => {
    const container = document.querySelector(containerEl);
    if (!container) return;
    const target = container.querySelector(targetEl);
    const dropdown = container.querySelector(dropdownEl);
    target.addEventListener('click', () => {
        !target.classList.contains('_active') ? openDropdown() : closeDropdown();
    });
    document.addEventListener('click', (e) => {
        if (target.classList.contains('_active') && !e.target.closest(containerEl)) closeDropdown();
    })

    function openDropdown() {
        dropdown.classList.add('_active');
        target.classList.add('_active');
    }

    function closeDropdown() {
        dropdown.classList.remove('_active');
        target.classList.remove('_active');
    }
}
export const fieldSelect = () => {
    const containers = document.querySelectorAll('.field-select');
    if (containers.length === 0) return;
    containers.forEach(container => {
        if (!container.classList.contains('_not-choice')) {

            updateInput(container, false);
            const name = container.dataset.fieldSelectName;
            if (name) {
                init(container, name);
                container.querySelectorAll('.field-select__item').forEach((item, index) => {
                    item.setAttribute(`data-select-${name}-index`, index + 1);
                })
            }
            const defaultItem = container.querySelector('.field-select__default');
            container.addEventListener('click', (e) => {
                const target = e.target;
                const item = target.closest('.field-select__item');
                const currentDefaultItem = target.closest('.field-select__default');
                if (currentDefaultItem) {
                    const items = container.querySelectorAll('.field-select__item:not(.field-select__default)');
                    items.forEach(item => {
                        item.classList.remove('_active')
                        const checkbox = item.querySelector('.field-select__checkbox');
                        if (checkbox) checkbox.checked = false;
                    });
                }
                if (item && !item.classList.contains('.field-select__default')) {
                    if (defaultItem) defaultItem.classList.remove('_active');
                    if (!container.classList.contains('field-select--multiple')) {
                        const items = container.querySelectorAll('.field-select__item');
                        items.forEach(currentItem => {
                            if (item !== currentItem) {
                                currentItem.classList.remove('_active');
                                const checkbox = currentItem.querySelector('.field-select__checkbox')
                                if (checkbox) checkbox.checked = false;
                            }
                        })
                    }
                    if (container.classList.contains('field-select--necessarily')) {
                        item.classList.add('_active');
                        const checkbox = item.querySelector('.field-select__checkbox')
                        if (checkbox) checkbox.checked = true;
                    } else {
                        item.classList.toggle('_active');
                    }

                    if (container.hasAttribute('data-submit-filter-object-type')) {
                        const developer = document.querySelector('[data-submit-filter-developer]');
                        const currentItem = item.hasAttribute('data-submit-filter-object-type-item');
                        currentItem && item.classList.contains('_active') && developer ? developer.removeAttribute('hidden') : developer.setAttribute('hidden', '');

                        const secondaryItem = item.hasAttribute('data-submit-filter-object-type-secondary');
                        const houseItem = item.hasAttribute('data-submit-filter-object-type-house');

                        const newBuildingsField = document.querySelectorAll('[data-submit-filter-type="1"]');
                        const secondaryField = document.querySelectorAll('[data-submit-filter-type="2"]');
                        const houseField = document.querySelectorAll('[data-submit-filter-type="3"]');
                        if (newBuildingsField.length > 0 && houseField.length > 0 && secondaryField.length > 0) {
                            if (currentItem || secondaryItem || houseItem) {
                                const itemsHidden = document.querySelectorAll('[data-submit-app-block-hidden]');
                                itemsHidden.forEach(item => item.removeAttribute('hidden'));
                            }
                            if (currentItem) {
                                houseField.forEach(item => item.setAttribute('hidden', ''));
                                secondaryField.forEach(item => item.setAttribute('hidden', ''));
                                newBuildingsField.forEach(item => item.removeAttribute('hidden'));
                            }
                            if (secondaryItem) {
                                newBuildingsField.forEach(item => item.setAttribute('hidden', ''));
                                houseField.forEach(item => item.setAttribute('hidden', ''));
                                secondaryField.forEach(item => item.removeAttribute('hidden'));
                            }
                            if (houseItem) {
                                newBuildingsField.forEach(item => item.setAttribute('hidden', ''));
                                secondaryField.forEach(item => item.setAttribute('hidden', ''));
                                houseField.forEach(item => item.removeAttribute('hidden'));
                            }
                        }
                    }
                }

                updateInput(container, true);
            })

            if (container.hasAttribute('data-submit-filter-object-type')) {
                const developer = document.querySelector('[data-submit-filter-developer]');
                const currentItem = document.querySelector('[data-submit-filter-object-type-item]._active');
                currentItem && developer ? developer.removeAttribute('hidden') : developer.setAttribute('hidden', '');

                const secondaryItem = document.querySelector('data-submit-filter-object-type-secondary');
                const houseItem = document.querySelector('data-submit-filter-object-type-house');

                const newBuildingsField = document.querySelectorAll('[data-submit-filter-type="1"]');
                const secondaryField = document.querySelectorAll('[data-submit-filter-type="2"]');
                const houseField = document.querySelectorAll('[data-submit-filter-type="3"]');
                if (newBuildingsField.length > 0 && houseField.length > 0 && secondaryField.length > 0) {
                    if (currentItem || secondaryItem || houseItem) {
                        const itemsHidden = document.querySelectorAll('[data-submit-app-block-hidden]');
                        itemsHidden.forEach(item => item.removeAttribute('hidden'));
                    }
                    if (currentItem) {
                        houseField.forEach(item => item.setAttribute('hidden', ''));
                        secondaryField.forEach(item => item.setAttribute('hidden', ''));
                        newBuildingsField.forEach(item => item.removeAttribute('hidden'));
                    }
                    if (secondaryItem) {
                        newBuildingsField.forEach(item => item.setAttribute('hidden', ''));
                        houseField.forEach(item => item.setAttribute('hidden', ''));
                        secondaryField.forEach(item => item.removeAttribute('hidden'));
                    }
                    if (houseItem) {
                        newBuildingsField.forEach(item => item.setAttribute('hidden', ''));
                        secondaryField.forEach(item => item.setAttribute('hidden', ''));
                        houseField.forEach(item => item.removeAttribute('hidden'));
                    }
                }
            }
        }
    })

    function updateInput(container, change) {
        const selectedItems = container.querySelectorAll('.field-select__item._active');
        const input = container.querySelector('.field-select__input');

        if (input) {
            const result = Array.from(selectedItems).map(item => {
                if (item.dataset.fieldValue) {
                    return item.dataset.fieldValue;
                }
            })
            input.value = result.join(", ");
            if (change) {
                input.dispatchEvent(new Event('change'));
            }
        }
    }

    function init(container, name) {
        const items = Array.from(container.querySelectorAll('.field-select__item'));
        items.forEach(item => {
            const checkbox = `<input type="checkbox" name="${name}-checkbox" class="input-reset field-select__checkbox" placeholder="">`;
            item.insertAdjacentHTML('beforeend', checkbox);
        })
    }
}
export const fieldRange = () => {
    const containers = document.querySelectorAll('.field-range');
    if (containers.length === 0) return;
    containers.forEach(container => {
        updateInput(container);
        const choices = container.querySelector('.field-range__choices');
        if (container.hasAttribute('data-field-range-floor')) {
            container.querySelectorAll('.field-range__choice').forEach((item, index) => {
                item.setAttribute(`data-range-floor-index`, index + 1);
            })
        }
        if (choices) {
            if (container.hasAttribute('data-field-range-floor')) {
                const one = container.querySelector('[data-range-floor-index="1"]');
                const two = container.querySelector('[data-range-floor-index="2"]');
                const three = container.querySelector('[data-range-floor-index="3"]');

                one.addEventListener('click', () => {
                    one.classList.toggle('_active');
                })
                two.addEventListener('click', () => {
                    two.classList.toggle('_active');
                    if (checkContains(three)) {
                        three.classList.remove('_active');
                    }
                })
                three.addEventListener('click', () => {
                    three.classList.toggle('_active');
                    if (checkContains(two)) {
                        two.classList.remove('_active');
                    }
                })

                for (const element of [one, two, three]) {
                    element.addEventListener('click', () => {
                        updateInput(container);
                    })
                }
            }
        }
    })


    function checkContains(item) {
        return item.classList.contains('_active');
    }

    function updateInput(container) {
        const selectedItems = container.querySelectorAll('.field-range__choice._active');
        const input = container.querySelector('.field-range__choices-input');

        if (input) {
            const result = Array.from(selectedItems).map(item => {
                if (item.dataset.fieldValue) {
                    return item.dataset.fieldValue;
                }
            })
            input.value = result.join(", ");
        }
    }
}
export const fieldNotif = () => {
    const containers = document.querySelectorAll('.field-notif');
    if (containers.length === 0) return;
    const htmlItem = `
    <div class="field-notif__item">
        <div class="field-notif__select search-select-one search-select-one--left search-select-one--no-search">
            <button type="button" class="btn btn-reset search-select-one__button">
                <div class="search-select-one__button-wrapper">
                    <div>Время</div>
                    <div>Не выбрано</div>
                </div>
                <svg>
                    <use xlink:href="./img/sprite.svg#check"></use>
                </svg>
            </button>
            <div class="search-select-one__dropdown">
                <button type="button" class="btn btn-reset search-select-one__close">
                    <svg>
                        <use xlink:href="./img/sprite.svg#x"></use>
                    </svg>
                </button>
                <div class="search-select-one__wrapper simplebar-third">
                    <div class="search-select-one__item" data-value="now">
                        в момент события
                    </div>
                    <div class="search-select-one__item" data-value="5-min">
                       за 5 мин
                    </div>
                    <div class="search-select-one__item" data-value="15-min">
                        за 15 мин
                    </div>
                    <div class="search-select-one__item" data-value="30-min">
                        за 30 мин
                    </div>
                    <div class="search-select-one__item" data-value="1-hour">
                        за 1 час
                    </div>
                    <div class="search-select-one__item" data-value="2-hour">
                        за 2 часа
                    </div>
                    <div class="search-select-one__item" data-value="1-day">
                        за 1 день
                    </div>
                    <div class="search-select-one__item" data-value="2-day">
                        за 2 дня
                    </div>
                    <div class="search-select-one__item" data-value="1-week">
                        за 1 неделю
                    </div>
                </div>
            </div>
            <input type="text" name="object" value="" class="search-select-one__input-hidden" hidden>
            </div>
            <div class="field-notif__select search-select-one search-select-one--left search-select-one--no-search">
            <button type="button" class="btn btn-reset search-select-one__button">
                <div class="search-select-one__button-wrapper">
                    <div>Способ</div>
                    <div>Не выбрано</div>
                </div>
                <svg>
                    <use xlink:href="./img/sprite.svg#check"></use>
                </svg>
            </button>
            <div class="search-select-one__dropdown">
                <button type="button" class="btn btn-reset search-select-one__close">
                    <svg>
                        <use xlink:href="./img/sprite.svg#x"></use>
                    </svg>
                </button>
                <div class="search-select-one__wrapper simplebar-third">
                    <div class="search-select-one__item" data-value="email">
                        по e-mail
                    </div>
                    <div class="search-select-one__item" data-value="sms">
                       в смс
                    </div>
                    <div class="search-select-one__item" data-value="CalDAV">
                        через CalDAV
                    </div>
                </div>
            </div>
            <input type="text" name="object" value="" class="search-select-one__input-hidden" hidden>
        </div>
        <button type="button" class="btn btn-reset field-notif__remove">
            <svg>
                <use xlink:href="./img/sprite.svg#trash"></use>
            </svg>
        </button>
    </div>
    `;
    containers.forEach(container => {
        const buttonAdd = container.querySelector('.field-notif__add');
        const buttonAddSpan = buttonAdd.querySelector('span');
        let itemsLength = container.querySelectorAll('.field-notif__item').length;
        buttonAdd.addEventListener('click', () => {
            buttonAdd.insertAdjacentHTML('beforebegin', htmlItem);
            const currentItem = buttonAdd.previousElementSibling;
            if (currentItem) {
                const selects = currentItem.querySelectorAll('.search-select-one');
                selects.forEach(select => {
                    searchSelectOneBody(select);
                });
            }
            updateBtnAdd('add');
        })
        container.addEventListener('click', (e) => {
            const target = e.target;
            const buttonRemove = target.closest('.field-notif__remove');
            if (buttonRemove) {
                const currentItem = target.closest('.field-notif__item');
                currentItem.remove();
                updateBtnAdd('remove');
            }
        })


        function updateBtnAdd(status) {
            if (status === 'add') itemsLength += 1;
            if (status === 'remove') itemsLength -= 1;
            if (itemsLength === 0) buttonAddSpan.textContent = 'Добавить уведомление';
            if (itemsLength > 0) buttonAddSpan.textContent = 'Добавить ещё уведомление';
            if (itemsLength >= 5) {
                buttonAdd.setAttribute('hidden', '');
            } else {
                buttonAdd.removeAttribute('hidden');
            }
        }
    })


}
export const tooltipSelect = () => {
    const items = document.querySelectorAll('[data-tooltip-selects]');
    items.forEach(item => {
        inputUpdate(item);
        item.addEventListener('click', (e) => {
            const target = e.target;
            const select = target.closest('[data-tooltip-select]');
            if (select) {
                clearAllSelects(item);
                select.classList.add('_active');
                inputUpdate(item);
                hiddenTooltip(item);
            }
        });
    });


    function clearAllSelects(item) {
        const selects = item.querySelectorAll('[data-tooltip-select]');
        selects.forEach(select => select.classList.remove('_active'));
    }

    function inputUpdate(item) {
        const input = item.querySelector('[data-tooltip-input]');
        const activeSelect = Array.from(item.querySelectorAll('[data-tooltip-select]')).find(select => select.classList.contains('_active'));
        if (activeSelect) {
            input.value = activeSelect.textContent.trim();
        }
    }

    function hiddenTooltip(item) {
        const container = item.closest('.secondary-tooltip--click');
        if (container) {
            container.classList.remove('_active');
        }
    }
}

function filterModalScreenWidthCheck() {
    return window.innerWidth <= 1212;
}


export const searchSelectOneBody = (container) => {
    const btn = container.querySelector('.search-select-one__button');
    const list = container.querySelectorAll('.search-select-one__item');
    const input = container.querySelector('.search-select-one__input-hidden');
    const placeholder = container.querySelector('.search-select-one__button-wrapper div:nth-child(2)');
    const close = container.querySelector('.search-select-one__close');

    const tags = container.querySelectorAll('.search-select-one__tag');
    const search = container.querySelector('.search-select-one__input');
    const selectorErrorText = 'search-select-one__error-text';
    const body = container.querySelector('.search-select-one__dropdown');
    init();
    btn.addEventListener('click', () => {
        setTimeout(() => {
            container.classList.toggle('_active');
        }, 1);
        if (filterModalScreenWidthCheck() && container.classList.contains('_active')) {
            const modalHTML = `
            <div class="filter-modal">
                <div class="filter-modal__container">
                    <button class="btn-reset filter-modal__close" aria-label="Закрыть модальное окно">
                        <svg>
                            <use xlink:href="./img/sprite.svg#x"></use>
                        </svg>
                        <span>Закрыть</span>
                    </button>
                    <div class="filter-modal__content">
                    </div>
                </div>
            </div>
            `;
            modal(modalHTML, '.filter-modal', 300, container, container.dataset.modalScroll);
            const filterModal = document.querySelector('.filter-modal');
            filterModal.querySelector('.filter-modal__content').insertAdjacentElement('beforeend', container.querySelector('.search-select-one__dropdown'));
            filterModal.classList.add('_search-select-one');
            if (container.classList.contains('search-select-one--img-left')) {
                filterModal.classList.add('search-select-one--img-left');
            }
        }
    })
    if (close) {
        close.addEventListener('click', () => {
            setTimeout(() => {
                container.classList.remove('_active');
            }, 1);
        });
    }
    list.forEach(item => {
        item.addEventListener('click', () => {
            if (!container.classList.contains('_only-search')) {
                container.dispatchEvent(new Event('change'));
                const form = container.closest('form');
                if (form) form.dispatchEvent(new Event('change'));
            }
            list.forEach(item => item.classList.remove('_active'));

            input.value = item.dataset.value;
            item.classList.add('_active');
            placeholder.innerHTML = item.innerHTML;

            setTimeout(() => {
                container.classList.remove('_active');
            }, 1);

            container.classList.add('_selected');

            if (search) {
                setTimeout(() => {
                    const input = search.querySelector('input');
                    input.value = '';

                    list.forEach(item => item.removeAttribute('hidden'));
                    container.classList.remove('_only-search');
                }, 200);
            }

            if (container.classList.contains('create-meeting-show__form--object')) {
                if (container.classList.contains('_error')) {
                    container.querySelector('._error-span').remove();
                    container.classList.remove('_error');
                }
            }

            const favoriteTwo = container.closest('.favorite-two');
            if (container.hasAttribute('data-favorite-client-select')) {
                if (container.classList.contains('_selected')) {
                    favoriteTwo.querySelector('[data-favorite-selection-select]').removeAttribute('hidden');
                }
            }

            // ПРИМЕР!!
            if (container.closest('.your-contacts-field__wrapper')) {
                const tel = container.nextElementSibling;
                tel.classList.add('_active');
                tel.querySelector('input').value = '+7 999 999-99-99';
            }
        })
    })

    if (tags.length > 0) {
        tags.forEach(tag => {
            tag.addEventListener('click', () => {
                if (container.classList.contains('search-select-one--tags-one')) {
                    tags.forEach(tag => tag.classList.remove('_active'));
                }
                tag.classList.toggle('_active');
            })
        })
    }


    if (search) {
        const input = search.querySelector('input');
        input.addEventListener('input', () => {
            const validateItems = searchFilterItems(input.value, Array.from(list));
            if (body.querySelector(`.${selectorErrorText}`)) {
                body.querySelector(`.${selectorErrorText}`).remove();
            }
            if (input.value === '') {
                container.classList.remove('_only-search');
                list.forEach(item => item.removeAttribute('hidden'));
            } else {
                container.classList.add('_only-search');
                list.forEach(item => {
                    item.setAttribute('hidden', '');
                    const validateIndex = validateItems.indexOf(item);
                    if (validateIndex !== -1) validateItems[validateIndex].removeAttribute('hidden');
                });
                if (validateItems.length === 0) {
                    if (!body.querySelector(`.${selectorErrorText}`)) {
                        const text = 'Ничего не найдено';
                        const htmlText = `
                            <div class="${selectorErrorText}">${text}</div>
                        `;
                        body.insertAdjacentHTML('beforeend', htmlText);
                    }
                }
            }
        })
    }

    function searchFilterItems(value, items) {
        return items.filter(item => {
            const text = item.textContent;
            const regex = new RegExp(value, 'gi')
            return text.match(regex);
        })
    }

    function init() {
        currentSimplebar(container.querySelector('.search-select-one__wrapper.simplebar-third'));
        list.forEach(item => {
            if (item.classList.contains('_active')) {
                container.classList.add('_selected');
                placeholder.innerHTML = item.innerHTML;
            }
        })
    }
}


export const filterActions = () => {
    const filter = document.querySelector('.filter-actions');
    if (!filter) return;
    const btns = filter.querySelectorAll('.filter-actions__btn')
    const listBtn = filter.querySelector('.filter-actions__list');
    const mapBtn = filter.querySelector('.filter-actions__map');
    const metroBtn = filter.querySelector('.filter-actions__metro');
    const currentFilterContainer = filter.closest('.filter');
    const searchAreaBtn = currentFilterContainer.querySelector('[data-search-area-btn]');
    const controlCards = document.querySelector('.control-cards');
    if (controlCards) {
        const controlCardsContent = controlCards.querySelector('.control-cards__content');
        listBtn.addEventListener('click', () => {
            actions(controlCardsContent, listBtn);
            actionForCards(controlCards, controlCardsContent, listBtn);
            if (searchAreaBtn) searchAreaBtn.removeAttribute('hidden');
        })
        mapBtn.addEventListener('click', () => {
            actions(controlCardsContent, mapBtn);
            actionForCards(controlCards, controlCardsContent, mapBtn);
            if (searchAreaBtn) searchAreaBtn.setAttribute('hidden', '');
        });
    }

    function actions(content, currentBtn) {
        content.classList.remove('control-cards__content--horizontal', 'control-cards__content--vertical', 'control-cards__content--horizontal-map');
        btns.forEach(btn => btn.classList.remove('_active'));
        currentBtn.classList.add('_active');
    }
};

export const selectThird = () => {
    const selects = document.querySelectorAll('.select-third');
    selects.forEach(select => currentSelectThird(select));
}

export const currentSelectThird = (container) => {
    const input = container.querySelector('.select-third__input-hidden');
    const placeholder = container.querySelector('.select-third__value');
    const items = container.querySelectorAll('.select-third__item');
    init();
    container.addEventListener('click',(e) => {
        const target = e.target;
        const button = target.closest('.select-third__button');
        const item = target.closest('.select-third__item');
        if (button){
            container.classList.contains('_show') ? close() : show();
        }
        if (item){
            choice(item);
        }
    })

    function show() {
        container.classList.add('_show');
    }

    function close() {
        container.classList.remove('_show');
    }
    function choice(item){
        const value = item.dataset.value;
        input.value = value;
        container.classList.add('_selected');
        items.forEach(item => item.removeAttribute('selected'));
        item.setAttribute('selected','');

        updatePlaceholder();
        close();
    }

    function updatePlaceholder(){
        const selectedItem = Array.from(items).find(item => item.hasAttribute('selected'));
        if (!selectedItem) return;
        placeholder.textContent = selectedItem.textContent.trim();
    }

    function init(){
        const selectedItem = Array.from(items).find(item => item.hasAttribute('selected'));
        if (!selectedItem) return;

        const value = selectedItem.dataset.value;
        input.value = value;
        container.classList.add('_selected');
        updatePlaceholder();
    }
}