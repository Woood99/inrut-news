import inputResize from '../modules/inputResize';
import generateRandomID from '../modules/generateRandomID';
import {
    currentInputText,
    valueToValueAttr
} from "./inputs";
export const createCalc = () => {
    const createCalc = document.querySelector('.create-calc');
    if (!createCalc) return;
    const morts = createCalc.querySelectorAll('.create-calc-mort__field');
    morts.forEach(mort => {
        createCalcBody(mort);
    })

};
export const currentCreateCalc = (mort) => {
    createCalcBody(mort);
}

function createCalcBody(mort) {
    const items = mort.querySelectorAll('.create-calc-mort__item');
    const createItem = mort.querySelector('.create-calc-mort__create-item');
    items.forEach(item => {
        itemAction(item);
    })
    if (createItem) {
        createItem.addEventListener('click', () => {
            if (!mort.querySelector('.create-calc-mort__item--field')) {
                const itemFieldHTML = `
            <div class="create-calc-mort__item create-calc-mort__item--field">
            <div class="row">
                <div class="input-text input-text--no-exp create-calc-mort__item-name">
                    <label class="input-text__label">
                        <span>Название</span>
                        <input type="text" name="Название" class="input-reset input-text__input" value="" placeholder="">
                    </label>
                </div>
                <div class="input-text create-calc-mort__item-prc">
                    <label class="input-text__label">
                        <span>Ставка</span>
                        <input type="text" name="Имя" class="input-reset input-text__input" placeholder="">
                        <span>%</span>
                    </label>
                </div>
                <button type="button" class="btn btn-reset create-calc-mort__item-name__save">Сохранить</button>
            </div>
            <div class="create-calc-mort__info">
                <h3 class="create-calc-mort__title title-4">Дополнительная информация</h3>
                <div class="create-calc-mort__textareas">
                    <button type="button" class="btn btn-reset create-calc-mort__create" title="Создать новый блок">
                        <span>Создать</span>
                        <svg>
                            <use xlink:href="img/sprite.svg#plus"></use>
                        </svg>
                    </button>
                </div>
                <div class="create-calc-mort__conditions create-calc-conditions" style="margin: 24px 0;">
                <div class="row">
                    <h3 class="create-calc-conditions__title title-2">
                    Услуги, снижающие ставку по кредиту
                    </h3>
                    <button type="button" class="btn btn-reset create-calc-conditions__create">
                        <svg>
                            <use xlink:href="img/sprite.svg#plus"></use>
                        </svg>
                        <span>Создать новую услугу</span>
                    </button>
                </div>
                <div class="create-calc-conditions__items">
                                                                
                </div>
            </div>
            </div>
        </div>
            `;
                createItem.insertAdjacentHTML('afterend', itemFieldHTML);
                const currentItemField = mort.querySelector('.create-calc-mort__item--field');
                const createTextarea = currentItemField.querySelector('.create-calc-mort__create');

                conditions(currentItemField);
                createTextarea.addEventListener('click', () => {
                    blockAdded(createTextarea);
                });

                const save = currentItemField.querySelector('.create-calc-mort__item-name__save');
                save.addEventListener('click', () => {
                    const name = currentItemField.querySelector('.create-calc-mort__item-name input').value;
                    const prc = currentItemField.querySelector('.create-calc-mort__item-prc input').value;
                    const textareas = currentItemField.querySelector('.create-calc-mort__textareas').outerHTML;
                    const conditions = currentItemField.querySelectorAll('.create-calc-conditions__item');
                    let conditionsItems = '';
                    if (conditions.length > 0) {
                        conditions.forEach(item => {
                            conditionsItems += item.outerHTML;
                        })
                    }
                    if (name && prc) {
                        const itemHTML = `
                    <div class="create-calc-mort__item">
                    <div class="create-calc-mort__btn">
                        <label class="create-calc-mort__checkbox toggle-checkbox">
                            <input type="checkbox" name="toggle-1">
                            <div aria-hidden="true"></div>
                        </label>
                        <span>
                            <input type="text" name="Имя" class="input-reset _width-auto" disabled value="${name}">
                            <span class="_disabled">
                                <input type="text" name="Имя" maxlength="3" class="input-reset _width-auto" value="${prc}" disabled="">%
                            </span>
                        </span>
                        <button type="button" class="btn btn-reset create-calc-mort__edit _disabled" title="Редактировать">
                            <svg>
                                <use xlink:href="img/sprite.svg#pencil">
                                </use>
                            </svg>
                        </button>
                        <button type="button" class="btn btn-reset create-calc-mort__remove" title="Удалить">
                            <svg>
                                <use xlink:href="img/sprite.svg#trash">
                                </use>
                            </svg>
                        </button>
                        <div class="create-calc-mort__check">
                            <svg>
                                <use xlink:href="img/sprite.svg#check"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="create-calc-mort__info" hidden>
                        <h3 class="create-calc-mort__title title-4">Дополнительная информация</h3>
                        ${textareas}
                        <div class="create-calc-mort__conditions create-calc-conditions" style="margin: 24px 0;">
                            <div class="row">
                                <h3 class="create-calc-conditions__title title-2">
                                    Услуги, снижающие ставку по кредиту
                                </h3>
                                <button type="button" class="btn btn-reset create-calc-conditions__create">
                                    <svg>
                                        <use xlink:href="img/sprite.svg#plus"></use>
                                    </svg>
                                    <span>Создать новую услугу</span>
                                </button>
                            </div>
                            <div class="create-calc-conditions__items">
                                ${conditionsItems}                           
                            </div>
                        </div>
                    </div>
                </div>
                `;
                        mort.insertAdjacentHTML('beforeend', itemHTML);
                        const currentItem = mort.querySelector('.create-calc-mort__item:last-child');
                        itemAction(currentItem);
                        update(currentItem);
                        currentItemField.remove();
                    }
                });
            }
        });
    }
}


function itemAction(item) {
    const btnMore = item.querySelector('.create-calc-mort__btn');
    const info = item.querySelector('.create-calc-mort__info');
    const edit = item.querySelector('.create-calc-mort__edit');
    const remove = item.querySelector('.create-calc-mort__remove')
    const inputPrc = btnMore.querySelector('span span input');
    const inputText = btnMore.querySelector('span>input');

    btnMore.addEventListener('click', () => {
        if (!item.classList.contains('_active')) {
            item.classList.add('_active');
            info.removeAttribute('hidden');
        } else {
            item.classList.remove('_active');
            info.setAttribute('hidden', '');
        }
    });


    edit.addEventListener('click', () => {
        if (!edit.classList.contains('_active')) {
            edit.classList.add('_active');
            inputText.removeAttribute('disabled');
            inputPrc.removeAttribute('disabled');
            inputPrc.select();
        } else {
            edit.classList.remove('_active');
            inputPrc.setAttribute('disabled', '');
            inputText.setAttribute('disabled', '');
        }
    })
    remove.addEventListener('click', () => {
        item.remove();
    })
    inputResize(inputText);
    inputResize(inputPrc);
    inputPrc.addEventListener('input', () => {
        inputResize(inputPrc);
    })
    inputText.addEventListener('input', () => {
        inputResize(inputText);
    })
    if (inputText) {
        inputText.focus();
        inputText.setSelectionRange(inputText.value.length, inputText.value.length);

        document.addEventListener('click', (e) => {
            if (e.target !== inputText && inputText.value.length >= 1) {
                inputText.setAttribute('disabled', '');
                inputText.style.pointerEvents = 'none';
            }
        })
    }


    const createTextarea = item.querySelector('.create-calc-mort__create');
    createTextarea.addEventListener('click', () => {
        blockAdded(createTextarea);
    });


    conditions(item);
}

function conditions(item) {
    const conditions = item.querySelector('.create-calc-conditions');
    if (conditions) {
        const conditionsCreate = conditions.querySelector('.create-calc-conditions__create');
        const conditionsCreateText = conditionsCreate.querySelector('span');
        const top = conditions.querySelector('.row:first-child');
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
            <h3 class="title-4" style="grid-column:1/3;margin:16px 0;">Дополнительная информация</h3>
            <div class="create-calc-conditions__textareas">
                <button type="button" class="btn btn-reset create-calc-conditions__create-descr" title="Создать новый блок">
                    <span>Создать</span>
                    <svg>
                        <use xlink:href="img/sprite.svg#plus"></use>
                    </svg>
                </button>
            </div>
             <button type="button" class="btn btn-reset create-calc-conditions__save" style="grid-column:3/4;justify-self: end;align-self: end;">
                <svg>
                <use xlink:href="img/sprite.svg#save"></use>
                </svg>
            </button>
        </div>
        `;
        conditionsCreate.addEventListener('click', () => {
            !conditionsCreate.classList.contains('_active') ? conditionsCreateBody() : conditionsCreateCancel();
        });



        function conditionsCreateBody() {
            conditionsCreate.classList.add('_active');
            conditionsCreateText.textContent = conditionsCreateMap.cancel;
            top.insertAdjacentHTML('afterend', bodyHTML);

            const conditionsBody = conditions.querySelector('.create-calc-conditions__create-body');
            conditionsBody.querySelectorAll('.input-text').forEach(item => currentInputText(item));


            const createTextarea = conditions.querySelector('.create-calc-conditions__create-descr');
            if (createTextarea) {
                createTextarea.addEventListener('click', () => {
                    blockAdded(createTextarea, 1);
                });
            }

            const conditionsSave = conditionsBody.querySelector('.create-calc-conditions__save');

            conditionsSave.addEventListener('click', () => {
                conditionsCreateItem(conditionsBody);
                conditionsCreateCancel();
            })
        }

        function conditionsCreateCancel() {
            conditionsCreate.classList.remove('_active');
            conditionsCreateText.textContent = conditionsCreateMap.default;
            conditions.querySelector('.create-calc-conditions__create-body').remove();
        }

        function conditionsCreateItem(conditionsBody) {
            const conditionsNameValue = conditionsBody.querySelector('.create-calc-conditions__name input').value;
            const conditionsPrcValue = conditionsBody.querySelector('.create-calc-conditions__prc input').value;
            const conditionsTextarea = conditionsBody.querySelector('.create-calc-conditions__textareas .textarea-primary');
            const conditionsTextareaValue = conditionsTextarea ? conditionsTextarea.querySelector('.textarea-primary__input').value : '';
            if (conditionsNameValue && conditionsPrcValue) {
                const itemHtml = `
                <div class="create-calc-conditions__item">
                <input type="text" name="Имя" class="input-reset create-calc-conditions__item-name _width-auto" value="${conditionsNameValue}" disabled>
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
                    <div class="col">
                    <h3 class="title-4">Дополнительная информация</h3>
                    <div class="create-calc-conditions__item-descr">
                        <label class="textarea-primary">
                            <textarea textarea class="input-reset textarea-primary__input" value="${conditionsTextareaValue}" placeholder=""></textarea>
                        </label>
                    </div>
                    </div>
                </div>
            `;
                conditions.querySelector('.create-calc-conditions__items').insertAdjacentHTML('beforeend', itemHtml);
                const items = conditions.querySelectorAll('.create-calc-conditions__item');
                const currentItem = items[items.length - 1];
                const name = currentItem.querySelector('.create-calc-conditions__item-name');
                const prc = currentItem.querySelector('.create-calc-conditions__item-prc');
                inputResize(name);
                inputResize(prc);
                name.addEventListener('input', () => {
                    inputResize(name);
                })
                prc.addEventListener('input', () => {
                    inputResize(prc);
                })
            }
        }

        conditions.addEventListener('click', (e) => {
            const target = e.target;
            const edit = target.closest('.create-calc-conditions__item-edit');
            const remove = target.closest('.create-calc-conditions__item-remove');
            const itemBtn = target.closest('.create-calc-conditions__item-btn');
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
                    name.setAttribute('disabled', '');
                    prc.setAttribute('disabled', '');
                }
            }
            if (remove) {
                const item = remove.closest('.create-calc-conditions__item');
                item.remove();
            }
            if (itemBtn) {
                const item = itemBtn.closest('.create-calc-conditions__item');
                const descr = item.querySelector('.create-calc-conditions__item-descr');
                if (!itemBtn.classList.contains('_active')) {
                    itemBtn.classList.add('_active');
                    itemBtn.querySelector('span').textContent = 'Скрыть';

                    descr.removeAttribute('hidden');
                } else {
                    itemBtn.classList.remove('_active');
                    itemBtn.querySelector('span').textContent = 'Подробнее';

                    descr.setAttribute('hidden', '');
                }

            }
        });
    }
}

function blockAdded(block, maxLength = false) {
    const textareaHTML = `
    <label class="textarea-primary textarea-primary--remove">
        <textarea class="input-reset textarea-primary__input" placeholder=""></textarea>
        <button type="button" class="btn btn-reset textarea-primary__remove" title="Удалить блок">
            <svg>
                <use xlink:href="img/sprite.svg#trash"></use>
            </svg>
        </button>
    </label>
    `;

    if (maxLength) {
        const quantity = block.parentNode.querySelectorAll('.textarea-primary').length + 1;
        body(maxLength);
        if (maxLength <= quantity) {
            block.setAttribute('hidden', '');
        }
    } else {
        body();
    }


    function body(maxLength) {
        block.insertAdjacentHTML('beforebegin', textareaHTML);
        const currentBlock = block.previousElementSibling;
        valueToValueAttr(currentBlock.querySelector('.textarea-primary__input'));

        const remove = currentBlock.querySelector('.textarea-primary__remove');
        remove.addEventListener('click', () => {
            currentBlock.remove();
            const quantity = block.parentNode.querySelectorAll('.textarea-primary').length;
            if (maxLength !== undefined && maxLength > quantity) {
                block.removeAttribute('hidden');
            }
        })
    }
}

function update(content) {
    if (content) {
        const inputs = content.querySelectorAll('input._width-auto');
        inputs.forEach(item => {
            console.log(item);
            inputResize(item);
            item.addEventListener('input', () => {
                inputResize(item);
            })
        });
    }
}
