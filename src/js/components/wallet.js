const wallet = () => {
    const container = document.querySelector('.wallet');
    if (!container) return;
    const input = container.querySelector('.wallet-balance__label input');
    const btn = container.querySelector('.wallet-balance__btn')
    input.addEventListener('input', () => {
        if (input.value.length >= 2 && input.value[0] === '0') {
            input.value = input.value.slice(1);
        }
        if (input.value !== '' && input.value !== '0') {
            btn.removeAttribute('disabled');
        } else {
            btn.setAttribute('disabled', '');
        }
    })
    input.addEventListener('focusin', () => {
        input.value = input.value.replace(' ₽', '');
    })
    input.addEventListener('focusout', () => {
        if (input.value !== '' && input.value !== '0') input.value += ' ₽';
    })
};

export default wallet;
