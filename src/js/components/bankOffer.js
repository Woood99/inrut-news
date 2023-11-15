import numberToAnim from "../modules/numberToAnim";
import numberReplace from '../modules/numberReplace';
const bankOffer = () => {
    const items = document.querySelectorAll('.bank-offer');
    items.forEach(container => {
        const choiceContainer = container.querySelector('.bank-offer__choice');
        const additional = container.querySelector('.bank-offer__additional');
        const additionalItems = container.querySelectorAll('.bank-offer__additional-item');

        const infoItems = container.querySelectorAll('.bank-offer__info-item');
        const bid = infoItems[0].querySelector('[data-bank-offer-default-prc]');
        const monthPaymentTop = infoItems[1].querySelector('div > span');
        const term = infoItems[2].querySelector('div > span');
        const sum = infoItems[3].querySelector('div > span');

        const selector = container.querySelector('.bank-offer__selector');
        if (selector) {
            const btn = selector.querySelector('.bank-offer__selector-top');
            const selectorContent = selector.querySelector('.bank-offer__selector-content');
            const closeBtn = selector.querySelector('.bank-offer__close-item');
            btn.addEventListener('click', () => {
                if (!selector.classList.contains('_active')) {
                    selector.classList.add('_active');
                    selectorContent.removeAttribute('hidden');
                    if (additional) additional.removeAttribute('hidden');
                } else {
                    selector.classList.remove('_active');
                    selectorContent.setAttribute('hidden', '');
                    if (additional) additional.setAttribute('hidden', '');
                }
            });
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    selector.classList.remove('_active');
                    selectorContent.setAttribute('hidden', '');
                    if (additional) additional.setAttribute('hidden', '');
                })
            }

        }

        const selectorList = container.querySelector('.bank-offer-selector-list');
        if (selectorList && additionalItems.length > 0) {
            const items = selectorList.querySelectorAll('.bank-offer-selector-list__item');
            let newPrc;
            let defaultPrc;
            let defaultPrcNumber;
            let currentPrc;
            updateTopInfo();
            items.forEach(item => {
                const btn = item.querySelector('.bank-offer-selector-list__btn');
                const monthPayment = item.querySelector('[data-bank-offer-item-m-payment]');
                const priceBid = item.querySelector('[data-bank-offer-item-b-price]');
                const benefit = item.querySelector('[data-bank-offer-item-benefit]');
                if (btn) {
                    btn.addEventListener('click', () => {
                        selectorList.querySelectorAll('.bank-offer-selector-list__btn').forEach(btn => btn.classList.remove('_active'));
                        btn.classList.add('_active');
                        bid.textContent = btn.textContent;
                        numberToAnim(monthPaymentTop, 0, Number(monthPayment.dataset.bankOfferItemMPayment), '₽');
                        updateTopInfo();
                        if (!item.classList.contains('_init')) {
                            item.classList.add('_init');
                            numberToAnim(monthPayment, 0, Number(monthPayment.dataset.bankOfferItemMPayment), '₽')
                            numberToAnim(priceBid, 0, Number(priceBid.dataset.bankOfferItemBPrice), '₽')
                            numberToAnim(benefit, 0, Number(benefit.dataset.bankOfferItemBenefit), '₽')
                        }
                    })
                }
            })

            additionalItems.forEach(item => {
                const btn = item.querySelector('.bank-offer__additional-item__btn');
                const descr = item.querySelector('.bank-offer__additional-item__descr');
                moreDescr(btn, descr);
                const toggle = item.querySelector('.toggle-checkbox');
                const toggleInput = toggle.querySelector('input');
                const span = toggle.previousElementSibling;

                toggleInput.addEventListener('change', () => {
                    const elPrc = +numberPrcToNumber(span.textContent);
                    currentPrc = Number(currentPrc);
                    if (toggleInput.checked) {
                        span.classList.add('_active');
                        currentPrc = currentPrc + elPrc;
                    } else {
                        span.classList.remove('_active');
                        currentPrc = currentPrc - elPrc;
                    }
                    currentPrc = currentPrc.toFixed(1);
                    if (defaultPrcNumber != currentPrc) {
                        newPrc.removeAttribute('hidden');
                        defaultPrc.classList.add('_old');
                        newPrc.textContent = numberToNumberPrc(currentPrc);
                    } else {
                        newPrc.textContent = numberToNumberPrc(currentPrc);
                        newPrc.setAttribute('hidden', '');
                        defaultPrc.classList.remove('_old');
                    }
                })
            })

            function updateTopInfo() {
                newPrc = container.querySelector('[data-bank-offer-new-prc]');
                defaultPrc = container.querySelector('[data-bank-offer-default-prc]');
                defaultPrcNumber = +Number(defaultPrc.textContent.replace('%', '').replace(',', '.')).toFixed(1);
                currentPrc = +Number(defaultPrc.textContent.replace('%', '').replace(',', '.')).toFixed(1);
                additionalItems.forEach(item => {
                    const activeEl = item.querySelectorAll('._active');
                    activeEl.forEach(active => {
                        const elPrc = numberPrcToNumber(active.textContent);
                        currentPrc = (Number(currentPrc) + elPrc).toFixed(1);
                        if (defaultPrcNumber != currentPrc) {
                            newPrc.removeAttribute('hidden');
                            defaultPrc.classList.add('_old');
                            newPrc.textContent = numberToNumberPrc(currentPrc);
                        }
                    })
                });
            }
        }

        const addInfo = container.querySelector('.bank-offer__add-info');
        if (addInfo) {
            const btn = addInfo.querySelector('.bank-offer__add-info-top');
            const selectorContent = addInfo.querySelector('.bank-offer__add-info-content');
            const closeBtn = addInfo.querySelector('.bank-offer__close-item');
            btn.addEventListener('click', () => {
                if (!addInfo.classList.contains('_active')) {
                    addInfo.classList.add('_active');
                    selectorContent.removeAttribute('hidden');
                } else {
                    addInfo.classList.remove('_active');
                    selectorContent.setAttribute('hidden', '');
                }
            })
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    addInfo.classList.remove('_active');
                    selectorContent.setAttribute('hidden', '');
                })
            }
        }

        function moreDescr(btn, descr) {
            btn.addEventListener('click', () => {
                if (!btn.classList.contains('_active')) {
                    btn.classList.add('_active');
                    btn.querySelector('span').textContent = 'Скрыть';

                    descr.removeAttribute('hidden');
                } else {
                    btn.classList.remove('_active');
                    btn.querySelector('span').textContent = 'Подробнее';

                    descr.setAttribute('hidden', '');
                }
            })
        }

    })
};

function numberToNumberPrc(number) {
    number = number.replace('.', ',');
    return `${number}%`;
}

function numberPrcToNumber(number) {
    const result = +Number(number.replace('%', '').replace(',', '.'));
    return result;
}

export default bankOffer;
