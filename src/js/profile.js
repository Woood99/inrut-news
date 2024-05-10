import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';


// ==============================


import tag from './components/tag';
import chat from './components/chat';
import {
    validateCreateErrorMask,
    validateRemoveError
} from './components/formValidate';
import {
    validateTextMap
} from './modules/validateTextMap';
import   datePickers from './components/datePickers'
document.addEventListener('DOMContentLoaded', () => {
    tag();
    chat();
    editProfile();
    datePickers();
    function editProfile() {
        const container = document.querySelector('.edit-profile');
        if (!container) return;

        const htmlAction = `
            <div class="edit-profile__action">
                <button type="button" class="btn btn-reset btn-primary edit-profile__field-save">Сохранить</button>
                <button type="button" class="btn btn-reset btn-secondary edit-profile__field-cancel">Отмена</button>
            </div>
        `;
        const htmlBtn = `
        <button type="button" class="btn btn-reset edit-profile__edit" data-edit-profile-btn>
            <svg>
                <use xlink:href="./img/sprite.svg#pencil">
                </use>
            </svg>
            <span>Изменить контактные данные</span>
        </button>
        `
        container.addEventListener('click', (e) => {
            editBtns(e.target);
            editActions(e.target);
        })

        function editBtns(target) {
            const btn = target.closest('[data-edit-profile-btn]');
            if (!btn) return;
            const currentContainer = btn.closest('.edit-profile__field');
            if (currentContainer) {
                getCurrentFields(currentContainer).forEach(field => {
                    field.classList.remove('input-text--disabled');
                    const input = field.querySelector('input');
                    if (input) {
                        input.removeAttribute('disabled');
                        field.setAttribute('data-old-value', input.value);
                    }
                })
                btn.remove();
                currentContainer.insertAdjacentHTML('beforeend', htmlAction);
            }
        }

        function editActions(target) {
            const save = target.closest('.edit-profile__field-save');
            const cancel = target.closest('.edit-profile__field-cancel');
            if (!(save || cancel)) return;
            const currentContainer = (save || cancel).closest('.edit-profile__field');
            const action = currentContainer.querySelector('.edit-profile__action');
            const fields = getCurrentFields(currentContainer);
            fields.forEach(field => validateRemoveError(field));
            if (save) {
                let status = true;
                if (!validateCreateErrorMask(fields[0], fields[0].querySelector('input'), validateTextMap.tel, 10)) {
                    status = false;
                }
                if (status) {
                    fields.forEach(field => {
                        field.classList.add('input-text--disabled');
                        field.removeAttribute('data-old-value');
                        const input = field.querySelector('input');
                        input.setAttribute('disabled', '');
                    })
                    action.remove();
                    currentContainer.insertAdjacentHTML('beforeend', htmlBtn);
                }
            }
            if (cancel) {
                fields.forEach(field => {
                    field.classList.add('input-text--disabled');
                    const input = field.querySelector('input');
                    input.setAttribute('disabled', '');
                    input.value = field.dataset.oldValue;
                    field.removeAttribute('data-old-value');

                })
                action.remove();
                currentContainer.insertAdjacentHTML('beforeend', htmlBtn);
            }
        }

        function getCurrentFields(currentContainer) {
            return currentContainer.querySelectorAll('.input-text');
        }
    }


    const arr = ['asd2','asd3'];

    const newArr = arr.map(item => `./src/${item}.html`)

    console.log(['asd',...newArr]);
})
