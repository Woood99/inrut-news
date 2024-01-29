import modal from "./modal";


const dropdown = (containerSelector, targetSelector) => {
    const containers = document.querySelectorAll(containerSelector);

    document.addEventListener('click', (e) => {
        const currentTarget = e.target;
        const targetElement = currentTarget.closest(targetSelector);
        const containerElement = currentTarget.closest(containerSelector);


        if (targetElement) {
            e.preventDefault();
            if (window.innerWidth > 1212) {
                if (!containerElement.classList.contains('_hover')) {
                    const chatItem = containerElement.closest('.chat__item');
                    containerElement.classList.toggle('_active');
                    if (chatItem) chatItem.classList.toggle('_dropdown-active');
                }
            } else {
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
                                ${containerElement.querySelector('.dots-dropdown__dropdown').outerHTML}
                            </div>
                        </div>
                    </div>
                    `;
                modal(modalHTML, '.tooltip-modal', 300);
                const tooltipModal = document.querySelector('.tooltip-modal');
                if (containerElement.closest('.object-info')) tooltipModal.classList.add('_object-info');
            }
        } else {
            containers.forEach(el => {
                if (el.classList.contains('_active')) {
                    el.classList.remove('_active');
                    const chatItem = el.closest('.chat__item');
                    if (chatItem && chatItem.classList.contains('_dropdown-active')) {
                        chatItem.classList.remove('_dropdown-active');
                    }
                }
            })
        }
    });
}


export default dropdown;
