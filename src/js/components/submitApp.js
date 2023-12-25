const submitApp = () => {
    const container = document.querySelector('.submit-app');
    if (!container) return;
    const checkbox = container.querySelector('.submit-app-maps__checkbox .checkbox-secondary__input');
    const maps = container.querySelector('.submit-app-maps__map');
    checkbox.addEventListener('change',() => {
        if (checkbox.checked) maps.setAttribute('hidden','');
        if (!checkbox.checked) maps.removeAttribute('hidden');
    })

    const price = container.querySelector('.submit-app-options__item--price');
    const priceItems = price.querySelectorAll('.filter-dropdown__item');

    const calcProper = container.querySelector('.submit-app-options__item--calc-proper');
    const cash = calcProper.querySelector('[data-name="cash"]');


    priceItems.forEach(item => {
        item.addEventListener('change',() => {
            if (priceItems[0].classList.contains('active')) {
                cash.removeAttribute('disabled');
            }
            if (priceItems[1].classList.contains('active')) {
                cash.setAttribute('disabled', true);
            }
        })
    })
};

export default submitApp;