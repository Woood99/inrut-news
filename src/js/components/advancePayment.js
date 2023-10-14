const advancePayment = () => {
    const items = document.querySelectorAll('.advance-pay');
    items.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('_active');
        })
    })
};

export default advancePayment;
