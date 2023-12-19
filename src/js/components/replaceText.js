const replaceText = () => {
    const elements = document.querySelectorAll('[data-replace-text]');
    if (elements.length === 0) return;
    elements.forEach(element => {
        const defaultText = element.innerHTML;
        const map = element.dataset.replaceText.trim().split(",");
        replace(element, map, defaultText);
        window.addEventListener('resize', () => {
            replace(element, map, defaultText);
        })
    })

    function replace(element, map, defaultText) {
        element.innerHTML = window.innerWidth <= map[1] ? map[0] : defaultText;
    }
};

export default replaceText;
