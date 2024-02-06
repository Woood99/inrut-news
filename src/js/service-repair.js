import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

import AirDatepicker from 'air-datepicker';
import quantity from './functions/quantity';
import {
    getCurrentDateString,
    getTomorrowDay
} from './modules/date';
import numberReplace from './modules/numberReplace';
import {
    currentInputText
} from './components/inputs';
import modal from './modules/modal';
// ==============================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#service-repair-form');
    if (!form) return;
    payMethod();
    quantity();
    const addProperty = form.querySelector('.service-repair-add-property');

    const date = form.querySelector('.service-moving-time__date');
    const featuresItems = form.querySelectorAll('.service-moving-features__item');

    const optionsOrder = form.querySelectorAll('.service-moving-options-order .service-moving-options-order__item');


    if (addProperty) {
        const btn = addProperty.querySelector('.service-repair-add-property__btn');
        btn.addEventListener('click', () => {
            const modalHTML = `
            <div class="add-property">
                <div class="add-property__container">
                    <button class="btn-reset add-property__close" aria-label="Закрыть модальное окно">
                        <svg>
                            <use xlink:href="./img/sprite.svg#x"></use>
                        </svg>
                        <span>Закрыть</span>
                    </button>
                    <div class="add-property__content">
                        <h2 class="add-property__title title-2">Добавление недвижимости</h2>
                        <p class="add-property__descr">Информация ниже нужна для того, чтобы мы могли предложить вам актуальные сервисы</p>
                        <div class="add-property__fields">
                        <div class="row" data-add-property-address>
                        <div class="input-text input-text--no-exp">
                            <label class="input-text__label">
                                <span>Адрес</span>
                                <input type="text" name="Адрес" class="input-reset input-text__input add-property__address" id="address-input" placeholder="">
                            </label>
                            <div id="address-suggestions"></div>
                        </div>
                        <div class="input-text input-text--no-exp input-text--only-number">
                            <label class="input-text__label">
                                <span>Номер квартиры</span>
                                <input type="text" name="Имя" class="input-reset input-text__input add-property__apart-number" value="" maxlength="4" placeholder="">
                            </label>
                        </div>
                    </div>
                    <div class="row" data-add-property-hidden hidden>
                        <div class="input-text input-text--no-exp">
                            <label class="input-text__label">
                                <span>Название</span>
                                <input type="text" name="Адрес" class="input-reset input-text__input add-property__name" placeholder="">
                            </label>
                        </div>
                    </div>
                    <div class="row" data-add-property-hidden hidden>
                            <button type="button" class="btn btn-reset tag add-property__tag">
                                <span>
                                    Мой дом
                                </span>
                            </button>
                            <button type="button" class="btn btn-reset tag add-property__tag">
                                <span>
                                    Дом родителей
                                </span>
                            </button>
                            <button type="button" class="btn btn-reset tag add-property__tag">
                                <span>
                                    Сдаю
                                </span>
                            </button>
                            <button type="button" class="btn btn-reset tag add-property__tag">
                                <span>
                                    Снимаю
                                </span>
                            </button>
                        </div>
                    </div>
                    <div class="add-property__btns">
                        <button type="button" class="btn btn-reset js-popup-close btn-secondary">Отменить</button>
                        <button type="button" class="btn btn-reset js-popup-close btn-primary add-property__submit" disabled>Добавить</button>
                    </div>
                    </div>
                </div>
            </div>
            `;
            modal(modalHTML, '.add-property', 300);

            const modalEl = document.querySelector('.add-property');
            const inputs = modalEl.querySelectorAll('.input-text');
            inputs.forEach(input => currentInputText(input));
            const addressInput = modalEl.querySelector('.add-property__address');
            const hiddenBlock = modalEl.querySelectorAll('[data-add-property-hidden]');
            const nameInput = modalEl.querySelector('.add-property__name');
            const apartNumber = modalEl.querySelector('.add-property__apart-number')
            const tags = modalEl.querySelectorAll('.add-property__tag');
            const btnSubmit = modalEl.querySelector('.add-property__submit');
            addressInput.addEventListener('input', () => {
                if (addressInput.value.length > 0) {
                    hiddenBlock.forEach(item => item.removeAttribute('hidden'));
                } else {
                    hiddenBlock.forEach(item => item.setAttribute('hidden', ''));
                }
                submitToggleDisabled();
            })
            apartNumber.addEventListener('input', () => {
                submitToggleDisabled()
            });

            function submitToggleDisabled() {
                if (apartNumber.value.length > 0 && addressInput.value.length > 0) {
                    btnSubmit.removeAttribute('disabled');
                } else {
                    btnSubmit.setAttribute('disabled', '');
                }
            }

            modalEl.addEventListener('click', (e) => {
                const target = e.target;
                const tag = target.closest('.add-property__tag');
                const submit = target.closest('.add-property__submit');
                if (tag) {
                    const tagName = tag.querySelector('span').textContent.trim();
                    nameInput.value = tagName;
                    nameInput.closest('.input-text').classList.add('_active');
                    tags.forEach(tag => tag.classList.remove('_active'));
                    tag.classList.add('_active');
                }
                if (submit) {
                    const values = {
                        address: addressInput.value,
                        apartNumber: apartNumber.value
                    };
                    const resultHTML = `
                    <div class="service-sample__row">
                        <h2 class="service-sample__subtitle title-2">
                            Адрес
                        </h2>
                        <p class="service-sample__descr">
                            ${values.address}, кв. ${values.apartNumber}
                        </p>
                    </div>
                    `;
                    const currentRow = form.querySelector('.service-repair-add-property-row');
                    currentRow.insertAdjacentHTML('afterend', resultHTML);
                    currentRow.remove();
                }
            })

        })
    }


    optionsOrder.forEach(item => {
        item.addEventListener('click', () => item.classList.toggle('_active'));
    })

    if (date) {
        new AirDatepicker(date, {
            autoClose: true,
            isMobile: true,
            minDate: getTomorrowDay(getCurrentDateString()),
            onSelect: (fd) => {
                const inputText = date.closest('.input-text')
                fd.date ? inputText.classList.add('_active') : inputText.classList.remove('_active');
            }
        })
    }
    if (featuresItems.length > 0) {
        const closeHTML = `
        <button type="button" class="btn btn-reset features-item__close">
            <svg>
                <use xlink:href="./img/sprite.svg#x"></use>
            </svg>
        </button>
        `;
        const btnHTML = `
        <button type="button" class="btn btn-reset tag features-item__btn">
            Добавить
        </button>
        `;
        featuresItems.forEach(item => {
            item.addEventListener('click', (e) => {
                setTimeout(() => {
                    const target = e.target;
                    const btn = target.closest('.features-item__btn');
                    if (btn) {
                        btn.remove();
                        item.insertAdjacentHTML('beforeend', closeHTML);
                    }
                    const close = target.closest('.features-item__close');
                    if (close) {
                        close.remove();
                        item.insertAdjacentHTML('beforeend', btnHTML);
                    }
                }, 1);
            })
        })
    }
    form.querySelector('.col').addEventListener('click', () => {
        setTimeout(() => {
            resultUpdate();
        }, 1);
    })

    const sidebar = form.querySelector('.service-sample__sidebar');

    sidebar.addEventListener('click', (e) => {
        setTimeout(() => {
            const target = e.target;
            const quantityButton = target.closest('.quantity__button');
            if (quantityButton) {
                const quantity = quantityButton.closest('.quantity');
                const quantityName = quantity.closest('.service-moving-result__option').dataset.optionName;
                const quantityFeatureName = quantity.closest('.service-moving-result__option').dataset.optionFeatureName;
                if (quantityName) {
                    const quantityInput = quantity.querySelector('input');

                    const currentInputBlock = form.querySelector(`[data-option-block-name=${quantityName}]`);
                    if (currentInputBlock) {
                        if (quantityButton.classList.contains('quantity__button_plus')) {
                            currentInputBlock.closest('.quantity').querySelector('.quantity__button_plus').click();
                        }
                        if (quantityButton.classList.contains('quantity__button_minus')) {
                            currentInputBlock.closest('.quantity').querySelector('.quantity__button_minus').click();
                        }
                    }
                }
                if (quantityFeatureName) {
                    const currentBlock = form.querySelector(`[data-option-feature-block="${quantityFeatureName}"`);
                    if (currentBlock) {
                        if (quantityButton.classList.contains('quantity__button_plus')) {
                            currentBlock.querySelector('.quantity').querySelector('.quantity__button_plus').click();
                        }
                        if (quantityButton.classList.contains('quantity__button_minus')) {
                            currentBlock.querySelector('.quantity').querySelector('.quantity__button_minus').click();
                        }
                    }
                }
            }
        }, 1);
    })

    const result = form.querySelector('.service-moving-result');

    function resultUpdate() {

    }

    function payMethod() {
        const tabs = form.querySelectorAll('[data-pay-method-tab]');
        const content = form.querySelectorAll('[data-pay-method-content]');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                content.forEach(item => item.setAttribute('hidden', ''));
                const currentContent = Array.from(content).find(item => item.dataset.payMethodContent === tab.dataset.payMethodTab);
                if (currentContent) currentContent.removeAttribute('hidden');
            })
        })

        const payCashInput = form.querySelector('.pay-cash-input');
        const payCashCheckbox = form.querySelector('.pay-cash-no-change');
        const mainTitle = form.querySelector('.service-moving-result__main-title span:nth-child(2)');
        if (payCashInput && payCashCheckbox && mainTitle) {
            const inputText = payCashInput.closest('.input-text');
            payCashCheckbox.addEventListener('input', () => {
                if (payCashCheckbox.checked) {
                    payCashInput.value = mainTitle.textContent.replace(/[^0-9]/g, '');
                    inputText.classList.add('_active');
                } else {
                    payCashInput.value = '';
                    inputText.classList.remove('_active');
                }
            })
        }
    }
})
