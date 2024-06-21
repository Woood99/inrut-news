import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

// ==============================
import getHeightBlock from './modules/getHeightBlock'
import bookConsultation from './components/bookConsultation';
import {
    validateRadioPrimary,
    validateCheckboxPrimary,
    bookConsultationValidate,
    createAgreeValidate,
    addContactValidate,
    createDealValidate,
    editUserValidate,
} from './components/formValidate';
import {
    emergingBlockScroll
} from './modules/emergingBlockScroll';
import videoBlock from './components/videoBlock';
import headerFixed from './components/headerFixed';
import mapMetro from './components/mapMetro';
import tag from './components/tag';
import chat from './components/chat';
import scrollDrag from './components/scrollDrag';
import {
    cardSecondaryActions,
    cardPrimaryActions
} from './components/cardActions';
import {
    furnishingSets
} from './components/furnishingSets';
import {
    recordViewing,
    recordViewingTwo
} from './components/recordViewing';
import videoModal from './components/videoModal';
import submitApp from './components/submitApp';
import wantDiscount from './components/wantDiscount';
import onlineDisplay from './components/onlineDisplay';
import {
    dragDrops
} from './components/dragDrop';

import suggestObject from './components/suggestObject';
import datePickers from './components/datePickers';
import scrollTarget from './components/scrollTarget';
import metroInfo from './components/metroInfo';
import apartKitchen from './components/apartKitchen';
import moveToFromBlock from './modules/moveToFromBlock';
import genplan from './components/genplan';
import {additionally} from './components/additionally';
import saleDynamic from './components/saleDynamic';
import dynamicCircle from './components/dynamicCircle';
import floorTable from './components/floorTable';

import { bankOffer } from './components/bankOffer';
import { mortgageCalc } from './components/mortgageCalc';

document.addEventListener('DOMContentLoaded', () => {
    getHeightBlock('.header-fixed', '--header-fixed-height');
    cardSecondaryActions();
    cardPrimaryActions();
    videoBlock();
    headerFixed();
    mapMetro();
    tag();
    chat();
    furnishingSets();
    scrollDrag('.object-location__infrastructure', 1000, true);
    scrollDrag('.tabs-primary.tabs-primary--controls .tabs__navigation', 1000, true);
    recordViewing();
    recordViewingTwo();
    videoModal();
    submitApp();
    wantDiscount();
    onlineDisplay();
    dragDrops();
    validateRadioPrimary('.complaint-popup__form', '.textarea-primary__input', '.complaint-popup__btn', '.radio-primary__input');
    validateRadioPrimary('.complaint-user-popup__form', '.textarea-primary__input', '.complaint-user-popup__btn', '.radio-primary__input');
    validateRadioPrimary('.complaint-object-popup__form', '.textarea-primary__input', '.complaint-object-popup__btn', '.radio-primary__input');
    validateCheckboxPrimary('.object-not-popup__form', '.textarea-primary__input', '.object-not-popup__btn', '.checkbox-secondary__input');
    bookConsultationValidate();
    createAgreeValidate();
    addContactValidate();
    createDealValidate();
    editUserValidate();
    emergingBlockScroll('.object-body__user .bid-user__btn--message', '.object-plate-bottom', 1212, true);
    emergingBlockScroll('.object-body__user .bid-user__btn--comment', '.object-plate-bottom', 1212, true);
    emergingBlockScroll('.develop-inner .object-body__user .bid-user__btn', '.object-plate-bottom', 1212, true);
    emergingBlockScroll('.detailed-flat .object-body__user .bid-user__btn', '.object-plate-bottom', 1212, true);
    emergingBlockScroll('.object-base-inner .object-body__user .card-user__btn', '.object-plate-bottom', 1212, true);
    suggestObject();
    datePickers();
    scrollTarget();
    metroInfo();
    apartKitchen();
    document.querySelectorAll('.book-consultation').forEach(el => {
        bookConsultation(el);
    })
    genplan();
    moveToFromBlock('[data-move-block-to="bid-user"]', '[data-move-block-from="bid-user"]', 99999, 1212, `${window.innerWidth >= 1920 ? 1.35 : 1}`);
    additionally();
    saleDynamic(true);
    dynamicCircle();
    floorTable();
    // ==============================================

    document.querySelectorAll('.bank-offer').forEach(item => bankOffer(item));

    const mortgageData = {
        selectedProgram: null,
        cost: 10000000,
        minPrice: 375000,
        maxPrice: 100000000,
        paymentPrc: 0,
        minPaymentPrc: 0,
        maxPaymentPrc: 0.9,
        payment: 0,
        programs: {},
        minYear: 1,
        maxYear: 30,
        time: 10,
        maternalCapitalStatus: false,
        maternalCapitalMin: 0,
        maternalCapitalMax: 833024,
        maternalCapital: 833024,
        selectedBanks: [],
        programs: {
            base: {
                name: 'base',
                nameText: 'Базовая',
                prc: 0.109,
                banksData: {
                    alfa: {
                        prc: 19.47,
                        cashback: 0.4,
                        bidFields: [{
                            name: 'Зарплатный клиент Альфа-Банка',
                            prc: 0.5,
                            defaultValue: false
                        }]
                    },
                    domrf: {
                        prc: 18,
                        cashback: 0.3
                    },
                    mts: {
                        prc: 18,
                        cashback: 0.3
                    },
                    prom: {
                        prc: 8,
                        cashback: 0.6,
                        bidFields: [{
                            name: 'Страхование',
                            prc: 2,
                            defaultValue: false
                        }]
                    },
                }
            },
            gov: {
                name: 'gov',
                nameText: 'Господдержка',
                prc: 0.077,
                banksData: {
                    alfa: {
                        prc: 8,
                        cashback: 0.4
                    },
                    domrf: {
                        prc: 8,
                        cashback: 0
                    },
                    prom: {
                        prc: 9,
                        cashback: 0.6,
                        bidFields: [{
                            name: 'Страхование',
                            prc: '1',
                            defaultValue: false
                        }]
                    },
                }
            },
            family: {
                name: 'family',
                nameText: 'Семейная',
                prc: 0.057,
                banksData: {
                    alfa: {
                        prc: 6,
                        cashback: 0.4
                    },
                    domrf: {
                        prc: 6,
                        cashback: 0
                    },
                    prom: {
                        prc: 6,
                        cashback: 0.6,
                        bidFields: [{
                            name: 'Работники ОПК, Гос или бюджетных организаций являющийся зарплатными клиентами',
                            prc: '1',
                            defaultValue: true
                        }]
                    },
                }
            },
            it: {
                name: 'it',
                nameText: 'Ипотека для IT',
                prc: 0.047,
                banksData: {
                    alfa: {
                        prc: 5,
                        cashback: 0.4
                    },
                    domrf: {
                        prc: 5,
                        cashback: 0
                    },
                    prom: {
                        prc: 5,
                        cashback: 0.6
                    },
                }
            },
            military: {
                name: 'military',
                nameText: 'Военная',
                prc: 0.176,
            },
        },

        setDefaultPayment() {
            this.payment = this.cost * this.paymentPrc;
        },
        getMinPayment: function() {
            return this.cost * this.minPaymentPrc;
        },
        getMaxPayment: function() {
            return this.cost * this.maxPaymentPrc;
        },
    };
    
    const mortgageCalcEl = mortgageCalc(document.querySelector('[data-mortgage-calc]'), document.querySelectorAll('.select-bank__item'),mortgageData,false);
})
