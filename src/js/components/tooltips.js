import modal from "../modules/modal";

export const tooltipSecondary = () => {
    const items = document.querySelectorAll('.secondary-tooltip--click');
    items.forEach(item => {
        const btn = item.querySelector('.secondary-tooltip__btn');
        const btnClose = item.querySelector('.secondary-tooltip__close');
        const content = item.querySelector('.secondary-tooltip__content')
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            items.forEach(currentItem => {
                if (item !== currentItem) {
                    currentItem.classList.remove('_active')
                }
            });
            if (!item.classList.contains('_active')) {
                item.classList.add('_active');
            } else {
                item.classList.remove('_active');
            }

            const cardPrice = item.closest('.card-price'); 
            if (cardPrice && window.innerWidth <= 1212) {
                let status = '';
                if (cardPrice.classList.contains('card-price--down')) status = '_down';
                if (cardPrice.classList.contains('card-price--up')) status = '_up';
                const modalHTML = `
                <div class="tooltip-modal">
                    <div class="tooltip-modal__container">
                        <button class="btn-reset tooltip-modal__close" aria-label="Закрыть модальное окно">
                            <svg>
                                <use xlink:href="./img/sprite.svg#x"></use>
                            </svg>
                            <span>Закрыть</span>
                        </button>
                        <div class="tooltip-modal__content">
                        </div>
                    </div>
                </div>
                `;
                modal(modalHTML, '.tooltip-modal', 300,item);
                const tooltipModal = document.querySelector('.tooltip-modal');
                if (status) tooltipModal.classList.add(status);
                tooltipModal.querySelector('.tooltip-modal__content').innerHTML = content.outerHTML;
            }
        });
        if (btnClose) {
            btnClose.addEventListener('click', () => {
                item.classList.remove('_active');
            })
        }
    });
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.closest('.secondary-tooltip')) {
            items.forEach(item => item.classList.remove('_active'));
        }
    })
};
