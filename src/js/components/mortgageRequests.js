import AirDatepicker from 'air-datepicker';
import {
    validateTextMap
} from "../modules/validateTextMap";
import {
    currentInputText,
    inputText
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
    validateCreateErrorUrl,
    inputMaskOgrn,
    inputMaskInn,
    inputMaskOgrnip,
    inputMaskPhone
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
        }, 400);
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

            const label = toggle.closest('.toggle-checkbox');
            if (label.hasAttribute('data-mortgage-requests-field') && label.dataset.mortgageRequestsField === 'only-temp-regist') {

                fieldsMap.registrationAddress.toggleAttribute('hidden');
            }
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
        citizenship: form.querySelector("[data-mortgage-requests-field='citizenship']"),
        anotherСountry: form.querySelector("[data-mortgage-requests-field='another-country']"),

        placeBirth: form.querySelector("[data-mortgage-requests-field='place-birth']"),
        seriesNumber: form.querySelector("[data-mortgage-requests-field='series-number']"),
        departCode: form.querySelector("[data-mortgage-requests-field='depart-code']"),
        dateIssue: form.querySelector("[data-mortgage-requests-field='date-issue']"),
        passportIssued: form.querySelector("[data-mortgage-requests-field='passport-issued']"),
        registrationAddress: form.querySelector("[data-mortgage-requests-field='registration-address']"),
        registrationAddressAdd: form.querySelector("[data-mortgage-requests-field='registration-address-add']"),
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
    };
    const inputsMap = {
        fields: {
            placeBirth: fieldsMap.placeBirth.querySelector('input'),
            seriesNumber: fieldsMap.seriesNumber.querySelector('input'),
            departCode: fieldsMap.departCode.querySelector('input'),
            passportIssued: fieldsMap.passportIssued.querySelector('input'),
            registrationAddress: fieldsMap.registrationAddress.querySelector('input'),
            registrationAddressAdd: fieldsMap.registrationAddressAdd.querySelector('input'),
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
        },
        dateDefault: {
            dateIssue: fieldsMap.dateIssue.querySelector('input'),
            shiftsFullName: fieldsMap.shiftsFullName.querySelector('input'),
        },
        select: {
            citizenship: fieldsMap.citizenship,
            reasonsResidence: fieldsMap.reasonsResidence,
            education: fieldsMap.education,
            seniority: fieldsMap.seniority,
            militaryDuty: fieldsMap.militaryDuty,
            familyStatus: fieldsMap.familyStatus,
            spouseConsent: fieldsMap.spouseConsent,
            employment: fieldsMap.employment,
        },
    };
    fieldsMap.employment.addEventListener('change', () => {
        const value = fieldsMap.employment.querySelector('.choices__list.choices__list--single .choices__item.choices__item--selectable').dataset.value;
        employmentValue(value);

        emergingBlockScroll('.mortgage-requests .mortgage-requests__save', '.footer-fixed.mortgage-requests-fixed', 99999999, true, true);
    })
    employmentValue('default');
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
            if (inputsMap.select[input] === inputsMap.select.citizenship) {
                const value = inputsMap.select.citizenship.querySelector('.choices__list.choices__list--single .choices__item.choices__item--selectable').dataset.value;
                if (value === 'another') {
                    fieldsMap.anotherСountry.removeAttribute('hidden');
                } else {
                    fieldsMap.anotherСountry.setAttribute('hidden', '');
                }
            }
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
        incomeRemoveError(controls);
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
        if (!fieldsMap.registrationAddress.hasAttribute('hidden') && !validateCreateErrorField(fieldsMap.registrationAddress, inputsMap.fields.registrationAddress, 'Введите адрес регистрации')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.registrationAddress);
        }
        if (!fieldsMap.registrationAddressAdd.hasAttribute('hidden') && !validateCreateErrorField(fieldsMap.registrationAddressAdd, inputsMap.fields.registrationAddressAdd, 'Введите адрес временной регистрации')) {
            result = false;
            addSectionError(errorSectionItems, fieldsMap.registrationAddressAdd);
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

        const incomeName = form.querySelector('[data-mortgage-requests-income-name]');
        if (incomeName.dataset.mortgageRequestsIncomeName === 'business') {
            result = createErrorIncomeBusiness(result, errorSectionItems);
        }
        if (incomeName.dataset.mortgageRequestsIncomeName === 'hiring') {
            result = createErrorIncomeHiring(result, errorSectionItems);
        }
        if (incomeName.dataset.mortgageRequestsIncomeName === 'individualEnt') {
            result = createErrorIncomeIndividualEnt(result, errorSectionItems);
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

    function employmentValue(value) {
        const incomes = form.querySelectorAll('[data-mortgage-requests-income]');
        const nameIncome = form.querySelector('[data-mortgage-requests-income-name]');
        const currentIncome = form.querySelector(`[data-mortgage-requests-income="${value}"]`);
        nameIncome.setAttribute('data-mortgage-requests-income-name', value);
        nameIncome.classList.remove('_inputs-event');
        if (value === 'default') {
            incomes.forEach(income => {
                income.setAttribute('hidden', '');
                income.innerHTML = '';
            });
        } else {
            incomes.forEach(income => {
                income !== currentIncome ? income.setAttribute('hidden', '') : income.removeAttribute('hidden');
            })
        }

        let html;
        if (value === 'business') {
            html = `
            <div class="mortgage-requests__fields">
            <div class="select-secondary mortgage-requests__field--row" data-mortgage-requests-field="basic-income">
                <div class="select-secondary__wrapper">
                    <span class="select-secondary__placeholder">
                        Подтверждение основного дохода
                    </span>
                    <select class="select-secondary__body" hidden name="complex">
                        <option placeholder>Не выбрано</option>
                        <option value="room-2">Справка по форме банка</option>
                        <option value="room-1">2-НДФЛ</option>
                        <option value="room-1">Без подтверждения</option>
                    </select>
                </div>
            </div>
            <div class="input-text input-text--no-exp mortgage-requests__field--row" data-mortgage-requests-field="name-or-inn"
                data-validate-required>
                <label class="input-text__label">
                    <span>Название или ИНН организации</span>
                    <input type="text" name="Название или ИНН организации" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <div class="input-text input-text--no-exp" data-mortgage-requests-field="ogrn">
                <label class="input-text__label">
                    <span>ОГРН</span>
                    <input type="text" name="ОГРН" class="input-reset input-text__input input-ogrn-mask" value="" placeholder="">
                </label>
            </div>

            <div class="input-text input-text--no-exp" data-mortgage-requests-field="inn">
                <label class="input-text__label">
                    <span>ИНН</span>
                    <input type="text" name="ИНН" class="input-reset input-text__input input-inn-mask" value="" placeholder="">
                </label>
            </div>
        </div>
        <div class="mortgage-requests__fields">
            <div class="input-text input-text--no-exp mortgage-requests__field--row" data-mortgage-requests-field="legal-address"
                data-validate-required>
                <label class="input-text__label">
                    <span>Юридический адрес организации</span>
                    <input type="text" name="Юридический адрес организации" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <label class="toggle-checkbox mortgage-requests__field--row" data-mortgage-requests-field="legal-actual-toggle">
                <input type="checkbox" name="toggle-1" data-mortgage-requests-toggle="4">
                <div aria-hidden="true"></div>
                <span>Юридический адрес совпадает с фактическим</span>
            </label>
            <div class="input-text input-text--no-exp mortgage-requests__field--row" data-mortgage-requests-field="actual-address"
                data-validate-required data-mortgage-requests-content="4">
                <label class="input-text__label">
                    <span>Фактический адрес организации</span>
                    <input type="text" name="Фактический адрес организации" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <div class="input-text input-text--no-exp" data-mortgage-requests-field="tel">
                <label class="input-text__label">
                    <span>Рабочий телефон</span>
                    <input type="text" name="Рабочий телефон" class="input-reset input-text__input input-phone-mask" value="" placeholder="">
                </label>
            </div>
            <div class="input-text input-text--no-exp input-text--only-number" data-mortgage-requests-field="add-tel">
                <label class="input-text__label">
                    <span>Добавочный телефон</span>
                    <input type="text" name="Рабочий телефон" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <div class="input-text input-text--no-exp" data-mortgage-requests-field="site">
                <label class="input-text__label">
                    <span>Сайт организации</span>
                    <input type="text" name="Сайт организации" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <div class="select-secondary" data-mortgage-requests-field="number-staff">
                <div class="select-secondary__wrapper">
                    <span class="select-secondary__placeholder">
                        Численность персонала
                    </span>
                    <select class="select-secondary__body" hidden name="complex">
                        <option placeholder>Не выбрано</option>
                        <option value="room-2">До 10</option>
                        <option value="room-1">11-20</option>
                        <option value="room-1">21-50</option>
                        <option value="room-1">51-100</option>
                    </select>
                </div>
            </div>
            <div class="select-secondary mortgage-requests__field--row" data-mortgage-requests-field="field-activit">
                <div class="select-secondary__wrapper">
                    <span class="select-secondary__placeholder">
                        Сфера деятельности организации
                    </span>
                    <select class="select-secondary__body" hidden name="complex">
                        <option placeholder>Не выбрано</option>
                        <option value="room-2">Вооружённые силы</option>
                        <option value="room-2">Медицина</option>
                        <option value="room-2">Наука</option>
                        <option value="room-2">Другое</option>
                    </select>
                </div>
            </div>
            <div class="input-text input-text--no-exp mortgage-requests__field--row" data-mortgage-requests-field="date-registration">
                <label class="input-text__label">
                    <span>Месяц и год регистрации организации</span>
                    <input type="text" name="Месяц и год регистрации организации" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
        </div>
        <div class="mortgage-requests__fields" data-mortgage-requests-field="incomes">
            <div class="mortgage-requests__field--row">
                <h4 class="title-4 mortgage-requests__field-subtitle">
                    Доходы
                </h4>
                <p class="mortgage-requests__field-descr">
                    Укажите средний доход в месяц за последние полгода после уплаты налогов (на руки). Учитывается только доход от ведения бизнеса в указанной организации.
                </p>
                <div class="input-text input-text--only-number" data-mortgage-requests-field="your-income" data-validate-required
                    data-validate-average-invome-default>
                    <label class="input-text__label">
                        <span>Средний доход в месяц</span>
                        <input type="text" name="Средний доход в месяц" maxlength="12" class="input-reset input-text__input" placeholder="">
                        <span>₽</span>
                    </label>
                </div>
            </div>
        </div>
            `;
        }
        if (value === 'hiring') {
            html = `
            <div class="mortgage-requests__fields">
            <div class="select-secondary mortgage-requests__field--row" data-mortgage-requests-field="basic-income">
                <div class="select-secondary__wrapper">
                    <span class="select-secondary__placeholder">
                        Подтверждение основного дохода
                    </span>
                    <select class="select-secondary__body" hidden name="complex">
                        <option placeholder>Не выбрано</option>
                        <option value="room-2">Справка по форме банка</option>
                        <option value="room-1">2-НДФЛ</option>
                        <option value="room-1">Без подтверждения</option>
                    </select>
                </div>
            </div>
            <div class="input-text input-text--no-exp mortgage-requests__field--row" data-mortgage-requests-field="name-or-inn"
                data-validate-required>
                <label class="input-text__label">
                    <span>Название или ИНН работодателя</span>
                    <input type="text" name="Название или ИНН работодателя" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <div class="input-text input-text--no-exp" data-mortgage-requests-field="ogrn-ogrnip">
                <label class="input-text__label">
                    <span>ОГРН/ОГРНИП</span>
                    <input type="text" name="ОГРН/ОГРНИП" class="input-reset input-text__input input-ogrnip-mask" value="" placeholder="">
                </label>
            </div>

            <div class="input-text input-text--no-exp" data-mortgage-requests-field="inn">
                <label class="input-text__label">
                    <span>ИНН</span>
                    <input type="text" name="ИНН" class="input-reset input-text__input input-inn-mask" value="" placeholder="">
                </label>
            </div>
        </div>
        <div class="mortgage-requests__fields">
            <div class="input-text input-text--no-exp mortgage-requests__field--row" data-mortgage-requests-field="legal-address"
                data-validate-required>
                <label class="input-text__label">
                    <span>Юридический адрес работодателя</span>
                    <input type="text" name="Юридический адрес работодателя" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <label class="toggle-checkbox mortgage-requests__field--row" data-mortgage-requests-field="legal-actual-toggle">
                <input type="checkbox" name="toggle-1" data-mortgage-requests-toggle="4">
                <div aria-hidden="true"></div>
                <span>Юридический адрес совпадает с фактическим</span>
            </label>
            <div class="input-text input-text--no-exp mortgage-requests__field--row" data-mortgage-requests-field="actual-address"
                data-validate-required data-mortgage-requests-content="4">
                <label class="input-text__label">
                    <span>Фактический адрес работодателя</span>
                    <input type="text" name="Фактический адрес работодателя" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <div class="input-text input-text--no-exp" data-mortgage-requests-field="tel">
                <label class="input-text__label">
                    <span>Рабочий телефон</span>
                    <input type="text" name="Рабочий телефон" class="input-reset input-text__input input-phone-mask" value="" placeholder="">
                </label>
            </div>
            <div class="input-text input-text--no-exp input-text--only-number" data-mortgage-requests-field="add-tel">
                <label class="input-text__label">
                    <span>Добавочный телефон</span>
                    <input type="text" name="Рабочий телефон" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <div class="input-text input-text--no-exp" data-mortgage-requests-field="site">
                <label class="input-text__label">
                    <span>Сайт работодателя</span>
                    <input type="text" name="Рабочий телефон" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <div class="select-secondary" data-mortgage-requests-field="number-staff">
                <div class="select-secondary__wrapper">
                    <span class="select-secondary__placeholder">
                        Численность персонала
                    </span>
                    <select class="select-secondary__body" hidden name="complex">
                        <option placeholder>Не выбрано</option>
                        <option value="room-2">До 10</option>
                        <option value="room-1">11-20</option>
                        <option value="room-1">21-50</option>
                        <option value="room-1">51-100</option>
                    </select>
                </div>
            </div>
            <div class="select-secondary mortgage-requests__field--row" data-mortgage-requests-field="field-activit">
                <div class="select-secondary__wrapper">
                    <span class="select-secondary__placeholder">
                        Сфера деятельности работодателя
                    </span>
                    <select class="select-secondary__body" hidden name="complex">
                        <option placeholder>Не выбрано</option>
                        <option value="room-2">Вооружённые силы</option>
                        <option value="room-2">Медицина</option>
                        <option value="room-2">Наука</option>
                        <option value="room-2">Другое</option>
                    </select>
                </div>
            </div>
            <div class="input-text input-text--no-exp" data-mortgage-requests-field="name-job" data-validate-required>
                <label class="input-text__label">
                    <span>Название должности</span>
                    <input type="text" name="Название должности" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <div class="input-text input-text--no-exp" data-mortgage-requests-field="date-registration">
                <label class="input-text__label">
                    <span>Месяц и год трудоустройства</span>
                    <input type="text" name="Название должности" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <div class="checkbox-secondary mortgage-requests__field--row" data-mortgage-requests-field="probation">
                <input id="developer_2" name="developer-name_2" class="checkbox-secondary__input" type="checkbox" value="true">
                <label for="developer_2" class="checkbox-secondary__label">
                    <span class="checkbox-secondary__text">
                        <span>Испытательный срок завершён</span>
                    </span>
                </label>
            </div>
        </div>
        <div class="mortgage-requests__fields" data-mortgage-requests-field="incomes">
            <div class="mortgage-requests__field--row">
                <h4 class="title-4 mortgage-requests__field-subtitle">
                    Доходы
                </h4>
                <p class="mortgage-requests__field-descr">
                    Укажите средний доход в месяц за последние полгода после
                    уплаты налогов (на руки). Учитывается только доход по основному месту работы
                </p>
                <div class="input-text input-text--only-number" data-mortgage-requests-field="your-income" data-validate-required
                    data-validate-average-invome-default>
                    <label class="input-text__label">
                        <span>Средний доход в месяц</span>
                        <input type="text" name="Средний доход в месяц" maxlength="12" class="input-reset input-text__input" placeholder="">
                        <span>₽</span>
                    </label>
                </div>
            </div>
        </div>
            `;
        }
        if (value === 'individualEnt') {
            html = `
            <div class="mortgage-requests__fields">
            <div class="select-secondary mortgage-requests__field--row" data-mortgage-requests-field="basic-income">
                <div class="select-secondary__wrapper">
                    <span class="select-secondary__placeholder">
                        Подтверждение основного дохода
                    </span>
                    <select class="select-secondary__body" hidden name="complex">
                        <option placeholder>Не выбрано</option>
                        <option value="room-1">Налоговая декларация</option>
                        <option value="room-2">Без подтверждения</option>
                    </select>
                </div>
            </div>
            <div class="input-text input-text--no-exp mortgage-requests__field--row" data-mortgage-requests-field="name-or-inn"
                data-validate-required>
                <label class="input-text__label">
                    <span>Название или ИНН ИП</span>
                    <input type="text" name="Название или ИНН работодателя" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <div class="input-text input-text--no-exp" data-mortgage-requests-field="ogrn-ogrnip">
                <label class="input-text__label">
                    <span>ОГРНИП</span>
                    <input type="text" name="ОГРНИП" class="input-reset input-text__input input-ogrnip-mask" value="" placeholder="">
                </label>
            </div>
            <div class="input-text input-text--no-exp" data-mortgage-requests-field="inn">
                <label class="input-text__label">
                    <span>ИНН</span>
                    <input type="text" name="ИНН" class="input-reset input-text__input input-inn-mask" value="" placeholder="">
                </label>
            </div>
            
        </div>
        <div class="mortgage-requests__fields">
            <div class="input-text input-text--no-exp mortgage-requests__field--row" data-mortgage-requests-field="legal-address"
                data-validate-required>
                <label class="input-text__label">
                    <span>Адрес регистрации ИП</span>
                    <input type="text" name="Адрес регистрации ИП" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <label class="toggle-checkbox mortgage-requests__field--row" data-mortgage-requests-field="legal-actual-toggle">
                <input type="checkbox" name="toggle-1" data-mortgage-requests-toggle="4">
                <div aria-hidden="true"></div>
                <span>Юридический адрес совпадает с фактическим</span>
            </label>
            <div class="input-text input-text--no-exp mortgage-requests__field--row" data-mortgage-requests-field="actual-address"
                data-validate-required data-mortgage-requests-content="4">
                <label class="input-text__label">
                    <span>Фактический адрес  ИП (склад, магазин, кафе и т.д.)</span>
                    <input type="text" name="Фактический адрес  ИП (склад, магазин, кафе и т.д.)" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <div class="input-text input-text--no-exp" data-mortgage-requests-field="tel">
                <label class="input-text__label">
                    <span>Рабочий телефон</span>
                    <input type="text" name="Рабочий телефон" class="input-reset input-text__input input-phone-mask" value="" placeholder="">
                </label>
            </div>
            <div class="input-text input-text--no-exp input-text--only-number" data-mortgage-requests-field="add-tel">
                <label class="input-text__label">
                    <span>Добавочный телефон</span>
                    <input type="text" name="Рабочий телефон" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <div class="input-text input-text--no-exp" data-mortgage-requests-field="site">
                <label class="input-text__label">
                    <span>Сайт ИП</span>
                    <input type="text" name="Сайт ИП" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <div class="select-secondary" data-mortgage-requests-field="number-staff">
                <div class="select-secondary__wrapper">
                    <span class="select-secondary__placeholder">
                        Численность персонала
                    </span>
                    <select class="select-secondary__body" hidden name="complex">
                        <option placeholder>Не выбрано</option>
                        <option value="room-2">До 10</option>
                        <option value="room-1">11-20</option>
                        <option value="room-1">21-50</option>
                        <option value="room-1">51-100</option>
                    </select>
                </div>
            </div>
            <div class="select-secondary mortgage-requests__field--row" data-mortgage-requests-field="field-activit">
                <div class="select-secondary__wrapper">
                    <span class="select-secondary__placeholder">
                        Сфера деятельности ИП
                    </span>
                    <select class="select-secondary__body" hidden name="complex">
                        <option placeholder>Не выбрано</option>
                        <option value="room-2">Вооружённые силы</option>
                        <option value="room-2">Медицина</option>
                        <option value="room-2">Наука</option>
                        <option value="room-2">Другое</option>
                    </select>
                </div>
            </div>
            <div class="input-text input-text--no-exp" data-mortgage-requests-field="date-registration">
                <label class="input-text__label">
                    <span>Месяц и год регистрации ИП</span>
                    <input type="text" name="Название должности" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
        </div>
        <div class="mortgage-requests__fields" data-mortgage-requests-field="incomes">
            <div class="mortgage-requests__field--row">
                <h4 class="title-4 mortgage-requests__field-subtitle">
                    Доходы
                </h4>
                <p class="mortgage-requests__field-descr">
                    Укажите средний доход в месяц за последние полгода после уплаты налогов (на руки). Учитывается только доход от индивидуального предпринимательства
                </p>
                <div class="input-text input-text--only-number" data-mortgage-requests-field="your-income" data-validate-required
                    data-validate-average-invome-default>
                    <label class="input-text__label">
                        <span>Средний доход в месяц</span>
                        <input type="text" name="Средний доход в месяц" maxlength="12" class="input-reset input-text__input" placeholder="">
                        <span>₽</span>
                    </label>
                </div>
            </div>
        </div>
            `;
        }
        if (value !== 'default') {
            currentIncome.innerHTML = html;
            updateFieldsIncome(currentIncome);
        }
    }

    function updateFieldsIncome(container) {
        const inputsText = container.querySelectorAll('.input-text');
        const selectSecondary = container.querySelectorAll('.select-secondary__body');


        const inputsPhone = container.querySelectorAll('.input-phone-mask');
        const inputsOgrn = container.querySelectorAll('.input-ogrn-mask');
        const inputsOgrnip = container.querySelectorAll('.input-ogrnip-mask');
        const inputsInn = container.querySelectorAll('.input-inn-mask');

        const dateRegistration = container.querySelector('[data-mortgage-requests-field="date-registration"]');
        const dateRegistrationInput = dateRegistration.querySelector('input');

        inputsPhone.forEach(input => inputMaskPhone(input));
        inputsOgrn.forEach(input => inputMaskOgrn(input));
        inputsOgrnip.forEach(input => inputMaskOgrnip(input));
        inputsInn.forEach(input => inputMaskInn(input));


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


        new AirDatepicker(dateRegistrationInput, {
            autoClose: true,
            isMobile: true,
            view: 'months',
            minView: 'months',
            dateFormat: 'MM.yyyy',
            maxDate: new Date(),
            onSelect: (fd) => {
                fd.date ? dateRegistration.classList.add('_active') : dateRegistration.classList.remove('_active');
                if (formEventInput) validate(false);
            }
        })
    }

    function createErrorIncomeBusiness(result, errorSectionItems) {
        const container = form.querySelector('[data-mortgage-requests-income-name]');
        if (container.classList.contains('_inputs-event')) {
            const basicIncome = container.querySelector('[data-mortgage-requests-field="basic-income"]');
            const nameOrInn = container.querySelector('[data-mortgage-requests-field="name-or-inn"]');
            const ogrn = container.querySelector('[data-mortgage-requests-field="ogrn"]');
            const ogrnOgrnip = container.querySelector('[data-mortgage-requests-field="ogrn-ogrnip"]');
            const inn = container.querySelector('[data-mortgage-requests-field="inn"]');
            const legalAddress = container.querySelector('[data-mortgage-requests-field="legal-address"]');
            const actualAddress = container.querySelector('[data-mortgage-requests-field="actual-address"]');
            const tel = container.querySelector('[data-mortgage-requests-field="tel"]');
            const site = container.querySelector('[data-mortgage-requests-field="site"]');
            const numberStaff = container.querySelector('[data-mortgage-requests-field="number-staff"]');
            const fieldActivit = container.querySelector('[data-mortgage-requests-field="field-activit"]');
            const dateRegistration = container.querySelector('[data-mortgage-requests-field="date-registration"]');
            const yourIncome = container.querySelector('[data-mortgage-requests-field="your-income"]');
            if (basicIncome && !validateCreeateErrorSelect(basicIncome, 'Укажите подтверждение основного дохода')) {
                result = false;
                addSectionError(errorSectionItems, basicIncome);
            }
            if (nameOrInn && !validateCreateErrorField(nameOrInn, nameOrInn.querySelector('input'), 'Введите название или ИНН организации')) {
                result = false;
                addSectionError(errorSectionItems, nameOrInn);
            }
            if (ogrn && !validateCreateErrorMask(ogrn, ogrn.querySelector('input'), 'Введите корректный ОГРН', 13)) {
                result = false;
                addSectionError(errorSectionItems, ogrn);
            }
            if (ogrnOgrnip && !validateCreateErrorMask(ogrnOgrnip, ogrnOgrnip.querySelector('input'), 'Введите корректный ОГРН/ОГРНИП', 13)) {
                result = false;
                addSectionError(errorSectionItems, ogrnOgrnip);
            }
            if (inn && !validateCreateErrorMask(inn, inn.querySelector('input'), 'Введите корректный ИНН', 10)) {
                result = false;
                addSectionError(errorSectionItems, inn);
            }
            if (legalAddress && !validateCreateErrorField(legalAddress, legalAddress.querySelector('input'), 'Укажите юридический адрес организации')) {
                result = false;
                addSectionError(errorSectionItems, legalAddress);
            }
            if (actualAddress && !actualAddress.hasAttribute('hidden') && !validateCreateErrorField(actualAddress, actualAddress.querySelector('input'), 'Укажите фактический адрес организации')) {
                result = false;
                addSectionError(errorSectionItems, actualAddress);
            }
            if (tel && !validateCreateErrorMask(tel, tel.querySelector('input'), validateTextMap.tel, 10)) {
                result = false;
                addSectionError(errorSectionItems, tel);
            }
            if (site && site.querySelector('input').value !== '' && !validateCreateErrorUrl(site, site.querySelector('input'),
                    'Введите адрес сайта в формате example.com')) {
                result = false;
                addSectionError(errorSectionItems, site);
            }
            if (numberStaff && !validateCreeateErrorSelect(numberStaff, 'Укажите численность персонала')) {
                result = false;
                addSectionError(errorSectionItems, numberStaff);
            }
            if (fieldActivit && !validateCreeateErrorSelect(fieldActivit, 'Укажите сферу деятельности организации')) {
                result = false;
                addSectionError(errorSectionItems, fieldActivit);
            }
            if (dateRegistration && !dateRegistration.querySelector('input').value) {
                result = false;
                validateCreateError(dateRegistration, 'Укажите месяц и год регистрации организации');
                addSectionError(errorSectionItems, dateRegistration);
            }
            if (yourIncome && !validateCreateErrorField(yourIncome, yourIncome.querySelector('input'), 'Укажите средний доход в месяц')) {
                result = false;
                addSectionError(errorSectionItems, yourIncome);
            }
            return result;
        }
    }

    function createErrorIncomeHiring(result, errorSectionItems) {
        const container = form.querySelector('[data-mortgage-requests-income-name]');
        if (container.classList.contains('_inputs-event')) {
            const basicIncome = container.querySelector('[data-mortgage-requests-field="basic-income"]');
            const nameOrInn = container.querySelector('[data-mortgage-requests-field="name-or-inn"]');
            const ogrnOgrnip = container.querySelector('[data-mortgage-requests-field="ogrn-ogrnip"]');
            const inn = container.querySelector('[data-mortgage-requests-field="inn"]');
            const legalAddress = container.querySelector('[data-mortgage-requests-field="legal-address"]');
            const actualAddress = container.querySelector('[data-mortgage-requests-field="actual-address"]');
            const tel = container.querySelector('[data-mortgage-requests-field="tel"]');
            const site = container.querySelector('[data-mortgage-requests-field="site"]');
            const numberStaff = container.querySelector('[data-mortgage-requests-field="number-staff"]');
            const fieldActivit = container.querySelector('[data-mortgage-requests-field="field-activit"]');
            const dateRegistration = container.querySelector('[data-mortgage-requests-field="date-registration"]');
            const yourIncome = container.querySelector('[data-mortgage-requests-field="your-income"]');
            const nameJob = container.querySelector('[data-mortgage-requests-field="name-job"]');
            if (basicIncome && !validateCreeateErrorSelect(basicIncome, 'Укажите подтверждение основного дохода')) {
                result = false;
                addSectionError(errorSectionItems, basicIncome);
            }
            if (nameOrInn && !validateCreateErrorField(nameOrInn, nameOrInn.querySelector('input'), 'Введите название или ИНН работодателя')) {
                result = false;
                addSectionError(errorSectionItems, nameOrInn);
            }
            if (ogrnOgrnip && !validateCreateErrorMask(ogrnOgrnip, ogrnOgrnip.querySelector('input'), 'Введите корректный ОГРН/ОГРНИП', 13)) {
                result = false;
                addSectionError(errorSectionItems, ogrnOgrnip);
            }
            if (inn && !validateCreateErrorMask(inn, inn.querySelector('input'), 'Введите корректный ИНН', 10)) {
                result = false;
                addSectionError(errorSectionItems, inn);
            }
            if (legalAddress && !validateCreateErrorField(legalAddress, legalAddress.querySelector('input'), 'Укажите юридический адрес работодателя')) {
                result = false;
                addSectionError(errorSectionItems, legalAddress);
            }
            if (actualAddress && !actualAddress.hasAttribute('hidden') && !validateCreateErrorField(actualAddress, actualAddress.querySelector('input'), 'Укажите фактический адрес работодателя')) {
                result = false;
                addSectionError(errorSectionItems, actualAddress);
            }
            if (tel && !validateCreateErrorMask(tel, tel.querySelector('input'), validateTextMap.tel, 10)) {
                result = false;
                addSectionError(errorSectionItems, tel);
            }
            if (site && site.querySelector('input').value !== '' && !validateCreateErrorUrl(site, site.querySelector('input'),
                    'Введите адрес сайта в формате example.com')) {
                result = false;
                addSectionError(errorSectionItems, site);
            }
            if (numberStaff && !validateCreeateErrorSelect(numberStaff, 'Укажите численность персонала')) {
                result = false;
                addSectionError(errorSectionItems, numberStaff);
            }
            if (fieldActivit && !validateCreeateErrorSelect(fieldActivit, 'Укажите сферу деятельности работодателя')) {
                result = false;
                addSectionError(errorSectionItems, fieldActivit);
            }
            if (nameJob && !validateCreateErrorField(nameJob, nameJob.querySelector('input'), 'Укажите должность')) {
                result = false;
                addSectionError(errorSectionItems, nameJob);
            }
            if (dateRegistration && !dateRegistration.querySelector('input').value) {
                result = false;
                validateCreateError(dateRegistration, 'Укажите месяц и год трудоустройства');
                addSectionError(errorSectionItems, dateRegistration);
            }
            if (yourIncome && !validateCreateErrorField(yourIncome, yourIncome.querySelector('input'), 'Укажите средний доход в месяц')) {
                result = false;
                addSectionError(errorSectionItems, yourIncome);
            }
            return result;
        }
    }

    function createErrorIncomeIndividualEnt(result, errorSectionItems) {
        const container = form.querySelector('[data-mortgage-requests-income-name]');
        if (container.classList.contains('_inputs-event')) {
            const basicIncome = container.querySelector('[data-mortgage-requests-field="basic-income"]');
            const nameOrInn = container.querySelector('[data-mortgage-requests-field="name-or-inn"]');
            const ogrnOgrnip = container.querySelector('[data-mortgage-requests-field="ogrn-ogrnip"]');
            const inn = container.querySelector('[data-mortgage-requests-field="inn"]');
            const legalAddress = container.querySelector('[data-mortgage-requests-field="legal-address"]');
            const actualAddress = container.querySelector('[data-mortgage-requests-field="actual-address"]');
            const tel = container.querySelector('[data-mortgage-requests-field="tel"]');
            const site = container.querySelector('[data-mortgage-requests-field="site"]');
            const numberStaff = container.querySelector('[data-mortgage-requests-field="number-staff"]');
            const fieldActivit = container.querySelector('[data-mortgage-requests-field="field-activit"]');
            const dateRegistration = container.querySelector('[data-mortgage-requests-field="date-registration"]');
            const yourIncome = container.querySelector('[data-mortgage-requests-field="your-income"]');
            if (basicIncome && !validateCreeateErrorSelect(basicIncome, 'Укажите подтверждение основного дохода')) {
                result = false;
                addSectionError(errorSectionItems, basicIncome);
            }
            if (nameOrInn && !validateCreateErrorField(nameOrInn, nameOrInn.querySelector('input'), 'Введите ФИО или ИНН')) {
                result = false;
                addSectionError(errorSectionItems, nameOrInn);
            }
            if (ogrnOgrnip && !validateCreateErrorMask(ogrnOgrnip, ogrnOgrnip.querySelector('input'), 'Введите корректный ОГРНИП', 15)) {
                result = false;
                addSectionError(errorSectionItems, ogrnOgrnip);
            }
            if (inn && !validateCreateErrorMask(inn, inn.querySelector('input'), 'Введите корректный ИНН', 10)) {
                result = false;
                addSectionError(errorSectionItems, inn);
            }
            if (legalAddress && !validateCreateErrorField(legalAddress, legalAddress.querySelector('input'), 'Укажите адрес регистрации ИП')) {
                result = false;
                addSectionError(errorSectionItems, legalAddress);
            }
            if (actualAddress && !actualAddress.hasAttribute('hidden') && !validateCreateErrorField(actualAddress, actualAddress.querySelector('input'), 'Укажите фактический адрес ИП')) {
                result = false;
                addSectionError(errorSectionItems, actualAddress);
            }
            if (tel && !validateCreateErrorMask(tel, tel.querySelector('input'), validateTextMap.tel, 10)) {
                result = false;
                addSectionError(errorSectionItems, tel);
            }
            if (site && site.querySelector('input').value !== '' && !validateCreateErrorUrl(site, site.querySelector('input'),
                    'Введите адрес сайта в формате example.com')) {
                result = false;
                addSectionError(errorSectionItems, site);
            }
            if (numberStaff && !validateCreeateErrorSelect(numberStaff, 'Укажите численность персонала')) {
                result = false;
                addSectionError(errorSectionItems, numberStaff);
            }
            if (fieldActivit && !validateCreeateErrorSelect(fieldActivit, 'Выберите сферу деятельности из списка')) {
                result = false;
                addSectionError(errorSectionItems, fieldActivit);
            }
            if (dateRegistration && !dateRegistration.querySelector('input').value) {
                result = false;
                validateCreateError(dateRegistration, 'Укажите месяц и год регистрации ИП');
                addSectionError(errorSectionItems, dateRegistration);
            }
            if (yourIncome && !validateCreateErrorField(yourIncome, yourIncome.querySelector('input'), 'Укажите средний доход в месяц')) {
                result = false;
                addSectionError(errorSectionItems, yourIncome);
            }
            return result;
        }
    }


    function incomeRemoveError(controls) {
        const container = form.querySelector('[data-mortgage-requests-income-name]');
        if (container.dataset.mortgageRequestsIncomeName === 'default') return;
        if (controls === true) {
            container.classList.add('_inputs-event');
        }
        if (container.classList.contains('_inputs-event')) {
            const basicIncome = container.querySelector("[data-mortgage-requests-field='basic-income']");
            const nameOrInn = container.querySelector('[data-mortgage-requests-field="name-or-inn"]');
            const ogrn = container.querySelector('[data-mortgage-requests-field="ogrn"]');
            const ogrnOgrnip = container.querySelector('[data-mortgage-requests-field="ogrn-ogrnip"]');
            const inn = container.querySelector('[data-mortgage-requests-field="inn"]');
            const legalAddress = container.querySelector('[data-mortgage-requests-field="legal-address"]');
            const actualAddress = container.querySelector('[data-mortgage-requests-field="actual-address"]');
            const tel = container.querySelector('[data-mortgage-requests-field="tel"]');
            const site = container.querySelector('[data-mortgage-requests-field="site"]');
            const numberStaff = container.querySelector('[data-mortgage-requests-field="number-staff"]');
            const fieldActivit = container.querySelector('[data-mortgage-requests-field="field-activit"]');
            const dateRegistration = container.querySelector('[data-mortgage-requests-field="date-registration"]');
            const yourIncome = container.querySelector('[data-mortgage-requests-field="your-income"]');
            const nameJob = container.querySelector('[data-mortgage-requests-field="name-job"]');
            if (basicIncome) validateRemoveError(basicIncome);
            if (nameOrInn) validateRemoveError(nameOrInn);
            if (ogrn) validateRemoveError(ogrn);
            if (ogrnOgrnip) validateRemoveError(ogrnOgrnip);
            if (inn) validateRemoveError(inn);
            if (legalAddress) validateRemoveError(legalAddress);
            if (actualAddress) validateRemoveError(actualAddress);
            if (tel) validateRemoveError(tel);
            if (site) validateRemoveError(site);
            if (numberStaff) validateRemoveError(numberStaff);
            if (fieldActivit) validateRemoveError(fieldActivit);
            if (dateRegistration) validateRemoveError(dateRegistration);
            if (yourIncome) validateRemoveError(yourIncome);
            if (nameJob) validateRemoveError(nameJob);
        }
    }

};
export default mortgageRequests;
