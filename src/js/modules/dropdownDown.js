const dropdownDown = (textSelector, targetSelector) => {
    const items = document.querySelectorAll(textSelector);
    if (!items.length >= 1) return;
    items.forEach(text => {
        const btn = text.nextElementSibling;
        btn.addEventListener('click', () => {
            text.classList.add('_active');
            btn.remove();
        })
    });
};

export default dropdownDown;
