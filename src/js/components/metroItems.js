const metroItems = (container,maxItem = 1) => {
    if (container){
        let move = false;
        const items = container.querySelectorAll('.metro-info__item');
        const other = container.querySelector('.metro-info__other');
        const otherCount = container.querySelector('.metro-info__count span');
        if (items.length > maxItem) {
            other.removeAttribute('hidden');
            const otherItems = Array.from(items).filter((item,index) => index > maxItem - 1);
            otherCount.textContent = otherItems.length;
            const tooltipItems = container.querySelector('.metro-info__other-items');
            other.addEventListener('click',(e) => {
                if (!move){
                    move = true;
                    let html = '';
                    otherItems.forEach(item => {
                        html += `
                            <div class="metro-info__item metro-info__item--tooltip">
                                ${item.innerHTML}
                            </div>
                        `;
                    })
                    tooltipItems.insertAdjacentHTML('beforeend', html);
                }
            })
        }
    }
}

export default metroItems;