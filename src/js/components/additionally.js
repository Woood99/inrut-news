import {
    _slideToggle
} from '../support-modules/slide'
import numberReplace from '../modules/numberReplace';
export const additionally = () => {
    const containers = document.querySelectorAll('.additionally');
    if (containers.length === 0) return;

    containers.forEach(container => {
        if (!container.classList.contains('additionally--auto')) {
            init(container.querySelectorAll('[data-additionally-card-calc]'));
            moreBtn(container);

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
                            sendingToPopup(card);
                        } else {
                            card.classList.remove('_active');
                            totalSumm += currentSumm;
                            removeBasketFromCard(card);
                            removePopupFromCard(card);
                        }
                        updateDescr();
                        checkErrorCardsSumm(container, totalSumm);
                        checkLengthPresent();
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
                            removeBasketFromBasket(card, currentCard);
                            removePopupFromBasket(document.querySelectorAll(`[data-card-popup-index='${currentID}']`));
                            updateDescr();
                            checkErrorCardsSumm(container, totalSumm);
                            checkLengthPresent();
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
                            sendingToPopup(card);
                        } else {
                            card.classList.remove('_active');
                            totalSumm -= currentSumm;
                            currentQuantity--;
                            removeBasketFromCard(card);
                            removePopupFromCard(card);
                        }
                        const cards = Array.from(container.querySelectorAll('[data-additionally-card-calc]'));
                        cards.forEach(card => card.classList.remove('_disabled-opacity'));
                        updateDescr();
                        checkErrorCardsSumm(cards, totalSumm, maxSumm);
                        checkErrorCardsQuantity(cards);
                        checkLengthPresent();
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
                            removeBasketFromBasket(card, currentCard);
                            removePopupFromBasket(document.querySelectorAll(`[data-card-popup-index='${currentID}']`));
                            const cards = Array.from(container.querySelectorAll('[data-additionally-card-calc]'));
                            cards.forEach(card => card.classList.remove('_disabled-opacity'));
                            updateDescr();
                            checkErrorCardsSumm(cards, totalSumm, maxSumm);
                            checkErrorCardsQuantity(cards);
                            checkLengthPresent();
                        }
                    }
                })
            }
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
            <button type="button" class="btn btn-reset btn-remove btn-remove--gray card-checkbox__remove" title="Удалить">
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

    function removeBasketFromBasket(card, currentCard) {
        currentCard.classList.remove('_active');
        currentCard.querySelector('input').checked = false;
        card.remove();
        visibleOrHiddenBasket();
    }

    function removeBasketFromCard(card) {
        const currentID = card.dataset.cardAdditionallyIndex;
        const currentCard = document.querySelector(`[data-card-basket-index='${currentID}']`);
        currentCard.remove();
        visibleOrHiddenBasket();
    }

    function visibleOrHiddenBasket() {
        const basketContainer = document.querySelector('.additionally-calc');
        if (!basketContainer) return;
        const basket = basketContainer.querySelector('.additionally-calc__list .simplebar-content');
        if (!basket) return;
        if (basket.children.length === 0) {
            basketContainer.setAttribute('hidden', '');
        } else {
            basketContainer.removeAttribute('hidden');
        }
    }

    function sendingToPopup(card) {
        const recordViewingTarget = document.querySelector('.record-viewing__present');
        const bookObjectTarget = document.querySelector('.book-object__present');
        const bookConsultationTarget = document.querySelector('.book-consultation__present');
        const cardMap = {
            index: card.dataset.cardAdditionallyIndex,
            title: card.querySelector('.user-info__name').textContent.trim(),
            tooltip: card.querySelector('.secondary-tooltip').outerHTML,
            link: card.querySelector('.user-info__link') ? card.querySelector('.user-info__link').outerHTML : '',
            avatar: card.querySelector('.user-info__avatar').outerHTML,
        };
        const cardHTML = `
        <li class="card-checkbox card-checkbox--second" data-card-popup-index="${cardMap.index}">
            <div class="user-info card-checkbox__info">
                ${cardMap.avatar}
                <span class="user-info__name">
                    ${cardMap.title}
                </span>
                ${cardMap.link}
            </div>
            <div class="card-checkbox__present">
                <img src="./img/present.png" width="25" height="25" alt="">
            </div>
            ${cardMap.tooltip}
        </li>
        `;
        if (recordViewingTarget) {
            recordViewingTarget.insertAdjacentHTML('beforeend', cardHTML);
        }
        if (bookObjectTarget) {
            bookObjectTarget.insertAdjacentHTML('beforeend', cardHTML);
        }
        if (bookConsultationTarget) {
            bookConsultationTarget.insertAdjacentHTML('beforeend', cardHTML);
        }
    }

    function removePopupFromCard(card) {
        const currentID = card.dataset.cardAdditionallyIndex;
        const currentCards = document.querySelectorAll(`[data-card-popup-index='${currentID}']`);
        currentCards.forEach(card => {
            card.remove();
        })
    }

    function removePopupFromBasket(cards) {
        cards.forEach(card => {
            card.remove();
        })
    }

    function checkLengthPresent() {
        const recordViewingTarget = document.querySelector('.book-object__present');
        const bookObjectTarget = document.querySelector('.record-viewing__present');
        const bookConsultationTarget = document.querySelector('.book-consultation__present');
        body(recordViewingTarget);
        body(bookObjectTarget);
        body(bookConsultationTarget);

        function body(container) {
            if (!container) return;
            const items = container.querySelectorAll('.card-checkbox');
            if (items.length === 0) {
                container.setAttribute('hidden','');
            } else {
                container.removeAttribute('hidden');
            }
        }
    }
}

export const additionallyDefault = (mainContainerSelector) => {
    const containers = document.querySelectorAll('.additionally--auto');
    if (containers.length === 0) return;
    containers.forEach(container => {
        init(container.querySelectorAll('[data-additionally-card-calc]'));
        const mainContainer = container.closest(mainContainerSelector);
        moreBtn(container, mainContainer);

        const additionallyCalc = mainContainer.querySelector('.additionally-calc');
        const additionallyCalcPrice = additionallyCalc.querySelector('[data-additionally-price]');

        container.addEventListener('input', (e) => {
            const target = e.target;
            const item = target.closest('[data-additionally-card-calc]');
            if (item) {
                const currentPrice = item.querySelector('[data-card-summ]');
                if (target.checked) {
                    additionallyCalcPrice.textContent = `${numberReplace(+replaceValue(additionallyCalcPrice.textContent) + +replaceValue(currentPrice.textContent))} ₽`
                    sendingToBasket(additionallyCalc,item);
                } else {
                    additionallyCalcPrice.textContent = `${numberReplace(+replaceValue(additionallyCalcPrice.textContent) - +replaceValue(currentPrice.textContent))} ₽`
                    removeCardFromBasket(additionallyCalc,item);
                }
            }
        })
    })

    function init(items) {
        items.forEach((item, index) => item.setAttribute('data-card-additionally-index', index));
    }

    function sendingToBasket(basket,card) {
        const cardMap = {
            index: card.dataset.cardAdditionallyIndex,
            title: card.querySelector('.user-info__name').textContent.trim(),
            price: card.querySelector('.card-checkbox__price span:nth-child(1)').textContent.trim()
        };
        const cardHTML = `
        <li class="card-checkbox" data-card-basket-index="${cardMap.index}">
            <div class="user-info card-checkbox__info">
                <span class="user-info__name">
                    ${cardMap.title}
                </span>
            </div>
            <div class="card-checkbox__price">
                <span>${cardMap.price}</span>
            </div>
        </li>
        `;
        basket.querySelector('.simplebar-content').insertAdjacentHTML('beforeend', cardHTML);
    }
    function removeCardFromBasket(additionallyCalc,card) {
        const currentID = card.dataset.cardAdditionallyIndex;
        const currentCard = additionallyCalc.querySelector(`[data-card-basket-index='${currentID}']`);
        currentCard.remove();
    }
}


function moreBtn(container, mainContainer = null) {
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

            const topGap = window.pageYOffset + (mainContainer ? mainContainer.getBoundingClientRect().top : container.getBoundingClientRect().top);
            const headerFixed = document.querySelector('.header-fixed');
            if (window.innerWidth >= 1212) {
                window.scrollTo({
                    top: headerFixed ? topGap - headerFixed.offsetHeight - 12 : topGap - 12,
                    behavior: 'smooth'
                })
            }
        }
    });
}


function replaceValue(el) {
    return el.replace(/[^0-9]/g, '');
}
