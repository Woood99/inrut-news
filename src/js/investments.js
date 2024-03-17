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

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.investments');
    if (!container) return;
    document.addEventListener('click', (e) => {
        const target = e.target;
        const inputToggle = target.closest('[data-investments-toggle]');
        const repairRadio = target.closest('[data-repair-toggle]');
        if (inputToggle) {
            const currentID = inputToggle.dataset.investmentsToggle;
            inputToggle.checked ? visibleItems(currentID) : hiddenItems(currentID);
        }
        if (repairRadio) {
            const value = repairRadio.dataset.repairToggle;
            value === 'true' ? visibleItems('repair') : hiddenItems('repair');
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
            if (value == '2'){
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
    })

    function visibleItems(id) {
        const currentItems = container.querySelectorAll(`[data-investments-item-toggle='${id}']`);
        currentItems.forEach(item => item.removeAttribute('hidden'));
    }

    function hiddenItems(id) {
        const currentItems = container.querySelectorAll(`[data-investments-item-toggle='${id}']`);
        currentItems.forEach(item => item.setAttribute('hidden', ''));
    }
})
