const choicePay = () => {
    const container = document.querySelector('.choice-pay');
    if (!container) return;
    const items = container.querySelectorAll('.choice-pay__card');
    items.forEach(item => {
        const check = item.querySelector('.choice-pay__check');
        item.addEventListener('click', () => {

            items.forEach(item => item.classList.remove('_active'));
            item.classList.add('_active');

            if (item.classList.contains('choice-pay__card--sum')) check.setAttribute('aria-label', 'Выбрано 100% оплата')
            if (item.classList.contains('choice-pay__card--mortgage')) check.setAttribute('aria-label', 'Выбрана ипотека')
        })
    })
}

export default choicePay;
