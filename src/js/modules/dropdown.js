import modal from "./modal";


const dropdown = (containerSelector, targetSelector) => {
    const container = document.querySelectorAll(containerSelector);
    container.forEach(el => {
        const target = el.querySelector(targetSelector);
        const chatItem = el.closest('.chat__item');
        if (!el.classList.contains('_hover')) {
            target.addEventListener('click', (e) => {
                if (window.innerWidth > 1212){
                e.preventDefault();
                container.forEach(el => {
                    if (e.target.closest(containerSelector) !== el) {
                        el.classList.remove('_active');
                        if (el.closest('.chat__item')) {
                            el.closest('.chat__item').classList.remove('_dropdown-active');
                        }
                    }
                });
                el.classList.toggle('_active');

                if (chatItem) {
                    chatItem.classList.toggle('_dropdown-active');
                }
            }
            });
        }

        document.addEventListener('click', (e) => {
            if (!e.target.closest(containerSelector)) {
                if (el.classList.contains('_active')) el.classList.remove('_active');
                if (chatItem && chatItem.classList.contains('_dropdown-active')) {
                    chatItem.classList.remove('_dropdown-active');
                }
            }
        })
        target.addEventListener('click', (e) => {
            if (window.innerWidth <= 1212) {
                e.preventDefault();
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
                            ${el.querySelector('.dots-dropdown__dropdown').outerHTML}
                        </div>
                    </div>
                </div>
                `;
                modal(modalHTML, '.tooltip-modal', 300);
                const tooltipModal = document.querySelector('.tooltip-modal');
                if (el.closest('.object-info')){
                    tooltipModal.classList.add('_object-info');
                }
            }
        });
    });
}

export default dropdown;
