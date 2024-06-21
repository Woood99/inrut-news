import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

// ==============================

import { bankOffer } from './components/bankOffer';
import { mortgageCalc } from './components/mortgageCalc';

document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('.bank-offer').forEach(item => bankOffer(item));

    const mortgageData = {
        programs: {
            buildings: {
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
                                }
                            ]
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
            secondary: {
                base: {
                    name: 'base',
                    nameText: 'Базовая',
                    prc: 0.109,
                    banksData: {
                        mts: {
                            prc: 19.7,
                            cashback: 0.6,
                            bidFields: [{
                                    name: 'Страхование',
                                    prc: 2,
                                    defaultValue: false
                                },
                                {
                                    name: 'Работники ОПК, зарплатные клиенты, клиенты премиального пакета Orange Premium Club',
                                    prc: 0.6,
                                    defaultValue: false
                                },
                                {
                                    name: 'Партнёры сегмента "Platinum SPB"',
                                    prc: 0.5,
                                    defaultValue: false
                                }
                            ]
                        },
                    }
                },
            },
            house: {
                base: {
                    name: 'base',
                    nameText: 'Базовая',
                    prc: 0.109,
                },
                gov: {
                    name: 'gov',
                    nameText: 'Господдержка',
                    prc: 0.077,
                },
                family: {
                    name: 'family',
                    nameText: 'Семейная',
                    prc: 0.057,
                },
                it: {
                    name: 'it',
                    nameText: 'Ипотека для IT',
                    prc: 0.047,
                },
                military: {
                    name: 'military',
                    nameText: 'Военная',
                    prc: 0.176,
                },
            },
            plots: {
                base: {
                    name: 'base',
                    nameText: 'Базовая',
                    prc: 0.109,
                },
                gov: {
                    name: 'gov',
                    nameText: 'Господдержка',
                    prc: 0.077,
                },
                family: {
                    name: 'family',
                    nameText: 'Семейная',
                    prc: 0.057,
                },
                it: {
                    name: 'it',
                    nameText: 'Ипотека для IT',
                    prc: 0.047,
                },
                military: {
                    name: 'military',
                    nameText: 'Военная',
                    prc: 0.176,
                },
            },
            commercial: {
                military: {
                    name: 'military',
                    nameText: 'Военная',
                    prc: 0.176,
                    banksData: {
                        sber: {
                            prc: 12.7,
                            cashback: 0.4,
                        },
                    }
                },
            },
        }
    };

    const mortgageCalcEl = mortgageCalc(document.querySelector('[data-mortgage-calc]'), document.querySelectorAll('.mortgage-suitable__item'), mortgageData,true);
})
