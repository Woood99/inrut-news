import Inputmask from "inputmask";
import modal from '../modules/modal';
import AirDatepicker from 'air-datepicker';
import {
    validateTextMap
} from "../modules/validateTextMap";
export const validateRadioPrimary = (formSelector, textareaSelector, btnSelector, radiosSelector) => {
    const forms = document.querySelectorAll(formSelector);
    if (forms.length === 0) return;
    forms.forEach(form => {
        const textarea = form.querySelector(textareaSelector);
        const btn = form.querySelector(btnSelector);
        const radios = form.querySelectorAll(radiosSelector);

        function checkForm() {
            let flag = false;
            for (let radio of radios) {
                flag = radio.checked ? true : false;
                if (flag) break;
            }
            flag ? btn.removeAttribute('disabled') : btn.setAttribute('disabled', '');
        };

        function clearForm() {
            textarea.value = '';
            btn.setAttribute('disabled', '');
            for (let radio of radios) {
                radio.checked = false;
            }
        }
        form.addEventListener('change', (e) => {
            if (e.target.type === 'radio') checkForm();
        })
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            clearForm();
        });
    })
};
export const validateCheckboxPrimary = (formSelector, textareaSelector, btnSelector, checkboxesSelector) => {
    const forms = document.querySelectorAll(formSelector);
    if (forms.length === 0) return;
    forms.forEach(form => {
        if (!form.classList.contains('_not-validate')) {
            const textarea = form.querySelector(textareaSelector);
            const btn = form.querySelector(btnSelector);
            const checkboxes = form.querySelectorAll(checkboxesSelector);

            function checkForm() {
                let flag = false;
                for (let checkbox of checkboxes) {
                    flag = checkbox.checked ? true : false;
                    if (flag) break;
                }
                flag ? btn.removeAttribute('disabled') : btn.setAttribute('disabled', '');
            };

            function clearForm() {
                textarea.value = '';
                btn.setAttribute('disabled', '');
                for (let radio of checkboxes) {
                    radio.checked = false;
                }
            }
            form.addEventListener('change', (e) => {
                if (e.target.type === 'checkbox') checkForm();
            })
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                clearForm();
            });
        }
    })
};
export const bookConsultationValidate = () => {
    const form = document.querySelector('.book-consultation__form');
    if (!form) return;
    let formEventInput = false;
    const nameLabel = form.querySelector('.book-consultation__form--name');
    const telLabel = form.querySelector('.book-consultation__form--tel');
    const nameInput = nameLabel.querySelector('input');
    const telInput = telLabel.querySelector('input');
    const agentToggle = form.querySelector('.toggle-checkbox input');
    const agents = form.querySelector('.book-consultation__agents');

    [nameLabel, telInput].forEach(el => {
        el.addEventListener('input', () => {
            if (formEventInput) validate();
        })
    })
    nameInput.addEventListener('input', () => {
        nameInput.value = nameInput.value.replace(/[0-9]/g, '');
    })
    if (agents) {
        const cardsAgent = agents.querySelectorAll('.card-agent');
        agentToggle.addEventListener('input', () => {
            if (!agentToggle.checked) {
                cardsAgent.forEach(card => {
                    card.classList.remove('_error');
                    card.classList.remove('_active');
                    card.querySelector('input').checked = false;
                })
            }
        })
        cardsAgent.forEach(card => {
            card.querySelector('input').addEventListener('input', () => {
                if (formEventInput) validate();
            })
        })
    }

    function validate() {
        let result = true;
        formEventInput = true;
        validateRemoveError(telLabel);
        validateRemoveError(nameLabel);
        if (agents) {
            const cardsAgent = agents.querySelectorAll('.card-agent');
            cardsAgent.forEach(card => card.classList.remove('_error'));
        }

        if (!validateCreateErrorName(nameLabel, nameInput)) {
            result = false;
        }
        if (!validateCreateErrorMask(telLabel, telInput, validateTextMap.tel, 10)) {
            result = false;
        }
        if (agents && agents.classList.contains('_active') && !agents.querySelector('.card-agent input:checked')) {
            result = false;
            cardsAgent.forEach(agent => agent.classList.add('_error'));
        }
        return result;
    }

    form.addEventListener('submit', (e) => {
        if (!validate()) e.preventDefault();
    })
};
export const clientFixedValidate = () => {
    const form = document.querySelector('.client-fixed__form');
    if (!form) return;
    let formEventInput = false;
    const surnameLabel = form.querySelector('.client-fixed__label--surname');
    const nameLabel = form.querySelector('.client-fixed__label--name');
    const telLabel = form.querySelector('.client-fixed__label--tel');

    const surnameInput = surnameLabel.querySelector('input');
    const nameInput = nameLabel.querySelector('input');
    const telInput = telLabel.querySelector('input');

    const btn = form.querySelector('.client-fixed__btn');

    const clientList = form.querySelector('.client-fixed__client-btn');
    const clientListLabel = form.querySelector('.client-fixed__client-select');
    clientList.addEventListener('click', () => {
        const label = nameLabel.closest('.client-fixed__labels');
        if (!form.classList.contains('_client-list')) {
            form.classList.add('_client-list');
            clientListLabel.removeAttribute('hidden');
            label.setAttribute('hidden', '');
            clientList.textContent = 'Или создайте нового клиента';
        } else {
            form.classList.remove('_client-list');
            clientListLabel.setAttribute('hidden', '');
            label.removeAttribute('hidden');
            clientList.textContent = 'Или выберите клиента из списка';
        }
    });

    [surnameLabel, nameLabel, telInput].forEach(el => {
        el.addEventListener('input', () => {
            if (formEventInput) validate();
        })
    })
    clientListLabel.addEventListener('change', () => {
        if (formEventInput) validate();
    })

    function validate() {
        let result = true;
        formEventInput = true;
        validateRemoveError(telLabel);
        validateRemoveError(surnameLabel);
        validateRemoveError(nameLabel);
        validateRemoveError(clientListLabel);
        clientListLabel.classList.remove('_error');

        if (!form.classList.contains('_client-list')) {
            if (!validateCreateErrorName(surnameLabel, surnameInput)) {
                result = false;
            }
            if (!validateCreateErrorName(nameLabel, nameInput)) {
                result = false;
            }
            if (!validateCreateErrorMask(telLabel, telInput, validateTextMap.tel, 10)) {
                result = false;
            }
        } else {
            if (!validateCreeateErrorSelect(clientListLabel, 'Выберите клиента из списка')) {
                result = false;
            }
        }
        return result;
    }


    const modalHTML = `
            <div class="client-fixed-sent">
                    <div class="client-fixed-sent__container" role="dialog" aria-modal="true">
                    <button class="btn-reset client-fixed-sent__close" aria-label="Закрыть модальное окно">
                    <svg>
                        <use xlink:href="./img/sprite.svg#x"></use>
                    </svg>
                    <span>Закрыть</span>
                    </button>
                     <div class="client-fixed-sent__content">
                    <div class="client-fixed-sent__icon">
                        <img loading="lazy" src="./img/like.png" alt="like">
                    </div>
                    <h3 class="client-fixed-sent__title title-3">Заявка на фиксацию отправлена</h3>
                    <p class="client-fixed-sent__descr">
                       Менеджер отдела бронирования свяжется с вами для уточнения подробностей фиксации
                    </p>
                    <button type="button" class="btn btn-reset btn-primary client-fixed-sent__btn">Вернутся на главную</button>
                    </div>
                </div>
            </div>
    `;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validate()) {
            btn.classList.add('_validate');
            setTimeout(() => {
                modal(modalHTML, '.client-fixed-sent', 300);
                form.reset();
                btn.classList.remove('_validate');
                formEventInput = false;
            }, 50);
        } else {
            btn.classList.remove('_validate');
        }
    })
};
export const addContactValidate = () => {
    const forms = document.querySelectorAll('.add-contact__form');
    if (forms.length === 0) return;
    forms.forEach(form => {
        let formEventInput = false;
        const nameLabel = form.querySelector('.add-contact__label--name');
        const telLabel = form.querySelector('.add-contact__label--tel');
        const type = form.querySelector('.add-contact__type');

        const nameInput = nameLabel.querySelector('input');
        const telInput = telLabel.querySelector('input');

        [nameInput, telInput].forEach(el => {
            el.addEventListener('input', () => {
                if (formEventInput) validate();
            })
        })
        type.addEventListener('change', () => {
            if (formEventInput) validate();
        })

        function validate() {
            let result = true;
            formEventInput = true;
            validateRemoveError(nameLabel);
            validateRemoveError(telLabel);
            validateRemoveError(type);

            if (!validateCreateErrorName(nameLabel, nameInput)) {
                result = false;
            }
            if (!validateCreateErrorMask(telLabel, telInput, validateTextMap.tel, 10)) {
                result = false;
            }
            if (!validateCreeateErrorSelect(type, 'Выберите тип контакта')) {
                result = false;
            }
            return result;
        }

        form.addEventListener('submit', (e) => {
            if (!validate()) e.preventDefault();
        })
    })
}
export const createAgreeValidate = () => {
    const form = document.querySelector('.create-agree__form');
    if (!form) return;
    let formEventInput = false;
    const dateOne = form.querySelector('.create-agree__form--date-one');
    const dateTwo = form.querySelector('.create-agree__form--date-two');
    const type = form.querySelector('.create-agree__form--type');

    const dateOneInput = dateOne.querySelector('input');
    const dateTwoInput = dateTwo.querySelector('input');


    [dateOneInput, dateTwoInput].forEach(input => {
        new AirDatepicker(input, {
            autoClose: true,
            isMobile: true,
            onSelect: (fd) => {
                const inputText = input.closest('.input-text')
                fd.date ? inputText.classList.add('_active') : inputText.classList.remove('_active');
                if (formEventInput) validate();
            }
        })
    });




    type.addEventListener('change', () => {
        if (formEventInput) validate();
    })

    function validate() {
        let result = true;
        formEventInput = true;
        validateRemoveError(dateOne);
        validateRemoveError(dateTwo);
        validateRemoveError(type);
        if (!dateOneInput.value) {
            result = false;
            validateCreateError(dateOne, validateTextMap.date);
        }
        if (!dateTwoInput.value) {
            result = false;
            validateCreateError(dateTwo, validateTextMap.date);
        }

        if (dateOneInput.value && dateTwoInput.value) {
            if (new Date(changeDate(dateOneInput.value)) > new Date(changeDate(dateTwoInput.value))) {
                result = false;
                validateCreateError(dateOne, null);
                validateCreateError(dateTwo, 'Дата окончания не должна быть меньше начала');
            }
        }
        if (!validateCreeateErrorSelect(type, 'Выберите тип договора')) {
            result = false;
        }
        return result;
    }

    form.addEventListener('submit', (e) => {
        if (!validate()) e.preventDefault();
    })
};
export const createDealValidate = () => {
    const form = document.querySelector('.create-deal__form');
    if (!form) return;
    let formEventInput = false;
    const date = form.querySelector('.create-deal__form--date');

    const dateInput = date.querySelector('input');


    new AirDatepicker(dateInput, {
        autoClose: true,
        isMobile: true,
        onSelect: (fd) => {
            const inputText = dateInput.closest('.input-text')
            fd.date ? inputText.classList.add('_active') : inputText.classList.remove('_active');
            if (formEventInput) validate();
        }
    })

    function validate() {
        let result = true;
        formEventInput = true;
        validateRemoveError(date);
        if (!dateInput.value) {
            result = false;
            validateCreateError(date, validateTextMap.date);
        }

        return result;
    }

    form.addEventListener('submit', (e) => {
        if (!validate()) e.preventDefault();
    })
}
export const editUserValidate = () => {
    const form = document.querySelector('.edit-user__form');
    if (!form) return;
    let formEventInput = false;
    const nameLabel = form.querySelector('.edit-user__label--name');
    const telLabel = form.querySelector('.edit-user__label--tel');

    const type = form.querySelector('.edit-user__type')

    const nameInput = nameLabel.querySelector('input');
    const telInput = telLabel.querySelector('input');

    [nameInput, telInput].forEach(el => {
        el.addEventListener('input', () => {
            if (formEventInput) validate();
        })
    })
    type.addEventListener('change', () => {
        if (formEventInput) validate();
    })

    new AirDatepicker(form.querySelector('.edit-user__form--date input'), {
        autoClose: true,
        isMobile: true,
        onSelect: (fd) => {
            const inputText = dateInput.closest('.input-text')
            fd.date ? inputText.classList.add('_active') : inputText.classList.remove('_active');
        }
    })

    function validate() {
        let result = true;
        formEventInput = true;
        validateRemoveError(nameLabel);
        validateRemoveError(telLabel);
        validateRemoveError(type);

        if (!validateCreateErrorName(nameLabel, nameInput)) {
            result = false;
        }
        if (!validateCreateErrorMask(telLabel, telInput, validateTextMap.tel, 10)) {
            result = false;
        }
        if (!validateCreeateErrorSelect(type, 'Выберите тип клиента')) {
            result = false;
        }

        return result;
    }

    form.addEventListener('submit', (e) => {
        if (!validate()) e.preventDefault();
    })
}
export const createMeetingShowValidate = () => {
    const form = document.querySelector('.create-meeting-show__form');
    if (!form) return;
    let formEventInput = false;

    const dateOne = form.querySelector('.create-meeting-show__form--date-one');
    const dateTwo = form.querySelector('.create-meeting-show__form--date-two');
    const object = form.querySelector('.create-meeting-show__form--object');

    const dateOneInput = dateOne.querySelector('input');
    const dateTwoInput = dateTwo.querySelector('input');
    const objectInput = object.querySelector('.search-select-one__input-hidden');

    [dateOneInput, dateTwoInput].forEach(input => {
        new AirDatepicker(input, {
            autoClose: true,
            isMobile: true,
            onSelect: (fd) => {
                const inputText = input.closest('.input-text')
                fd.date ? inputText.classList.add('_active') : inputText.classList.remove('_active');
                if (formEventInput) validate();
            }
        })
    });

    function validate() {
        let result = true;
        formEventInput = true;

        validateRemoveError(dateOne);
        validateRemoveError(dateTwo);
        validateRemoveError(object);
        if (!dateOneInput.value) {
            result = false;
            validateCreateError(dateOne, validateTextMap.date);
        }
        if (!dateTwoInput.value) {
            result = false;
            validateCreateError(dateTwo, validateTextMap.date);
        }
        if (!objectInput.value) {
            result = false;
            validateCreateError(object, 'Выберите объект');
        }

        if (dateOneInput.value && dateTwoInput.value) {
            if (new Date(changeDate(dateOneInput.value)) > new Date(changeDate(dateTwoInput.value))) {
                result = false;
                validateCreateError(dateOne, null);
                validateCreateError(dateTwo, 'Дата окончания не должна быть меньше начала');
            }
        }

        return result;
    }

    form.addEventListener('submit', (e) => {
        if (!validate()) e.preventDefault();
    })
}


export const requisitesValidate = () => {
    const form = document.querySelector('.edit-profile--requisites');
    if (!form) return;
    let formEventInput = false;

    const itemsLabel = form.querySelectorAll('.requisites__label');
    const itemsSelect = form.querySelectorAll('.requisites__select');

    itemsLabel.forEach(el => {
        el.addEventListener('input', () => {
            if (formEventInput) validate();
        })
    })
    itemsSelect.forEach(el => {
        el.addEventListener('change', () => {
            if (formEventInput) validate();
        })
    })

    function validate() {
        let result = true;
        formEventInput = true;
        [...itemsLabel, ...itemsSelect].forEach(label => validateRemoveError(label))
        itemsLabel.forEach(item => validateRemoveError(item));
        const activeEl = form.querySelector('.requisites__btn._active');
        if (activeEl) {
            const currentContent = form.querySelector(`[data-requisites-content=${activeEl.dataset.requisitesBtn}]`)
            currentContent.querySelectorAll('.requisites__label').forEach(label => {

                if (label.hasAttribute('data-validate-required') && label.querySelector('input').value.length === 0) {
                    result = false;
                    validateCreateError(label, `${label.dataset.validateError}`);
                }
                if (label.hasAttribute('data-validate-length') && label.querySelector('input').value.length < label.dataset.validateLength) {
                    result = false;
                    validateCreateError(label, `${label.dataset.validateError}`);
                }
            })
            currentContent.querySelectorAll('.requisites__select').forEach(select => {
                if (!validateCreeateErrorSelect(select, select.dataset.validateError)) {
                    result = false;
                }
            })
        }
        return result;
    }

    form.addEventListener('submit', (e) => {
        if (!validate()) e.preventDefault();
    })
}


export const inputMaskPhone = (input) => {
    const inputMask = new Inputmask('+7 999 999-99-99');
    inputMask.mask(input);
}
export const inputMaskSeriesNumber = (input) => {
    const inputMask = new Inputmask('99 99 999999');
    inputMask.mask(input);
}
export const inputMaskDepartCode = (input) => {
    const inputMask = new Inputmask('999-999');
    inputMask.mask(input);
}
export const inputMaskSnils = (input) => {
    const inputMask = new Inputmask('999-999-999 99');
    inputMask.mask(input);
}
export const inputMaskOgrn = (input) => {
    const inputMask = new Inputmask('9999999999999');
    inputMask.mask(input);
}
export const inputMaskInn = (input) => {
    const inputMask = new Inputmask('999999999999');
    inputMask.mask(input);
}


export const inputMaskValidate = (label, input, length) => {
    if (!label || !input) return;
    const inputLength = input.inputmask.unmaskedvalue().length;
    return inputLength >= length ? true : false;
}

export const validateCreateError = (label, text) => {
    validateRemoveError(label);
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('_error-span');
    if (text) errorSpan.textContent = text;

    label.append(errorSpan);
    label.classList.add('_error');
}

export const validateRemoveError = (label) => {
    if (!label.classList.contains('_error')) return;
    label.querySelector('._error-span').remove();
    label.classList.remove('_error');
}

export const validateCreateErrorName = (label, input) => {
    let result = true;
    if (label.hasAttribute('data-validate-min-length') && input.value.length < label.dataset.validateMinLength) {
        result = false;
        validateCreateError(label, `${validateTextMap.minLength} ${label.dataset.validateMinLength}`);
    }
    if (label.hasAttribute('data-validate-required') && input.value === '') {
        result = false;
        validateCreateError(label, validateTextMap.name);
    }
    return result;
}
export const validateCreateErrorYear = (label, input) => {
    let result = true;
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 100;
    const value = input.value === '' ? input.value : Number(input.value.replace(/\s/g, ""));
    if (label.hasAttribute('data-mortgage-requests-field') && label.dataset.mortgageRequestsField === 'year-issue'){
        if (value === '') {
            result = false;
            validateCreateError(label, 'Укажите год выпуска');
        } else {
            if (value < minYear) {
                result = false;
                validateCreateError(label, 'Слишком старый автомобиль');
            }
            if (value > currentYear) {
                result = false;
                validateCreateError(label, 'Укажите верный год выпуска');
            }
        }
    }
    if (label.hasAttribute('data-mortgage-requests-field') && label.dataset.mortgageRequestsField === 'estate-year-purchase'){
        if (value === '') {
            result = false;
            validateCreateError(label, 'Укажите год приобретения недвижимости');
        } else if (value < minYear || value > currentYear) {
            result = false;
            validateCreateError(label, 'Укажите корректный год');
        }
    }
    return result;
}
export const validateCreateErrorField = (label, input, text) => {
    let result = true;
    if (label.hasAttribute('data-validate-min-length') && input.value.length < label.dataset.validateMinLength) {
        result = false;
        validateCreateError(label, `${validateTextMap.minLength} ${label.dataset.validateMinLength}`);
    }
    if (label.hasAttribute('data-validate-average-invome-default') && +input.value < 1000) {
        result = false;
        validateCreateError(label, `Средний доход в месяц не может быть меньше 1 000 ₽`);
    }
    if (label.hasAttribute('data-validate-required') && input.value === '') {
        result = false;
        validateCreateError(label, text);
    }
    return result;
}

export const validateCreateErrorMask = (label, input, text, length) => {
    let result = true;
    if (!inputMaskValidate(label, input, length)) {
        result = false;
        validateCreateError(label, text);
    }
    return result;
}
export const validateCreateErrorUrl = (label,input,text) => {
    let result = true;
    const objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
    if (!objRE.test(input.value)) {
        result = false;
        validateCreateError(label, text);
    }
    return result;
};
export const validateCreeateErrorSelect = (container, text) => {
    let result = true;
    if (!container.classList.contains('_selected')) {
        result = false;
        validateCreateError(container, text);
    }
    return result;
}

export const changeDate = (date) => {
    const [day, month, year] = date.split(".")
    return `${year}, ${month -1 }, ${day}`;
}
