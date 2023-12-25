import { currentInputClue } from "./inputs";

const submitAppOffers = () => {
    const container = document.querySelector('.submit-app-offers');
    if (!container) return;
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
        item.addEventListener('input', () => {
            const priceCardFrom = item.dataset.offerRoomPriceFrom;
            const priceCardTo = item.dataset.offerRoomPriceTo;
            const currentPriceFrom = price.dataset.filterDropdownPriceFrom;
            const currentPriceTo = price.dataset.filterDropdownPriceTo;
            if (priceCardFrom && currentPriceFrom && currentPriceFrom > priceCardFrom) {
                currentInputClue('clue-primary', `
                <div class="clue-primary">
                    <div class="clue-primary__close">
                        <svg>
                          <use xlink:href="./img/sprite.svg#x"></use>
                        </svg>
                    </div>
                    <picture class="clue-primary__img">
                        <source srcset="./img/lora_face.webp" type="image/webp">
                        <img loading="lazy" src="./img/lora_face.png" width="48" height="48" alt="lora">
                    </picture>
                    <h4 class="clue-primary__title title-3">
                        Этот объект не подходит под выбранную цену
                    </h4>
                </div>
                `,'offer-room-clue');
            } else if (priceCardTo && currentPriceTo && currentPriceTo > priceCardTo) {

            } else {
                item.classList.toggle('_active')
            }
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
};

export default submitAppOffers;
