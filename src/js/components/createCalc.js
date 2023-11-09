import inputResize from '../modules/inputResize';
import generateRandomID from '../modules/generateRandomID';
export const createCalc = () => {
    const createCalc = document.querySelector('.create-calc');
    if (!createCalc) return;
    const morts = createCalc.querySelectorAll('.create-calc-mort__field');
    morts.forEach(mort => {
        createCalcBody(mort);
    })

    const conditions = createCalc.querySelector('.create-calc-conditions');
    if (conditions) {
        const conditionsCreate = conditions.querySelector('.create-calc-conditions__create');
        const conditionsCreateMap = {
            default: conditionsCreate.textContent,
            cancel: 'Отменить создание'
        };
        const bodyHTML = `
        <div class="row create-calc-conditions__create-body">
            <div class="input-text input-text--no-exp create-calc-conditions__name">
                <label class="input-text__label">
                    <span>Название</span>
                    <input type="text" name="Название" class="input-reset input-text__input" value="" placeholder="">
                </label>
            </div>
            <div class="input-text create-calc-conditions__prc">
                <label class="input-text__label">
                    <span>Ставка</span>
                    <input type="text" name="Имя" class="input-reset input-text__input" placeholder="">
                    <span>%</span>
                </label>
            </div>
            <button type="button" class="btn btn-reset btn-primary create-calc-conditions__save">
                Сохранить
            </button>
        </div>
        `;
        conditionsCreate.addEventListener('click', () => {
            !conditionsCreate.classList.contains('_active') ? conditionsCreateBody() : conditionsCreateCancel();
        })

        function conditionsCreateBody() {
            conditionsCreate.classList.add('_active');
            conditionsCreate.textContent = conditionsCreateMap.cancel;
            conditionsCreate.insertAdjacentHTML('afterend', bodyHTML);

            const conditionsBody = conditions.querySelector('.create-calc-conditions__create-body');
            const conditionsSave = conditionsBody.querySelector('.create-calc-conditions__save');

            conditionsSave.addEventListener('click', () => {
                conditionsCreateItem(conditionsBody);
                conditionsCreateCancel();
            })
        }

        function conditionsCreateCancel() {
            conditionsCreate.classList.remove('_active');
            conditionsCreate.textContent = conditionsCreateMap.default;
            conditions.querySelector('.create-calc-conditions__create-body').remove();
        }

        function conditionsCreateItem(conditionsBody) {
            const conditionsNameValue = conditionsBody.querySelector('.create-calc-conditions__name input').value;
            const conditionsPrcValue = conditionsBody.querySelector('.create-calc-conditions__prc input').value;
            if (conditionsNameValue && conditionsPrcValue) {
                const itemHtml = `
                <div class="create-calc-conditions__item">
                    <input type="text" name="Имя" class="input-reset create-calc-conditions__item-name" value="${conditionsNameValue}" disabled>
                    <div class="col">
                        <input type="text" name="Ставка" class="input-reset create-calc-conditions__item-prc _width-auto" 
                        value="${Array.from(conditionsPrcValue)[0] === '-' ? conditionsPrcValue : '-' + conditionsPrcValue}%" disabled>
                    </div>
                    <button type="button" class="btn btn-reset create-calc-conditions__item-edit" title="Редактировать">
                        <svg>
                            <use xlink:href="img/sprite.svg#pencil">
                            </use>
                        </svg>
                    </button>
                    <button type="button" class="btn btn-reset create-calc-conditions__item-remove" title="Удалить">
                        <svg>
                            <use xlink:href="img/sprite.svg#trash">
                            </use>
                        </svg>
                    </button>
                </div>
            `;
                conditions.insertAdjacentHTML('beforeend', itemHtml);
                const items = conditions.querySelectorAll('.create-calc-conditions__item');
                const currentItem = items[items.length - 1];
                const name = currentItem.querySelector('.create-calc-conditions__item-name');
                const prc = currentItem.querySelector('.create-calc-conditions__item-prc');
                inputResize(name);
                inputResize(prc);
                name.addEventListener('input',() => {
                    inputResize(name);
                })
                prc.addEventListener('input',() => {
                    inputResize(prc);
                })
            }
        }

        conditions.addEventListener('click',(e) => {
            const target = e.target;
            const edit = target.closest('.create-calc-conditions__item-edit');
            if (edit) {
                const item = edit.closest('.create-calc-conditions__item');
                const name = item.querySelector('.create-calc-conditions__item-name');
                const prc = item.querySelector('.create-calc-conditions__item-prc');
                if (!item.classList.contains('_edit')) {
                    item.classList.add('_edit');
                    name.removeAttribute('disabled');
                    prc.removeAttribute('disabled');

                    name.focus();
                    name.setSelectionRange(name.value.length, name.value.length);
                } else {
                    item.classList.remove('_edit');
                    name.setAttribute('disabled','');
                    prc.setAttribute('disabled','');
                }
            }
        });
    }
};
export const currentCreateCalc = (mort) => {
    createCalcBody(mort);
}
function createCalcBody(mort){
    const items = mort.querySelectorAll('.create-calc-mort__item');
    const createItem = mort.querySelector('.create-calc-mort__create-item');
    items.forEach(item => {
        itemAction(item);
    })
    if (createItem) {
        createItem.addEventListener('click',() => {
            const ID = generateRandomID(15);
             const itemHTML = `
            <div class="create-calc-mort__item">
            <div class="create-calc-mort__checkbox checkbox-secondary">
                <input id="${ID}" name="${ID}" class="checkbox-secondary__input" type="checkbox">
                <label for="${ID}" class="checkbox-secondary__label">
                    <div class="checkbox-secondary__text">
                    <input type="text" name="Имя" class="input-reset _width-auto" value="">
                        <span>
                            <input type="text" name="Имя" maxlength="3" class="input-reset _width-auto" value="0" disabled>%
                        </span>
                    </div>
                </label>
                <button type="button" class="btn btn-reset create-calc-mort__edit">
                    <svg>
                        <use xlink:href="img/sprite.svg#pencil">
                        </use>
                    </svg>
                </button>
                <button type="button" class="btn btn-reset create-calc-mort__remove">
                    <svg>
                        <use xlink:href="img/sprite.svg#trash">
                        </use>
                    </svg>
                </button>
            </div>
            <div class="create-calc-mort__info" hidden>
                <h3 class="create-calc-mort__title title-3">Дополнительная информация</h3>
                <div class="create-calc-mort__textareas">
                    <label class="textarea-primary">
                        <textarea class="input-reset textarea-primary__input" placeholder=""></textarea>
                    </label>
                    <button type="button" class="btn btn-reset create-calc-mort__create" title="Создать новый блок">
                        <svg>
                            <use xlink:href="img/sprite.svg#plus"></use>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
            `;

            mort.insertAdjacentHTML('beforeend', itemHTML);
            itemAction(mort.querySelector('.create-calc-mort__item:last-child'));
            update(mort.querySelector('.create-calc-mort__item:last-child'));
        });
    }
}


function itemAction(item) {
    const input = item.querySelector('.create-calc-mort__checkbox input');
    const info = item.querySelector('.create-calc-mort__info');
    const edit = item.querySelector('.create-calc-mort__edit');
    const remove = item.querySelector('.create-calc-mort__remove')
    const inputPrc = item.querySelector('.checkbox-secondary__text input');
    const inputText = item.querySelector('.checkbox-secondary__text>input');
    input.addEventListener('change', () => {
        if (!input.checked) {
            info.setAttribute('hidden', '');
        } else {
            info.removeAttribute('hidden');
        }
    });
    edit.addEventListener('click', () => {
        if (!edit.classList.contains('_active')) {
            edit.classList.add('_active');
            inputPrc.removeAttribute('disabled');
            inputPrc.focus();
            inputPrc.setSelectionRange(inputPrc.value.length, inputPrc.value.length);
        } else {
            edit.classList.remove('_active');
            inputPrc.setAttribute('disabled', '');
        }
    })
    remove.addEventListener('click',() => {
        item.remove();
    })
    inputResize(inputPrc);
    inputPrc.addEventListener('input', () => {
        inputResize(inputPrc);
    })
    if (inputText) {
        inputText.focus();
        inputText.setSelectionRange(inputText.value.length, inputText.value.length);

        document.addEventListener('click',(e) => {
            if (e.target !== inputText && inputText.value.length >= 1) {
                inputText.setAttribute('disabled','');
                inputText.style.pointerEvents = 'none';
            }
        })
    }


    const createTextarea = item.querySelector('.create-calc-mort__create');
    createTextarea.addEventListener('click', () => {
        blockAdded(createTextarea);
    });
}


function blockAdded(block) {
    const textareaHTML = `
    <label class="textarea-primary">
        <textarea class="input-reset textarea-primary__input" placeholder=""></textarea>
    </label>
    `;
    block.insertAdjacentHTML('beforebegin', textareaHTML);
}
function update(content) {
    if (content) {
        const inputs = content.querySelectorAll('input._width-auto');
        inputs.forEach(item => {
            inputResize(item);
            item.addEventListener('input', () => {
                inputResize(item);
            })
        });
    }
}