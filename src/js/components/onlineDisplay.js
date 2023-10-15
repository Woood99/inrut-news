const onlineDisplay = () => {
    const container = document.querySelector('.online-display');
    if (!container) return;
    const items = container.querySelectorAll('.online-display__item');
    const btn = container.querySelector('.online-display__btn');
    const activeNameClass = '_visible-all';
    const btnTextMap = {
        more: btn.textContent,
        none: 'Свернуть'
    }
    itemsHidden();
    btn.addEventListener('click', () => {
        if (!container.classList.contains(activeNameClass)) {
            items.forEach(item => item.removeAttribute('hidden'));
            container.classList.add(activeNameClass);
            btn.textContent = btnTextMap.none;
        } else {
            itemsHidden();
            container.classList.remove(activeNameClass);
            btn.textContent = btnTextMap.more;
        }
    })

    function itemsHidden() {
        items.forEach((item, index) => {
            if (index > 3) item.setAttribute('hidden', '');
        })
    }
};

export default onlineDisplay;
