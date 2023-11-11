import inputResize from "../modules/inputResize";
import inputCursorEnd from '../modules/inputCursorEnd';
import numberReplace from "../modules/numberReplace";

export const inputText = () => {
    const inputs = document.querySelectorAll('.input-text');
    if (inputs.length >= 1) {
        inputs.forEach(el => {
            inputTextBody(el);
        })
    }
}
export const currentInputText = (input) => {
    if (!input) return;
    inputTextBody(input);
}

function inputTextBody(el) {
    const input = el.querySelector('.input-text__input');
    input.addEventListener('input', () => {
        if (el.classList.contains('input-text--only-number')) {
            input.value = input.value.replace(/\D/g, '');
            input.value = numberReplace(input.value);
        }
        if (el.classList.contains('input-text--only-number-default')) {
            input.value = input.value.replace(/\D/g, '');
        }
        if (input.value.length >= 1) {
            el.classList.add('_active')
        } else {
            el.classList.remove('_active')
        }
    });
    inputCursorEnd(input, 'focus');
}

export const inputOnlyNumber = () => {
    const inputs = document.querySelectorAll('[data-input-only-number]');
    if (inputs.length === 0) return;
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            const value = this.value;
            this.value = value.replace(/\D/g, '');
        })
    });
};
export const textareaSecondary = () => {
    const textareas = document.querySelectorAll('.textarea-secondary');
    textareas.forEach(textarea => {
        const textareaInput = textarea.querySelector('.textarea-secondary__input');
        const textareaMinHeight = textarea.dataset.textareaSecondaryMinHeight;
        const textareaMaxHeight = textarea.hasAttribute('data-textarea-secondary-max-height') ? textarea.dataset.textareaSecondaryMaxHeight : false;
        const textareaClear = textarea.querySelector('.textarea-secondary__clear');
        textareaInput.addEventListener('input', (e) => {
            if (textareaClear) {
                if (textareaInput.value.length >= 1) {
                    textareaClear.removeAttribute('hidden');
                } else {
                    textareaClear.setAttribute('hidden', '');
                }

                textareaClear.addEventListener('click', () => {
                    textareaInput.value = '';
                    textareaClear.setAttribute('hidden', '');
                    toggleActive(e.target, textarea);
                    changeHeight();
                    objectBaseComment();
                })
            }
            toggleActive(e.target, textarea);
            changeHeight();
            objectBaseComment();
        });

        function changeHeight() {
            if (textareaMaxHeight) {
                textarea.style.height = `${textareaMinHeight}px`;
                if (textareaInput.scrollHeight + 2 <= textareaMaxHeight) {
                    textarea.style.height = `${textareaInput.scrollHeight + 2}px`;
                } else {
                    textarea.style.height = `${textareaMaxHeight}px`;
                }
            } else {
                textarea.style.height = `${textareaMinHeight}px`;
                textarea.style.height = `${textareaInput.scrollHeight + 2}px`;
            }
        }

        function objectBaseComment() {
            if (textarea.closest('.object-base-inner__comment')) {
                const saveBtn = textarea.nextElementSibling;
                if (textareaInput.value.length >= 1) {
                    saveBtn.removeAttribute('hidden');
                } else {
                    saveBtn.setAttribute('hidden', '');
                }
            }
        }
    });

    function toggleActive(target, currentTextarea) {
        target.value.length >= 1 ? currentTextarea.classList.add('_active') : currentTextarea.classList.remove('_active');
    }
};

export const inputClue = (target, name, html) => {
    const targets = document.querySelectorAll(target);
    let timeout;
    targets.forEach(target => {
        target.addEventListener('click', () => {
            const container = document.querySelector(`.${name}`);
            if (container) container.remove();
            document.body.insertAdjacentHTML('beforeend', html);
            setTimeout(() => {
                document.querySelector(`.${name}`).classList.add('is-open');
            }, 1);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                close();
            }, 4500);

            document.querySelector(`.${name} .${name}__close`).addEventListener('click', () => {
                clearTimeout(timeout);
                close();
            })
        });
    })

    function close() {
        document.querySelector(`.${name}`).classList.remove('is-open');
        setTimeout(() => {
            document.querySelector(`.${name}`).remove();
        }, 300);
    }
};


export const valueToValueAttr = (field) => {
    field.addEventListener('input', () => {
        field.setAttribute('value', field.value);
    })
}

document.querySelectorAll('.textarea-primary').forEach(textarea => {
    const field = textarea.querySelector('.textarea-primary__input');
    valueToValueAttr(field);
})
