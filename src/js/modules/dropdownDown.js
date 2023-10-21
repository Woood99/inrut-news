const dropdownDown = (textSelector, targetSelector) => {
    const items = document.querySelectorAll(textSelector);
    if (!items.length >= 1) return;

    const mapBtn = {
        more: 'Показать полностью',
        hide: 'Скрыть'
    }
    items.forEach(text => {
        const btn = text.nextElementSibling;
        btn.addEventListener('click', () => {
            if (!text.classList.contains('_active')) {
                text.classList.add('_active');
                btn.querySelector('span').textContent = mapBtn.hide;
            } else {
                text.classList.remove('_active');
                btn.querySelector('span').textContent = mapBtn.more;
            }
        })
    });
};

export default dropdownDown;
