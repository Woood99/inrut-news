import Choices from 'choices.js';
import modal from '../modules/modal';
export const choicesSelect = () => {
    const selectPrimary = document.querySelectorAll('.select-primary__body');
    if (selectPrimary.length >= 1) {
        selectPrimary.forEach(el => {
            const choices = new Choices(el, {
                searchEnabled: false,
                shouldSort: false,
                itemSelectText: '',
                position: 'bottom',
                allowHTML: true,
            })
        });
    }
    const selectSort = document.querySelectorAll('.select-sort__body');
    if (selectSort.length >= 1) {
        const mobileWidth = 1212;
        selectSort.forEach(el => {
            const choices = new Choices(el, {
                searchEnabled: false,
                shouldSort: false,
                itemSelectText: '',
                position: 'bottom',
                allowHTML: true,
            })

            el.addEventListener('showDropdown', () => {
                if (window.innerWidth <= mobileWidth) {
                    const modalHTML = `
                    <div class="filter-modal filter-modal--select-sort _selects">
                        <div class="filter-modal__container">
                            <button class="btn-reset filter-modal__close" aria-label="Закрыть модальное окно">
                                <svg>
                                    <use xlink:href="./img/sprite.svg#x"></use>
                                </svg>
                                <span>Закрыть</span>
                            </button>
                            <div class="filter-modal__content">
                                <div class="select-sort"></div>
                            </div>
                        </div>
                    </div>
                    `;
                    modal(modalHTML, '.filter-modal', 300, el.closest('.select-sort'), el.closest('.select-sort').dataset.modalScroll);
                    const filterModal = document.querySelector('.filter-modal');
                    const dropdown = choices.dropdown.element;
                    filterModal.querySelector('.select-sort').insertAdjacentElement('beforeend', dropdown);

                    const items = filterModal.querySelectorAll('.choices__item');
                    items.forEach(item => {
                        item.addEventListener('click', () => {
                            choices.setChoiceByValue(item.dataset.value);
                            choices.hideDropdown();
                        })
                    })
                }
            })
        });
    }

    const selectMultiple = document.querySelectorAll('.select-multiple__body');
    if (selectMultiple.length >= 1) {
        selectMultiple.forEach(el => {
            const choices = new Choices(el, {
                searchEnabled: false,
                shouldSort: false,
                itemSelectText: '',
                position: 'bottom',
                noChoicesText: 'Вы выбрали все доступные теги',
                removeItemButton: true,
                allowHTML: true,
            })
            const placeholder = document.createElement('span');
            placeholder.textContent = 'Неважно';
            placeholder.classList.add('select-multiple__placeholder');
            el.closest('.choices').insertAdjacentElement('afterbegin', placeholder);
            el.addEventListener('addItem', (e) => {
                e.target.length ? placeholder.setAttribute('hidden', '') : placeholder.removeAttribute('hidden');
            })
            el.addEventListener('removeItem', (e) => {
                e.target.length ? placeholder.setAttribute('hidden', '') : placeholder.removeAttribute('hidden');
            })
            el.closest('.choices').addEventListener('click', (e) => {
                if ((e.target.classList.contains('choices') || e.target.classList.contains('choices__inner')) && el.closest('.choices').classList.contains('is-open')) {
                    choices.hideDropdown();
                }
            })
            el.addEventListener('change', (e) => {
                if (e.target.length >= 1) {
                    el.closest('.select-multiple').classList.add('_selected');
                    wrapper.classList.remove('_hover');
                } else {
                    el.closest('.select-multiple').classList.remove('_selected');
                }
            })
            const wrapper = el.closest('.select-multiple');
            wrapper.addEventListener('mouseover', (e) => {
                if (!e.target.closest('.choices__list.choices__list--dropdown')) {
                    wrapper.classList.add('_hover');
                }
            })
            wrapper.addEventListener('mouseout', () => {
                wrapper.classList.remove('_hover');
            })
        });
    }



    const selectSecondary = document.querySelectorAll('.select-secondary__body');
    if (selectSecondary.length >= 1) {
        selectSecondary.forEach(el => {
            selectSecondaryCreate(el);
        });
    }

};

export const selectSecondaryCreate = (el) => {
    const mobileWidth = 1212;
    const wrapper = el.closest('.select-secondary');
    if (wrapper.classList.contains('select-secondary--quarter')) {
        const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3);
        const body = wrapper.querySelector('.select-secondary__body');
        let optionsHtml = '';
        if (currentQuarter === 1) {
            optionsHtml = `
            <option value="quarter-1">1 квартал</option>
            <option value="quarter-2">2 квартал</option>
            <option value="quarter-3">3 квартал</option>
            <option value="quarter-4">4 квартал</option>
        `;
        }
        if (currentQuarter === 2) {
            optionsHtml = `
            <option value="quarter-2">2 квартал</option>
            <option value="quarter-1">1 квартал</option>
            <option value="quarter-3">3 квартал</option>
            <option value="quarter-4">4 квартал</option>
        `;
        }
        if (currentQuarter === 3) {
            optionsHtml = `
                <option value="quarter-3">3 квартал</option>
                <option value="quarter-1">1 квартал</option>
                <option value="quarter-2">2 квартал</option>
                <option value="quarter-4">4 квартал</option>
            `;
        }
        if (currentQuarter === 4) {
            optionsHtml = `
                <option value="quarter-4">4 квартал</option>
                <option value="quarter-1">1 квартал</option>
                <option value="quarter-2">2 квартал</option>
                <option value="quarter-3">3 квартал</option>
            `;
        }
        body.innerHTML = optionsHtml;
    }
    const choices = new Choices(el, {
        searchEnabled: false,
        shouldSort: false,
        itemSelectText: '',
        position: 'bottom',
        placeholder: true,
        allowHTML: true,
    })
    wrapper.select = choices;
    el.addEventListener('change', () => {
        checkCloseSelected();
        if (el.closest('.filter__item')) {
            el.closest('.filter__item').selectedItems = el.value;
        }
    });
    el.addEventListener('showDropdown', () => {
        wrapper.classList.add('_show');
        if (window.innerWidth <= mobileWidth) {
            const modalHTML = `
            <div class="filter-modal filter-modal--select-secondary _selects">
                <div class="filter-modal__container">
                    <button class="btn-reset filter-modal__close" aria-label="Закрыть модальное окно">
                        <svg>
                            <use xlink:href="./img/sprite.svg#x"></use>
                        </svg>
                        <span>Закрыть</span>
                    </button>
                    <div class="filter-modal__content">
                        <div class="select-secondary"></div>
                    </div>
                </div>
            </div>
            `;
            modal(modalHTML, '.filter-modal', 300, wrapper, wrapper.dataset.modalScroll);
            const filterModal = document.querySelector('.filter-modal');
            const dropdown = choices.dropdown.element;
            filterModal.querySelector('.select-secondary').insertAdjacentElement('beforeend', dropdown);

            const items = filterModal.querySelectorAll('.choices__item');
            items.forEach(item => {
                item.addEventListener('click', () => {
                    choices.setChoiceByValue(item.dataset.value);
                    checkCloseSelected();
                    choices.hideDropdown();
                })
            })
        }
    })
    el.addEventListener('hideDropdown',() => {
        wrapper.classList.remove('_show');
    })
    wrapper.addEventListener('mouseover', (e) => {
        if (!e.target.closest('.choices__list.choices__list--dropdown')) {
            wrapper.classList.add('_hover');
        }
    })
    wrapper.addEventListener('mouseout', () => {
        wrapper.classList.remove('_hover');
    })

    function checkCloseSelected() {
        const item = el.nextElementSibling.querySelector('.choices__item');
        if (item && !item.classList.contains('choices__placeholder')) {
            el.closest('.select-secondary').classList.add('_selected');
            wrapper.classList.remove('_hover');
        } else {
            el.closest('.select-secondary').classList.remove('_selected');
        }
    }
    checkCloseSelected();
}
