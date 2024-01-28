
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
            if (targetElement.closest('.quantity').hasAttribute('data-hour-format')) {
                targetElement.closest('.quantity').querySelector('input').value = formatHour(value);
            } else {
                targetElement.closest('.quantity').querySelector('input').value = value;
            }
            targetElement.closest('.quantity').setAttribute('data-value', valueAttr);
        }
    });


    function formatHour(hour) {
        if (hour === 1) {
            return `${hour} час`;
        }
        if (hour > 1 && hour < 5) {
            return `${hour} часа`;
        }
        if (hour < 21) {
            return `${hour} часов`;
        }
        if (hour < 25) {
            return `${hour} часа`;
        }
        return `${hour} ч`;
    }
}

export default quantity;
