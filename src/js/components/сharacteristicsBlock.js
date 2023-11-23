const сharacteristicsBlock = () => {
    const checkboxes = document.querySelectorAll('[data-сharacteristics-block-checkbox]');
    const targets = document.querySelectorAll('[data-сharacteristics-block-target]');
    if (checkboxes.length >= 1 && targets.length >= 1) {
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const nameCheckbox = checkbox.dataset.сharacteristicsBlockCheckbox;
                checkboxes.forEach(item => {
                    if (item !== checkbox) item.checked = false;
                });
                targets.forEach(target => {
                    if (target.dataset.сharacteristicsBlockTarget === nameCheckbox && checkbox.checked) {
                        target.removeAttribute('hidden');
                    } else {
                        target.setAttribute('hidden', '');
                    }
                })
            })
        })
    }
};

export default сharacteristicsBlock;
