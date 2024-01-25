import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

import AirDatepicker from 'air-datepicker';
import quantity from './functions/quantity';
// ==============================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#service-moving-form');
    if (form) {
        const date = form.querySelector('.service-moving-time__date');
        const optionsItems = form.querySelector('.service-moving-options__list').children;
        if (date) {
            new AirDatepicker(date, {
                autoClose: true,
                isMobile: true,
                onSelect: (fd) => {
                    const inputText = date.closest('.input-text')
                    fd.date ? inputText.classList.add('_active') : inputText.classList.remove('_active');
                }
            })
        }
        if (optionsItems.length > 0) {
            const itemsArray = Array.from(optionsItems);
            itemsArray.forEach(item => {
                item.addEventListener('click', () => {
                    itemsArray.forEach(item => item.classList.remove('_active'));
                    item.classList.toggle('_active');
                })
            })
        }
        quantity();
    };

})
