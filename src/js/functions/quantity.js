const quantity = () => {
    document.addEventListener("click", function (e) {
        const quantity = e.target.closest('.quantity');
        let maxValue = 0;
        let minValue = 0;
        if (quantity) {
            maxValue = quantity.hasAttribute('data-max-value') ? quantity.dataset.maxValue : 99999;
            minValue = quantity.hasAttribute('data-min-value') ? quantity.dataset.minValue : 0;
        }
        let targetElement = e.target.closest('.quantity__button');
        if (targetElement) {
            let value = parseInt(targetElement.closest('.quantity').querySelector('input').value);
            let valueAttr = parseInt(targetElement.closest('.quantity').dataset.value);
            if (targetElement.classList.contains('quantity__button_plus')) {
                if (value < maxValue) {
                    value++;
                }
                if (value >= 0) valueAttr = value;
                if (value < 0 || Number.isNaN(value)) value = 0;
            } else {
                if (value > minValue) {
                    --value;
                    --valueAttr;
                }
                if (value < 0 || Number.isNaN(value)) value = 0;
            }
            targetElement.closest('.quantity').querySelector('input').value = value;
            targetElement.closest('.quantity').setAttribute('data-value', valueAttr);
        }
    });
}

export default quantity;
