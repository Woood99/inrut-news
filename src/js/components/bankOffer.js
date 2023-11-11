import numberToAnim from "../modules/numberToAnim";

const bankOffer = () => {
    const items = document.querySelectorAll('.bank-offer');
    items.forEach(item => {
        const choiceContainer = item.querySelector('.bank-offer__choice');
        const additional = item.querySelector('.bank-offer__additional');
        const additionalItems = item.querySelectorAll('.bank-offer__additional-item');

        const infoItems = item.querySelectorAll('.bank-offer__info-item');
        const bid = infoItems[0].querySelector('div > span');
        const monthPayment = infoItems[1].querySelector('div > span');
        const term = infoItems[2].querySelector('div > span');
        const sum = infoItems[3].querySelector('div > span');

        if (choiceContainer) {
            choiceContainer.addEventListener('click', (e) => {
                const choiceItem = e.target.closest('.bank-offer__choice-item');
                const choiceBtn = e.target.closest('.bank-offer__choice-btn');
                if (choiceItem) {
                    choiceContainer.querySelectorAll('.bank-offer__choice-item').forEach(item => {
                        item.classList.remove('_active');
                        item.querySelector('.radio-primary__input').checked = false;
                    })
                    choiceItem.classList.add('_active');
                    choiceItem.querySelector('.radio-primary__input').checked = true;

                    const currentBid = choiceItem.querySelector('span:nth-child(1)').textContent;
                    bid.textContent = currentBid;
                }
                if (choiceBtn) {
                    choiceContainer.querySelectorAll('.bank-offer__choice-item').forEach(item => {
                        item.removeAttribute('hidden');
                    })
                    choiceBtn.remove();
                }

                // ПРИМЕР (нужна формула ежес. платежа и переплаты)
                // if (item.classList.contains('bank-offer--absolutbank')) {

                //     const choiceItems = choiceContainer.querySelectorAll('.bank-offer__choice-item');
                //     if (choiceItem === choiceItems[0]) {
                //         monthPayment.textContent = '33 932 ₽';
                //     }
                //     if (choiceItem === choiceItems[1]) {
                //         monthPayment.textContent = '32 873 ₽';
                //     }
                //     if (choiceItem === choiceItems[2]) {
                //         monthPayment.textContent = '31 819 ₽';
                //     }
                //     if (choiceItem === choiceItems[3]) {
                //         monthPayment.textContent = '30 771 ₽';
                //     }
                //     if (choiceItem === choiceItems[4]) {
                //         monthPayment.textContent = '29 729 ₽';
                //     }
                //     if (choiceItem === choiceItems[5]) {
                //         monthPayment.textContent = '28 694 ₽';
                //     }
                //     if (choiceItem === choiceItems[6]) {
                //         monthPayment.textContent = '27 667 ₽';
                //     }
                // }
            })
        }

        const selector = item.querySelector('.bank-offer__selector');
        if (selector) {
            const btn = selector.querySelector('.bank-offer__selector-top');
            const selectorContent = selector.querySelector('.bank-offer__selector-content');
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
            })
        }

        additionalItems.forEach(item => {
            const btn = item.querySelector('.bank-offer__additional-item__btn');
            const descr = item.querySelector('.bank-offer__additional-item__descr');
            moreDescr(btn,descr);
            const toggle = item.querySelector('.toggle-checkbox');
            const toggleInput = toggle.querySelector('input');
            const span = toggle.previousElementSibling;
            toggleInput.addEventListener('change', () => {
                if (toggleInput.checked) {
                    span.classList.add('_active');
                } else {
                    span.classList.remove('_active');
                }
            })
        })

        const selectorList = item.querySelector('.bank-offer-selector-list');
        if (selectorList) {
            const items = selectorList.querySelectorAll('.bank-offer-selector-list__item');
            items.forEach(item => {
                const btn = item.querySelector('.bank-offer-selector-list__btn');
                const monthPayment = item.querySelector('[data-bank-offer-item-m-payment]');
                const priceBid = item.querySelector('[data-bank-offer-item-b-price]');
                const benefit = item.querySelector('[data-bank-offer-item-benefit]');
                if (btn) {
                    btn.addEventListener('click', () => {
                        selectorList.querySelectorAll('.bank-offer-selector-list__btn').forEach(btn => btn.classList.remove('_active'));
                        btn.classList.add('_active')
                        if (!item.classList.contains('_init')) {
                            item.classList.add('_init');
                            numberToAnim(monthPayment, 0, Number(monthPayment.dataset.bankOfferItemMPayment), '₽')
                            numberToAnim(priceBid, 0, Number(priceBid.dataset.bankOfferItemBPrice), '₽')
                            numberToAnim(benefit, 0, Number(benefit.dataset.bankOfferItemBenefit), '₽')
                        }
                    })
                }
            })
        }

        const addInfo = item.querySelector('.bank-offer__add-info');
        if (addInfo) {
            const btn = addInfo.querySelector('.bank-offer__add-info-top');
            const selectorContent = addInfo.querySelector('.bank-offer__add-info-content');
            btn.addEventListener('click', () => {
                if (!addInfo.classList.contains('_active')) {
                    addInfo.classList.add('_active');
                    selectorContent.removeAttribute('hidden');
                } else {
                    addInfo.classList.remove('_active');
                    selectorContent.setAttribute('hidden', '');
                }
            })
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

export default bankOffer;
