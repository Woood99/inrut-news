const bankOffer = () => {
    const items = document.querySelectorAll('.bank-offer');
    items.forEach(item => {
        const choiceContainer = item.querySelector('.bank-offer__choice');
        const additionalItems = item.querySelectorAll('.bank-offer__additional-item');

        const infoItems = item.querySelectorAll('.bank-offer__info-item');
        const bid = infoItems[0].querySelector('div > span');
        const monthPayment = infoItems[1].querySelector('div > span');
        const term = infoItems[2].querySelector('div > span');
        const sum = infoItems[3].querySelector('div > span');
        const overpayment = infoItems[4].querySelector('div > span');

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
                if (item.classList.contains('bank-offer--absolutbank')) {

                    const choiceItems = choiceContainer.querySelectorAll('.bank-offer__choice-item');
                    if (choiceItem === choiceItems[0]) {
                        monthPayment.textContent = '33 932 ₽';
                        overpayment.textContent = '9 565 513 ₽';
                    }
                    if (choiceItem === choiceItems[1]) {
                        monthPayment.textContent = '32 873 ₽';
                        overpayment.textContent = '9 184 255 ₽';
                    }
                    if (choiceItem === choiceItems[2]) {
                        monthPayment.textContent = '31 819 ₽';
                        overpayment.textContent = '8 804 865 ₽';
                    }
                    if (choiceItem === choiceItems[3]) {
                        monthPayment.textContent = '30 771 ₽';
                        overpayment.textContent = '8 427 538 ₽';
                    }
                    if (choiceItem === choiceItems[4]) {
                        monthPayment.textContent = '29 729 ₽';
                        overpayment.textContent = '8 052 483 ₽';
                    }
                    if (choiceItem === choiceItems[5]) {
                        monthPayment.textContent = '28 694 ₽';
                        overpayment.textContent = '7 679 916 ₽';
                    }
                    if (choiceItem === choiceItems[6]) {
                        monthPayment.textContent = '27 667 ₽';
                        overpayment.textContent = '7 310 077 ₽';
                    }
                }
            })
        }

        additionalItems.forEach(item => {
            const btn = item.querySelector('.bank-offer__additional-item__btn');
            const descr = item.querySelector('.bank-offer__additional-item__descr');
            btn.addEventListener('click',() => {
                if (!btn.classList.contains('_active')) {
                    btn.classList.add('_active');
                    btn.textContent = 'Скрыть';

                    descr.removeAttribute('hidden');
                } else {
                    btn.classList.remove('_active');
                    btn.textContent = 'Подробнее';

                    descr.setAttribute('hidden','');
                }
            })
        })
    })
};

export default bankOffer;
