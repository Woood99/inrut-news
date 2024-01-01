const metroItems = (container, content) => {
    if (container && content) {
        for (let i = 0; i < container.querySelectorAll('.metro-info__item:not(.metro-info__item--tooltip)').length; i++) {
            const items = container.querySelectorAll('.metro-info__item:not(.metro-info__item--tooltip)');
            const visibleItems = Array.from(items).filter(item => !item.hasAttribute('hidden'));

            const other = container.querySelector('.metro-info__other');
            const otherItemsContainer = container.querySelector('.metro-info__other-items');
            const otherItems = otherItemsContainer.querySelectorAll('.metro-info__item--tooltip');
            const count = container.querySelector('.metro-info__count span');

            const widthContent = content.offsetWidth;
            let widthMetro = 60;
            items.forEach(item => {
                widthMetro += item.offsetWidth + 16;
            })
            const visibleItemLast = visibleItems[visibleItems.length - 1];
            const otherItemLast = otherItems[otherItems.length - 1];
            if (widthMetro + (otherItemLast ? otherItemLast.offsetWidth + 16 : 0) > widthContent && visibleItems.length > 1) {
                visibleItemLast.classList.add('metro-info__item--tooltip');
                otherItemsContainer.insertAdjacentElement('beforeend', visibleItemLast);
                count.textContent = otherItems.length + 1;
            }
            if (widthMetro + (visibleItemLast ? visibleItemLast.offsetWidth + 16 : 0) <= widthContent && otherItems.length > 0) {
                otherItemLast.classList.remove('metro-info__item--tooltip');
                other.insertAdjacentElement('beforebegin', otherItemLast);
                count.textContent = otherItems.length - 1;
            }
            otherItems.length > 0 ? other.removeAttribute('hidden') : other.setAttribute('hidden', '');
        }
    }
}

export default metroItems;