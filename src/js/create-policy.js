import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

import AirDatepicker from 'air-datepicker';
import {
    _slideDown,
    _slideUp
} from './support-modules/slide';
import datePickers from './components/datePickers';
import {
    validateCreateError,
    validateRemoveError,
    validateCreateErrorMask,
    validateEmail,
    validateCreateErrorField
} from './components/formValidate';
import {
    validateTextMap
} from './modules/validateTextMap';

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
        const toggle = target.closest('[data-mortgage-requests-toggle]');
        if (toggle) {
            const currentId = toggle.dataset.mortgageRequestsToggle;
            const itemsContent = form.querySelectorAll(`[data-mortgage-requests-content='${currentId}']`);
            itemsContent.forEach(item => {
                item.toggleAttribute('hidden');
            })
        }
    })
    const form = document.querySelector('.create-policy__form');
    if (form) {
        const checkbox = form.querySelector('.create-policy__checkbox');
        const btn = form.querySelector('.create-policy__btn');
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                btn.removeAttribute('disabled');
            } else {
                btn.setAttribute('disabled', '');
            }
        })
        const dataLabel = {
            tel: form.querySelector('[data-policy-field="tel"]'),
            email: form.querySelector('[data-policy-field="email"]'),
            surname: form.querySelector('[data-policy-field="surname"]'),
            name: form.querySelector('[data-policy-field="name"]'),
            dateBirth: form.querySelector('[data-policy-field="date-birth"]'),
            dateIss: form.querySelector('[data-policy-field="date-iss"]'),
            placeBirth: form.querySelector('[data-policy-field="place-birth"]'),
            seriesNumber: form.querySelector('[data-policy-field="series-number"]'),
            departCode: form.querySelector('[data-policy-field="depart-code"]'),
            passportIssued: form.querySelector('[data-policy-field="passport-issued"]'),
            regAddress: form.querySelector('[data-policy-field="registration-address"]'),
            resAddress: form.querySelector('[data-policy-field="residence-address"]'),
        };
        const dataInput = {
            tel: dataLabel.tel.querySelector('input'),
            email: dataLabel.email.querySelector('input'),
            surname: dataLabel.surname.querySelector('input'),
            name: dataLabel.name.querySelector('input'),
            placeBirth: dataLabel.placeBirth.querySelector('input'),
            seriesNumber: dataLabel.seriesNumber.querySelector('input'),
            departCode: dataLabel.departCode.querySelector('input'),
            passportIssued: dataLabel.passportIssued.querySelector('input'),
            regAddress: dataLabel.regAddress.querySelector('input'),
            resAddress: dataLabel.resAddress.querySelector('input'),
        };
        const dataDate = {
            dateBirth: dataLabel.dateBirth.querySelector('input'),
            dateIss: dataLabel.dateIss.querySelector('input'),
        };
        let formEventInput = false;
        for (const el in dataInput) {
            const input = dataInput[el];
            input.addEventListener('input', () => {
                if (formEventInput) validate(false);
            })
        }
        for (const field in dataDate) {
            const input = dataDate[field];
            new AirDatepicker(input, {
                autoClose: true,
                isMobile: true,
                maxDate: new Date(),
                onSelect: (fd) => {
                    const inputText = input.closest('.input-text')
                    fd.date ? inputText.classList.add('_active') : inputText.classList.remove('_active');
                    if (formEventInput) validate(false);
                }
            })
        }

        form.addEventListener('submit', (e) => {
            if (!validate()) e.preventDefault();
        })

        function removeAllError() {
            for (const key in dataLabel) {
                const element = dataLabel[key];
                validateRemoveError(element);
            }
        }

        function validate(controls = true) {
            const errorItems = [];
            let result = true;
            formEventInput = true;
            removeAllError();
            if (!validateCreateErrorMask(dataLabel.tel, dataInput.tel, validateTextMap.tel, 10)) {
                result = false;
            }
            if (!validateEmail(dataInput.email.value)) {
                validateCreateError(dataLabel.email, 'Укажите корректный email');
                result = false;
            }
            if (!validateCreateErrorField(dataLabel.surname, dataInput.surname, 'Введите фамилию')) {
                result = false;
            }
            if (!validateCreateErrorField(dataLabel.name, dataInput.name, 'Введите имя')) {
                result = false;
            }
            if (!validateCreateErrorField(dataLabel.placeBirth, dataInput.placeBirth, 'Укажите место рождения как в паспорте')) {
                result = false;
            }
            if (!validateCreateErrorField(dataLabel.passportIssued, dataInput.passportIssued, 'Укажите, кем выдан паспорт')) {
                result = false;
            }
            if (!dataDate.dateBirth.value) {
                result = false;
                validateCreateError(dataLabel.dateBirth, 'Укажите дату рождения');
            }
            if (!dataDate.dateIss.value) {
                result = false;
                validateCreateError(dataLabel.dateIss, 'Укажите дату выдачи паспорта');
            }


            if (!validateCreateErrorMask(dataLabel.seriesNumber, dataInput.seriesNumber, 'В серии и номере паспорта должно быть 10 цифр', 10)) {
                result = false;
            }
            if (!validateCreateErrorMask(dataLabel.departCode, dataInput.departCode, 'Введите корректный код подразделения', 6)) {
                result = false;
            }

            if (!validateCreateErrorField(dataLabel.regAddress, dataInput.regAddress, 'Введите адрес регистрации')) {
                result = false;
            }
            if (!dataLabel.resAddress.hasAttribute('hidden') && !validateCreateErrorField(dataLabel.resAddress, dataInput.resAddress, 'Укажите адрес проживания')) {
                result = false;
            }

            if (result === false && controls === true) {
                scrollToError();
            }
            return result;
        }

        function scrollToError() {
            const items = form.querySelectorAll('[data-policy-field]');
            const itemsError = Array.from(items).filter(item => item.classList.contains('_error'));
            if (itemsError.length === 0) return;
            const firstItem = itemsError[0];
            const topGap = window.pageYOffset + firstItem.getBoundingClientRect().top;
            window.scrollTo({
                top: topGap - 55 - 16,
                behavior: 'smooth'
            })
        }

        const creditNumberField = form.querySelector('[data-credit-number-field]');
        const creditNumberToggle = form.querySelector('[data-credit-number-toggle]');
        creditNumberToggle.addEventListener('change',() => {
            if (creditNumberToggle.checked) {
                creditNumberField.setAttribute('hidden','');
            } else {
                creditNumberField.removeAttribute('hidden');
            }
        })
    }
})
