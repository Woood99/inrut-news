const quantity = () => {
    document.addEventListener("click", function (e) {
        let targetElement = e.target.closest('.quantity__button');
        if (targetElement) {
            let value = parseInt(targetElement.closest('.quantity').querySelector('input').value);
            let valueAttr = parseInt(targetElement.closest('.quantity').dataset.value);
            if (targetElement.classList.contains('quantity__button_plus')) {
                value++;
                if (value >= 0) valueAttr = value;
                if (value < 0 || Number.isNaN(value)) value = 0;
            } else {
                --value;
                --valueAttr;
                if (value < 0 || Number.isNaN(value)) value = 0;
            }
            targetElement.closest('.quantity').querySelector('input').value = value;
            targetElement.closest('.quantity').setAttribute('data-value', valueAttr);
        }
    });
}

export default quantity;
