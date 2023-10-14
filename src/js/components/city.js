const city = () => {
    const container = document.querySelector('.city-popup');
    if (!container) return;

    const input = container.querySelector('.city-popup__input input');
    const btnSave = container.querySelector('.city-popup__save');
    const btnClear = container.querySelector('.city-popup__clear')
    container.addEventListener('click', (e) => {
        const target = e.target;
        const btn = target.closest('.city-popup__item');
        if (btn) {
            if (!btn.classList.contains('_active')) {
                const nameCity = btn.textContent.trim();
                input.value = nameCity;

                clearAllBtn();

                btn.classList.add('_active');
                btnSave.removeAttribute('disabled');
            } else {
                clearAllBtn();
                input.value = '';
                btnSave.setAttribute('disabled', '');
            }
            showHiddenClearBtn();
        }
    })
    input.addEventListener('input', () => {
        container.querySelectorAll('.city-popup__item').forEach(item => {
            if (input.value === item.textContent.trim()) {
                item.classList.add('_active');
                btnSave.removeAttribute('disabled');
            } else {
                item.classList.remove('_active');
                btnSave.setAttribute('disabled', '');
            }
        })
        showHiddenClearBtn();
    })

    function clearAllBtn() {
        container.querySelectorAll('.city-popup__item._active').forEach(item => item.classList.remove('_active'));
    }

    function showHiddenClearBtn() {
        input.value.length >= 1 ? btnClear.removeAttribute('hidden') : btnClear.setAttribute('hidden', '');
    }
    btnClear.addEventListener('click', () => {
        input.value = '';
        clearAllBtn();
        btnClear.setAttribute('hidden', '');
        btnSave.setAttribute('disabled', '');
    });
};

export default city;
