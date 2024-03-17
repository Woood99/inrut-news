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

        const repairCreateField = target.closest('.repair-calc__create');
        const repairRemoveField = target.closest('.repair-calc__field-remove');
        if (repairCreateField) {
            const fieldHTML = `
                <div class="repair-calc__field" data-repair-calc-field>
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
                    <button type="button" class="btn btn-reset btn-remove repair-calc__field-remove" title="Удалить">
                        <svg>
                            <use xlink:href="./img/sprite.svg#trash">
                            </use>
                        </svg>
                    </button>
                </div>
            `;
            repairCreateField.insertAdjacentHTML('beforebegin', fieldHTML);
            const field = repairCreateField.previousElementSibling;
            field.querySelectorAll('.input-text').forEach(item => currentInputText(item));
        }
        if (repairRemoveField) {
            const currentField = repairRemoveField.closest('.repair-calc__field');
            currentField.remove();
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
