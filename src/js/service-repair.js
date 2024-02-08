import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

import quantity from './functions/quantity';
import numberReplace from './modules/numberReplace';
import {
    currentInputText
} from './components/inputs';
import modal from './modules/modal';
import {
    validateRemoveError,
    validateCreateError
} from './components/formValidate';
// ==============================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#service-repair-form');
    if (!form) return;
    let formEventInput = false;
    payMethod();
    quantity();
    const addProperty = form.querySelector('.service-repair-add-property');
    const optionsOrder = form.querySelectorAll('.service-moving-options-order .service-moving-options-order__item');
    const areaRepairInput = form.querySelector('.service-area-repair-input');
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
    if (areaRepairInput) {
        areaRepairInput.addEventListener('input', () => {
            setTimeout(() => {
                resultUpdate();
                if (formEventInput) validate();
            }, 1);
        })
    }

    optionsOrder.forEach(item => {
        item.addEventListener('click', () => {
            optionsOrder.forEach(currentItem => {
                if (item !== currentItem) {
                    currentItem.classList.remove('_active')
                }
            });
            item.classList.toggle('_active')
        });
    })

    form.querySelector('.col').addEventListener('click', (e) => {
        setTimeout(() => {
            updateForm(e);
            resultUpdate();
        }, 1);
    })

    const result = form.querySelector('.service-moving-result');
    resultUpdate();

    function updateForm(e) {
        const target = e.target;
        const serviceTypeSelectInput = form.querySelector('.service-type-select-input');
        if (serviceTypeSelectInput && target.closest('.field-select--necessarily')) {
            const value = serviceTypeSelectInput.value;
            if (value !== '') {
                const contentItems = form.querySelectorAll('[data-select-content]');
                const currentContent = form.querySelector(`[data-select-content="${value}"]`);

                contentItems.forEach(item => {
                    item.setAttribute('hidden', '');
                    const contentItems = item.querySelectorAll('.service-type-select__content');
                    contentItems.forEach(item => item.classList.remove('_active'));
                });
                if (currentContent) {
                    currentContent.removeAttribute('hidden');
                    const contentItems = currentContent.querySelectorAll('.service-type-select__content');
                    contentItems.forEach((item, index) => {
                        index === 0 ? item.classList.add('_active') : item.classList.remove('_active');
                    });
                }
            }
        }

        const serviceTypeSelectContent = target.closest('.service-type-select__content');
        if (serviceTypeSelectContent) {
            const allItems = form.querySelectorAll('.service-type-select__content');
            allItems.forEach(item => item.classList.remove('_active'));
            serviceTypeSelectContent.classList.add('_active');
        }
    }

    function resultUpdate() {
        const areaRepairValue = areaRepairInput.value === '' ? 0 : areaRepairInput.value;
        const repairItemActive = form.querySelector('.service-type-select__content._active');
        const repairItemActiveData = {
            name: repairItemActive.querySelector('.offer-room__title').textContent.trim(),
            price: repairItemActive.dataset.offerPrice,
            resultPrice() {
                return this.price * areaRepairValue
            }
        };

        const addService = form.querySelector('.service-moving-options-order__item._active');
        let resultPrice = repairItemActiveData.resultPrice();
        let htmlOptionItem = '';
        let htmlOptionsOrder = '';
        if (addService) {
            const data = {
                name: addService.querySelector('.small-card-select__title').textContent.trim(),
                price: addService.dataset.optionPrice,
                area: areaRepairValue == 0 ? 1 : areaRepairValue,
                resultPrice() {
                    return this.price * this.area
                }
            }
            const option = `
            <div class="service-moving-result__option">
                <span>${data.name}</span>
                <span>${data.area} * ${numberReplace(String(data.price))} ₽</span>
                <span>${numberReplace(String(data.resultPrice()))} ₽</span>
            </div>
            `;
            htmlOptionsOrder += option;
            resultPrice += Number(data.resultPrice());
        }
        if (areaRepairValue > 0) {
            htmlOptionItem = `
            <div class="service-moving-result__option">
                <span>${repairItemActiveData.name}</span>
                <span>${areaRepairValue == 0 ? '0' : `${areaRepairValue} * ${numberReplace(String(repairItemActiveData.price))}`} ₽</span>
                <span>${numberReplace(String(resultPrice))} ₽</span>
            </div>
            `;
        } else {
            htmlOptionItem = '';
        }
        const htmlResult = `
                <div class="service-moving-result__main">
                    <h2 class="service-moving-result__main-title title-3">
                        <span>Общая стоимость</span>
                        <span>${numberReplace(String(resultPrice))} ₽</span>
                    </h2>
                    <div class="service-moving-result__options">
                        <div class="service-moving-result__option">
                            <span>Площадь ремонта</span>
                            <span>${areaRepairValue} м²</span>
                        </div>
                        ${htmlOptionItem}
                        ${htmlOptionsOrder}
                    </div>
                    <div class="service-moving-result__checkbox checkbox-secondary">
                        <input id="personal-info" name="personal-info" class="checkbox-secondary__input" type="checkbox" value="true">
                        <label for="personal-info" class="checkbox-secondary__label">
                            <span class="checkbox-secondary__text">
                                <span>Я соглашаюсь на обработку</span>
                                <a href="#">персональных данных</a>
                            </span>
                        </label>
                    </div>
                    <button type="submit" form="service-repair-form" class="btn btn-reset btn-primary service-moving-result__btn">
                        Заказать услугу
                    </button>
                </div>
            `;

        result.innerHTML = htmlResult;
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


    const areaRepairLabel = areaRepairInput.closest('.input-text');
    function validate() {
        let result = true;
        formEventInput = true;
        validateRemoveError(areaRepairLabel);

        if (areaRepairInput.value === '') {
            result = false;
            validateCreateError(areaRepairLabel, 'Введите площадь ремонта');
        }

        return result;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validate()){
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
                        <h2 class="service-moving-confirm__title title-2">
                            Услуга заказана
                        </h2>
                        <div class="service-moving-confirm__text">
                            <p>
                                Транспортная компания свяжется с вами в день перевозки. Дополнительную информацию можно узнать по телефону 8 800 951-40-49
                            </p>
                        </div>
                        <button type="button" class="btn btn-reset btn-primary service-moving-confirm__button js-popup-close">
                            Готово
                        </button>
                    </div>
                </div>
            </div>
            `;
            modal(modalHTML, '.add-property', 300);
        }
    })
})
