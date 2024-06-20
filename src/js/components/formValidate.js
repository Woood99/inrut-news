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
    if (!agents) return;
    const cardsAgent = agents.querySelectorAll('.card-agent');

    [nameLabel, telInput].forEach(el => {
        el.addEventListener('input', () => {
            if (formEventInput) validate();
        })
    })
    nameInput.addEventListener('input', () => {
        nameInput.value = nameInput.value.replace(/[0-9]/g, '');
    })
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

    function validate() {
        let result = true;
        formEventInput = true;
        validateRemoveError(telLabel);
        validateRemoveError(nameLabel);
        cardsAgent.forEach(card => card.classList.remove('_error'));

        if (!validateCreateErrorName(nameLabel, nameInput)) {
            result = false;
        }
        if (!validateCreateErrorMask(telLabel, telInput, validateTextMap.tel, 10)) {
            result = false;
        }
        if (agents.classList.contains('_active') && !agents.querySelector('.card-agent input:checked')) {
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
export const submitAppValidate = () => {
    const form = document.querySelector('.submit-app__container');
    const formSidebarEl = document.querySelector('[data-form-sidebar]');
    if (!form) return;
    let formEventInput = false;
    let visibleError = false;

    const price = form.querySelector('.submit-app-options__item--price');
    const priceInputs = price.querySelectorAll('.input-text__input');
    const priceButton = price.querySelector('.filter-dropdown__button');
    const priceButtonWrapper = priceButton.querySelector('.filter-dropdown__button-wrapper');


    const calcProper = form.querySelector('.submit-app-options__item--calc-proper');
    const calcProperItems = calcProper.querySelectorAll('.checkbox-secondary input');

    const type = form.querySelector('[data-field-select-name="object-type"]');

    const descr = form.querySelector('[data-field-descr]');
    const descrInput = descr.querySelector('textarea');

    const mainFilter = form.querySelector('[data-submit-filter-object-type]');
    mainFilter.addEventListener('change', () => {
        setTimeout(() => {
            validate(true);
        }, 1);
    })

    if (type) {
        const typeItems = type.querySelectorAll('.field-select__item');
        typeItems.forEach(item => {
            item.addEventListener('click', () => {
                setTimeout(() => {
                    if (item.classList.contains('_active')) {
                        window.scrollTo({
                            top: form.querySelector('.submit-app-maps').offsetTop - (window.innerWidth > 1212 ? 16 : document.querySelector('.header').clientHeight + 8),
                            behavior: 'smooth'
                        })
                    }
                }, 5);
            })
        });

        typeItems.forEach(item => {
            item.addEventListener('click', () => {
                setTimeout(() => {
                    if (formEventInput) validate(false);
                }, 1);
            })
        })
    }
    calcProperItems.forEach(input => {
        input.addEventListener('change', () => {
            setTimeout(() => {
                if (formEventInput) validate(false);
            }, 1);
        })
    })
    priceInputs.forEach(input => {
        input.addEventListener('input', () => {
            setTimeout(() => {
                if (formEventInput) validate(false);
            }, 1);
        })
    })

    descrInput.addEventListener('input', () => {
        setTimeout(() => {
            if (formEventInput) validate(false);
        }, 1);
    })

    function validate(controls = true) {
        const errorItems = [];
        let result = true;
        formEventInput = true;
        validateRemoveError(descr);
        validateRemoveError(price);
        validateRemoveError(calcProper);
        validatRemoveErrorSelect(type);
        if (!validateCreateErrorSelect(type)) {
            result = false;
            errorItems.push(type);
        }
        if (!priceButtonWrapper.classList.contains('_active')) {
            result = false;
            validateCreateError(price, 'Укажите цену');
            errorItems.push(price);
        }
        if (!calcProper.classList.contains('_selected')) {
            result = false;
            validateCreateError(calcProper, 'Укажите свойства расчёта');
            errorItems.push(calcProper);
        }
        if (descrInput.value.length === 0) {
            result = false;
            validateCreateError(descr, 'Введите описание недвижимости');
            errorItems.push(descr);
        }
        if (result === false && controls === true) {
            scrollToError(errorItems);
        }
        if (visibleError === false) {
            validateRemoveError(descr);
            validateRemoveError(price);
            validateRemoveError(calcProper);
            validatRemoveErrorSelect(type);
        }
        formSidebar(errorItems);
        return result;
    }

    form.addEventListener('submit', (e) => {
        visibleError = true;
        if (!validate()) e.preventDefault();
    })

    function scrollToError(errorItems) {
        const firstError = errorItems[0];
        const topGap = window.pageYOffset + firstError.getBoundingClientRect().top;
        window.scrollTo({
            top: topGap - 16,
            behavior: 'smooth'
        })
    }

    function formSidebar(errors) {
        const svgDefault = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm3.8-8.3a1 1 0 0 0-1.42-1.4L7.2 8.46a.28.28 0 0 1-.4 0l-1.1-1.1A1 1 0 0 0 4.3 8.8l2.08 2.09c.34.34.9.34 1.24 0L11.8 6.7z"></path></svg>
        `;

        const svgError = `
         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0zM7 5a1 1 0 0 1 2 0v3a1 1 0 0 1-2 0V5zm1 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg>
        `;

        if (!formSidebarEl) return;
        formSidebarEl.classList.remove(...['_suggested', '_error']);

        let errorSections = errors.map(error => error.closest('[data-form-sidebar-target]')).filter(section => section);
        errorSections = [...new Set(errorSections)]
        const sidebarFields = Array.from(formSidebarEl.querySelectorAll('[data-form-sidebar-path]'));
        sidebarFields.forEach(field => {
            field.classList.remove(...['_suggested', '_error']);

            const name = field.dataset.formSidebarPath;
            const currentEl = errorSections.find(item => item.dataset.formSidebarTarget === name);
            if (currentEl) {
                if (visibleError) {
                    field.classList.add('_error');

                    field.querySelector('svg').remove();
                    field.insertAdjacentHTML('afterbegin', svgError)
                }
            } else {
                field.classList.add('_suggested');
                field.querySelector('svg').remove();
                field.insertAdjacentHTML('afterbegin', svgDefault)
            }
        })


        if (errorSections.length === 0) {
            formSidebarEl.classList.add('_suggested');
        }
    }

    if (formSidebarEl) {
        formSidebarEl.addEventListener('click', sidebarClickElementHandler);
        toggleActiveClass(window.scrollY);
        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 1212) return;
            let scrollDistance = window.scrollY;
            toggleActiveClass(scrollDistance);
        })
    }

    function sidebarClickElementHandler(e) {
        const target = e.target;
        const element = target.closest('[data-form-sidebar-path]');
        if (!element) return;
        window.scrollTo({
            top: document.querySelector(`[data-form-sidebar-target="${element.dataset.formSidebarPath}"]`).offsetTop - 16,
            behavior: 'smooth',
        })
    }

    function toggleActiveClass(scrollDistance) {
        const gap = 16;
        const sections = document.querySelectorAll('[data-form-sidebar-target]');
        const sidebarItems = document.querySelectorAll('[data-form-sidebar-path]');

        sections.forEach((section, index) => {
            if (section.offsetTop - gap <= scrollDistance) {
                sidebarItems.forEach(item => {
                    if (item.classList.contains('_active')) {
                        item.classList.remove('_active');
                    }
                })
                if (sidebarItems[index]) sidebarItems[index].classList.add('_active');
            }

            if (sections[0].offsetTop - gap >= scrollDistance) {
                sidebarItems.forEach(item => {
                    if (item.classList.contains('_active')) item.classList.remove('_active');
                })
            }

            if (sections[sections.length - 1].offsetTop + sections[sections.length - 1].offsetHeight - gap <= scrollDistance) {
                sidebarItems.forEach(item => {
                    if (item.classList.contains('_active')) item.classList.remove('_active');
                })
            }
        });

    }



}


export const inputMaskPhone = (input) => {
    let inputMask = new Inputmask('+7 999 999-99-99');
    inputMask.mask(input);
    let test = true;
    input.addEventListener('keydown', () => {
        setTimeout(() => {
            const value = input.value;
            const valueTest = input.inputmask.unmaskedvalue();
            if (value.startsWith('+7') && valueTest[0] == 8 && valueTest.length == 1) {
                if (test) {
                    input.value = input.value.slice(0, 1);
                    input.setSelectionRange(1, 1);
                    Inputmask(["8 999 999-99-99"]).mask(input);
                    test = false;
                }
            } else {
                if (!test) {
                    Inputmask(["+7 999 999-99-99"]).mask(input);
                    test = true;
                }
            }
        }, 1);
    })
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
export const inputMaskOgrnip = (input) => {
    const inputMask = new Inputmask('999999999999999');
    inputMask.mask(input);
}
export const inputMaskInn = (input) => {
    const inputMask = new Inputmask('999999999999');
    inputMask.mask(input);
}
export const inputMaskTime = (input) => {
    const inputMask = new Inputmask('99:99');
    inputMask.mask(input);

    input.addEventListener('change', (e) => {
        const hours = input.value.substring(0, 2);
        const minutes = input.value.substring(3, 5);
        if (input.value === '') {
            input.value = '00:00';
            const inputText = input.closest('.input-text');
            if (inputText) inputText.classList.add('_active');
        }
        if (!(hours >= 0 && hours <= 23)) {
            input.value = `00:${input.value.substring(3,5)}`;
        }
        if (!(minutes >= 0 && minutes <= 59)) {
            input.value = `${input.value.substring(0,2)}:00`;
        }

    })
};
export const inputMaskCard = (input) => {
    const inputMask = new Inputmask({
        mask: "[9999] [9999] [9999] [9999]",
        greedy: false
    });
    inputMask.mask(input);
}
export const inputMaskCardValidity = (input) => {
    const inputMask = new Inputmask('99/99');
    inputMask.mask(input);
    input.addEventListener('input', (e) => {

        const firstLetterMonth = input.value.substring(0, 1);
        const firstLetterDay = input.value.substring(3, 4);
        if (firstLetterMonth > 1 && firstLetterMonth < 10 && input.value.substring(3, 5) === '__') {
            input.value = `0${firstLetterMonth}/${input.value.substring(3, 5)}`;
            input.focus();
            input.setSelectionRange(3, 3);
        }
        if (input.value.substring(0, 2) > 12) {
            input.value = `12/${input.value.substring(3, 5)}`;
            input.focus();
            input.setSelectionRange(3, 3);
        }
        if (firstLetterDay > 3) {
            input.value = `${input.value.substring(0,2)}:31`;
        }
        if (input.value.substring(3, 5) > 31) {
            input.value = `${input.value.substring(0,2)}:31`;
        }
    })
}

export const validateCreateErrorSelect = (container, selectorItem = null) => {
    if (!container) return;
    const items = selectorItem ? container.querySelectorAll(selectorItem) : container.querySelectorAll('.field-select__item');
    if (!items.length === 0) return;
    let value = false;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.classList.contains('_active')) {
            value = true;
            break;
        }
    }
    if (value === false) {
        container.classList.add('_error');
        items.forEach(item => item.classList.add('_error'));
    }
    return value;
}
export const validatRemoveErrorSelect = (container, selectorItem = null) => {
    if (!container.classList.contains('_error')) return;
    container.classList.remove('_error');
    const items = selectorItem ? container.querySelectorAll(selectorItem) : container.querySelectorAll('.field-select__item');
    if (items.length > 0) {
        items.forEach(item => item.classList.remove('_error'));
    }
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
    if (label.hasAttribute('data-mortgage-requests-field') && label.dataset.mortgageRequestsField === 'year-issue') {
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
    if (label.hasAttribute('data-mortgage-requests-field') && label.dataset.mortgageRequestsField === 'estate-year-purchase') {
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
export const validateCreateErrorUrl = (label, input, text) => {
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

export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}


export const confirmPhoneCodeValidate = () => {
    const button = document.querySelector('[data-confirm-phone-code-button]');
    const input = document.querySelector('[data-confirm-phone-code-input]');
    if (!(button && input)) return;
    const inputLabel = input.closest('.input-text');
    let result = true;
    let formEventInput = false;

    button.addEventListener('click', () => {
        formEventInput = true;
        validate();
    });
    input.addEventListener('input', () => {
        if (!formEventInput) return;
        validate();
    });


    function validate() {
        result = true;
        validateRemoveError(inputLabel);
        if (!validateCreateErrorMask(inputLabel, input, validateTextMap.tel, 10)) {
            result = false;
        }


        if (result) {
            button.classList.remove('_disabled-popup');
        } else {
            button.classList.add('_disabled-popup');
        }
    }
}