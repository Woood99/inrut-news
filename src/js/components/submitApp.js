const submitApp = () => {
    const container = document.querySelector('.submit-app');
    if (!container) return;
    const any = container.querySelector('.submit-app-maps__any .checkbox-secondary__input');
    const another = container.querySelector('.submit-app-maps__another');

    const maps = container.querySelector('.submit-app-maps__map');
    if (any && another && maps) {
        any.addEventListener('change', () => {
            if (any.checked) {
                maps.setAttribute('hidden', '');
                another.setAttribute('hidden', '');
            } else {
                maps.removeAttribute('hidden');
                another.removeAttribute('hidden');
            }
        })
    }

    const price = container.querySelector('.submit-app-options__item--price');

    if (price) {
        const priceItems = price.querySelectorAll('.filter-dropdown__item');
        const calcProper = container.querySelector('.submit-app-options__item--calc-proper');
        const cash = calcProper.querySelector('[data-name="cash"]');
        // priceItems.forEach(item => {
        //     item.addEventListener('change', () => {
        //         if (priceItems[0].classList.contains('active')) {
        //             cash.removeAttribute('disabled');
        //         }
        //         if (priceItems[1].classList.contains('active')) {
        //             cash.setAttribute('disabled', true);
        //         }
        //     })
        // })
    }


    const city = container.querySelector('.submit-app-maps__city');
    const metro = container.querySelector('.submit-app-maps__metro');
    if (city && metro) {
        cityInit(city);
        city.addEventListener('change', (e) => {
            cityInit(city);
        })

        function cityInit(city) {
            const name = city.querySelector('.choices__item.choices__item--selectable').textContent.trim();
            name !== 'Москва' ? metro.setAttribute('hidden', '') : metro.removeAttribute('hidden');
        }
    }
};

export default submitApp;
