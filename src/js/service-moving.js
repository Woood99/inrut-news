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
// ==============================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#service-moving-form');
    if (form) {
        let booleanForm = false;
        quantity();
        const clientToggle = form.querySelector('.service-moving-client__toggle input');
        const recipient = form.querySelector('[data-service-moving-recipient]');
        const date = form.querySelector('.service-moving-time__date');
        const optionsItems = form.querySelector('.service-moving-options__list').children;
        const featuresItems = form.querySelectorAll('.service-moving-features__item');
        const ratesItems = form.querySelector('.service-moving-rates__list').children;
        const btn = form.querySelector('.service-moving__btn');
        clientToggle.addEventListener('input',() => {
            if (clientToggle.checked){
                recipient.setAttribute('hidden','');
            } else {
                recipient.removeAttribute('hidden');
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
        form.addEventListener('click',() => {
            setTimeout(() => {
                if (booleanForm) resultUpdate();
            }, 1);
        })
        btn.addEventListener('click', () => {
            setTimeout(() => {
                resultUpdate();
                booleanForm = true;
            }, 1);
        });
    };

    const result = form.querySelector('.service-moving-result');
    const start = result.querySelector('.service-moving-result__start');

    function resultUpdate() {
        const featuresBlock = form.querySelector('.service-moving-features');
        const rateBlock = form.querySelector('.service-moving-rates');

        const featuresItems = featuresBlock.querySelectorAll('.features-item');
        const currentRate = rateBlock.querySelector('.offer-room._active');

        const rentTime = form.querySelector('.service-moving__rent-time').value;

        if (currentRate) {
            const listFeaturesItems = {};
            const ratePrice = currentRate.querySelector('input').value;
            const activeFeaturesItems = Array.from(featuresItems).filter(item => {
                if (item.querySelector('.quantity')) return true;
            })

            let htmlOptions = '';
            let resultPrice = ratePrice * rentTime;
            if (activeFeaturesItems.length > 0) {
                activeFeaturesItems.forEach(item => {
                    listFeaturesItems[item.querySelector('.features-item__title').textContent.trim()] = {
                        'price': item.querySelector('.features-item__price').dataset.price,
                        'quantity': item.querySelector('.quantity').dataset.value,
                        resultPrice() {
                            return this.quantity * this.price
                        }
                    };
                })
                for (const item in listFeaturesItems) {
                    const option = `
                    <div class="service-moving-result__option">
                        <span>${item}</span>
                        <span>${numberReplace(String(listFeaturesItems[item].resultPrice()))} ₽</span>
                    </div>
                    `;
                    htmlOptions += option;
                    resultPrice += listFeaturesItems[item].resultPrice();
                }

            }

            const htmlResult = `
                <div class="service-moving-result__main">
                    <h2 class="service-moving-result__main-title title-3">
                        <span>Общая стоимость</span>
                        <span>${numberReplace(String(resultPrice))} ₽</span>
                    </h2>
                    <div class="service-moving-result__options">
                        <div class="service-moving-result__option">
                            <span>Тариф</span>
                            <span>${numberReplace(String(ratePrice))} ₽</span>
                        </div>
                        <div class="service-moving-result__option">
                            <span>Время аренды</span>
                            <span>${numberReplace(String(rentTime))} ч</span>
                        </div>
                        ${htmlOptions}
                    </div>
                    <div class="service-moving-result__descr">
                        <p>
                            *Если у вас возникли вопросы по стоимости заказа, вы  можете связаться со службой поддержки 8 800 100-10-63
                        </p>
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

            if (start) start.remove();
            result.innerHTML = htmlResult;
        }
    }
})
