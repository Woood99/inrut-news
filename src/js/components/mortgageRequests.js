import AirDatepicker from 'air-datepicker';
import {
    validateTextMap
} from "../modules/validateTextMap";
import {
    currentInputText
} from "./inputs";
import {
    emergingBlockScroll
} from '../modules/emergingBlockScroll';
import {
    selectSecondaryCreate
} from './choices';
import {
    validateRemoveError,
    validateCreateErrorField,
    validateCreateErrorMask,
    validateCreateError,
    validateCreeateErrorSelect,
    validateCreateErrorYear,
    validateCreateErrorUrl
} from './formValidate';
const mortgageRequests = () => {
    const form = document.querySelector('.mortgage-requests__form');
    if (!form) return;
    const familyStatus = form.querySelector('[data-mortgage-requests-family-status]');

    const spouseDeal = form.querySelector('[data-mortgage-requests-spouse-deal]');
    const spouseDealInput = spouseDeal.querySelector('.checkbox-secondary__input');

    const spouseСonsent = form.querySelector('[data-mortgage-requests-spouse-consent]');

    const youngerChildren = form.querySelectorAll('[data-mortgage-requests-younger-children]');
    const createChildrenBtn = form.querySelector('.mortgage-requests__create-children');
    const childrensContainer = form.querySelector('.mortgage-requests__childrens');

    const carToggle = form.querySelector('[data-mortgage-requests-car]');
    const carsContainer = form.querySelector('.mortgage-requests__cars');
    const createCarBtn = form.querySelector('.mortgage-requests__create-car');


    const estateToggle = form.querySelector('[data-mortgage-requests-estate]');
    const estatesContainer = form.querySelector('.mortgage-requests__estates');
    const createEstateBtn = form.querySelector('.mortgage-requests__create-estate');

    let formEventInput = false;

    form.addEventListener('click', (e) => {
        setTimeout(() => {
            emergingBlockScroll('.mortgage-requests .mortgage-requests__save', '.footer-fixed.mortgage-requests-fixed', 99999999, true, true);
        }, 300);
        const target = e.target;
        const toggle = target.closest('[data-mortgage-requests-toggle]');
        const removeChildren = target.closest('.mortgage-requests__children-remove');

        const removeCar = target.closest('.mortgage-requests__car-remove');
        const removeEstate = target.closest('.mortgage-requests__estate-remove');
        if (toggle) {

            const currentId = toggle.dataset.mortgageRequestsToggle;
            const itemsContent = form.querySelectorAll(`[data-mortgage-requests-content='${currentId}']`);
            itemsContent.forEach(item => {
                item.toggleAttribute('hidden');
            })
        }
        if (removeChildren) {
            const currentItem = removeChildren.closest('.mortgage-requests__children');
            currentItem.remove();
            updateAllItems(childrensContainer, 'mortgage-requests-children');
        }
        if (removeCar) {
            const currentItem = removeCar.closest('.mortgage-requests__car');
            currentItem.remove();
            updateAllItems(carsContainer, 'mortgage-requests-car');
        }
        if (removeEstate) {
            const currentItem = removeEstate.closest('.mortgage-requests__estate');
            currentItem.remove();
            updateAllItems(estatesContainer, 'mortgage-requests-estate');
        }
    })
    form.addEventListener('submit', (e) => {
        if (!validate(true)) e.preventDefault();
    })
    familyStatus.addEventListener('change', () => {
        if (familyStatus) {
            const value = familyStatus.querySelector('.choices__list.choices__list--single .choices__item.choices__item--selectable').dataset.value;
            if (value === 'married') {
                spouseDeal.removeAttribute('hidden');
            } else {
                spouseDeal.setAttribute('hidden', '');
                spouseСonsent.setAttribute('hidden', '');
                spouseDealInput.checked = false;
            }
        }
    })
    spouseDealInput.addEventListener('input', () => {
        if (spouseDealInput.checked) {
            spouseСonsent.removeAttribute('hidden');
        } else {
            spouseСonsent.setAttribute('hidden', '');
        }
    });
    estateToggle.addEventListener('input', () => {
        if (estateToggle.checked) {
            createEstateBtn.removeAttribute('hidden');
            createEstate(false);
        } else {
            createEstateBtn.setAttribute('hidden', '');
            removeAllItems(estatesContainer);
        }
        updateContainer(estatesContainer);
    });
    carToggle.addEventListener('input', () => {
        if (carToggle.checked) {
            createCarBtn.removeAttribute('hidden');
            createCar(false);
        } else {
            createCarBtn.setAttribute('hidden', '');
            removeAllItems(carsContainer);
        }
        updateContainer(carsContainer);
    });
    youngerChildren.forEach(item => {
        if (item) {
            item.addEventListener('input', () => {
                const value = item.dataset.mortgageRequestsYoungerChildren;
                if (value === 'true') {
                    createChildrenBtn.removeAttribute('hidden');
                    createChildren(false);
                }
                if (value === 'false') {
                    createChildrenBtn.setAttribute('hidden', '');
                    removeAllItems(childrensContainer);
                }
                updateContainer(childrensContainer);
            })
        }
    })

    createChildrenBtn.addEventListener('click', () => {
        createChildren(true);
    })
    createCarBtn.addEventListener('click', () => {
        createCar(true);
    })
    createEstateBtn.addEventListener('click', () => {
        createEstate(true);
    })

    function createChildren(btnRemove) {
        const length = childrensContainer.querySelectorAll('.mortgage-requests__children').length;
        const btnRemoveHTML = `
      <button type="button" class="btn btn-reset mortgage-requests__children-remove" title="Удалить">
        <svg>
            <use xlink:href="./img/sprite.svg#trash"></use>
        </svg>
      </button>
      `;
        const childrenHTML = `
      <div class="mortgage-requests__children ${btnRemove ? 'mortgage-requests__children--remove' : ''}" data-mortgage-requests-children=${length + 1}>
         <div class="input-text input-text--no-exp">
             <label class="input-text__label">
                 <span>Дата рождения ребёнка</span>
                 <input type="text" name="Снилс" class="input-reset input-text__input input-text--date" value="" placeholder="">
             </label>
         </div>
         <div class="checkbox-secondary">
             <input id="disabled-child_${length + 1}" name="disabled-child_${length + 1}" class="checkbox-secondary__input" type="checkbox" value="true">
             <label for="disabled-child_${length + 1}" class="checkbox-secondary__label">
                 <div class="checkbox-secondary__text">
                     Ребёнок инвалид
                 </div>
             </label>
         </div>
         ${btnRemove ? btnRemoveHTML : ''}
     </div>
      `;
        childrensContainer.insertAdjacentHTML('beforeend', childrenHTML);
        const currentChildren = childrensContainer.querySelectorAll('.mortgage-requests__children')[childrensContainer.querySelectorAll('.mortgage-requests__children').length - 1];
        createFields(currentChildren);
    }

    function createCar(btnRemove) {
        const length = carsContainer.querySelectorAll('.mortgage-requests__car').length;
        const btnRemoveHTML = `
        <button type="button" class="btn btn-reset mortgage-requests__car-remove" title="Удалить">
          <svg>
              <use xlink:href="./img/sprite.svg#trash"></use>
          </svg>
        </button>
      `;
        const carHTML = `
        <div class="mortgage-requests__car ${btnRemove ? 'mortgage-requests__car--remove' : ''}" data-mortgage-requests-car=${length + 1}>
            <div class="input-text input-text--no-exp" data-mortgage-requests-field="make-model" data-validate-required>
                <label class="input-text__label">
                    <span>Марка и модель</span>
                    <input type="text" name="Марка и модель" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <div class="input-text input-text--no-exp" data-mortgage-requests-field="state-number" data-validate-required>
                <label class="input-text__label">
                    <span>Государственный номер</span>
                    <input type="text" name="Государственный номер" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <div class="input-text input-text--only-number" data-mortgage-requests-field="car-cost" data-validate-required>
                <label class="input-text__label">
                    <span>Примерная стоимость</span>
                    <input type="text" name="Примерная стоимость" maxlength="12" class="input-reset input-text__input" placeholder="">
                    <span>₽</span>
                </label>
            </div>
            <div class="input-text input-text--only-number input-text--no-exp input-text-year-primary" data-mortgage-requests-field="year-issue">
                <label class="input-text__label">
                    <span>Год выпуска</span>
                    <input type="text" name="Год выпуска" maxlength="4" class="input-reset input-text__input" placeholder="">
                </label>
            </div>
            <div class="checkbox-secondary">
                <input id="car-pledge_${length + 1}" name="car-pledge_${length + 1}" class="checkbox-secondary__input" type="checkbox" value="true">
                <label for="car-pledge_${length + 1}" class="checkbox-secondary__label">
                    <span class="checkbox-secondary__text">
                        <span>Находится в залоге</span>
                    </span>
                </label>
            </div>
           ${btnRemove ? btnRemoveHTML : ''}
        </div>
      `;
        carsContainer.insertAdjacentHTML('beforeend', carHTML);
        const currentCar = carsContainer.querySelectorAll('.mortgage-requests__car')[carsContainer.querySelectorAll('.mortgage-requests__car').length - 1];
        createFields(currentCar);
    }

    function createEstate(btnRemove) {
        const length = estatesContainer.querySelectorAll('.mortgage-requests__estate').length;
        const btnRemoveHTML = `
        <button type="button" class="btn btn-reset mortgage-requests__estate-remove" title="Удалить">
          <svg>
              <use xlink:href="./img/sprite.svg#trash"></use>
          </svg>
        </button>
      `;
        const estateHTML = `
        <div class="mortgage-requests__estate ${btnRemove ? 'mortgage-requests__estate--remove' : ''}" data-mortgage-requests-estate=${length + 1}>
            <div class="select-secondary" data-mortgage-requests-field="property-type">
                <div class="select-secondary__wrapper">
                <span class="select-secondary__placeholder">
                    Тип недвижимости
                </span>
                <select class="select-secondary__body" hidden name="mortgage-requests-estate-type=${length + 1}">
                    <option placeholder>Не выбрано</option>
                    <option value="room-1">Квартира</option>
                    <option value="room-2">Комната</option>
                    <option value="room-3">Доля в квартире</option>
                </select>
                </div>
            </div>
            <div class="select-secondary" data-mortgage-requests-field="type-of-property">
                <div class="select-secondary__wrapper">
                <span class="select-secondary__placeholder">
                    Вид собственности
                </span>
                <select class="select-secondary__body" hidden name="mortgage-requests-estate-view=${length + 1}">
                <option placeholder>Не выбрано</option>
                    <option value="room-1">Единоличная</option>
                    <option value="room-2">Долевая</option>
                    <option value="room-3">Совместная</option>
                </select>
                </div>
            </div>
            <div class="select-secondary" data-mortgage-requests-field="basis-ownership">
                <div class="select-secondary__wrapper">
                <span class="select-secondary__placeholder">
                  Основание собственности
                </span>
                <select class="select-secondary__body" hidden name="mortgage-requests-estate-base=${length + 1}">
                <option placeholder>Не выбрано</option>
                    <option value="room-1">Квартира</option>
                    <option value="room-2">Комната</option>
                    <option value="room-3">Доля в квартире</option>
                </select>
                </div>
            </div>
            <div class="input-text input-text--no-exp input-text--only-number" data-mortgage-requests-field="estate-year-purchase">
                <label class="input-text__label">
                    <span>Год приобретения</span>
                    <input type="text" name="Год приобретения" maxlength="4" class="input-reset input-text__input" placeholder="">
                </label>
            </div>
            <div class="input-text input-text--no-exp" style="grid-column:1/-1" data-mortgage-requests-field="address-object" data-validate-required>
                <label class="input-text__label">
                    <span>Адрес объекта</span>
                    <input type="text" name="Адрес объекта" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <div class="input-text input-text--only-number" data-mortgage-requests-field="estate-price" data-validate-required>
                <label class="input-text__label">
                    <span>Примерная стоимость объекта</span>
                    <input type="text" name="Примерная стоимость объекта" maxlength="12" class="input-reset input-text__input" placeholder="">
                    <span>₽</span>
                </label>
            </div>
            <div class="input-text input-text--only-number" data-mortgage-requests-field="estate-square" data-validate-required>
                <label class="input-text__label">
                    <span>Площадь</span>
                    <input type="text" name="Площадь" maxlength="3" class="input-reset input-text__input" placeholder="">
                    <span class="input-text__name">м²</span>
                </label>
            </div>
            <div class="checkbox-secondary">
                <input id="estate-pledge_${length + 1}" name="estate-pledge_${length + 1}" class="checkbox-secondary__input" type="checkbox" value="true">
                <label for="estate-pledge_${length + 1}" class="checkbox-secondary__label">
                    <span class="checkbox-secondary__text">
                        <span>Находится в залоге</span>
                    </span>
                </label>
            </div>
           ${btnRemove ? btnRemoveHTML : ''}
        </div>
      `;
        estatesContainer.insertAdjacentHTML('beforeend', estateHTML);
        const currentEtate = estatesContainer.querySelectorAll('.mortgage-requests__estate')[estatesContainer.querySelectorAll('.mortgage-requests__estate').length - 1];
        createFields(currentEtate);
    }

    function removeAllItems(container) {
        const items = Array.from(container.children);
        items.forEach(item => item.remove());
    }

    function updateAllItems(container, name) {
        const items = Array.from(container.children);
        items.forEach((item, index) => {
            item.setAttribute(name, index + 1);
        });
    }

    function createFields(container) {
        const inputsText = container.querySelectorAll('.input-text');
        const selectSecondary = container.querySelectorAll('.select-secondary__body');
        const inputDate = container.querySelectorAll('.input-text--date');

        inputsText.forEach(input => {
            currentInputText(input);
            input.querySelector('input').addEventListener('input', () => {
                if (formEventInput) validate(false);
            })
        })
        selectSecondary.forEach(select => {
            selectSecondaryCreate(select);
            select.addEventListener('change', () => {
                if (formEventInput) validate(false);
            })
        });

        inputDate.forEach(input => {
            const inputText = input.closest('.input-text');
            new AirDatepicker(input, {
                autoClose: true,
                isMobile: true,
                maxDate: new Date(),
                onSelect: (fd) => {
                    fd.date ? inputText.classList.add('_active') : inputText.classList.remove('_active');
                    if (formEventInput) validate(false);
                }
            })
        })
    }

    function updateContainer(container) {
        Array.from(container.children).length > 0 ? container.removeAttribute('hidden') : container.setAttribute('hidden', '');
    }

    const fieldsMap = {
        placeBirth: form.querySelector("[data-mortgage-requests-field='place-birth']"),
        seriesNumber: form.querySelector("[data-mortgage-requests-field='series-number']"),
        departCode: form.querySelector("[data-mortgage-requests-field='depart-code']"),
        dateIssue: form.querySelector("[data-mortgage-requests-field='date-issue']"),
        passportIssued: form.querySelector("[data-mortgage-requests-field='passport-issued']"),
        registrationAddress: form.querySelector("[data-mortgage-requests-field='registration-address']"),
        registrPeriod: form.querySelector("[data-mortgage-requests-field='registr-period']"),
        residenceAddress: form.querySelector("[data-mortgage-requests-field='residence-address']"),
        reasonsResidence: form.querySelector("[data-mortgage-requests-field='reasons-residence']"),

        surnameOld: form.querySelector("[data-mortgage-requests-field='surname-old']"),
        nameOld: form.querySelector("[data-mortgage-requests-field='name-old']"),
        snils: form.querySelector("[data-mortgage-requests-field='snils']"),
        shiftsFullName: form.querySelector("[data-mortgage-requests-field='shifts-full-name']"),

        education: form.querySelector("[data-mortgage-requests-field='education']"),
        seniority: form.querySelector("[data-mortgage-requests-field='seniority']"),
        militaryDuty: form.querySelector("[data-mortgage-requests-field='military-duty']"),

        familyStatus: form.querySelector("[data-mortgage-requests-field='family-status']"),
        spouseConsent: form.querySelector("[data-mortgage-requests-field='spouse-consent']"),

        rentalIncome: form.querySelector("[data-mortgage-requests-field='rental-income']"),
        pension: form.querySelector("[data-mortgage-requests-field='pension']"),
        otherIncome: form.querySelector("[data-mortgage-requests-field='other-income']"),

        credits: form.querySelector("[data-mortgage-requests-field='credits']"),
        rent: form.querySelector("[data-mortgage-requests-field='rent']"),
        alimony: form.querySelector("[data-mortgage-requests-field='alimony']"),

        employment: form.querySelector("[data-mortgage-requests-field='employment']"),
        basicIncome: form.querySelector("[data-mortgage-requests-field='basic-income']"),

        nameOrInnEmployer: form.querySelector("[data-mortgage-requests-field='name-or-inn-employer']"),
        ogrn: form.querySelector("[data-mortgage-requests-field='ogrn']"),
        inn: form.querySelector("[data-mortgage-requests-field='inn']"),
        legalAddress: form.querySelector("[data-mortgage-requests-field='legal-address']"),
        actualAddress: form.querySelector("[data-mortgage-requests-field='actual-address']"),
        tel: form.querySelector("[data-mortgage-requests-field='tel']"),
        employerSite: form.querySelector("[data-mortgage-requests-field='employer-site']"),
        numberStaff: form.querySelector("[data-mortgage-requests-field='number-staff']"),
        employerActiv: form.querySelector("[data-mortgage-requests-field='employer-activ']"),
        nameJob: form.querySelector("[data-mortgage-requests-field='name-job']"),
        dateEmployment: form.querySelector("[data-mortgage-requests-field='date-employment']"),
        yourIncome: form.querySelector("[data-mortgage-requests-field='your-income']"),
    };
    const inputsMap = {
        fields: {
            placeBirth: fieldsMap.placeBirth.querySelector('input'),
            seriesNumber: fieldsMap.seriesNumber.querySelector('input'),
            departCode: fieldsMap.departCode.querySelector('input'),
            passportIssued: fieldsMap.passportIssued.querySelector('input'),
            registrationAddress: fieldsMap.registrationAddress.querySelector('input'),
            residenceAddress: fieldsMap.residenceAddress.querySelector('input'),
            snils: fieldsMap.snils.querySelector('input'),
            surnameOld: fieldsMap.surnameOld.querySelector('input'),
            nameOld: fieldsMap.nameOld.querySelector('input'),
            rentalIncome: fieldsMap.rentalIncome.querySelector('input'),
            pension: fieldsMap.pension.querySelector('input'),
            otherIncome: fieldsMap.otherIncome.querySelector('input'),
            credits: fieldsMap.credits.querySelector('input'),
            rent: fieldsMap.rent.querySelector('input'),
            alimony: fieldsMap.alimony.querySelector('input'),
            nameOrInnEmployer: fieldsMap.nameOrInnEmployer.querySelector('input'),
            ogrn: fieldsMap.ogrn.querySelector('input'),
            inn: fieldsMap.inn.querySelector('input'),
            legalAddress: fieldsMap.legalAddress.querySelector('input'),
            actualAddress: fieldsMap.actualAddress.querySelector('input'),
            tel: fieldsMap.tel.querySelector('input'),
            employerSite: fieldsMap.employerSite.querySelector('input'),
            nameJob: fieldsMap.nameJob.querySelector('input'),
            yourIncome: fieldsMap.yourIncome.querySelector('input'),
        },
        dateDefault: {
            dateIssue: fieldsMap.dateIssue.querySelector('input'),
            shiftsFullName: fieldsMap.shiftsFullName.querySelector('input'),
        },
        select: {
            reasonsResidence: fieldsMap.reasonsResidence,
            education: fieldsMap.education,
            seniority: fieldsMap.seniority,
            militaryDuty: fieldsMap.militaryDuty,
            familyStatus: fieldsMap.familyStatus,
            spouseConsent: fieldsMap.spouseConsent,
            employment: fieldsMap.employment,
            basicIncome: fieldsMap.basicIncome,
            numberStaff: fieldsMap.numberStaff,
            employerActiv: fieldsMap.employerActiv,
        },
        registrPeriod: fieldsMap.registrPeriod.querySelector('input'),
        dateEmployment: fieldsMap.dateEmployment.querySelector('input'),
    };

    for (const field in inputsMap.dateDefault) {
        const input = inputsMap.dateDefault[field];
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

    for (const input in inputsMap.fields) {
        inputsMap.fields[input].addEventListener('input', () => {
            if (formEventInput) validate(false);
        })
    }
    for (const input in inputsMap.select) {
        inputsMap.select[input].addEventListener('change', () => {
            if (formEventInput) validate(false);
        })
    }

    function validate(controls = true) {
        const errorSectionItems = [];
        formEventInput = true;
        for (const field in fieldsMap) {
            validateRemoveError(fieldsMap[field]);
        }
        for (const field in inputsMap.select) {
            inputsMap.select[field].classList.remove('_error');
        }
        childrensRemoveError(controls);
        carsRemoveError(controls);
        estateRemoveError(controls);

        const result = createErrorFields(errorSectionItems);

        if (result === false && controls === true) {
             closeAllSection(form);
            openErrorSection(errorSectionItems);
              scrollToErrorSection(errorSectionItems);
        }

        return result;
    }

    function childrensRemoveError(controls) {
        childrensContainer.querySelectorAll('.mortgage-requests__children').forEach(children => {
            if (controls === true) {
                children.classList.add('_inputs-event');
            }
            if (children.classList.contains('_inputs-event')) {
                const label = children.querySelector('.input-text');
                validateRemoveError(label);
            }
        })
    }

    function carsRemoveError(controls) {
        carsContainer.querySelectorAll('.mortgage-requests__car').forEach(car => {
            if (controls === true) {
                car.classList.add('_inputs-event');
            }
            if (car.classList.contains('_inputs-event')) {
                const yearIssue = car.querySelector("[data-mortgage-requests-field='year-issue']");
                const makeModel = car.querySelector("[data-mortgage-requests-field='make-model']");
                const stateNumber = car.querySelector("[data-mortgage-requests-field='state-number']");
                const carCost = car.querySelector("[data-mortgage-requests-field='car-cost']");
                validateRemoveError(yearIssue);
                validateRemoveError(makeModel);
                validateRemoveError(stateNumber);
                validateRemoveError(carCost);
            }
        })
    }

    function estateRemoveError(controls) {
        estatesContainer.querySelectorAll('.mortgage-requests__estate').forEach(estate => {
            if (controls === true) {
                estate.classList.add('_inputs-event');
            }
            if (estate.classList.contains('_inputs-event')) {
                const propertyType = estate.querySelector("[data-mortgage-requests-field='property-type']");
                const typeOfProperty = estate.querySelector("[data-mortgage-requests-field='type-of-property']");
                const basisOwnership = estate.querySelector("[data-mortgage-requests-field='basis-ownership']");
                const estateYearPurchase = estate.querySelector("[data-mortgage-requests-field='estate-year-purchase']");
                const addressObject = estate.querySelector("[data-mortgage-requests-field='address-object']");
                const price = estate.querySelector("[data-mortgage-requests-field='estate-price']");
                const square = estate.querySelector("[data-mortgage-requests-field='estate-square']");
                validateRemoveError(propertyType);
                validateRemoveError(typeOfProperty);
                validateRemoveError(basisOwnership);
                validateRemoveError(estateYearPurchase);
                validateRemoveError(addressObject);
                validateRemoveError(price);
                validateRemoveError(square);
            }
        })
    }

    function createErrorFields(errorSectionItems) {
        let result = true;
        if (!validateCreateErrorField(fieldsMap.placeBirth, inputsMap.fields.placeBirth, 'Укажите место рождения как в паспорте')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.placeBirth);
        }
        if (!validateCreateErrorMask(fieldsMap.seriesNumber, inputsMap.fields.seriesNumber, 'В серии и номере паспорта должно быть 10 цифр', 10)) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.seriesNumber);
        }
        if (!validateCreateErrorMask(fieldsMap.departCode, inputsMap.fields.departCode, 'Введите корректный код подразделения', 6)) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.departCode);
        }
        if (!validateCreateErrorField(fieldsMap.passportIssued, inputsMap.fields.passportIssued, 'Укажите, кем выдан паспорт')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.passportIssued);
        }
        if (!validateCreateErrorField(fieldsMap.registrationAddress, inputsMap.fields.registrationAddress, 'Введите адрес регистрации')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.registrationAddress);
        }
        if (!fieldsMap.residenceAddress.hasAttribute('hidden') && !validateCreateErrorField(fieldsMap.residenceAddress, inputsMap.fields.residenceAddress, 'Укажите адрес проживания')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.residenceAddress);
        }
        if (!fieldsMap.reasonsResidence.hasAttribute('hidden') && !validateCreeateErrorSelect(fieldsMap.reasonsResidence, 'Укажите основание для проживания')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.reasonsResidence);
        }
        if (!validateCreateErrorMask(fieldsMap.snils, inputsMap.fields.snils, 'Введите корректный снилс', 11)) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.snils);
        }

        if (!fieldsMap.surnameOld.hasAttribute('hidden') && !validateCreateErrorField(fieldsMap.surnameOld, inputsMap.fields.surnameOld, 'Введите предыдущую фамилию')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.surnameOld);
        }
        if (!fieldsMap.nameOld.hasAttribute('hidden') && !validateCreateErrorField(fieldsMap.nameOld, inputsMap.fields.nameOld, 'Введите предыдущее имя')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.nameOld);
        }
        if (!validateCreeateErrorSelect(fieldsMap.education, 'Выберите уровень образования из списка')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.education);
        }
        if (!validateCreeateErrorSelect(fieldsMap.seniority, 'Укажите общий трудовой стаж')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.seniority);
        }
        if (!validateCreeateErrorSelect(fieldsMap.militaryDuty, 'Выберите статус воинской обязанности из списка')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.militaryDuty);
        }
        if (!validateCreeateErrorSelect(fieldsMap.familyStatus, 'Укажите ваше семейное положение')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.familyStatus);
        }
        if (spouseDealInput.checked && !validateCreeateErrorSelect(fieldsMap.spouseConsent, 'Укажите согласие супруга из списка')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.spouseConsent);
        }

        if (form.querySelector('[data-mortgage-requests-younger-children="true"]').checked) {
            const childrens = form.querySelectorAll('.mortgage-requests__children');
            if (childrens.length > 0) {
                childrens.forEach(children => {
                    const label = children.querySelector('.input-text');
                    const input = label.querySelector('input');
                    if (!input.value) {
                        result = false;
                        validateCreateError(label, 'Укажите дату рождения ребёнка');
                        addSectionError(errorSectionItems, label);
                    }
                })
            }
        }

        if (!fieldsMap.rentalIncome.closest('.mortgage-requests__field--row').hasAttribute('hidden') &&
            !validateCreateErrorField(fieldsMap.rentalIncome, inputsMap.fields.rentalIncome, 'Укажите средний доход в месяц')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.rentalIncome);
        }
        if (!fieldsMap.pension.closest('.mortgage-requests__field--row').hasAttribute('hidden') &&
            !validateCreateErrorField(fieldsMap.pension, inputsMap.fields.pension, 'Укажите средний доход в месяц')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.pension);
        }
        if (!fieldsMap.otherIncome.closest('.mortgage-requests__field--row').hasAttribute('hidden') &&
            !validateCreateErrorField(fieldsMap.otherIncome, inputsMap.fields.otherIncome, 'Укажите средний доход в месяц')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.otherIncome);
        }

        if (!fieldsMap.credits.closest('.mortgage-requests__field--row').hasAttribute('hidden') &&
            !validateCreateErrorField(fieldsMap.credits, inputsMap.fields.credits, 'Укажите сумму ежемесячных платежей')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.credits);
        }
        if (!fieldsMap.rent.closest('.mortgage-requests__field--row').hasAttribute('hidden') &&
            !validateCreateErrorField(fieldsMap.rent, inputsMap.fields.rent, 'Укажите сумму ежемесячных платежей')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.rent);
        }
        if (!fieldsMap.alimony.closest('.mortgage-requests__field--row').hasAttribute('hidden') &&
            !validateCreateErrorField(fieldsMap.alimony, inputsMap.fields.alimony, 'Укажите сумму ежемесячных платежей')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.alimony);
        }
        if (!inputsMap.dateDefault.dateIssue.value) {
            result = false;
            validateCreateError(fieldsMap.dateIssue, 'Укажите дату выдачи паспорта');
            addSectionError(errorSectionItems, fieldsMap.dateIssue);
        }
        if (!inputsMap.registrPeriod.value && !fieldsMap.registrPeriod.hasAttribute('hidden')) {
            result = false;
            validateCreateError(fieldsMap.registrPeriod, 'Укажите срок действия регистрации');
            addSectionError(errorSectionItems, fieldsMap.registrPeriod);
        }
        if (!inputsMap.dateDefault.shiftsFullName.value && !fieldsMap.shiftsFullName.hasAttribute('hidden')) {
            result = false;
            validateCreateError(fieldsMap.shiftsFullName, 'Укажите дату смены ФИО');
            addSectionError(errorSectionItems, fieldsMap.shiftsFullName);
        }

        carsContainer.querySelectorAll('.mortgage-requests__car').forEach(car => {
            if (car.classList.contains('_inputs-event')) {
                const yearIssue = car.querySelector("[data-mortgage-requests-field='year-issue']");
                const yearIssueInput = yearIssue.querySelector("input");

                const makeModel = car.querySelector("[data-mortgage-requests-field='make-model']");
                const makeModelInput = makeModel.querySelector("input");

                const stateNumber = car.querySelector("[data-mortgage-requests-field='state-number']");
                const stateNumberInput = stateNumber.querySelector("input");

                const carCost = car.querySelector("[data-mortgage-requests-field='car-cost']");
                const carCostInput = carCost.querySelector("input");

                validateCreateErrorYear(yearIssue, yearIssueInput);

                if (!validateCreateErrorField(makeModel, makeModelInput, 'Укажите марку и модель автомобиля')) {
                    result = false;
                    addSectionError(errorSectionItems, makeModel);
                }
                if (!validateCreateErrorField(stateNumber, stateNumberInput, 'Укажите госномер автомобиля')) {
                    result = false;
                    addSectionError(errorSectionItems, stateNumber);
                }
                if (!validateCreateErrorField(carCost, carCostInput, 'Укажите примерную стоимость автомобиля')) {
                    result = false;
                    addSectionError(errorSectionItems, carCost);
                }
            }

        })
        estatesContainer.querySelectorAll('.mortgage-requests__estate').forEach(estate => {
            if (estate.classList.contains('_inputs-event')) {
                const propertyType = estate.querySelector("[data-mortgage-requests-field='property-type']");
                const typeOfProperty = estate.querySelector("[data-mortgage-requests-field='type-of-property']");
                const basisOwnership = estate.querySelector("[data-mortgage-requests-field='basis-ownership']");

                const estateYearPurchase = estate.querySelector("[data-mortgage-requests-field='estate-year-purchase']");
                const estateYearPurchaseInput = estateYearPurchase.querySelector("input");

                const addressObject = estate.querySelector("[data-mortgage-requests-field='address-object']");
                const addressObjectInput = addressObject.querySelector("input");

                const price = estate.querySelector("[data-mortgage-requests-field='estate-price']");
                const priceInput = price.querySelector('input');

                const square = estate.querySelector("[data-mortgage-requests-field='estate-square']");
                const squareInput = square.querySelector('input');

                validateCreateErrorYear(estateYearPurchase, estateYearPurchaseInput);

                if (!validateCreeateErrorSelect(propertyType, 'Выберите тип недвижимости из списка')) {
                    result = false;
                    addSectionError(errorSectionItems, propertyType);
                }
                if (!validateCreeateErrorSelect(typeOfProperty, 'Выберите вид собственности из списка')) {
                    result = false;
                    addSectionError(errorSectionItems, typeOfProperty);
                }
                if (!validateCreeateErrorSelect(basisOwnership, 'Выберите основание собственности из списка')) {
                    result = false;
                    addSectionError(errorSectionItems, basisOwnership);
                }
                if (!validateCreateErrorField(addressObject, addressObjectInput, 'Укажите адрес проживания')) {
                    result = false;
                    addSectionError(errorSectionItems, addressObject);
                }
                if (!validateCreateErrorField(price, priceInput, 'Укажите примерную стоимость недвижимости')) {
                    result = false;
                    addSectionError(errorSectionItems, price);
                }
                if (!validateCreateErrorField(square, squareInput, 'Укажите общую площадь')) {
                    result = false;
                    addSectionError(errorSectionItems, square);
                }

            }
        })
        if (!validateCreeateErrorSelect(fieldsMap.employment, 'Укажите форму занятости')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.employment);
        }
        if (!validateCreeateErrorSelect(fieldsMap.basicIncome, 'Укажите подтверждение основного дохода')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.basicIncome);
        }
        if (!validateCreateErrorField(fieldsMap.nameOrInnEmployer, inputsMap.fields.nameOrInnEmployer, 'Введите название или ИНН организации')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.nameOrInnEmployer);
        }
        if (!validateCreateErrorMask(fieldsMap.ogrn, inputsMap.fields.ogrn, 'Введите корректный ОГРН', 13)) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.ogrn);
        }
        if (!validateCreateErrorMask(fieldsMap.inn, inputsMap.fields.inn, 'Введите корректный ИНН', 10)) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.inn);
        }
        if (!validateCreateErrorField(fieldsMap.legalAddress, inputsMap.fields.legalAddress, 'Укажите юридический адрес организации')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.legalAddress);
        }
        if (!fieldsMap.actualAddress.hasAttribute('hidden') && !validateCreateErrorField(fieldsMap.actualAddress, inputsMap.fields.actualAddress, 'Укажите фактический адрес организации')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.actualAddress);
        }
        if (!validateCreateErrorMask(fieldsMap.tel, inputsMap.fields.tel, validateTextMap.tel, 10)) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.tel);
        }
        if (inputsMap.fields.employerSite.value !== '' && !validateCreateErrorUrl(fieldsMap.employerSite, inputsMap.fields.employerSite, 'Введите адрес сайта в формате example.com')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.employerSite);
        }
        if (!validateCreeateErrorSelect(fieldsMap.numberStaff, 'Укажите численность персонала')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.basicIncome);
        }
        if (!validateCreeateErrorSelect(fieldsMap.employerActiv, 'Укажите сферу деятельности работодателя')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.employerActiv);
        }
        if (!validateCreateErrorField(fieldsMap.nameJob, inputsMap.fields.nameJob, 'Укажите название должности')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.nameJob);
        }
        if (!inputsMap.dateEmployment.value) {
            result = false;
            validateCreateError(fieldsMap.dateEmployment, 'Укажите месяц и год трудоустройства');
            addSectionError(errorSectionItems, fieldsMap.dateEmployment);
        }
        if (!validateCreateErrorField(fieldsMap.yourIncome, inputsMap.fields.yourIncome, 'Укажите средний доход в месяц')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.yourIncome);
        }
        return result;
    }

    function addSectionError(errorSectionItems, item) {
        const spollerItem = item.closest('.spollers__item');
        if (!errorSectionItems.includes(spollerItem)) {
            errorSectionItems.push(spollerItem);
        }
    }

    function scrollToErrorSection(errorSectionItems) {
        const firsErrorSection = errorSectionItems[0];
        const topGap = window.pageYOffset + firsErrorSection.getBoundingClientRect().top;
        window.scrollTo({
            top: topGap - 16,
            behavior: 'smooth'
        })
    }

    function closeAllSection(form) {
        const spollers = form.querySelectorAll('.mortgage-requests__spoller');
        spollers.forEach(spoller => {
            const title = spoller.querySelector('.spollers__title');
            const content = spoller.querySelector('.spollers__body');

            spoller.classList.remove('_active');
            title.classList.remove('_spoller-active');
            content.setAttribute('hidden', '');
        })
    }

    function openErrorSection(errorSectionItems) {
        errorSectionItems.forEach(item => {
            const title = item.querySelector('.spollers__title');
            const content = item.querySelector('.spollers__body');

            item.classList.add('_active');
            title.classList.add('_spoller-active');
            content.removeAttribute('hidden');
        })
    }


    new AirDatepicker(inputsMap.dateEmployment, {
        autoClose: true,
        isMobile: true,
        view: 'months',
        minView: 'months',
        dateFormat: 'MM.yyyy',
        maxDate: new Date(),
        onSelect: (fd) => {
            fd.date ? fieldsMap.dateEmployment.classList.add('_active') : fieldsMap.dateEmployment.classList.remove('_active');
            if (formEventInput) validate(false);
        }
    })
    new AirDatepicker(inputsMap.registrPeriod, {
        autoClose: true,
        isMobile: true,
        minDate: new Date(),
        onSelect: (fd) => {
            fd.date ? fieldsMap.registrPeriod.classList.add('_active') : fieldsMap.registrPeriod.classList.remove('_active');
            if (formEventInput) validate(false);
        }
    })

};
export default mortgageRequests;
