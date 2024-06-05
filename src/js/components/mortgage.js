import {
    validateRemoveError,
    validateCreateError
} from './formValidate';
import numberReplace from "../modules/numberReplace";
import debounce from '../functions/debounce';

import noUiSlider from "nouislider";
import Cleave from 'cleave.js';


export const mortgageCalc = (container) => {
    if (!container) return;

    // изменение цель кредита меняет программы

    class MortgageCalc {
        constructor() {
            this.dataClass = new Data();
            this.data = this.dataClass.getData();
            this.dataClass.setData({});

            this.programs(this.data);
            this.maternalCapital();
            this.updateResultsView();

            this.initFields();

            document.addEventListener('mortgageCalcFormUpdate', (e) => {
                this.dataClass.setData(e.detail);
                this.data = this.dataClass.getData();

                this.updateFormAndSliders(this.data);
                this.updateResultsView();
                // console.log(this.data);
            })

        }

        programs() {
            container.addEventListener('click', (e) => {
                const target = e.target;
                const btn = target.closest('[data-mortgage-btn]');
                if (!btn) return;

                this.dataClass.btns.forEach(btn => btn.classList.remove('_active'));
                btn.classList.add('_active');

                updateForm(btn, {
                    onUpdate: 'changeProgram',
                    selectedProgram: {
                        name: btn.dataset.mortgageBtn.split(',')[0].trim(),
                        value: +btn.dataset.mortgageBtn.split(',')[1].trim()
                    }
                });
            })
        }

        initFields() {
            const costInputEl = container.querySelector('[data-mortgage="cost-input"]');
            const costRangeEl = container.querySelector('[data-mortgage="cost-range"]');
            this.costInput = costInput(this.data, costInputEl);
            this.costRange = costRange(this.data, costRangeEl);


            const termInputEl = container.querySelector('[data-mortgage="term-input"]');
            const termRangeEl = container.querySelector('[data-mortgage="term-range"]');
            this.termInput = termInput(this.data, termInputEl);
            this.termRange = termRange(this.data, termRangeEl);

            const paymentInputEl = container.querySelector('[data-mortgage="payment-input"]');
            const paymentRangeEl = container.querySelector('[data-mortgage="payment-range"]');
            this.paymentInput = paymentInput(this.dataClass, paymentInputEl);
            this.paymentRange = paymentRange(this.dataClass, paymentRangeEl);
        }

        updateFormAndSliders(data) {
            if (this.data.onUpdate !== 'costInput') {
                this.costInput.setRawValue(data.cost);
            }

            if (this.data.onUpdate !== 'costRange') {
                this.costRange.noUiSlider.set(data.cost);
            }

            if (this.data.onUpdate !== 'termInput') {
                this.termInput.setRawValue(data.time);
            }

            if (this.data.onUpdate !== 'termRange') {
                this.termRange.noUiSlider.set(data.time);
            }



            if (this.data.onUpdate !== 'paymentInput') {
                this.paymentInput.setRawValue(Math.round(data.payment));
            }

            if (this.data.onUpdate !== 'paymentRange') {
                this.paymentRange.noUiSlider.set(data.paymentPrc * 100);
            }


        }

        updateResultsView() {
            const programPrc = container.querySelector('[data-mortgage="program-prc"]');
            if (programPrc) {
                programPrc.textContent = `${this.data.selectedProgram.value * 100}%`;
            }

            const paymentPrc = container.querySelector('[data-mortgage="payment-prc"]');
            if (paymentPrc) {
                paymentPrc.textContent = `${Math.round(this.data.paymentPrc * 100)}%`;
            }


        }


        maternalCapital() {
            const checkbox = container.querySelector('[data-mortgage="maternal-capital-checkbox"]');
            const input = container.querySelector('[data-mortgage="maternal-capital-input"]');
            if (!(checkbox && input)) return;
            checkbox.addEventListener('change', handlerToggleInput.bind(this));

            function handlerToggleInput() {
                if (checkbox.checked) {
                    input.removeAttribute('hidden');
                } else {
                    input.setAttribute('hidden', '');
                }
                updateForm(checkbox, {
                    maternalCapitalStatus: !this.data.maternalCapitalStatus,
                    onUpdate: 'maternalCapital'
                });
            }
        }
    }


    class Data {
        constructor() {
            this.data = {
                selectedProgram: null,
                cost: 10000000,
                minPrice: 375000,
                maxPrice: 100000000,
                paymentPrc: 0.5,
                minPaymentPrc: 0.15,
                maxPaymentPrc: 0.9,
                payment: 0,
                getMinPayment: function() {
                    return this.cost * this.minPaymentPrc;
                },
                getMaxPayment: function() {
                    return this.cost * this.maxPaymentPrc;
                },
                programs: {},
                minYear: 1,
                maxYear: 30,
                time: 10,

                setDefaultPayment() {
                    this.payment = this.cost * this.paymentPrc;
                },
                maternalCapitalStatus: false,
            };
            this.data.setDefaultPayment();

            this.btns = Array.from(container.querySelectorAll('[data-mortgage-btn]'));
            this.data.programs = this.btns.reduce((acc, item) => {
                const map = item.dataset.mortgageBtn.split(',');
                return {
                    ...acc,
                    [map[0].trim()]: +map[1].trim()
                }
            }, {})

            const activeBtn = this.btns.find(btn => btn.classList.contains('_active'));

            this.data.selectedProgram = {
                name: activeBtn.dataset.mortgageBtn.split(',')[0].trim(),
                value: +activeBtn.dataset.mortgageBtn.split(',')[1].trim()
            };
        }

        getData() {
            return { ...this.data };
        }

        setData(newData) {
            if (newData.onUpdate === 'costInput' || newData.onUpdate === 'costRange') {

                if (newData.cost < this.data.minPrice) {
                    newData.cost = this.data.minPrice;
                }

                if (newData.cost > this.data.maxPrice) {
                    newData.cost = this.data.maxPrice;
                }

                if (this.data.payment > this.data.maxPaymentPrc * newData.cost) {
                    this.data.payment = this.data.maxPaymentPrc * newData.cost;
                }

                if (this.data.payment < this.data.minPaymentPrc * newData.cost) {
                    this.data.payment = this.data.minPaymentPrc * newData.cost;
                }

                this.data.paymentPrc = (this.data.payment * 100) / newData.cost / 100; 

                if (this.getData().paymentPrc > this.getData().maxPaymentPrc) {
                    this.data.paymentPrc = this.getData().maxPaymentPrc;
                }
                
                if (this.getData().paymentPrc < this.getData().minPaymentPrc) {
                    this.data.paymentPrc = this.getData().minPaymentPrc;
                }

                // if (this.getData().payment > this.getData().getMaxPayment()) {
                //     this.data.payment = this.getData().getMaxPayment();
                // }

                // if (this.getData().payment < this.getData().getMinPayment()) {
                //     this.data.payment = this.getData().getMinPayment();
                // }

                // this.data.paymentPrc = (this.getData().payment * 100) / newData.cost / 100;


            

              

            }

            if (newData.onUpdate === 'termInput') {
                if (newData.time > this.data.maxYear) {
                    newData.time = this.data.maxYear;
                }
                if (newData.time < this.data.minYear) {
                    newData.time = this.data.minYear;
                }
            }



            if (newData.onUpdate === 'paymentInput') {
                newData.paymentPrc = (newData.payment * 100) / this.data.cost / 100;

                if (newData.paymentPrc > this.data.maxPaymentPrc) {
                    newData.paymentPrc = this.data.maxPaymentPrc;
                    newData.payment = this.data.cost * this.data.maxPaymentPrc;
                }
                if (newData.paymentPrc < this.data.minPaymentPrc) {
                    newData.paymentPrc = this.data.minPaymentPrc;
                    newData.payment = this.data.cost * this.data.minPaymentPrc;
                }
            }

            if (newData.onUpdate === 'paymentRange') {
                newData.paymentPrc = newData.paymentPrc / 100;
                this.data.payment = this.data.cost * newData.paymentPrc;
            }



            this.data = {
                ...this.data,
                ...newData
            }
        }

    }

    return new MortgageCalc();
};


function costInput(data, el) {
    if (!el) return;

    const cleaveInput = new Cleave(el, settingsCleaveInput);
    cleaveInput.setRawValue(data.cost);

    el.addEventListener('input', inputUpdateModel);
    el.addEventListener('change', handleInputChange);

    function handleInputChange() {
        const value = +cleaveInput.getRawValue();

        if (value > data.maxPrice) {
            cleaveInput.setRawValue(data.maxPrice);
        }

        if (value < data.minPrice) {
            cleaveInput.setRawValue(data.minPrice);
        }

        inputUpdateModel();
    }

    function inputUpdateModel() {
        updateForm(el, {
            cost: +cleaveInput.getRawValue(),
            onUpdate: 'costInput'
        });
    }

    return cleaveInput;
}

function costRange(data, el) {
    if (!el) return;

    noUiSlider.create(el, {
        start: data.cost,
        connect: 'lower',
        step: 100000,
        range: {
            min: data.minPrice,
            '1%': [400000, 100000],
            '50%': [10000000, 500000],
            max: data.maxPrice
        },
    });

    el.noUiSlider.on('slide', function() {
        const sliderValue = parseInt(String(this.get().split('.')[0].replace(/ /g, '')));
        updateForm(el, {
            cost: sliderValue,
            onUpdate: 'costRange',
        });
    })

    return el;
}


function termInput(data, el) {
    if (!el) return;

    const cleaveInput = new Cleave(el, settingsCleaveInput);
    cleaveInput.setRawValue(data.time);

    el.addEventListener('input', inputUpdateModel);
    el.addEventListener('change', handleInputChange);

    function handleInputChange() {
        const value = +cleaveInput.getRawValue();

        if (value > data.maxYear) {
            cleaveInput.setRawValue(data.maxYear);
        }

        if (value < data.minYear) {
            cleaveInput.setRawValue(data.minYear);
        }

        inputUpdateModel();
    }

    function inputUpdateModel() {
        updateForm(el, {
            time: +cleaveInput.getRawValue(),
            onUpdate: 'termInput'
        });
    }

    return cleaveInput;
}

function termRange(data, el) {
    if (!el) return;

    noUiSlider.create(el, {
        start: data.time,
        connect: 'lower',
        step: 1,
        range: {
            min: data.minYear,
            max: data.maxYear
        },
    });

    el.noUiSlider.on('slide', function() {
        const sliderValue = parseInt(String(this.get().split('.')[0].replace(/ /g, '')));

        updateForm(el, {
            time: sliderValue,
            onUpdate: 'termRange',
        });

    })

    return el;
}

function paymentInput(data, el) {
    if (!el) return;

    const cleaveInput = new Cleave(el, settingsCleaveInput);
    cleaveInput.setRawValue(data.getData().payment);

    el.addEventListener('input', inputUpdateModel);
    el.addEventListener('change', handleInputChange);

    function handleInputChange() {
        const value = +cleaveInput.getRawValue();

        if (value > data.getData().getMaxPayment()) {
            cleaveInput.setRawValue(data.getData().getMaxPayment());
        }

        if (value < data.getData().getMaxPayment()) {
            cleaveInput.setRawValue(data.getData().getMinPayment());
        }

        inputUpdateModel();
    }

    function inputUpdateModel() {
        updateForm(el, {
            payment: +cleaveInput.getRawValue(),
            onUpdate: 'paymentInput'
        });
    }

    return cleaveInput;

}

function paymentRange(data, el) {
    if (!el) return;

    noUiSlider.create(el, {
        start: data.getData().paymentPrc * 100,
        connect: 'lower',
        step: 1,
        range: {
            min: data.getData().minPaymentPrc * 100,
            max: data.getData().maxPaymentPrc * 100,
        },
    });

    el.noUiSlider.on('slide', function() {
        const sliderValue = parseInt(String(this.get().split('.')[0].replace(/ /g, '')));

        updateForm(el, {
            paymentPrc: sliderValue,
            onUpdate: 'paymentRange',
        });

    })

    return el;
}




function updateForm(element, data) {
    element.dispatchEvent(new CustomEvent('mortgageCalcFormUpdate', {
        bubbles: true,
        detail: {
            ...data
        },
    }))
}






const settingsCleaveInput = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: ' '
}













// export const mortgage = () => {
//     const containerOne = document.querySelector('.object-calc-mort--one');
//     const popupContainerOne = document.querySelector('.popup-primary--interest-rate-1 .interest-rate');

//     const containerAdd = document.querySelector('.object-calc-mort--add');
//     const popupContainerAdd = document.querySelector('.popup-primary--interest-rate-2 .interest-rate--add');

//     const siteContainer = document.querySelector('.site-container--mortgage');
//     const selectBank = document.querySelector('.select-bank');

//     if (containerAdd && popupContainerAdd) {
//         const list = containerAdd.querySelector('.object-calc-mort__list');
//         const listPopup = popupContainerAdd.querySelector('.interest-rate__wrapper');
//         const items = list.querySelectorAll('[data-mortgage-card]');
//         const itemsPopup = listPopup.querySelectorAll('[data-mortgage-card]');
//         const textPrc = containerAdd.querySelector('.field-static__text');

//         list.addEventListener('click', (e) => {
//             toggleClass(e, items, itemsPopup, items);
//         })

//         listPopup.addEventListener('click', (e) => {
//             toggleClass(e, itemsPopup, items, items);
//         })

//         function toggleClass(e, containerOne, containerTwo, container) {
//             const target = e.target ? e.target : e;
//             const item = target.closest('[data-mortgage-card]');
//             if (!item) return;
//             containerOne.forEach(item => item.classList.remove('_active'));
//             item.classList.add('_active');
//             containerTwo.forEach(el => {
//                 +item.dataset.mortgageCard === +el.dataset.mortgageCard ? el.classList.add('_active') : el.classList.remove('_active');
//             });
//             container.forEach(el => {
//                 if (+item.dataset.mortgageCard === +el.dataset.mortgageCard) {
//                     const prc = el.querySelector('span:nth-child(2)').textContent;
//                     textPrc.textContent = prc;
//                 }
//             })

//             // ПРИМЕР
//             if (siteContainer) {
//                 const mortgageSuitable = siteContainer.querySelector('.mortgage-suitable');
//                 const mortgageSuitableYes = siteContainer.querySelector('[data-mortgage-suitable="yes"]');
//                 const mortgageSuitableNo = siteContainer.querySelector('[data-mortgage-suitable="no"]');
//                 if (item.dataset.mortgageCard == 4) {
//                     mortgageSuitableYes.querySelectorAll('.mortgage-suitable__item').forEach((item, index) => {
//                         if (index !== 0) item.setAttribute('hidden', '');
//                     })
//                     mortgageSuitableNo.removeAttribute('hidden');
//                     mortgageSuitableNo.querySelectorAll('.mortgage-suitable__item').forEach(item => {
//                         item.removeAttribute('hidden');
//                     })
//                 } else {
//                     mortgageSuitableNo.setAttribute('hidden', '');
//                     mortgageSuitableYes.querySelectorAll('.mortgage-suitable__item').forEach(item => {
//                         item.removeAttribute('hidden');
//                     })
//                 }
//                 // mortgageSuitable.classList.add('_load');
//                 // setTimeout(() => {
//                 //         mortgageSuitable.classList.remove('_load');
//                 // }, 2000);
//             }
//         }
//     }
//     if (containerOne && popupContainerOne) {
//         const items = popupContainerOne.querySelectorAll('.interest-rate-card');
//         items.forEach(item => {
//             item.addEventListener('click', () => {

//                 items.forEach(item => item.classList.remove('_active'));
//                 item.classList.add('_active');

//                 const prc = item.querySelector('.interest-rate-card__prc--new').textContent;
//                 const textPrc = containerOne.querySelector('.field-static__text');
//                 textPrc.textContent = prc;
//             });
//         })
//     }
//     if (containerAdd) {
//         const meternalCapital = containerAdd.querySelector('.object-calc-mort__contribution');
//         if (meternalCapital) {

//             const contributionInput = meternalCapital.querySelector('input');
//             const checkbox = meternalCapital.querySelector('.toggle-checkbox input');
//             const capital = containerAdd.querySelector('.object-calc-mort__capital');
//             const facilities = containerAdd.querySelector('.object-calc-mort__facilities');

//             const capitalInput = capital.querySelector('.input-text__input');
//             const facilitiesInput = facilities.querySelector('.input-text__input');

//             const maxCapital = Number(capital.dataset.capitalMax);
//             const minCapital = Number(capital.dataset.capitalMin);
//             const priceObject = containerAdd.querySelector('.filter-dropdown--mortgage-calc');
//             const meternalCapitalSlider = meternalCapital.querySelector('.filter-range-one__inner').noUiSlider;

//             const capitalPrc = meternalCapital.querySelector('.filter-range-one__nav > span');
//             const priceObjectSlider = priceObject.querySelector('.filter-range-one__inner');
//             priceObjectSlider.noUiSlider.on('update', (values) => {
//                 const value = parseInt(values[0]);
//                 const valueMax = value * 90 / 100;
//                 meternalCapitalSlider.updateOptions({
//                     start: 0,
//                     range: {
//                         min: 0,
//                         max: valueMax
//                     }
//                 })
//                 priceObject.setAttribute('data-value', value);
//                 updateMatCapital();
//                 if (checkbox.checked) {
//                     updateFee();
//                 }
//                 validateObjectPrice();
//             });

//             priceObject.querySelectorAll('.filter-dropdown__checkbox').forEach(item => {
//                 item.addEventListener('click', () => {
//                     labelClearBtnUpdate(capitalInput.closest('.input-text'));
//                     labelClearBtnUpdate(facilitiesInput.closest('.input-text'));
//                     priceObject.setAttribute('data-value', item.closest('.filter-dropdown__item').querySelector('input').value.replace(/\s/g, ''));
//                     validate();
//                 })
//             })


//             meternalCapitalSlider.on('update', (value) => {
//                 if (!validateObjectPrice()) {
//                     return;
//                 };
//                 const valueMax = meternalCapitalSlider.options.range.max;
//                 const result = parseInt(value[0]) * 90 / valueMax;
//                 capitalPrc.textContent = `${Math.floor(result)}%`;
//                 labelClearBtnUpdate(capitalInput.closest('.input-text'));
//                 labelClearBtnUpdate(facilitiesInput.closest('.input-text'));
//             })

//             checkbox.addEventListener('change', () => {
//                 if (!validateObjectPrice()) {
//                     checkbox.checked = false;
//                     return;
//                 }
//                 if (checkbox.checked) {
//                     capital.removeAttribute('hidden');
//                     facilities.removeAttribute('hidden');
//                     meternalCapital.querySelector('.filter-range-one').classList.add('_disabled');
//                 } else {
//                     capital.setAttribute('hidden', '');
//                     facilities.setAttribute('hidden', '');
//                     meternalCapital.querySelector('.filter-range-one').classList.remove('_disabled');
//                 }

//                 labelClearBtnUpdate(capitalInput.closest('.input-text'));
//                 labelClearBtnUpdate(facilitiesInput.closest('.input-text'));
//                 updateMatCapital();
//                 if (checkbox.checked) {
//                     updateFee();
//                 } else {
//                     meternalCapital.querySelector('.filter-range-one__inner').noUiSlider.set(0);
//                 }
//                 validate();
//             });

//             [capitalInput, facilitiesInput].forEach(input => {
//                 input.addEventListener('input', () => {
//                     if (!validateObjectPrice()) return;
//                     labelClearBtnUpdate(input.closest('.input-text'));
//                     updateFee();
//                     validate();
//                 })

//                 const clearBtn = input.closest('.input-text__label').querySelector('.input-text__clear')
//                 if (clearBtn) {
//                     clearBtn.addEventListener('click', () => {
//                         if (!clearBtn.hasAttribute('hidden')) {
//                             clearBtn.setAttribute('hidden', '');
//                             input.value = '';
//                             labelClearBtnUpdate(input.closest('.input-text'));
//                             updateFee();
//                             validate();
//                         }
//                     })
//                 }
//             });

//             function labelClearBtnUpdate(label) {
//                 const input = label.querySelector('.input-text__input');
//                 const btn = label.querySelector('.input-text__clear');
//                 if (input.value === '') {
//                     btn.setAttribute('hidden', '');
//                     label.classList.remove('_clear-btn');

//                     label.classList.remove('_active');
//                 } else {
//                     btn.removeAttribute('hidden');
//                     label.classList.add('_clear-btn');
//                 }
//             }

//             function updateMatCapital() {
//                 validateRemoveError(capital);
//                 validateRemoveError(facilities);
//                 let contributionValue = Number(contributionInput.value.replace(/\s/g, ''));
//                 capitalInput.value = 0;
//                 facilitiesInput.value = 0;
//                 capital.classList.remove('_active');
//                 facilities.classList.remove('_active');
//                 if (contributionValue > 0) {
//                     capitalInput.value = numberReplace(String(minCapital));
//                     facilitiesInput.value = numberReplace(String(contributionValue))
//                     capital.classList.add('_active');
//                     facilities.classList.add('_active');
//                     return;
//                 } else {
//                     capitalInput.value = numberReplace(String(minCapital));
//                     capital.classList.add('_active');
//                 }
//             }

//             function updateFee() {
//                 setTimeout(() => {
//                     const capitalValue = capitalInput.value.replace(/\s/g, '');
//                     const facilitiesValue = facilitiesInput.value.replace(/\s/g, '');
//                     meternalCapitalSlider.set(+capitalValue + +facilitiesValue);
//                 }, 100);
//             }

//             function validate() {
//                 let result = true;

//                 validateRemoveError(capital);
//                 validateRemoveError(facilities);

//                 if (Number(capitalInput.value.replace(/\s/g, '')) > maxCapital) {
//                     validateCreateError(capital, `${capital.dataset.errorCapitalMax}`);
//                 }
//                 if (Number(capitalInput.value.replace(/\s/g, '')) < minCapital) {
//                     validateCreateError(capital, `${capital.dataset.errorCapitalMin}`);
//                 }

//                 const sum = Number(capitalInput.value.replace(/\s/g, '')) + Number(facilitiesInput.value.replace(/\s/g, ''));
//                 if (sum > Number(priceObject.dataset.value) * 90 / 100) {
//                     validateCreateError(facilities, 'Первоначальный взнос не может быть больше 90% от стоимости недвижимости');
//                     result = false;
//                 }

//                 return result;
//             }

//             function validateObjectPrice() {
//                 validateRemoveError(priceObject);
//                 if (priceObject.dataset.value < 200000) {
//                     validateCreateError(priceObject, 'Стоимость не может быть меньше 200 000 ₽');
//                     return false;
//                 } else {
//                     return true;
//                 }
//             }
//             const targetCredit = containerAdd.querySelector('.object-calc-mort__target-credit');
//             const targetCreditMap = {
//                 'Не выбрано': [
//                     [1, 2, 3, 4, 5, 6],
//                     [1]
//                 ],
//                 'Новостройки': [
//                     [1, 2, 3, 4, 5],
//                     [1]
//                 ],
//                 'Вторичка': [
//                     [1, 4],
//                     [1]
//                 ],
//                 'Дом, коттеджи, дачи': [
//                     [1, 2, 3, 4, 5, 6],
//                     [5]
//                 ],
//                 'Земельные участки': [
//                     [1, 2, 3, 5, 6],
//                     [1]
//                 ],
//                 'Коммерческая недвижимость': [
//                     [1],
//                     [1]
//                 ],
//             };
//             targetCredit.addEventListener('change', () => {
//                 const name = targetCredit.querySelector('.choices__item.choices__item--selectable').textContent.trim();
//                 const list = containerAdd.querySelector('.object-calc-mort__list')
//                 const cards = containerAdd.querySelectorAll('.object-calc-mort__btn');
//                 cards.forEach(card => card.setAttribute('hidden', ''));
//                 cards.forEach(card => card.classList.remove('_active'));
//                 for (let key in targetCreditMap) {
//                     if (key === name) {
//                         const currentKey = targetCreditMap[key];
//                         cards.forEach(card => {
//                             const id = card.dataset.mortgageCard;
//                             if (currentKey[0].includes(+id)) {
//                                 card.removeAttribute('hidden');
//                             }
//                             if (currentKey[1].includes(+id)) {
//                                 card.classList.add('_active');
//                             }
//                         });
//                     }
//                 }

//                 let listValue = true;
//                 for (let key of cards) {
//                     if (key.classList.contains('_active')) {
//                         listValue = false;
//                         break;
//                     }
//                 }
//                 listValue ? list.setAttribute('hidden', '') : list.removeAttribute('hidden');

//                 cards.forEach(card => {
//                     if (!card.hasAttribute('hidden') && card.classList.contains('_active')) {
//                         const textPrc = containerAdd.querySelector('.field-static__text');
//                         textPrc.textContent = card.querySelector('span:nth-child(2)').textContent.trim();
//                     }
//                 })
//             })

//             const term = containerAdd.querySelector('.object-calc-mort__term');
//             term.querySelector('.filter-range-one__inner').noUiSlider.on('update', (value) => {
//                 if (!priceObject.classList.contains('_init')) {
//                     return;
//                 }
//             })

//             bankSelect('containerAdd');

//         }
//     }
//     if (selectBank) {
//         bankSelect('select-bank');
//     }

//     function bankSelect(mode) {
//         let container;
//         if (mode === 'containerAdd') container = document.querySelector('.mortgage-suitable__list');
//         if (mode === 'select-bank') container = selectBank;
//         if (!container) return;
//         const items = container.querySelectorAll('.bank-offer');
//         items.forEach(item => {
//             const btn = item.querySelector('.bank-offer__btn');
//             btn.addEventListener('click', () => {
//                 if (!btn.classList.contains('_disabled')) {
//                     if (!item.classList.contains('_active')) {
//                         item.classList.add('_active');
//                         btn.classList.add('_active');
//                         btn.setAttribute('title', 'Удалить');
//                         btn.innerHTML = `
//                         <svg>
//                             <use xlink:href="./img/sprite.svg#verif"></use>
//                         </svg>
//                         <svg>
//                             <use xlink:href="./img/sprite.svg#trash"></use>
//                         </svg>
//                         `
//                     } else {
//                         item.classList.remove('_active');
//                         btn.innerHTML = 'Выбрать';
//                         btn.removeAttribute('title');
//                         btn.classList.remove('_active');
//                     }
//                     const maxActiveItems = 4;
//                     const itemsActive = container.querySelectorAll('.bank-offer._active');

//                     const currentContainer = siteContainer || selectBank;
//                     const mortgageBottom = currentContainer.querySelector('.mortgage-bottom');
//                     currentContainer.style.paddingBottom = 'none'
//                     if (mortgageBottom) mortgageBottom.remove();
//                     if (itemsActive.length >= 1) {
//                         bankUpdate(items, itemsActive, maxActiveItems, currentContainer);
//                         currentContainer.style.paddingBottom = `${currentContainer.querySelector('.mortgage-bottom').offsetHeight}px`;
//                     } else {
//                         currentContainer.style.paddingBottom = null;
//                     }
//                     items.forEach(item => {
//                         const btn = item.querySelector('.bank-offer__btn');
//                         if (btn.classList.contains('_disabled')) {
//                             btn.classList.remove('_disabled');
//                             btn.removeAttribute('title');
//                         }
//                     })
//                 }

//             })
//         })
//     }

//     function bankUpdate(items, activeItems, maxBanks, siteContainer) {
//         let htmlImage = '';
//         activeItems.forEach(item => {
//             htmlImage += item.querySelector('.bank-offer__icon').innerHTML;
//         })
//         const htmlBottom = `
//         <div class="mortgage__bottom mortgage-bottom">
//             <div class="mortgage-bottom__container container">
//                 <div class="mortgage-bottom__info">
//                     <div class="mortgage-bottom__images">
//                         ${htmlImage}
//                     </div>
//                     <span>
//                         Вы выбрали ${activeItems.length} из ${maxBanks} возможных банков
//                     </span>
//                 </div>
//                 <button type="button" class="btn btn-reset btn-primary mortgage-bottom__btn">
//                     Создать заявку
//                 </button>
//             </div>
//         </div>
//         `;
//         if (activeItems.length === maxBanks) {
//             const notActiveItems = Array.prototype.slice.call(items, 0).filter(item => !item.classList.contains('_active'));
//             notActiveItems.forEach(item => {
//                 const btn = item.querySelector('.bank-offer__btn');
//                 btn.setAttribute('title', `Можно выбрать не больше ${maxBanks}`);
//                 btn.classList.add('_disabled');
//             })
//         }
//         siteContainer.insertAdjacentHTML('beforeend', htmlBottom);
//     }
// };