const submitAppOffers = () => {
    const containers = document.querySelectorAll('.submit-app-offers');
    if (containers.length === 0) return;
    containers.forEach(container => {
        const items = container.querySelectorAll('.submit-app-offers__item');
        const btn = container.querySelector('.submit-app-offers__btn');
        const price = document.querySelector('.submit-app-options__item--price');
        let minItem = 4;
        hiddenItems(items);
        if (btn) {
            if (items.length <= minItem) {
                btn.remove();
                return;
            };
            const btnTextMap = {
                more: btn.querySelector('span').textContent,
                none: container.classList.contains('submit-app-offers--advant') ? 'Скрыть квартиры' : 'Меньше'
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
            item.addEventListener('input', () => {
                const currentPrice = +price.dataset.filterDropdownPriceTo;

                const priceCardFrom = +item.dataset.offerRoomPriceFrom;
                const priceCardTo = +item.dataset.offerRoomPriceTo;
                if (!priceCardFrom && priceCardTo && currentPrice && currentPrice > priceCardTo) {
                    item.classList.add('_clue');
                    return;
                } 
                if (priceCardTo && currentPrice && priceCardTo <= currentPrice) {
                    item.classList.add('_clue');
                    return;
                }
                if (priceCardFrom && currentPrice && currentPrice <= priceCardFrom) {
                    item.classList.add('_clue');
                    return;
                }
                if (priceCardFrom && priceCardTo && currentPrice && !(priceCardTo >= currentPrice && priceCardFrom < currentPrice)) {
                    item.classList.add('_clue');
                    return;
                }

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
        updateMinItem();
        window.addEventListener('resize', () => {
            updateMinItem();
        });

        function updateMinItem() {
            if (window.innerWidth > 1212) {
                minItem = 4;
                hiddenItems(items);
            }
            if (window.innerWidth <= 1212 && window.innerWidth > 768) {
                minItem = 3;
                hiddenItems(items);
                return;
            }
            if (window.innerWidth <= 768) {
                minItem = 2;
                hiddenItems(items);
            }
        }
    })
};

export default submitAppOffers;
