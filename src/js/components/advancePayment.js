const advancePayment = () => {
    const items = document.querySelectorAll('.advance-pay');
    if (items.length > 0) {
        items.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('_active');
            })
        })
    }
};

export default advancePayment;
