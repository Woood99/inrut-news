import {
    _slideToggle
} from '../support-modules/slide'
import numberReplace from '../modules/numberReplace';
const additionally = () => {
    const containers = document.querySelectorAll('.additionally');
    if (containers.length === 0) return;
    containers.forEach(container => {
        init(container.querySelectorAll('[data-additionally-card-calc]'));
        const moreBtn = container.querySelector('.additionally__more');
        const moreBtnText = moreBtn.querySelector('span');
        const moreBtnTextDefault = moreBtnText.textContent;
        const moreItems = container.querySelector('[data-additionally-more-items]');
        moreBtn.addEventListener('click', () => {
            moreBtn.classList.toggle('_active');
            _slideToggle(moreItems);
            if (moreBtn.classList.contains('_active')) {
                moreBtnText.textContent = 'Скрыть';
            } else {
                moreBtnText.textContent = moreBtnTextDefault;

                const topGap = window.pageYOffset + container.getBoundingClientRect().top;
                const headerFixed = document.querySelector('.header-fixed');
                if (window.innerWidth >= 1212) {
                    window.scrollTo({
                        top: headerFixed ? topGap - headerFixed.offsetHeight - 12 : topGap - 12,
                        behavior: 'smooth'
                    })
                }
            }
        });

        const typeSumm = container.dataset.additionallyType === 'summ';
        const typeQuantity = container.dataset.additionallyType === 'quantity';
        if (typeSumm) {
            const totalSummElement = container.querySelector('[data-total-summ]');
            let totalSumm = Number(replaceValue(totalSummElement.textContent));
            container.addEventListener('change', (e) => {
                const target = e.target;
                const card = target.closest('[data-additionally-card-calc]');
                if (card) {
                    const currentSumm = Number(replaceValue(card.querySelector('[data-card-summ]').textContent));
                    if (target.checked) {
                        card.classList.add('_active');
                        totalSumm -= currentSumm;
                        sendingToBasket(card);
                    } else {
                        card.classList.remove('_active');
                        totalSumm += currentSumm;
                        removeBasketFromCard(card);
                    }
                    updateDescr();
                    checkErrorCardsSumm(container, totalSumm);
                }
            })

            function updateDescr() {
                totalSummElement.textContent = `${numberReplace(String(totalSumm))} ₽`;
            }

            function checkErrorCardsSumm(container, totalSumm) {
                const cards = Array.from(container.querySelectorAll('[data-additionally-card-calc]'));
                cards.forEach(card => card.classList.remove('_disabled-opacity'));

                const unsuitableCards = cards.filter(card => {
                    const currentSumm = Number(replaceValue(card.querySelector('[data-card-summ]').textContent));
                    return currentSumm > totalSumm && !card.classList.contains('_active');
                })
                unsuitableCards.forEach(card => card.classList.add('_disabled-opacity'));
            }
            document.addEventListener('click', (e) => {
                const target = e.target;
                const removeCard = target.closest('.card-checkbox__remove');
                if (removeCard) {
                    const card = removeCard.closest('.card-checkbox');
                    if (card) {
                        const currentID = card.dataset.cardBasketIndex;
                        const currentCard = document.querySelector(`[data-card-additionally-index='${currentID}']`);
                        const currentSumm = Number(replaceValue(currentCard.querySelector('[data-card-summ]').textContent));
                        totalSumm += currentSumm;
                        removeBasketFromBasket(card,currentCard);
                        updateDescr();
                        checkErrorCardsSumm(container, totalSumm);
                    }
                }
            })
        }
        if (typeQuantity) {
            const descr = container.querySelector('.additionally__descr');
            const maxSumm = Number(replaceValue(container.dataset.totalSummMax));
            const maxQuantity = Number(replaceValue(container.dataset.totalQuantityMax));
            const currentSummElement = container.querySelector('[data-total-summ-current]');
            let totalSumm = Number(replaceValue(currentSummElement.dataset.totalSummCurrent));
            let currentQuantity = 0;
            container.addEventListener('change', (e) => {
                const target = e.target;
                const card = target.closest('[data-additionally-card-calc]');
                if (card) {
                    const currentSumm = Number(replaceValue(card.querySelector('[data-card-summ]').textContent));
                    if (target.checked) {
                        card.classList.add('_active');
                        totalSumm += currentSumm;
                        currentQuantity++;
                        sendingToBasket(card);
                    } else {
                        card.classList.remove('_active');
                        totalSumm -= currentSumm;
                        currentQuantity--;
                        removeBasketFromCard(card);
                    }
                    const cards = Array.from(container.querySelectorAll('[data-additionally-card-calc]'));
                    cards.forEach(card => card.classList.remove('_disabled-opacity'));
                    updateDescr();
                    checkErrorCardsSumm(cards, totalSumm, maxSumm);
                    checkErrorCardsQuantity(cards);
                }
            })

            function checkErrorCardsSumm(cards, totalSumm, maxSumm) {
                const unsuitableCards = cards.filter(card => {
                    const currentSumm = Number(replaceValue(card.querySelector('[data-card-summ]').textContent));
                    return currentSumm + totalSumm > maxSumm && !card.classList.contains('_active');
                })
                unsuitableCards.forEach(card => card.classList.add('_disabled-opacity'));
            }

            function checkErrorCardsQuantity(cards) {
                const notActiveCard = cards.filter(card => !card.classList.contains('_active'));
                if (currentQuantity >= maxQuantity) {
                    notActiveCard.forEach(card => card.classList.add('_disabled-opacity'));
                }
            }

            function updateDescr() {
                if (currentQuantity === 0) {
                    descr.textContent = `Выберите ${maxQuantity} подарка`;
                } else {
                    descr.textContent = `Выбрано ${currentQuantity} из ${maxQuantity} подарка`;
                }
            }
            document.addEventListener('click', (e) => {
                const target = e.target;
                const removeCard = target.closest('.card-checkbox__remove');
                if (removeCard) {
                    const card = removeCard.closest('.card-checkbox');
                    if (card) {
                        const currentID = card.dataset.cardBasketIndex;
                        const currentCard = document.querySelector(`[data-card-additionally-index='${currentID}']`);
                        const currentSumm = Number(replaceValue(currentCard.querySelector('[data-card-summ]').textContent));
                        totalSumm -= currentSumm;
                        currentQuantity--;
                        removeBasketFromBasket(card,currentCard);
                        const cards = Array.from(container.querySelectorAll('[data-additionally-card-calc]'));
                        cards.forEach(card => card.classList.remove('_disabled-opacity'));
                        updateDescr();
                        checkErrorCardsSumm(cards, totalSumm, maxSumm);
                        checkErrorCardsQuantity(cards);
                    }
                }
            })
        }

        function replaceValue(el) {
            return el.replace(/[^0-9]/g, '');
        }
    })
    function init(items) {
        items.forEach((item, index) => item.setAttribute('data-card-additionally-index', index));
    }

    function sendingToBasket(card) {
        const basketContainer = document.querySelector('.additionally-calc');
        if (!basketContainer) return;
        const basket = basketContainer.querySelector('.additionally-calc__list .simplebar-content');
        if (!basket) return;
        const cardMap = {
            index: card.dataset.cardAdditionallyIndex,
            title: card.querySelector('.user-info__name').textContent.trim(),
            oldPrice: card.querySelector('.card-checkbox__price span:nth-child(1)').textContent.trim(),
            newPrice: card.querySelector('.card-checkbox__price span:nth-child(2)').textContent.trim(),
        };
        const cardHTML = `
        <li class="card-checkbox" data-card-basket-index="${cardMap.index}">
            <div class="user-info card-checkbox__info">
                <span class="user-info__name">
                    ${cardMap.title}
                </span>
            </div>
            <div class="card-checkbox__price">
                <span>${cardMap.oldPrice}</span>
                <span>${cardMap.newPrice}</span>
            </div>
            <button type="button" class="btn btn-reset btn-remove card-checkbox__remove" title="Удалить">
                <svg>
                    <use xlink:href="./img/sprite.svg#trash">
                    </use>
                </svg>
            </button>
        </li>
        `;
        basket.insertAdjacentHTML('beforeend', cardHTML);
        visibleOrHiddenBasket();
    }

    function removeBasketFromBasket(card,currentCard) {
        currentCard.classList.remove('_active');
        currentCard.querySelector('input').checked = false;
        card.remove();
        visibleOrHiddenBasket();
    }
    function removeBasketFromCard(card){
        const currentID = card.dataset.cardAdditionallyIndex;
        const currentCard = document.querySelector(`[data-card-basket-index='${currentID}']`);
        currentCard.remove();
        visibleOrHiddenBasket();
    }
    function visibleOrHiddenBasket(){
        const basketContainer = document.querySelector('.additionally-calc');
        if (!basketContainer) return;
        const basket = basketContainer.querySelector('.additionally-calc__list .simplebar-content');
        if (!basket) return;
        if (basket.children.length === 0){
            basketContainer.setAttribute('hidden','');
        } else {
            basketContainer.removeAttribute('hidden');
        }
    }
}

export default additionally;
