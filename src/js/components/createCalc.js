import inputResize from '../modules/inputResize';

const createCalc = () => {
    const createCalc = document.querySelector('.create-calc');
    if (!createCalc) return;
    const typeProperty = createCalc.querySelector('.create-calc-mort__type-property');
    typeProperty.addEventListener('change', () => {
        const name = typeProperty.querySelector('.choices__item.choices__item--selectable').textContent.trim();
        if (name === 'Новостройка') {
            mort.removeAttribute('hidden');
        } else {
            mort.setAttribute('hidden', '');
        }
    })
    const mort = createCalc.querySelector('.create-calc-mort');
    if (mort) {
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
                ;
                inputResize(inputPrc);
            })


            const createTextarea = item.querySelector('.create-calc-mort__create');
            const textareas = item.querySelector('.create-calc-mort__textareas');
            const textareaHTML = `
            <label class="textarea-primary">
                <textarea class="input-reset textarea-primary__input" placeholder=""></textarea>
            </label>
            `;
            createTextarea.addEventListener('click', () => {
                createTextarea.insertAdjacentHTML('beforebegin', textareaHTML);
            });
        })
    }
};

export default createCalc;
