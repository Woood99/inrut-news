import metroItems from './metroItems';
import modal from '../modules/modal';
const metroInfo = () => {
    const objectMetro = document.querySelectorAll('.object-data__metro');
    if (objectMetro.length > 0) {
        body();
        setTimeout(() => {
            body();
        }, 1);
        window.addEventListener('resize', () => {
            body();
        });

        function body() {
            objectMetro.forEach(container => {
                metroItems(container, container.closest('.object-body__data'));
            })
        }
    }
    document.addEventListener('click', (e) => {
        const metroOther = e.target.closest('.metro-info__other');
        const metroClose = e.target.closest('.metro-info__close');
        if (metroOther && !e.target.closest('.metro-info__other-items')) {
            e.preventDefault();
            metroOther.classList.toggle('_active');
            if (window.innerWidth <= 1212) {
                const modalHTML = `
                <div class="metro-info-modal">
                    <div class="metro-info-modal__container">
                        <button class="btn-reset metro-info-modal__close" aria-label="Закрыть модальное окно">
                            <svg>
                                <use xlink:href="./img/sprite.svg#x"></use>
                            </svg>
                            <span>Закрыть</span>
                        </button>
                        <div class="metro-info-modal__content">
                            ${metroOther.querySelector('.metro-info__other-items').innerHTML}
                        </div>
                    </div>
                </div>
                `;
                modal(modalHTML, '.metro-info-modal', 300);
                const metroInfoModal = document.querySelector('.metro-info-modal');
            }
        }
        if (metroClose) {
            e.preventDefault();
            metroOther.classList.remove('_active');
        }
    })
};

export default metroInfo;

