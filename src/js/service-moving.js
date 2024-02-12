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
// ==============================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#service-moving-form');
    if (!form) return;
    payMethod();
    quantity();
    const customerInputs = form.querySelectorAll('.service-moving-client--customer .row .input-text');
    const clientToggle = form.querySelector('.service-moving-client__toggle input');
    const recipient = form.querySelector('[data-service-moving-recipient]');
    const date = form.querySelector('.service-moving-time__date');
    const optionsItems = form.querySelector('.service-moving-options__list').children;
    const featuresItems = form.querySelectorAll('.service-moving-features__item');
    const ratesItems = form.querySelector('.service-moving-rates__list').children;

    const optionsOrder = form.querySelectorAll('.service-moving-options-order .service-moving-options-order__item');
    optionsOrder.forEach(item => {
        item.addEventListener('click', () => item.classList.toggle('_active'));
    })

    clientToggle.addEventListener('input', () => {
        if (!clientToggle.checked) {
            recipient.setAttribute('hidden', '');
            customerInputs.forEach(item => {
                item.classList.remove('input-text--disabled');
                item.querySelector('input').removeAttribute('disabled');
            })
        } else {
            recipient.removeAttribute('hidden');
            customerInputs.forEach(item => {
                item.classList.add('input-text--disabled');
                item.querySelector('input').setAttribute('disabled', '');
            })
        }
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
    if (optionsItems.length > 0) {
        const itemsArray = Array.from(optionsItems);
        const inputs = itemsArray.map(item => item.querySelector('input'));
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const currentItem = input.closest('.offer-room');
                itemsArray.forEach(item => item.classList.remove('_active'));
                currentItem.classList.toggle('_active');
            });
        })
    }
    if (featuresItems.length > 0) {
        const quantityHTML = `
        <div class="quantity" data-value="1">
            <div class="quantity__button quantity__button_minus">
                <svg>
                    <use xlink:href="./img/sprite.svg#minus"></use>
                </svg>
            </div>
            <div class="quantity__input">
                <input type="text" maxlength="2" disabled value="1">
            </div>
            <div class="quantity__button quantity__button_plus">
                <svg>
                    <use xlink:href="./img/sprite.svg#plus"></use>
                </svg>
            </div>
        </div>
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
                        item.insertAdjacentHTML('beforeend', quantityHTML);
                    }
                    const quantity = target.closest('.quantity');
                    if (quantity && quantity.dataset.value < 1) {
                        quantity.remove();
                        item.insertAdjacentHTML('beforeend', btnHTML);
                    }
                }, 1);
            })
        })
    }
    if (ratesItems.length > 0) {
        const itemsArray = Array.from(ratesItems);
        const inputs = itemsArray.map(item => item.querySelector('input'));
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const currentItem = input.closest('.offer-room');
                itemsArray.forEach(item => item.classList.remove('_active'));
                currentItem.classList.toggle('_active');
            });
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
        const optionsOrderActive = Array.from(optionsOrder).filter(item => item.classList.contains('_active') && item.dataset.optionPrice);

        const featuresBlock = form.querySelector('.service-moving-features');
        const featuresItems = featuresBlock.querySelectorAll('.features-item');
        const rentTime = form.querySelector('.service-sample__rent-time').closest('.quantity').dataset.value;
        const rentTimePrice = form.querySelector('.service-sample__rent-time').dataset.priceRent;
        const movers = form.querySelector('.service-sample__movers').value;
        const priceMovers = form.querySelector('.service-sample__movers').dataset.priceMovers;
        const listFeaturesItems = {};
        const listOptionsOrderItems = {};
        const activeFeaturesItems = Array.from(featuresItems).filter(item => {
            if (item.querySelector('.quantity')) return true;
        })

        let htmlOptions = '';
        let htmlOptionsOrder = '';
        let resultPrice = (rentTime * rentTimePrice) + (movers * priceMovers);
        if (activeFeaturesItems.length > 0) {
            activeFeaturesItems.forEach(item => {
                listFeaturesItems[item.querySelector('.features-item__title').textContent.trim()] = {
                    'price': item.querySelector('.features-item__price').dataset.price,
                    'quantity': item.querySelector('.quantity').dataset.value,
                    'name': item.dataset.optionFeatureBlock,
                    resultPrice() {
                        return this.quantity * this.price
                    }
                };
            })
            for (const item in listFeaturesItems) {
                const option = `
                    <div class="service-moving-result__option" data-option-feature-name='${listFeaturesItems[item].name}'>
                        <span>${item}</span>
                        <span>${numberReplace(String(listFeaturesItems[item].resultPrice()))} ₽</span>
                        <span>${listFeaturesItems[item].quantity} * ${listFeaturesItems[item].price} ₽</span>
                        <div class="quantity quantity--small" data-value="${listFeaturesItems[item].quantity}">
                            <div class="quantity__button quantity__button_minus">
                                <svg>
                                    <use xlink:href="./img/sprite.svg#minus"></use>
                                </svg>
                            </div>
                            <div class="quantity__input">
                                <input type="text" maxlength="2" disabled="" value="${listFeaturesItems[item].quantity}">
                            </div>
                            <div class="quantity__button quantity__button_plus">
                                <svg>
                                    <use xlink:href="./img/sprite.svg#plus"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                    `;
                htmlOptions += option;
                resultPrice += listFeaturesItems[item].resultPrice();
            }
        }
        if (optionsOrderActive.length > 0) {
            optionsOrderActive.forEach(item => {
                listOptionsOrderItems[item.querySelector('.small-card-select__title').textContent.trim()] = {
                    'price': item.dataset.optionPrice,
                };
            })
            for (const item in listOptionsOrderItems) {
                const option = `
                <div class="service-moving-result__option">
                    <span>${item}</span>
                    <span>${listOptionsOrderItems[item].price} ₽</span>
                </div>
                `;
                htmlOptionsOrder += option;
                resultPrice += Number(listOptionsOrderItems[item].price);
            }
        }
        const htmlResult = `
                <div class="service-moving-result__main">
                    <h2 class="service-moving-result__main-title title-3">
                        <span>Общая стоимость</span>
                        <span>${numberReplace(String(resultPrice))} ₽</span>
                    </h2>
                    <div class="service-moving-result__options">
                        <div class="service-moving-result__option" data-option-name="rent-time">
                            <span>Время аренды</span>
                            <span>${numberReplace(String(rentTime * rentTimePrice))} ₽</span>
                            <span>${rentTime == 0 ? '0' : `${rentTime} * ${rentTimePrice}`} ₽</span>
                            <div class="quantity quantity--small" data-value="${rentTime}" data-max-value="24">
                                <div class="quantity__button quantity__button_minus">
                                    <svg>
                                        <use xlink:href="./img/sprite.svg#minus"></use>
                                    </svg>
                                </div>
                                <div class="quantity__input">
                                    <input type="text" maxlength="2" disabled="" value="${rentTime}">
                                </div>
                                <div class="quantity__button quantity__button_plus">
                                    <svg>
                                        <use xlink:href="./img/sprite.svg#plus"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="service-moving-result__option" data-option-name="movers">
                            <span>Грузчики</span>
                            <span>${numberReplace(String(movers * priceMovers))} ₽</span>
                            <span>${movers == 0 ? '0' : `${movers} * ${priceMovers}`} ₽</span>
                            <div class="quantity quantity--small" data-value="${movers}" data-max-value="5">
                                <div class="quantity__button quantity__button_minus">
                                    <svg>
                                        <use xlink:href="./img/sprite.svg#minus"></use>
                                    </svg>
                                </div>
                                <div class="quantity__input">
                                    <input type="text" maxlength="2" disabled="" value="${movers}">
                                </div>
                                <div class="quantity__button quantity__button_plus">
                                    <svg>
                                        <use xlink:href="./img/sprite.svg#plus"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        ${htmlOptions}
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
                    <button type="button" class="btn btn-reset btn-primary service-moving-result__btn">Заказать услугу</button>
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

    const secondaryAddressBtn = form.querySelector('.service-moving-address__add');
    secondaryAddressBtn.addEventListener('click', () => {
        createSecondaryAddress();
        const currentBlock = secondaryAddressBtn.previousElementSibling;
        currentBlock.querySelectorAll('.input-text').forEach(item => currentInputText(item));
        const removeBtn = currentBlock.querySelector('.service-moving-address__secondary-delete')
        removeBtn.addEventListener('click', () => {
            currentBlock.remove()
        });
    })

    function createSecondaryAddress() {
        const html = `
        <div class="service-moving-address__block service-moving-address__secondary">
            <h4 class="service-moving-address__title title-4">Промежуточный адрес</h4>
            <div class="row">
                <div class="input-text input-text--no-exp">
                    <label class="input-text__label">
                        <span>Адрес</span>
                        <input type="text" name="Адрес" class="input-reset input-text__input" placeholder="">
                    </label>
                </div>
                <div class="input-text input-text--no-exp input-text--only-number">
                    <label class="input-text__label">
                        <span>Номер квартиры</span>
                        <input type="text" name="Имя" class="input-reset input-text__input" maxlength="4" placeholder="">
                    </label>
                </div>
                <button type="button" class="btn btn-reset service-moving-address__secondary-delete">
                    <svg>
                        <use xlink:href="./img/sprite.svg#trash"></use>
                    </svg>
                </button>
            </div>
        </div>
        `;
        secondaryAddressBtn.insertAdjacentHTML('beforebegin', html);
    }
})
