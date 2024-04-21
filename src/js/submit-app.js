import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';


// ==============================
import {
    mapPrimary,
    mapDraw,
} from './components/maps';
import {
    submitAppValidate
} from './components/formValidate';
import {
    emergingBlockScroll
} from './modules/emergingBlockScroll';
import mapMetro from './components/mapMetro';
import tag from './components/tag';
import chat from './components/chat';
import submitApp from './components/submitApp';
import submitAppOffers from './components/submitAppOffers';
import {
    dropImage
} from './components/dropImage';

import dataQuiz from './data/dataQuiz';
import quiz from './components/quiz';
import {additionallyDefault} from './components/additionally';

import {
    recordViewing
} from './components/recordViewing';

import { validateCreateError,validateRemoveError,validateCreateErrorSelect,validatRemoveErrorSelect } from './components/formValidate';

document.addEventListener('DOMContentLoaded', () => {
    mapMetro();
    tag();
    chat();
    submitApp();
    submitAppOffers();
    submitAppValidate();
    emergingBlockScroll('.submit-app .submit-app__btn', '.footer-fixed.submit-app-fixed', 99999999, true);
    emergingBlockScroll('.place-sale .place-sale__btn', '.footer-fixed.submit-app-fixed', 99999999, true);
    dropImage();
    recordViewing();
    additionallyDefault(document.querySelector('.place-sale-additionally'));
    // ==== maps ====
    //  mapPrimary();
    //  mapDraw();

    quiz(dataQuiz);
    placeSaleValidate();


    function placeSaleValidate() {
        const form = document.querySelector('#post-sale-form');
        if (!form) return;
        let formEventInput = false;

        form.addEventListener('input',() => {
            if (formEventInput) validate(false);
        })

        form.addEventListener('change',() => {
            if (formEventInput) validate(false);
        })

        form.addEventListener('click',(e) => {
            const target = e.target;
            const imageRemove = target.closest('.place-sale-photo__remove');
            if (imageRemove) {
              setTimeout(() => {
                if (formEventInput) validate(false);
              }, 5);
            }
        })

        form.addEventListener('submit', (e) => {
            if (!validate()) e.preventDefault();
        })
    
        function validate(controls = true) {
            const currentBlock = form.querySelector('[data-place-sale-target]._active');
            const errorItems = [];
            let result = true;
            formEventInput = true;
            if (currentBlock.dataset.placeSaleTarget == 1) {
                input(currentBlock.querySelector('[data-place-sale-field="address"]'),'Укажите улицу, дом, корпус');
                selects(currentBlock.querySelector('[data-place-sale-field="rooms"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="type-housing"]'));
                input(currentBlock.querySelector('[data-place-sale-field="square-general"]'),'От 1 до 2 000');
                input(currentBlock.querySelector('[data-place-sale-field="square-residential"]'),'От 1 до 999');
                input(currentBlock.querySelector('[data-place-sale-field="floor-from"]'),'От 1 до 99');
                input(currentBlock.querySelector('[data-place-sale-field="floor-to"]'),'От 1 до 99');
                selects(currentBlock.querySelector('[data-place-sale-field="view-window"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="type-window"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="sunny-side"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="plate"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="heating"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="repair"]'),'.offer-room');
                selects(currentBlock.querySelector('[data-place-sale-field="elevator"]'));

                images(currentBlock.querySelector('[data-place-sale-field="images"]'),3);
                input(currentBlock.querySelector('[data-place-sale-field="price"]'),'Введите от 100 тыс. до 10 млрд.');
                input(currentBlock.querySelector('[data-place-sale-field="descr"]'),'Введите описание');
                selects(currentBlock.querySelector('[data-place-sale-field="communic-method"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="online-show"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="years-owned"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="owner"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="registered"]'));
                if (result === false && controls === true) {
                    scrollToError(errorItems);
                }
              return result;
            }
            if (currentBlock.dataset.placeSaleTarget == 3) {
                input(currentBlock.querySelector('[data-place-sale-field="address"]'),'Укажите улицу, дом, корпус');
                selects(currentBlock.querySelector('[data-place-sale-field="type-plot"]'));
                input(currentBlock.querySelector('[data-place-sale-field="square-plot"]'),'От 1 до 100 000');
                selects(currentBlock.querySelector('[data-place-sale-field="decorated"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="type-house"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="house-property"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="floors-house"]'));
                input(currentBlock.querySelector('[data-place-sale-field="square-general"]'),'От 1 до 2 000');
                input(currentBlock.querySelector('[data-place-sale-field="square-residential"]'),'От 1 до 999');
                selects(currentBlock.querySelector('[data-place-sale-field="rooms"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="bedrooms"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="electricity"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="gas"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="heating"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="water-supply"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="sewerage"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="driveway"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="repair"]'),'.offer-room');

                images(currentBlock.querySelector('[data-place-sale-field="images"]'),3);
                input(currentBlock.querySelector('[data-place-sale-field="price"]'),'Введите от 100 тыс. до 10 млрд.');
                input(currentBlock.querySelector('[data-place-sale-field="descr"]'),'Введите описание');
                selects(currentBlock.querySelector('[data-place-sale-field="communic-method"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="online-show"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="years-owned"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="owner"]'));
                selects(currentBlock.querySelector('[data-place-sale-field="registered"]'));
                if (result === false && controls === true) {
                    scrollToError(errorItems);
                }
                return result;
            }


            function input(el,text) {
                if (!el) return;
                validateRemoveError(el);
                if (!el.classList.contains('_active')) {
                    result = false;
                    validateCreateError(el, text);
                    errorItems.push(el);
                }
            }

            function selects(el,selector = null) {
                if (!el) return;
                validatRemoveErrorSelect(el,selector);
                if (!validateCreateErrorSelect(el,selector)) {
                    result = false;
                    errorItems.push(el);
                }
            }

            function images(el,min){
                if (!el) return;
                const items = el.querySelectorAll('.place-sale-photo__image');
                const btn = el.querySelector('.photo-load__wrapper');
                btn.classList.remove('_error');
                if (items.length < min) {
                    btn.classList.add('_error');
                    result = false;
                    errorItems.push(el);
                }
            }
        }
    
        function scrollToError(errorItems) {
            const firstError = errorItems[0];
            const topGap = window.pageYOffset + firstError.getBoundingClientRect().top;
            window.scrollTo({
                top: topGap - 16,
                behavior: 'smooth'
            })
        }
    }
})

