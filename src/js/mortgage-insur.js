import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

import datePickers from './components/datePickers'
import setCurrentDate from './modules/setCurrentDate';
import { _slideDown,_slideUp } from './support-modules/slide';
// ==============================

document.addEventListener('DOMContentLoaded', () => {
    datePickers();
    setCurrentDate();
    const form = document.querySelector('.mortgage-insur__form');
    if (!form) return;
    const bankFilter = form.querySelector('.mortgage-insur__bank');
    const itemsToggle = form.querySelectorAll('.mortgage-insur__item-hidden');
    bankFilter.addEventListener('click', () => {
        const itemActive = bankFilter.querySelector('.search-select-one__item._active');
        if (itemActive) {
            if (!itemActive.hasAttribute('data-bank-second')) {
                itemsToggle.forEach(item => item.setAttribute('hidden', ''));
            } else {
                itemsToggle.forEach(item => item.removeAttribute('hidden'));
            }
        }
    });


    document.addEventListener('click', (e) => {
        const target = e.target;
        const bank = target.closest('.bank-info--second') || target.closest('.bank-info--three');
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
