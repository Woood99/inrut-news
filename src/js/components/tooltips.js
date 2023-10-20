export const tooltipSecondary = () => {
    const items = document.querySelectorAll('.secondary-tooltip--click');
    items.forEach(item => {
        const btn = item.querySelector('.secondary-tooltip__btn');
        const btnClose = item.querySelector('.secondary-tooltip__close');
        btn.addEventListener('click', () => {
            if (!item.classList.contains('_active')) {
                item.classList.add('_active');
            } else {
                item.classList.remove('_active');
            }
        });
        btnClose.addEventListener('click',() => {
            item.classList.remove('_active');
        })
    });
    document.addEventListener('click',(e) => {
        const target = e.target;
        if (!target.closest('.secondary-tooltip')) {
            items.forEach(item => item.classList.remove('_active'));
        }
    })
};
