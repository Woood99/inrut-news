import {
    _slideToggle
} from '../support-modules/slide'
import numberReplace from '../modules/numberReplace';
const additionally = () => {
    const containers = document.querySelectorAll('.additionally');
    if (containers.length === 0) return;
    containers.forEach(container => {
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
                    } else {
                        card.classList.remove('_active');
                        totalSumm += currentSumm;
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
                    } else {
                        card.classList.remove('_active');
                        totalSumm -= currentSumm;
                        currentQuantity--;
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

        }

        function replaceValue(el) {
            return el.replace(/[^0-9]/g, '');
        }
    })
}

export default additionally;
