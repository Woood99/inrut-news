import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

import { _slideDown,_slideUp } from './support-modules/slide';
import datePickers from './components/datePickers'
// ==============================

document.addEventListener('DOMContentLoaded', () => {
    datePickers();
    document.addEventListener('click', (e) => {
        const target = e.target;
        const bank = target.closest('.bank-info--second');
        if (bank) {
            const more = target.closest('.bank-info__dropdown-target');
            if (more) {
                const dropdown = bank.querySelector('.bank-info__dropdown');
                if (!more.classList.contains('_active')) {
                    more.classList.add('_active');
                    _slideDown(dropdown);
                } else {
                    more.classList.remove('_active');
                    _slideUp(dropdown);
                }
            }
        }
    })
})
