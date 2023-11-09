import inputResize from '../modules/inputResize';

const createCalc = () => {
    const createCalc = document.querySelector('.create-calc');
    if (!createCalc) return;
    const mortOne = createCalc.querySelector('.create-calc-mort--building');
    const mortTwo = createCalc.querySelector('.create-calc-mort--secondary');
    [mortOne, mortTwo].forEach(mort => {
        const items = mort.querySelectorAll('.create-calc-mort__item');
        items.forEach(item => {
            const input = item.querySelector('.create-calc-mort__checkbox input');
            const info = item.querySelector('.create-calc-mort__info');
            const edit = item.querySelector('.create-calc-mort__edit');
            const inputPrc = item.querySelector('.checkbox-secondary__text input');
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
            inputPrc.addEventListener('input', () => {
                inputResize(inputPrc);
            })


            const createTextarea = item.querySelector('.create-calc-mort__create');
            createTextarea.addEventListener('click', () => {
                blockAdded(createTextarea);
            });
        })
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
    function blockAdded(block) {
        const textareaHTML = `
        <label class="textarea-primary">
            <textarea class="input-reset textarea-primary__input" placeholder=""></textarea>
        </label>
        `;
        block.insertAdjacentHTML('beforebegin', textareaHTML);
    }
};

export default createCalc;
