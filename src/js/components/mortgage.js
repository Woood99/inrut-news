import numberReplace from "../modules/numberReplace";
import { fixedNumber } from './bankOffer';

import noUiSlider from "nouislider";
import Cleave from 'cleave.js';


export const mortgageCalc = (container) => {
    if (!container) return;

    const targetCreditMap = {
        'default': [
            ['base', 'gov', 'it', 'military', 'family', 'rural'],
            'base'
        ],
        'buildings': [
            ['base', 'gov', 'it', 'military', 'family'],
            'base'
        ],
        'secondary': [
            ['base', 'military'],
            'base'
        ],
        'house': [
            ['base', 'gov', 'it', 'military', 'family', 'rural'],
            ['family']
        ],
        'plots': [
            ['base', 'gov', 'it', 'family', 'rural'],
            'base'
        ],
        'commercial': [
            ['base'],
            'base'
        ],
    };

    class MortgageCalc {
        constructor() {
            this.dataClass = new Data();
            this.data = this.dataClass.getData();
            this.dataClass.setData({});

            this.results = this.dataClass.getResults();

            this.programs(this.data);
            this.targetCreditChange(this.data);
            this.maternalCapital();
            this.updateResultsView();
            this.updateBanks();

            this.initFields();
            this.selectBanks();

            document.addEventListener('mortgageCalcFormUpdate', (e) => {
                this.dataClass.setData(e.detail);
                this.data = this.dataClass.getData();
                this.results = this.dataClass.getResults();

                this.updateFormAndSliders(this.data);
                this.updateResultsView();
                this.updateBanks();
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

        targetCreditChange() {
            const targetCredit = container.querySelector('[data-mortgage-target-credit]');
            targetCredit.addEventListener('change', (e) => {
                let btnActive = null;
                const value = e.detail.value;
                this.dataClass.btns.forEach(btn => btn.setAttribute('hidden', ''));
                this.dataClass.btns.forEach(btn => btn.classList.remove('_active'));
                for (let key in targetCreditMap) {
                    if (key === value) {
                        const currentKey = targetCreditMap[key];
                        this.dataClass.btns.forEach(btn => {
                            const btnValue = btn.dataset.mortgageBtn.split(',')[0].trim();
                            if (currentKey[0].includes(btnValue)) {
                                btn.removeAttribute('hidden');
                            }
                            if (currentKey[1].includes(btnValue)) {
                                btnActive = btn;
                                btn.classList.add('_active');
                            }
                        });
                    }
                }
                updateForm(btnActive, {
                    onUpdate: 'changeProgram',
                    selectedProgram: {
                        name: btnActive.dataset.mortgageBtn.split(',')[0].trim(),
                        value: +btnActive.dataset.mortgageBtn.split(',')[1].trim()
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

            const matercalCapitalEl = container.querySelector('[data-mortgage="matercal-capital-input"]');
            this.maternalCapitalInput = maternalCapitalInput(this.dataClass, matercalCapitalEl);
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

            if (this.data.onUpdate === 'maternalCapitalCheckbox' && !this.data.maternalCapitalStatus) {
                mortgageClass.paymentRange.noUiSlider.updateOptions({
                    start: this.paymentRange.noUiSlider.set(0),
                    range: {
                        min: this.data.minPaymentPrc * 100,
                        max: this.data.maxPaymentPrc * 100,
                    }
                })
         
                this.paymentInput.setRawValue(Math.round(data.payment));
            }

            if (this.data.onUpdate === 'maternalCapitalCheckbox' && this.data.maternalCapitalStatus) {
                mortgageClass.paymentRange.noUiSlider.updateOptions({
                    start: this.data.paymentPrc * 100,
                    range: {
                        min: this.data.maternalCapital / this.data.cost * 100,
                        max: this.data.maxPaymentPrc * 100,
                    }
                })
                this.maternalCapitalInput.setRawValue(this.data.maternalCapital);
                this.maternalCapitalInput.element.closest('.input-text').classList.add('_active');
            }

            if (this.data.onUpdate !== 'paymentRange') {
                this.paymentRange.noUiSlider.set(data.paymentPrc * 100);
            }

            if (this.data.onUpdate === 'maternalCapitalInput') {
                this.paymentRange.noUiSlider.updateOptions({
                    start: this.data.paymentPrc * 100,
                    range: {
                        min: this.data.maternalCapital / this.data.cost * 100,
                        max: this.data.maxPaymentPrc * 100,
                    }
                })
            }    
        }

        updateResultsView() {
            const programPrc = container.querySelector('[data-mortgage="program-prc"]');
            if (programPrc) {
                programPrc.textContent = `${(this.data.selectedProgram.value * 100).toFixed(1)}%`;
            }

            const paymentPrc = container.querySelector('[data-mortgage="payment-prc"]');
            if (paymentPrc) {
                paymentPrc.textContent = `${Math.round(this.data.paymentPrc * 100)}%`;
            }

            const resultPrc = container.querySelector('[data-mortgage-result="prc"]');
            if (resultPrc) {
                resultPrc.textContent = `от ${(this.data.selectedProgram.value * 100).toFixed(1)}%`;
            }

            const resultPayment = container.querySelector('[data-mortgage-result="payment"]');
            if (resultPayment) {
                const months = this.results.term * 12;
                const monthRate = this.data.selectedProgram.value / 12;
                const generalRate = (1 + monthRate) ** months;
                const monthPayment = (this.results.totalAmount * monthRate * generalRate) / (generalRate - 1);
                resultPayment.textContent = `${numberReplace(Math.round(monthPayment))} ₽`;
            }

            const resultCashback = container.querySelector('[data-mortgage-result="cashback"]');
            if (resultCashback) {
                const cashbackArr = Array.from(container.querySelectorAll('[data-bank-offer-cashback]')).map(item => item.dataset.bankOfferCashback);
                const maxCashback = Math.max(...cashbackArr);
                resultCashback.textContent = `до ${numberReplace(Math.round(this.results.totalAmount / 100 * maxCashback))} ₽`;
            }
        }

        maternalCapital() {
            const checkbox = container.querySelector('[data-mortgage="maternal-capital-checkbox"]');
            const field = container.querySelector('[data-mortgage="maternal-capital-field"]');
            if (!(checkbox && field)) return;
            checkbox.addEventListener('change', handlerToggleInput.bind(this));

            function handlerToggleInput() {
                if (checkbox.checked) {
                    field.removeAttribute('hidden');
                    updateForm(checkbox, {
                        maternalCapitalStatus: true,
                        maternalCapital: this.data.maternalCapitalMax,
                        payment: this.data.maternalCapitalMax,
                        paymentPrc: this.data.maternalCapitalMax / this.data.cost,
                        onUpdate: 'maternalCapitalCheckbox'
                    });
                } else {
                    field.setAttribute('hidden', '');
                    updateForm(checkbox, {
                        maternalCapitalStatus: false,
                        payment: 0,
                        paymentPrc: 0,
                        onUpdate: 'maternalCapitalCheckbox'
                    });
                }
            }
        }

        updateBanks() {
            const banks = container.querySelectorAll('.bank-offer');
            banks.forEach(bank => {
                updateBank.call(this, bank);
            })

            function updateBank(bank) {
                const cashback = bank.querySelector('[data-bank-offer="cashback"]');
                const currentCashback = bank.dataset.bankOfferCashback || 1;

                const termEl = bank.querySelector('[data-bank-offer="term"]');
                const sumEl = bank.querySelector('[data-bank-offer="sum"]');
                const paymentEl = bank.querySelector('[data-bank-offer="payment"]');
                let programPrc = bank.querySelector('[data-bank-offer-new-prc]').textContent || bank.querySelector('[data-bank-offer-default-prc]').textContent;
                programPrc = fixedNumber(programPrc);

                const results = { ...this.dataClass.getResults(), ...getResultsOnBank(this.dataClass.getResults(), programPrc) };
                if (sumEl) {
                    sumEl.textContent = `${numberReplace(results.totalAmount)} ₽`;
                }
                termEl.textContent = `${results.term} лет`;
                paymentEl.textContent = `${numberReplace(results.monthPayment)} ₽/мес`;
                cashback.textContent = `Кешбэк ${numberReplace(Math.round(results.totalAmount / 100 * currentCashback))} ₽`;
            }

            function getResultsOnBank({ term, totalAmount }, programPrc) {
                const months = term * 12;
                const monthRate = (programPrc / 100) / 12;
                const generalRate = (1 + monthRate) ** months;
                const monthPayment = (totalAmount * monthRate * generalRate) / (generalRate - 1);

                return {
                    monthPayment
                }
            }
        }

        selectBanks() {
            const banks = container.querySelectorAll('.bank-offer');
            banks.forEach((bank,index) => bank.setAttribute('data-bank-offer-id',index));
            container.addEventListener('click',(e) => {
                const target = e.target;
                const btn = target.closest('[data-bank-offer-btn]');
                if (!btn) return;
                const bank = btn.closest('.bank-offer');
                if (!btn.classList.contains('_active')) {
                    btn.classList.add('_active');
                    btn.textContent = 'Удалить';
                    selectBank.call(this,bank);
                } else {
                    btn.classList.remove('_active');
                    btn.textContent = 'Выбрать';
                    deleteBank.call(this,bank);
                }

                updateBanks.call(this);
            })


            function selectBank(bank) {
                const currentData = {
                    id: bank.dataset.bankOfferId,
                    logoURL: bank.querySelector('[data-bank-offer-logo]').getAttribute('src'),
                };

                this.data.selectedBanks.push(currentData);
            }

            function deleteBank(bank) {
                const currentID = bank.dataset.bankOfferId;
                this.data.selectedBanks = this.data.selectedBanks.filter(bank => bank.id !== currentID);
            }


            function updateBanks() {
                const bottom = document.querySelector('.mortgage-bottom');
                if (bottom) bottom.remove();
                const banks = container.querySelectorAll('.bank-offer');

                const selectedBanks = this.data.selectedBanks;
                if (selectedBanks.length > 0) {
                    const htmlImages = 
                        selectedBanks.map((item,index) => {
                            if (index < 4) {
                                return  `<img loading="lazy" src="${item.logoURL}" alt="" width="110" height="25">`;
                            }
                        })
                    ;
                    const html = `
                    <div class="mortgage__bottom mortgage-bottom">
                        <div class="mortgage-bottom__container container">
                            <div class="mortgage-bottom__info">
                                <div class="mortgage-bottom__images">
                                    ${htmlImages.join('')}
                                    ${selectedBanks.length > 4 ? `+${selectedBanks.length - 4}` : ''}
                                </div>
                                <span>
                                    Вы выбрали ${selectedBanks.length} из ${banks.length} возможных банков
                                </span>
                            </div>
                            <button type="button" class="btn btn-reset btn-primary mortgage-bottom__btn" data-popup-path="add">
                                Создать заявку
                            </button>
                        </div>
                    </div>
                    `;
                    document.querySelector('.site-container').insertAdjacentHTML('beforeend',html);
                }
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
                paymentPrc: 0,
                minPaymentPrc: 0,
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
                maternalCapitalMin: 0,
                maternalCapitalMax: 833024,
                maternalCapital: 833024,
                selectedBanks: [],
            };
            this.results = {};


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


        getResults() {
            return { ...this.results }
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

            if (newData.onUpdate !== 'maternalCapitalInput') {
                if (newData.maternalCapitalStatus || this.data.maternalCapitalStatus) {

              
                    if (newData.maternalCapital > this.data.maternalCapitalMax) {
                        newData.maternalCapital = this.data.maternalCapitalMax;
                     
                    }
                    if (newData.maternalCapital < this.data.maternalCapitalMin) {
                        newData.maternalCapital = this.data.maternalCapitalMin;
                    }

                }
            }

            if ((newData.onUpdate === 'paymentRange' || newData.onUpdate === 'paymentInput') && this.data.maternalCapitalStatus) {
                if (this.data.payment < this.data.maternalCapital) {
                    this.data.payment = this.data.maternalCapital;
                }
            }

            if (newData.onUpdate === 'maternalCapitalInput') {
                newData.payment = newData.maternalCapital;
                newData.paymentPrc = newData.maternalCapital / this.data.cost;

                if (newData.payment > this.data.maternalCapitalMax) {
                    newData.payment = this.data.maternalCapitalMax;
                    newData.paymentPrc = this.data.maternalCapitalMax / this.data.cost;
                }
            }

            this.data = {
                ...this.data,
                ...newData
            }


            this.results = {
                cost: this.data.cost,
                totalAmount: this.data.cost - this.data.payment,
                term: this.data.time,
            }
        }

    }


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
    
            if (value < data.getData().getMinPayment()) {
                cleaveInput.setRawValue(data.getData().getMinPayment());
            }
    
            if (value < data.getData().maternalCapital && data.getData().maternalCapitalStatus) {
                cleaveInput.setRawValue(data.getData().maternalCapital);
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
    
    function maternalCapitalInput(data, el) {
        if (!el) return;
    
        const cleaveInput = new Cleave(el, settingsCleaveInput);
        cleaveInput.setRawValue(data.getData().maternalCapital);
    
        el.addEventListener('input', inputUpdateModel);
        el.addEventListener('change', handleInputChange);
        function handleInputChange() {
            const value = +cleaveInput.getRawValue();
    
            if (value > data.getData().maternalCapitalMax) {
                cleaveInput.setRawValue(data.getData().maternalCapitalMax);
            }
            if (value < data.getData().maternalCapitalMin) {
                cleaveInput.setRawValue(data.getData().maternalCapitalMin);
            }
    
            inputUpdateModel();
        }
    
        function inputUpdateModel() {
            updateForm(el, {
                maternalCapital: +cleaveInput.getRawValue(),
                onUpdate: 'maternalCapitalInput'
            });
        }
    
        return cleaveInput;
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

    const mortgageClass = new MortgageCalc();

    return mortgageClass;
};


