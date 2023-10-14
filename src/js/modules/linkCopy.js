const linkCopy = (selector) => {
    const items = document.querySelectorAll(selector);
    items.forEach(el => {
        el.addEventListener('click', () => {
            const href = el.dataset.href;
            el.classList.add('active');
            el.textContent = 'Ссылка скопирована';
            navigator.clipboard.writeText(href);
        });
    })
};

export default linkCopy;
