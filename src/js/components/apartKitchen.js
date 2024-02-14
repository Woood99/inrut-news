const apartKitchen = () => {
    const container = document.querySelector('.apart-kitchen-container');
    if (!container) return;
    const controls = container.querySelector('.apart-kitchen');
    const tableTop = container.querySelector('[data-field-select-name="table-top"]');
    container.addEventListener('click', (e) => {
        const target = e.target;
        const currentMark = target.closest('.object-apart-renov__mark._edit');
        if (currentMark) {
            currentMark.classList.toggle('_active');
            container.querySelectorAll('.object-apart-renov__mark._edit').forEach(item => {
                if (item !== currentMark) item.classList.remove('_active');
            });
            const currentTab = currentMark.closest('[data-apart-kitchen-tab]');
            const currentItem = currentMark.closest('[data-apart-kitchen-item]');
            const currentTabName = currentTab ? currentTab.dataset.apartKitchenTab : false;
            const currentItemName = currentItem ? currentItem.dataset.apartKitchenItem : false;

            if (currentTabName && currentItemName) {
                controls.setAttribute('data-apart-kitchen-name', currentItemName);
                controls.setAttribute('data-apart-kitchen-value', currentTabName);
                controls.setAttribute('hidden', '');
                Array.from(container.querySelectorAll('.object-apart-renov__mark._edit._active')).find(item => {
                    if (item) controls.removeAttribute('hidden');
                })
            }
        }

        const styleColorBtn = target.closest('[data-select-style-color-index]');
        if (styleColorBtn) {
            const currentTabName = container.querySelector('.tabs-primary__btns .tabs__title._tab-active').textContent.trim();
            const currentTab = container.querySelector(`[data-apart-kitchen-item="${currentTabName}"]`);
            const currentItemName = currentTab.querySelector('.furnishing-sets__btn._active').textContent.trim().replace(' см', '');
            const currentItem = currentTab.querySelector(`[data-apart-kitchen-tab="${currentItemName}"]`);
            const image = currentItem.querySelector('.object-apart-renov__image-bg');
            const currentColor = window.getComputedStyle(styleColorBtn.querySelector('.color-circle')).getPropertyValue('background-color');
            image.style.backgroundColor = currentColor;
        }

        const type = target.closest('[data-select-type-index]');
        if (type) {
            if (type.dataset.selectTypeIndex == 3) {
                tableTop.removeAttribute('hidden');
            } else {
                tableTop.setAttribute('hidden', '');
            }
        }
    })
};

export default apartKitchen;
