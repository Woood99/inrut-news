import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

// ==============================
import {
    currentInputText
} from './components/inputs';
import {
    selectSecondaryCreate
} from './components/choices';
import datePickers from './components/datePickers';
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.investments');
    if (!container) return;
    datePickers();

    const spollers = container.querySelectorAll('[data-spoller-item]');
    const mortgageProgram  = container.querySelector('[data-mortgage-program]');
    document.addEventListener('click', (e) => {
        const target = e.target;
        const inputToggle = target.closest('[data-investments-toggle]');
        const repairRadio = target.closest('[data-repair-toggle]');
        const purchaseRadio = target.closest('[data-purchase-toggle]');
        const mortgageProgramRadio = target.closest('[data-mortgage-program-toggle]');
        if (inputToggle) {
            const currentID = inputToggle.dataset.investmentsToggle;
            inputToggle.checked ? visibleItems(currentID) : hiddenItems(currentID);
        }
        if (repairRadio) {
            const value = repairRadio.dataset.repairToggle;
            value === 'true' ? visibleItems('repair') : hiddenItems('repair');
        }
        if (purchaseRadio) {
            const value = purchaseRadio.dataset.purchaseToggle;
            if (value == '2') {
                spollers.forEach(item => {
                    if (item.dataset.spollerItem === 'Кредит' || item.dataset.spollerItem === 'Страхование') {
                        item.setAttribute('hidden', '');
                    }
                })
            } else {
                spollers.forEach(item => {
                    item.removeAttribute('hidden');
                })
            }
        }
        if (mortgageProgramRadio) {
            const value = mortgageProgramRadio.dataset.mortgageProgramToggle;
            if (value == '2') {
                mortgageProgram.setAttribute('hidden','');
            } else {
                mortgageProgram.removeAttribute('hidden');
            }
        }

        const createFieldBtn = target.closest('[data-calc-create-field]');
        if (createFieldBtn) {
            const value = createFieldBtn.dataset.calcCreateField;
            let fieldHTML = ``;
            if (value == '1') {
                fieldHTML = `
                <div class="calc-popup__field _one">
                    <div class="input-text input-text--no-exp">
                        <label class="input-text__label">
                            <span>Наименование затрат</span>
                            <input type="text" name="Цена покупки" class="input-reset input-text__input" placeholder="">
                        </label>
                    </div>
                    <div class="input-text input-text--only-number">
                        <label class="input-text__label">
                            <span>Стоимость</span>
                            <input type="text" maxlength="12" class="input-reset input-text__input" placeholder="">
                            <span>₽</span>
                        </label>
                    </div>
                    <button type="button" class="btn btn-reset btn-remove calc-popup__field-remove" title="Удалить">
                        <svg>
                            <use xlink:href="./img/sprite.svg#trash">
                            </use>
                        </svg>
                    </button>
                </div>
            `;
            }
            if (value == '2') {
                fieldHTML = `
                <div class="calc-popup__field _two">
                    <div class="input-text input-text--no-exp">
                        <label class="input-text__label">
                            <span>Наименование позиции</span>
                            <input type="text" name="Цена покупки" class="input-reset input-text__input" placeholder="">
                        </label>
                    </div>
                    <div class="input-text input-text--only-number">
                        <label class="input-text__label">
                            <span>Стоимость</span>
                            <input type="text" maxlength="12" class="input-reset input-text__input" placeholder="">
                            <span>₽</span>
                        </label>
                    </div>
                    <div class="input-text input-text--only-number">
                        <label class="input-text__label">
                            <span>Кол-во</span>
                            <input type="text" name="Стоимость" maxlength="4" value="1" class="input-reset input-text__input" placeholder="">
                            <span>шт</span>
                        </label>
                    </div>
                    <button type="button" class="btn btn-reset btn-remove calc-popup__field-remove" title="Удалить">
                        <svg>
                            <use xlink:href="./img/sprite.svg#trash">
                            </use>
                        </svg>
                    </button>
                </div>
            `;
            }
            createFieldBtn.insertAdjacentHTML('beforebegin', fieldHTML);
            const field = createFieldBtn.previousElementSibling;
            field.querySelectorAll('.input-text').forEach(item => currentInputText(item));
        }

        const removeBtn = target.closest('.calc-popup__field-remove');
        if (removeBtn) {
            const field = removeBtn.closest('.calc-popup__field');
            field.remove();
        }

        const addExpBtn = target.closest('[data-add-exp-btn]');
        if (addExpBtn) {
            const html = `
            <div class="investments-fields col-2" data-add-exp-item>
                <div class="input-text input-text--no-exp">
                    <label class="input-text__label">
                        <span>Название расхода</span>
                        <input type="text" data-add-exp-name class="input-reset input-text__input" placeholder="">
                    </label>
                </div>
                <div class="select-secondary">
                    <div class="select-secondary__wrapper">
                        <span class="select-secondary__placeholder">
                            Способ приобритения
                        </span>
                        <select class="select-secondary__body" hidden data-add-exp-type>
                            <option value="Разовый" selected>Разовый</option>
                            <option value="Переодический">Переодический</option>
                        </select>
                    </div>
                </div>
                <div class="input-text input-text--only-number">
                    <label class="input-text__label">
                        <span>Сумма расхода</span>
                        <input type="text" data-add-exp-sum maxlength="12" class="input-reset input-text__input" placeholder="">
                        <span>₽</span>
                    </label>
                </div>
                <button type="button" class="btn btn-reset investments-fields__remove-btn" data-exp-remove title="Удалить">
                    <svg>
                        <use xlink:href="./img/sprite.svg#trash">
                        </use>
                    </svg>
                    <span>Удалить расход</span>
                </button>
            </div>
            `;
            addExpBtn.closest('.investments-fields').insertAdjacentHTML('beforebegin', html);
            updateCountExp();
            const field = addExpBtn.closest('.investments-fields').previousElementSibling;

            const inputsText = field.querySelectorAll('.input-text');
            const selectsSecondary = container.querySelectorAll('.select-secondary__body');

            inputsText.forEach(item => currentInputText(item));
            selectsSecondary.forEach(item => selectSecondaryCreate(item));
        }

        const removeExp = target.closest('[data-exp-remove]');
        if (removeExp) {
            const field = removeExp.closest('[data-add-exp-item]');
            field.remove();
            updateCountExp();
        }


        const goBtn = target.closest('.investments-sidebar__button');
        if (goBtn) {
            fieldValid();
        }
    })

    function visibleItems(id) {
        const currentItems = container.querySelectorAll(`[data-investments-item-toggle='${id}']`);
        currentItems.forEach(item => item.removeAttribute('hidden'));
    }

    function hiddenItems(id) {
        const currentItems = container.querySelectorAll(`[data-investments-item-toggle='${id}']`);
        currentItems.forEach(item => item.setAttribute('hidden', ''));
    }

    function updateCountExp() {
        const expItems = container.querySelectorAll('[data-add-exp-item]');
        expItems.forEach((item, index) => {
            item.setAttribute('data-add-exp-item', index + 1);
            item.querySelector('[data-add-exp-name]').setAttribute('data-add-exp-name', index + 1);
            item.querySelector('[data-add-exp-type]').setAttribute('data-add-exp-type', index + 1);
            item.querySelector('[data-add-exp-sum]').setAttribute('data-add-exp-sum', index + 1);
        })
    }

    function fieldValid() {
        container.classList.add('_valid');
        const spollerItems = container.querySelectorAll('.investments__content');
        spollerItems.forEach(item => {
            item.classList.add('_disabled');
            const inputsText = item.querySelectorAll('.input-text');
            const selectsSecondary = item.querySelectorAll('.select-secondary');
            inputsText.forEach(item => item.classList.add('input-text--disabled'))
            selectsSecondary.forEach(item => item.classList.add('_disabled'));
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
})
