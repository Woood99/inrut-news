const apartKitchen = () => {
    const container = document.querySelector('.apart-kitchen-container');
    if (!container) return;
    const controls = container.querySelector('.apart-kitchen');
    let value = false;
    container.addEventListener('click', (e) => {
        const target = e.target;
        const currentMark = target.closest('.object-apart-renov__mark._edit');
        if (!currentMark) return;
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
            controls.setAttribute('hidden','');
            Array.from(container.querySelectorAll('.object-apart-renov__mark._edit._active')).find(item => {
                if (item) controls.removeAttribute('hidden');
            })
        }
    })
};

export default apartKitchen;
