import { getCurrentDateStringFormatDefault } from '../modules/date';
const setCurrentDate = () => {
    const inputs = document.querySelectorAll('.current-date-start');
    if (inputs.length === 0) return;
    inputs.forEach(input => {
        input.value = getCurrentDateStringFormatDefault();
        const inputText = input.closest('.input-text');
        if (inputText) inputText.classList.add('_active');
    })
};

export default setCurrentDate;