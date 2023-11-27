const submitAppOffers = () => {
    const container = document.querySelector('.submit-app-offers');
    if (!container) return;
    const items = container.querySelectorAll('.submit-app-offers__item');
    const btn = container.querySelector('.submit-app-offers__btn');
    const minItem = 3;
    hiddenItems(items);
    if (btn) {
        if (items.length <= minItem) {
            btn.remove();
            return;
        };
        const btnTextMap = {
            more: btn.querySelector('span').textContent,
            none: 'Скрыть квартиры'
        }
        btn.addEventListener('click', () => {
            if (container.classList.contains('_active')) {
                hiddenItems(items);
                btn.querySelector('span').textContent = btnTextMap.more;
                container.classList.remove('_active');
            } else {
                visibleAllItem(items);
                btn.querySelector('span').textContent = btnTextMap.none;
                container.classList.add('_active');
            }
        });
    }
    items.forEach(item => {
        item.addEventListener('input',() => {
            item.classList.toggle('_active')
        })
    })
    function hiddenItems(items) {
        items.forEach((item, index) => {
            if (index >= minItem) {
                item.setAttribute('hidden', '');
            } else {
                item.removeAttribute('hidden');
            }
        })
    };

    function visibleAllItem(items) {
        items.forEach(item => {
            item.removeAttribute('hidden');
        })
    }
};

export default submitAppOffers;
