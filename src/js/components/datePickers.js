import AirDatepicker from 'air-datepicker';
const datePickers = () => {
    const datePickers = document.querySelectorAll('.date-picker');
    datePickers.forEach(datePicker => {
        const input = datePicker.querySelector('.date-picker__input');
        const wrapper = new AirDatepicker(input, {
            autoClose: true,
            isMobile: true,
            onSelect: (fd) => {
                fd.date ? datePicker.classList.add('_active') : datePicker.classList.remove('_active');
            },
        })
    })
};

export default datePickers;