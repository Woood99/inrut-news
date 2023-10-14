import {
    validateRemoveError,
    validateCreateError
} from './formValidate';
import numberReplace from "../modules/numberReplace";

const mortgage = () => {
    let resultMortgage;
    const containerOne = document.querySelector('.object-calc-mort--one');
    const popupContainerOne = document.querySelector('.popup-primary--interest-rate-1 .interest-rate');

    const containerAdd = document.querySelector('.object-calc-mort--add');
    const popupContainerAdd = document.querySelector('.popup-primary--interest-rate-2 .interest-rate--add');
    if (containerAdd && popupContainerAdd) {
        const list = containerAdd.querySelector('.object-calc-mort__list');
        const listPopup = popupContainerAdd.querySelector('.interest-rate__wrapper');
        const items = list.querySelectorAll('[data-mortgage-card]');
        const itemsPopup = listPopup.querySelectorAll('[data-mortgage-card]');
        const textPrc = containerAdd.querySelector('.field-static__text');

        list.addEventListener('click', (e) => {
            toggleClass(e, items, itemsPopup, items);
        })

        listPopup.addEventListener('click', (e) => {
            toggleClass(e, itemsPopup, items, items);
        })

        function toggleClass(e, containerOne, containerTwo, container) {
            const target = e.target ? e.target : e;
            const item = target.closest('[data-mortgage-card]');
            if (!item) return;
            containerOne.forEach(item => item.classList.remove('_active'));
            item.classList.add('_active');
            containerTwo.forEach(el => {
                +item.dataset.mortgageCard === +el.dataset.mortgageCard ? el.classList.add('_active') : el.classList.remove('_active');
            });

            container.forEach(el => {
                if (+item.dataset.mortgageCard === +el.dataset.mortgageCard) {
                    const prc = el.querySelector('span:nth-child(2)').textContent;
                    textPrc.textContent = prc;
                }
            })

            if (containerAdd.querySelector('.object-calc-mort__contribution')) {
                resultMortgage();
            }
        }
    }
    if (containerOne && popupContainerOne) {
        const items = popupContainerOne.querySelectorAll('.interest-rate-card');
        items.forEach(item => {
            item.addEventListener('click', () => {

                items.forEach(item => item.classList.remove('_active'));
                item.classList.add('_active');

                const prc = item.querySelector('.interest-rate-card__prc--new').textContent;
                const textPrc = containerOne.querySelector('.field-static__text');
                textPrc.textContent = prc;
            });
        })
    }

    if (containerAdd) {
        const meternalCapital = containerAdd.querySelector('.object-calc-mort__contribution');
        if (meternalCapital) {

            resultMortgage = () => {
                setTimeout(() => {
                    const priceObjectValue = +containerAdd.querySelector('.filter-dropdown--mortgage-calc').dataset.value;
                    const priceObjectName = containerAdd.querySelector('.filter-dropdown--mortgage-calc').dataset.name;
                    const term = +containerAdd.querySelector('.object-calc-mort__term .filter-range-one__nav input').value.trim();
                    const initialFee = containerAdd.querySelector('.object-calc-mort__contribution .filter-range-one__nav input').value.trim().replace(/\s/g, '');
                    const prc = containerAdd.querySelector('.field-static .field-static__text').textContent;
                    const bottom = containerAdd.querySelector('.object-calc-mort__info');
                    const bottomSum = bottom.querySelector('span:nth-child(1)');
                    const bottomPrc = bottom.querySelector('span:nth-child(2)');
                    const bottomMonth = bottom.querySelector('span:nth-child(3)');

                    if (priceObjectName === 'Стоимость недвижимости') {
                        bottomSum.innerHTML = `
                            Сумма кредита
                            <span>${numberReplace(String(priceObjectValue - initialFee))} ₽</span>
                        `;
                        bottomPrc.innerHTML = `
                            Процентная ставка
                            <span>${prc.replace('от ', '')}</span>
                        `;
                        const prcValue = (prc.replace('от ', '').replace('%', '').replace(',', '.').trim());
                        bottomMonth.innerHTML = `
                            Ежемесячный платеж
                            <span>${getPayment(priceObjectValue,initialFee, term, prcValue)} ₽/мес.</span>
                        `;
                    }
                    if (priceObjectName === 'Размер платежа') {
                        const prcValue = (prc.replace('от ', '').replace('%', '').replace(',', '.').trim());
                        bottomSum.innerHTML = `
                            Ежемесячный платеж
                            <span>${numberReplace(String(priceObjectValue))} ₽</span>
                        `;
                        bottomPrc.innerHTML = `
                            Процентная ставка
                            <span>${prc.replace('от ', '')}</span>
                        `;
                        bottomMonth.innerHTML = `
                        Стоимость недвижимости
                            <span>${getPayment2(priceObjectValue,initialFee,term,prcValue)} ₽</span>
                    `;
                    }
                }, 1000);
            }

            function getPayment(priceObject, initialFee, period, rate) {
                const month = (rate / 12) / 100;
                const koef = (month * (Math.pow(1 + month, period * 12))) / (Math.pow(1 + month, period * 12) - 1);
                const result = (priceObject - initialFee) * koef;

                return numberReplace(result.toFixed());
            };


            function getPayment2(priceMonth, initialFee, period, rate) {
                var MonthlyPaymentAmount = priceMonth;
                var APR = rate / 100;
                var InterestRate = (APR / 12);
                let result = 0;
                for (var nMonths = 12; nMonths <= (period * 12); nMonths += 12) {
                    const TotalAmountOfCredit = (MonthlyPaymentAmount / InterestRate) * (1 - Math.pow((1 + InterestRate), (-nMonths)));
                    result = TotalAmountOfCredit;
                }
                result += +initialFee;
                return numberReplace(String(parseInt(result)));
            }



            const contributionInput = meternalCapital.querySelector('input');
            const checkbox = meternalCapital.querySelector('.toggle-checkbox:nth-child(2) input');
            const capital = containerAdd.querySelector('.object-calc-mort__capital');
            const facilities = containerAdd.querySelector('.object-calc-mort__facilities');

            const capitalInput = capital.querySelector('.input-text__input');
            const facilitiesInput = facilities.querySelector('.input-text__input');

            const maxCapital = Number(capital.dataset.capitalMax);
            const minCapital = Number(capital.dataset.capitalMin);
            const priceObject = containerAdd.querySelector('.filter-dropdown--mortgage-calc');
            const meternalCapitalSlider = meternalCapital.querySelector('.filter-range-one__inner').noUiSlider;

            const capitalPrc = meternalCapital.querySelector('.filter-range-one__nav > span');

            priceObject.querySelectorAll('.filter-range-one__inner').forEach(item => {
                item.noUiSlider.on('update', (values) => {
                    if (item.classList.contains('_init')) {
                        const value = parseInt(values[0]);
                        if (priceObject.dataset.name === 'Стоимость недвижимости') {
                            const valueMax = value * 90 / 100;
                            meternalCapitalSlider.updateOptions({
                                start: 0,
                                range: {
                                    min: 0,
                                    max: valueMax
                                }
                            })
                        }
                        if (priceObject.dataset.name === 'Размер платежа') {
                            const priceObjectValue = +containerAdd.querySelector('.filter-dropdown--mortgage-calc .filter-dropdown__item.active input').value.replace(/\s/g, '');
                            const term = +containerAdd.querySelector('.object-calc-mort__term .filter-range-one__nav input').value.trim();
                            const initialFee = containerAdd.querySelector('.object-calc-mort__contribution .filter-range-one__nav input').value.trim().replace(/\s/g, '');
                            const prc = containerAdd.querySelector('.field-static .field-static__text').textContent;
                            const prcValue = (prc.replace('от ', '').replace('%', '').replace(',', '.').trim());
                            const value = Number(getPayment2(priceObjectValue, initialFee, term, prcValue).replace(/\s/g, ''));

                            const valueMax = value * 90 / 100;
                            meternalCapitalSlider.updateOptions({
                                start: 0,
                                range: {
                                    min: 0,
                                    max: valueMax
                                }
                            })
                        }
                        priceObject.setAttribute('data-value', value);
                        updateMatCapital();
                        if (checkbox.checked) {
                            updateFee();
                        }
                        validateObjectPrice();
                    }
                });
                const input = item.closest('.filter-dropdown__item').querySelector('input');
                setTimeout(() => {
                    item.classList.add('_init');
                    validateRemoveError(priceObject);
                }, 2);
            })
            priceObject.querySelectorAll('.filter-dropdown__checkbox').forEach(item => {
                item.addEventListener('click', () => {
                    labelClearBtnUpdate(capitalInput.closest('.input-text'));
                    labelClearBtnUpdate(facilitiesInput.closest('.input-text'));
                    priceObject.setAttribute('data-value', item.closest('.filter-dropdown__item').querySelector('input').value.replace(/\s/g, ''));
                    validate();
                    resultMortgage();
                })
            })


            meternalCapitalSlider.on('update', (value) => {
                if (priceObject.classList.contains('_init')) {
                    if (!validateObjectPrice()) {
                        return;
                    };
                    const valueMax = meternalCapitalSlider.options.range.max;
                    const result = parseInt(value[0]) * 90 / valueMax;
                    capitalPrc.textContent = `${Math.floor(result)}%`;
                    labelClearBtnUpdate(capitalInput.closest('.input-text'));
                    labelClearBtnUpdate(facilitiesInput.closest('.input-text'));
                    resultMortgage();
                }
            })

            meternalCapital.querySelector('.filter-range-one').style.pointerEvents = 'none';
            setTimeout(() => {
                priceObject.classList.add('_init');
            }, 2);

            checkbox.addEventListener('change', () => {
                if (!validateObjectPrice()) {
                    checkbox.checked = false;
                    return;
                }
                if (checkbox.checked) {
                    capital.removeAttribute('hidden');
                    facilities.removeAttribute('hidden');
                    meternalCapital.querySelector('.filter-range-one').classList.add('_disabled');
                } else {
                    capital.setAttribute('hidden', '');
                    facilities.setAttribute('hidden', '');
                    meternalCapital.querySelector('.filter-range-one').classList.remove('_disabled');
                }

                labelClearBtnUpdate(capitalInput.closest('.input-text'));
                labelClearBtnUpdate(facilitiesInput.closest('.input-text'));
                updateMatCapital();
                if (checkbox.checked) {
                    updateFee();
                } else {
                    meternalCapital.querySelector('.filter-range-one__inner').noUiSlider.set(0);
                }
                validate();
                resultMortgage();
            });

            [capitalInput, facilitiesInput].forEach(input => {
                input.addEventListener('input', () => {
                    if (!validateObjectPrice()) return;
                    labelClearBtnUpdate(input.closest('.input-text'));
                    updateFee();
                    validate();
                    resultMortgage();
                })

                const clearBtn = input.closest('.input-text__label').querySelector('.input-text__clear')
                if (clearBtn) {
                    clearBtn.addEventListener('click', () => {
                        if (!clearBtn.hasAttribute('hidden')) {
                            clearBtn.setAttribute('hidden', '');
                            input.value = '';
                            labelClearBtnUpdate(input.closest('.input-text'));
                            updateFee();
                            validate();
                            resultMortgage();
                        }
                    })
                }
            });

            function labelClearBtnUpdate(label) {
                const input = label.querySelector('.input-text__input');
                const btn = label.querySelector('.input-text__clear');
                if (input.value === '') {
                    btn.setAttribute('hidden', '');
                    label.classList.remove('_clear-btn');

                    label.classList.remove('_active');
                } else {
                    btn.removeAttribute('hidden');
                    label.classList.add('_clear-btn');
                }
            }

            function updateMatCapital() {
                validateRemoveError(capital);
                validateRemoveError(facilities);
                let contributionValue = Number(contributionInput.value.replace(/\s/g, ''));
                capital.classList.remove('_active');
                facilities.classList.remove('_active');
                if (contributionValue < minCapital) {
                    capitalInput.value = numberReplace(String(minCapital));
                    capital.classList.add('_active');
                    return;
                }
                if (contributionValue >= minCapital) {
                    capital.classList.add('_active');
                    facilities.classList.add('_active');
                    capitalInput.value = numberReplace(String(minCapital));
                    facilitiesInput.value = numberReplace(String(contributionValue - minCapital));
                    return;
                }
            }

            function updateFee() {
                setTimeout(() => {
                    const capitalValue = capitalInput.value.replace(/\s/g, '');
                    const facilitiesValue = facilitiesInput.value.replace(/\s/g, '');
                    meternalCapitalSlider.set(+capitalValue + +facilitiesValue);
                }, 100);
            }

            function validate() {
                let result = true;

                validateRemoveError(capital);
                validateRemoveError(facilities);

                if (Number(capitalInput.value.replace(/\s/g, '')) > maxCapital) {
                    validateCreateError(capital, `${capital.dataset.errorCapitalMax}`);
                }
                if (Number(capitalInput.value.replace(/\s/g, '')) < minCapital) {
                    validateCreateError(capital, `${capital.dataset.errorCapitalMin}`);
                }

                const sum = Number(capitalInput.value.replace(/\s/g, '')) + Number(facilitiesInput.value.replace(/\s/g, ''));
                if (priceObject.dataset.name === 'Стоимость недвижимости') {
                    if (sum > Number(priceObject.dataset.value) * 90 / 100) {
                        validateCreateError(facilities, 'Первоначальный взнос не может быть больше 90% от стоимости недвижимости');
                        result = false;
                    }
                }
                if (priceObject.dataset.name === 'Размер платежа') {
                    const priceObjectValue = +containerAdd.querySelector('.filter-dropdown--mortgage-calc').dataset.value;
                    const term = +containerAdd.querySelector('.object-calc-mort__term .filter-range-one__nav input').value.trim();
                    const initialFee = containerAdd.querySelector('.object-calc-mort__contribution .filter-range-one__nav input').value.trim().replace(/\s/g, '');
                    const prc = containerAdd.querySelector('.field-static .field-static__text').textContent;
                    const prcValue = (prc.replace('от ', '').replace('%', '').replace(',', '.').trim());
                    const value = Number(getPayment2(priceObjectValue, initialFee, term, prcValue).replace(/\s/g, ''));
                    if (sum > value * 90 / 100) {
                        validateCreateError(facilities, 'Первоначальный взнос не может быть больше 90% от стоимости недвижимости');
                        result = false;
                    }
                }

                return result;
            }

            function validateObjectPrice() {
                validateRemoveError(priceObject);
                if (priceObject.dataset.name === 'Стоимость недвижимости') {
                    if (priceObject.dataset.value < 200000) {
                        validateCreateError(priceObject, 'Стоимость не может быть меньше 200 000 ₽');
                        meternalCapital.querySelector('.filter-range-one').style.pointerEvents = 'none';
                        return false;
                    } else {
                        meternalCapital.querySelector('.filter-range-one').style.pointerEvents = 'all';
                        return true;
                    }
                }
                if (priceObject.dataset.name === 'Размер платежа') {
                    if (priceObject.dataset.value < 15000) {
                        validateCreateError(priceObject, 'Размер платежа не может быть меньше 15 000 ₽');
                        meternalCapital.querySelector('.filter-range-one').style.pointerEvents = 'none';
                        return false;
                    } else {
                        meternalCapital.querySelector('.filter-range-one').style.pointerEvents = 'all';
                        return true;
                    }
                }
            }
            const targetCredit = containerAdd.querySelector('.object-calc-mort__target-credit');
            const targetCreditMap = {
                'Квартира в новостройке': [
                    [1, 2, 3, 4, 5],
                    [5]
                ],
                'Квартира на вторичном рынке': [
                    [1, 4],
                    [1]
                ],
                'Дом или пенхаус': [
                    [2, 4, 3, 5, 6],
                    [5]
                ],
                'Земельный участок': [
                    [2, 4, 3, 5, 6],
                    [5]
                ],
                'Комната': [
                    [1],
                    [1]
                ],
                'Коммерческая недвижимость': [
                    [1],
                    [1]
                ],
                'Гараж,машино-место или кладовая': [
                    [1],
                    [1]
                ],
            };
            targetCredit.addEventListener('change', () => {
                const name = targetCredit.querySelector('.choices__item.choices__item--selectable').textContent.trim();
                const list = containerAdd.querySelector('.object-calc-mort__list')
                const cards = containerAdd.querySelectorAll('.object-calc-mort__btn');
                cards.forEach(card => card.setAttribute('hidden', ''));
                cards.forEach(card => card.classList.remove('_active'));
                for (let key in targetCreditMap) {
                    if (key === name) {
                        const currentKey = targetCreditMap[key];
                        cards.forEach(card => {
                            const id = card.dataset.mortgageCard;
                            if (currentKey[0].includes(+id)) {
                                card.removeAttribute('hidden');
                            }
                            if (currentKey[1].includes(+id)) {
                                card.classList.add('_active');
                            }
                        });
                    }
                }

                let listValue = true;
                for (let key of cards) {
                    if (key.classList.contains('_active')) {
                        listValue = false;
                        break;
                    }
                }
                listValue ? list.setAttribute('hidden', '') : list.removeAttribute('hidden');

                cards.forEach(card => {
                    if (!card.hasAttribute('hidden') && card.classList.contains('_active')) {
                        const textPrc = containerAdd.querySelector('.field-static__text');
                        textPrc.textContent = card.querySelector('span:nth-child(2)').textContent.trim();
                    }
                })

                resultMortgage();
            })

            const term = containerAdd.querySelector('.object-calc-mort__term');
            term.querySelector('.filter-range-one__inner').noUiSlider.on('update', (value) => {
                if (!priceObject.classList.contains('_init')) {
                    return;
                }

                if (priceObject.dataset.name === 'Стоимость недвижимости') {
                    const valueMax = priceObject.dataset.value * 90 / 100;
                    meternalCapitalSlider.updateOptions({
                        start: 0,
                        range: {
                            min: 0,
                            max: valueMax
                        }
                    })
                }
                if (priceObject.dataset.name === 'Размер платежа') {
                    const priceObjectValue = +containerAdd.querySelector('.filter-dropdown--mortgage-calc .filter-dropdown__item.active input').value.replace(/\s/g, '');
                    const term = +containerAdd.querySelector('.object-calc-mort__term .filter-range-one__nav input').value.trim();
                    const initialFee = containerAdd.querySelector('.object-calc-mort__contribution .filter-range-one__nav input').value.trim().replace(/\s/g, '');
                    const prc = containerAdd.querySelector('.field-static .field-static__text').textContent;
                    const prcValue = (prc.replace('от ', '').replace('%', '').replace(',', '.').trim());
                    const value = Number(getPayment2(priceObjectValue, initialFee, term, prcValue).replace(/\s/g, ''));

                    const valueMax = value * 90 / 100;
                    meternalCapitalSlider.updateOptions({
                        start: 0,
                        range: {
                            min: 0,
                            max: valueMax
                        }
                    })
                }
            })
        }
    }
};


export default mortgage;
