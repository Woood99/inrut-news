import inputResize from "../modules/inputResize";

const сharacteristicsBlock = () => {
    const checkboxes = document.querySelectorAll('[data-сharacteristics-block-checkbox]');
    const targets = document.querySelectorAll('[data-сharacteristics-block-target]');
    if (checkboxes.length > 0 && targets.length > 0) {
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const nameCheckbox = checkbox.dataset.сharacteristicsBlockCheckbox;
                checkboxes.forEach(item => {
                    if (item !== checkbox) item.checked = false;
                });
                targets.forEach(target => {
                    if (target.dataset.сharacteristicsBlockTarget === nameCheckbox && checkbox.checked) {
                        target.removeAttribute('hidden');

                        const btnsEdit = target.querySelectorAll('.tabs__title--edit');
                        btnsEdit.forEach(item => {
                            const input = item.querySelector('._width-auto');
                            if (input) {
                                inputResize(input);
                            }
                        })

                    } else {
                        target.setAttribute('hidden', '');
                    }
                })
            })
        })
    }
};

export default сharacteristicsBlock;
