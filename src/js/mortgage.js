import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

// ==============================

import { bankOffer } from './components/bankOffer';
import { mortgageCalc } from './components/mortgage';

document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('.bank-offer').forEach(item => bankOffer(item));

    const mortgageCalcEl = mortgageCalc(document.querySelector('[data-mortgage-calc]'), document.querySelectorAll('.mortgage-suitable__item'));
})
