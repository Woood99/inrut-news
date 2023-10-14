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
        const btn = el.querySelector('.filter-dropdown__button');
        const inputs = el.querySelectorAll('.filter-range__nav input');
        const close = el.querySelector('.filter-dropdown__close');
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
                                    <use xlink:href="img/sprite.svg#x"></use>
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
                checkChangeTitle(el) ? changeTitleOne(el) : changeTitle(el);
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
            const inputs = itemActive.querySelectorAll('.filter-range__nav input');
            const buttonWrapper = !currentElMobile ? el.querySelector('.filter-dropdown__button-wrapper') : currentElMobile.querySelector('.filter-dropdown__button-wrapper');
            let html = ``;
            if (((inputs[0].value || inputs[0].value == 0) || (inputs[1].value == 0 || inputs[1].value)) && (inputs[0].value !== '' || inputs[1].value !== '')) {
                if (el.dataset.filterDropdownName === 'Цена' || el.dataset.filterDropdownName === 'Сумма' || el.dataset.filterDropdownName === 'Стоимость объекта') {
                    html = `
                    <div>
                        ${el.dataset.filterDropdownName}
                    </div>
                    ${inputs[0].value ? `<div>от ${convertSum(inputs[0].value)}</div>` : ''}
                    ${inputs[0].value && inputs[1].value ? '<div>-</div>' : ''}
                    ${inputs[1].value ? `<div>до ${convertSum(inputs[1].value)}</div>` : ''}
                `;
                }
                if (el.dataset.filterDropdownName === 'Площадь' || el.dataset.filterDropdownName === 'Площадь кухни') {
                    html = `
                    <div>
                        ${el.dataset.filterDropdownName}
                    </div>
                    ${inputs[0].value ? `<div>от ${inputs[0].value} м²</div>` : ''}
                    ${inputs[0].value && inputs[1].value ? '<div>-</div>' : ''}
                    ${inputs[1].value ? `<div>до ${inputs[1].value} м²</div>` : ''}
                `;
                }
                if (el.dataset.filterDropdownName === 'Этаж') {
                    html = `
                    <div>
                        ${el.dataset.filterDropdownName}
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
                            ${currentElMobile.dataset.filterDropdownName}
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
                    ${currentElMobile.dataset.filterDropdownName}
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
                    ${currentElMobile.dataset.filterDropdownName}
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
                    <div>${el.dataset.filterDropdownName}</div>
                    <div>${el.dataset.filterDropdownSubtitle}</div>
                    `;
                } else {
                    if (currentElMobile) {
                        html = `
                        <div>${currentElMobile.dataset.filterDropdownName}</div>
                        <div>${currentElMobile.dataset.filterDropdownSubtitle}</div>
                        `;
                    } else {
                        html = `
                        <div>${el.dataset.filterDropdownName}</div>
                        <div>${el.dataset.filterDropdownSubtitle}</div>
                        `;
                    }
                }
                buttonWrapper.classList.remove('_active')
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
                ${el.dataset.filterDropdownName}
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
                ${el.dataset.filterDropdownName}
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

    function convertSum(number) {
        number = number.replace(/\s/g, "");
        let result;
        if (number < 1000) {
            result = Number(number);
            return result;
        }
        result = Math.floor(Number(number)) >= 1.0e+6 ?
            (Math.round(Number(number)) / 1.0e+6).toFixed(1) + " млн." :
            Math.round(Number(number)) >= 1.0e+3 ?
            (Math.round(Number(number)) / 1.0e+3).toFixed(1) + " тыс." :
            Math.round(Number(number));
        return result.replace('.0', '');
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
                                <use xlink:href="img/sprite.svg#x"></use>
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
        const items = body.querySelectorAll('.search-select__item .checkbox-secondary__input');
        const btnWrapper = btn.querySelector('.search-select__button-wrapper')
        const btnList = btnWrapper.querySelector('div:nth-child(2)');
        const arrSelected = [];
        items.forEach(input => {
            input.addEventListener('change', () => {
                const currentElem = input.closest('.search-select__item').querySelector('.checkbox-secondary__text span:nth-child(1)').textContent.trim();
                if (input.checked) {
                    arrSelected.push(currentElem);
                } else {
                    const index = arrSelected.indexOf(currentElem);
                    if (index !== -1) {
                        arrSelected.splice(index, 1);
                    }
                }
                updatePlaceholder()
            })
        })

        const btnAll = container.querySelector('.search-select__all');
        const btnClear = container.querySelector('.search-select__clear');

        btnAll.addEventListener('click', () => {
            selectAll();
        });
        btnClear.addEventListener('click', () => {
            clearAll();
        });

        function clearAll() {
            items.forEach(input => input.checked = false);
            arrSelected.splice(0, arrSelected.length);
            updatePlaceholder()
        }

        function selectAll() {
            items.forEach(input => {
                const currentElem = input.closest('.search-select__item').querySelector('.checkbox-secondary__text span:nth-child(1)').textContent.trim();
                if (arrSelected.indexOf(currentElem) === -1) {
                    arrSelected.push(currentElem);
                    input.checked = true;
                }
            });
            updatePlaceholder()
        }

        function updatePlaceholder() {
            if (arrSelected.length >= 1) {
                btnList.textContent = '';
                btnWrapper.classList.add('_active');
            } else {
                btnList.textContent = container.dataset.searchSelectSubtitle;
                btnWrapper.classList.remove('_active');
            }
            arrSelected.forEach(el => {
                btnList.textContent += `${el}, `;
            });

            if (btnList.textContent !== container.dataset.searchSelectSubtitle) {
                btnList.textContent = btnList.textContent.slice(0, -2);
            }
        }
    });
}
export const searchSelectOne = () => {
    const containers = document.querySelectorAll('.search-select-one');
    if (!containers.length >= 1) return;
    containers.forEach(container => {
        const btn = container.querySelector('.search-select-one__button');
        const list = container.querySelectorAll('.search-select-one__item');
        const input = container.querySelector('.search-select-one__input-hidden');
        const placeholder = container.querySelector('.search-select-one__button-wrapper div:nth-child(2)');
        const close = container.querySelector('.search-select-one__close');
        btn.addEventListener('click', () => {
            containers.forEach(el => {
                if (el !== container) el.classList.remove('_active')
            });
            container.classList.toggle('_active');
        })
        document.addEventListener('click', (e) => {
            if (container.classList.contains('_active') && !e.target.closest('.search-select-one')) {
                container.classList.remove('_active');
            }
        })
        if (close) {
            close.addEventListener('click', () => {
                container.classList.remove('_active');
            });
        }
        list.forEach(item => {
            item.addEventListener('click', () => {
                list.forEach(item => item.classList.remove('_active'));

                input.value = item.dataset.value;
                item.classList.add('_active');
                placeholder.textContent = item.textContent;

                container.classList.remove('_active');

                container.classList.add('_selected');


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
            })
        })
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
                moreBtn.querySelector('span').textContent = btnTextMap.more;
                container.classList.remove('_active');
            } else {
                itemsHidden.forEach(item => {
                    _slideToggle(item, 700);
                });
                moreBtn.querySelector('span').textContent = btnTextMap.none;
                container.classList.add('_active');
            }
        });
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
        btn.addEventListener('click', () => {
            mask ? mask.classList.add('active') : container.classList.add('active');
            disableScroll();
        });
        close.addEventListener('click', () => {
            if (container.classList.contains('active')) container.classList.remove('active');
            if (mask && mask.classList.contains('active')) mask.classList.remove('active');
            if (!exceptionEnableScroll()) enableScroll();
        });
        filter.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('filter__mask') && target.classList.contains('active')) {
                mask.classList.remove('active');
                if (!exceptionEnableScroll()) enableScroll();
            }
        })

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
                            <use xlink:href="img/sprite.svg#x"></use>
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
        mortgageNoFee.setAttribute('disabled', true);
        const titleDefault = title.textContent;

        let certificateBoolean = false;
        let mortgageNoFeeBoolean = false;

        cash.addEventListener('change', () => {
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
        });
        mortgageYesBank.addEventListener('change', () => {
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
        });
        mortgageNoBank.addEventListener('change', () => {
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
        });

        certificate.addEventListener('change', () => {
            const value = certificate.nextElementSibling.querySelector('.checkbox-secondary__text').textContent.trim();
            if (!certificateBoolean) {
                title.textContent += `, ${value}`;
                certificateBoolean = true;
            } else {
                title.textContent = title.textContent.replace(`, ${value}`, '');
                certificateBoolean = false;
            }
        })
        mortgageNoFee.addEventListener('change', () => {
            const value = mortgageNoFee.nextElementSibling.querySelector('.checkbox-secondary__text').textContent.trim();
            if (!mortgageNoFeeBoolean) {
                title.textContent += `, ${value}`;
                mortgageNoFeeBoolean = true;
            } else {
                title.textContent = title.textContent.replace(`, ${value}`, '');
                mortgageNoFeeBoolean = false;
            }
        })

        function movingCheckbox(index, element) {
            dropdownContainerList.children[index].insertAdjacentElement('beforebegin', element.closest('.checkbox-secondary'));
        }

        function movingCheckboxDefault() {
            checkboxes.forEach((checkbox, index) => movingCheckbox(index, checkbox));
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


function filterModalScreenWidthCheck() {
    return window.innerWidth <= 1212;
}
