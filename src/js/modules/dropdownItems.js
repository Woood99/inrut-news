import {
    _slideToggle
} from "../support-modules/slide";

const dropdownItems = (containerSelector, btnSelector, hideText) => {
    const containers = document.querySelectorAll(containerSelector);
    if (!containers.length >= 1) return;
    containers.forEach(container => {
        let value = false;
        const btn = container.querySelector(btnSelector);
        const btnText = btn.querySelector('span').textContent.trim();
        btn.addEventListener('click', () => {
            container.querySelectorAll('[data-dropdown-items]').forEach(el => {
                _slideToggle(el, 500);
            })
            btn.querySelector('span').textContent = value ? btnText : hideText;
            btn.classList.toggle('_active');
            value = !value;
        });
    })
}

export default dropdownItems;
