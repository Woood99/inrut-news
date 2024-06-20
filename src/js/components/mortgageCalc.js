import numberReplace from "../modules/numberReplace";
import { fixedNumberPrc } from './bankOffer';

import noUiSlider from "nouislider";
import Cleave from 'cleave.js';

import numberToAnim from "../modules/numberToAnim";
import debounce from "../functions/debounce";

export const mortgageCalc = (container, banksArr = [],mortgageData = {}, targetCreditActive = false) => {
    if (!container) return;

    class MortgageCalc {
        constructor() {
            this.dataClass = new Data();
            this.data = this.dataClass.getData();
            this.dataClass.setData({});

            this.results = this.dataClass.getResults();
            this.targetCreditChange(this.data);
            this.programs(this.data);
            this.maternalCapital();

            this.updateBanksOnProgram();
            this.updateResultsViewCalc();
            this.updateResultsView();
            this.updateBanks();

            this.initFields();
            this.selectBanks();
            this.stickyBlock();

            setTimeout(() => {
                this.dataClass.btns.find(item => item.classList.contains('_active')).click();
            }, 50);

            document.addEventListener('mortgageCalcFormUpdate', (e) => {
                this.dataClass.setData(e.detail);
                this.data = this.dataClass.getData();
                this.results = this.dataClass.getResults();
                this.updateResultsView();
                this.updateFormAndSliders(this.data);
            })

            document.addEventListener('mortgageCalcFormUpdate', debounce(updateView.bind(this), 500));


            function updateView() {
                this.updateBanksOnProgram();
                this.updateResultsViewCalc();
                this.updateBanks();
            }
        }

        programs() {
            container.addEventListener('click', body.bind(this));
            const activeBtn = this.dataClass.btns.find(item => item.classList.contains('_active'));
            updateForm(activeBtn, {
                onUpdate: 'changeProgram',
                targetCredit: targetCreditActive ? container.querySelector('[data-mortgage-target-credit] .select-secondary__body').value : null,
                selectedProgram: {
                    name: activeBtn.dataset.mortgageBtn.split(',')[0].trim(),
                    value: +activeBtn.dataset.mortgageBtn.split(',')[1].trim(),
                    nameText: activeBtn.dataset.mortgageBtn.split(',')[2].trim(),
                    banksData: targetCreditActive ? this.data.programs[this.data.targetCredit][activeBtn.dataset.mortgageBtn.split(',')[0].trim()].banksData : 
                    this.data.programs[activeBtn.dataset.mortgageBtn.split(',')[0].trim()].banksData
                }
            });

            function body(e) {
                const target = e.target;
                const btn = target.closest('[data-mortgage-btn]');
                if (!btn) return;

                this.dataClass.btns.forEach(btn => btn.classList.remove('_active'));
                btn.classList.add('_active');
                updateForm(btn, {
                    onUpdate: 'changeProgram',
                    targetCredit: targetCreditActive ? container.querySelector('[data-mortgage-target-credit] .select-secondary__body').value : null,
                    selectedProgram: {
                        name: btn.dataset.mortgageBtn.split(',')[0].trim(),
                        value: +btn.dataset.mortgageBtn.split(',')[1].trim(),
                        nameText: btn.dataset.mortgageBtn.split(',')[2].trim(),
                        banksData: targetCreditActive ? this.data.programs[this.data.targetCredit][btn.dataset.mortgageBtn.split(',')[0].trim()].banksData : 
                    this.data.programs[btn.dataset.mortgageBtn.split(',')[0].trim()].banksData
                    }
                });
            }
        }

        targetCreditChange() {
            const targetCredit = container.querySelector('[data-mortgage-target-credit]');
            if (targetCredit) {
                body.call(this, targetCredit.querySelector('.select-secondary__body').value);
                targetCredit.addEventListener('change', (e) => {
                    body.call(this, e.detail.value);
                })
            } else {
                this.dataClass.btns = this.generateButtons(this.data.programs);
                const btnActive = this.dataClass.btns.find(item => item.classList.contains('_active'));
                const map = {
                    name: btnActive.dataset.mortgageBtn.split(',')[0].trim(),
                    value: +btnActive.dataset.mortgageBtn.split(',')[1].trim(),
                    nameText: btnActive.dataset.mortgageBtn.split(',')[2].trim(),
                    banksData: this.data.programs[btnActive.dataset.mortgageBtn.split(',')[0].trim()].banksData
                }
                this.data.selectedProgram = map;
                updateForm(btnActive, {
                    onUpdate: 'targetCreditChange',
                    selectedProgram: map
                });
            }


            function body(value) {
                this.dataClass.btns = this.generateButtons(this.data.programs[value]);
                const btnActive = this.dataClass.btns.find(item => item.classList.contains('_active'));
                const map = {
                    name: btnActive.dataset.mortgageBtn.split(',')[0].trim(),
                    value: +btnActive.dataset.mortgageBtn.split(',')[1].trim(),
                    nameText: btnActive.dataset.mortgageBtn.split(',')[2].trim(),
                    banksData: this.data.programs[value][btnActive.dataset.mortgageBtn.split(',')[0].trim()].banksData
                }
                this.data.targetCredit = value;
                this.data.selectedProgram = map;
                updateForm(targetCredit, {
                    onUpdate: 'targetCreditChange',
                    targetCredit: value,
                    selectedProgram: map
                });
            }
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
            const paymentTagsEl = container.querySelector('[data-mortgage="payment-tags"]');
            this.paymentInput = paymentInput(this.dataClass, paymentInputEl);
            this.paymentRange = paymentRange(this.dataClass, paymentRangeEl);
            paymentTags.call(this, paymentTagsEl);

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

            container.querySelectorAll('[data-mortgage="payment-tags"] [data-mortgage-tag]').forEach(item => {
                item.classList.remove('_active');
            })
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
                resultPrc.innerHTML = `
                <span class="text-blue">${this.data.selectedProgram.nameText} &nbsp от ${(this.data.selectedProgram.value * 100).toFixed(1)}%</span>
                `;
            }
        }

        updateResultsViewCalc() {
            const resultPayment = container.querySelector('[data-mortgage-result="payment"]');
            if (resultPayment) {
                const months = this.results.term * 12;
                const monthRate = this.data.selectedProgram.value / 12;
                const generalRate = (1 + monthRate) ** months;
                const monthPayment = (this.results.totalAmount * monthRate * generalRate) / (generalRate - 1);
                numberToAnim(resultPayment, 0, numberReplace(Math.round(monthPayment)));
            }

            const resultCashback = container.querySelector('[data-mortgage-result="cashback"]');
            if (resultCashback) {
                const cashbackArr = Array.from(banksArr).map(item => item.dataset.bankOfferCashback);
                const maxCashback = Math.max(...cashbackArr);
                numberToAnim(resultCashback, 0, numberReplace(Math.round(this.results.totalAmount / 100 * maxCashback)));
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
            banksArr.forEach(bank => {
                setTimeout(() => {
                    updateBank.call(this, bank);
                }, 1);
                bank.addEventListener('change',() => {
                    updateBank.call(this,bank);
                })
            })

            function updateBank(bank) {
                const cashback = bank.querySelector('[data-bank-offer="cashback"]');
                const currentCashback = bank.dataset.bankOfferCashback || 1;

                const termEl = bank.querySelector('[data-bank-offer="term"]');
                const sumEl = bank.querySelector('[data-bank-offer="sum"]');
                const paymentEl = bank.querySelector('[data-bank-offer="payment"]');
                let programPrc = bank.querySelector('[data-bank-offer-new-prc]').textContent || bank.querySelector('[data-bank-offer-default-prc]').textContent;
                programPrc = fixedNumberPrc(programPrc);
                const results = { ...this.dataClass.getResults(), ...getResultsOnBank(this.dataClass.getResults(), programPrc) };
                if (sumEl) {
                    sumEl.textContent = `${numberReplace(results.totalAmount)} ₽`;
                }

                numberToAnim(termEl, 0, String(results.term));
                numberToAnim(paymentEl, 0, numberReplace(results.monthPayment));

                const resultCashback = numberReplace(Math.round(results.totalAmount / 100 * currentCashback));
                if (resultCashback == 0) {
                    cashback.parentNode.setAttribute('hidden', '');
                } else {
                    cashback.parentNode.removeAttribute('hidden');
                    numberToAnim(cashback, 0, resultCashback);
                }
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
            banksArr.forEach((bank, index) => bank.setAttribute('data-bank-offer-id', index));
            document.addEventListener('click', (e) => {
                const target = e.target;
                const btn = target.closest('[data-bank-offer-btn]');
                if (!btn) return;
                const bank = btn.closest('.bank-offer');
                if (!btn.classList.contains('_active')) {
                    btn.classList.add('_active');
                    btn.textContent = 'Удалить';
                    selectBank.call(this, bank);
                } else {
                    btn.classList.remove('_active');
                    btn.textContent = 'Выбрать';
                    deleteBank.call(this, bank);
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

                const selectedBanks = this.data.selectedBanks;
                if (selectedBanks.length > 0) {
                    const htmlImages =
                        selectedBanks.map((item, index) => {
                            if (index < 4) {
                                return `<img loading="lazy" src="${item.logoURL}" alt="" width="110" height="25">`;
                            }
                        });
                    const html = `
                    <div class="mortgage__bottom mortgage-bottom">
                        <div class="mortgage-bottom__container container">
                            <div class="mortgage-bottom__info">
                                <div class="mortgage-bottom__images">
                                    ${htmlImages.join('')}
                                    ${selectedBanks.length > 4 ? `+${selectedBanks.length - 4}` : ''}
                                </div>
                                <span>
                                    Вы выбрали ${selectedBanks.length} из ${banksArr.length} возможных банков
                                </span>
                            </div>
                            <button type="button" class="btn btn-reset btn-primary mortgage-bottom__btn" data-popup-path="mortgage-app-popup">
                                Создать заявку
                            </button>
                        </div>
                    </div>
                    `;
                    document.querySelector('.site-container').insertAdjacentHTML('beforeend', html);
                }
            }

        }

        stickyBlock() {
            const result = container.querySelector('.mortgage-result');
            const bid = container.querySelector('[data-mortgage-bid]');
            const calcBlock = container.querySelector('[data-mortgage-calc-block]');

            if (!(bid && calcBlock)) return;

            const sidebar = container.querySelector('[data-mortgage-sidebar]');
            const sidebarAdd = container.querySelector('[data-mortgage-sidebar-add]');
            handleScroll();
            document.addEventListener('scroll', handleScroll);

            function handleScroll() {
                const posTop = calcBlock.getBoundingClientRect().top;
                if (posTop + calcBlock.clientHeight - result.clientHeight - 16 <= 0) {
                    sidebarAdd.removeAttribute('hidden');
                    sidebarAdd.insertAdjacentElement('beforeend', bid);

                    result.classList.add('_active');
                    sidebar.classList.add('_active');
                    bid.classList.add('_active');

                    const distance = result.offsetTop - window.scrollY + result.clientHeight;
                    if (distance > 0) {
                        bid.style.top = `${distance + 16}px`;
                    } else {
                        bid.style.top = `16px`;
                    }
                } else {
                    if (sidebar.classList.contains('_active')) {
                        sidebarAdd.setAttribute('hidden', '');
                        sidebar.insertAdjacentElement('beforeend', bid);

                        sidebar.classList.remove('_active');
                        bid.classList.remove('_active');
                        result.classList.remove('_active');
                    }
                }
            }
        }

        updateBanksOnProgram() {
            const currentProgram = this.data.selectedProgram.banksData;
            banksArr.forEach(bank => {
                const currentName = bank.dataset.bankOfferName;
                if (currentProgram && currentName && currentProgram[currentName]) {
                    bank.removeAttribute('hidden');
                    bank.setAttribute('data-bank-offer-prc', currentProgram[currentName].prc);
                    bank.setAttribute('data-bank-offer-cashback', currentProgram[currentName].cashback);
                    bank.dispatchEvent(new CustomEvent('change', {
                        bubbles: true,
                        detail: {
                            currentProgram
                        }
                    }))
                } else {
                    bank.setAttribute('hidden', '');
                }
            })
        }

        generateButtons(obj) {
            const containerPrograms = container.querySelector('[data-mortgage-calc-programs]');
            containerPrograms.innerHTML = '';
            for (let key in obj) {
                const map = obj[key];
                const html = `
                     <button type="button" class="btn btn-reset object-calc-mort__btn" data-mortgage-btn="${map.name},${map.prc},${map.nameText}">
                        <span>${map.nameText}</span>
                        <span>от ${(map.prc * 100).toFixed(1)}%</span>
                        <div aria-hidden="true">
                            <svg>
                                <use xlink:href="./img/sprite.svg#verif"></use>
                            </svg>
                        </div>
                     </button>
                `;
                containerPrograms.insertAdjacentHTML('beforeend', html.trim());
            }
            const programs = Array.from(containerPrograms.querySelectorAll('[data-mortgage-btn]'));
            programs[0].classList.add('_active');
            return programs;
        }
    }

    class Data {
        constructor() {
            this.data = mortgageData;

            if (targetCreditActive) {
                this.data = {
                    ...this.data,
                    targetCredit: container.querySelector('[data-mortgage-target-credit] .select-secondary__body').value,
                }
            }

            this.results = {};

            this.data.setDefaultPayment();
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

    function paymentTags(el) {
        if (!el) return;

        const clickHandler = (e) => {
            const target = e.target;
            const btn = target.closest('[data-mortgage-tag]');
            if (!btn) return;
            const prc = Number(fixedNumberPrc(btn.textContent));

            this.paymentInput.setRawValue(this.data.cost / 100 * prc);

            el.querySelectorAll('[data-mortgage-tag]').forEach(tag => tag.classList.remove('_active'));
            setTimeout(() => {
                btn.classList.add('_active');
            }, 10);
            updateForm(btn, {
                payment: +this.paymentInput.getRawValue(),
                onUpdate: 'paymentInput'
            });
        }


        el.addEventListener('click', clickHandler);
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