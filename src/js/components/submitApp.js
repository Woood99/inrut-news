const submitApp = () => {
    const container = document.querySelector('.submit-app');
    if (!container) return;
    const any = container.querySelector('.submit-app-maps__any .checkbox-secondary__input');
    const another = container.querySelector('.submit-app-maps__another');

    const maps = container.querySelector('.submit-app-maps__map');
    any.addEventListener('change',() => {
        if (any.checked) {
            maps.setAttribute('hidden','');
            another.setAttribute('hidden','');
        } else {
            maps.removeAttribute('hidden');
            another.removeAttribute('hidden');
        }
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