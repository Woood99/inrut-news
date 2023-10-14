import Choices from 'choices.js';
import modal from '../modules/modal';
const choicesSelect = () => {
    const selectPrimary = document.querySelectorAll('.select-primary__body');
    if (selectPrimary.length >= 1) {
        selectPrimary.forEach(el => {
            const choices = new Choices(el, {
                searchEnabled: false,
                shouldSort: false,
                itemSelectText: '',
                position: 'bottom',
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
            })

            el.addEventListener('showDropdown', () => {
                if (window.innerWidth <= mobileWidth) {
                    const modalHTML = `
                    <div class="filter-modal filter-modal--select-sort">
                        <div class="filter-modal__container">
                            <button class="btn-reset filter-modal__close" aria-label="Закрыть модальное окно">
                                <svg>
                                    <use xlink:href="img/sprite.svg#x"></use>
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
        const mobileWidth = 1212;
        selectSecondary.forEach(el => {
            const choices = new Choices(el, {
                searchEnabled: false,
                shouldSort: false,
                itemSelectText: '',
                position: 'bottom',
                placeholder: true,
            })
            const wrapper = el.closest('.select-secondary');
            el.addEventListener('change', () => {
                checkCloseSelected();
            });
            el.addEventListener('showDropdown', () => {
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
                                <div class="select-secondary"></div>
                            </div>
                        </div>
                    </div>
                    `;
                    modal(modalHTML, '.filter-modal', 300, wrapper,wrapper.dataset.modalScroll);
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
            wrapper.addEventListener('mouseover', (e) => {
                if (!e.target.closest('.choices__list.choices__list--dropdown')) {
                    wrapper.classList.add('_hover');
                }
            })
            wrapper.addEventListener('mouseout', () => {
                wrapper.classList.remove('_hover');
            })

            function checkCloseSelected() {
                if (!el.nextElementSibling.querySelector('.choices__item').classList.contains('choices__placeholder')) {
                    el.closest('.select-secondary').classList.add('_selected');
                    wrapper.classList.remove('_hover');
                } else {
                    el.closest('.select-secondary').classList.remove('_selected');
                }
            }
        });
    }

};

export default choicesSelect;
