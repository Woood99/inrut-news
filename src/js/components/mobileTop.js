import modal from "../modules/modal";

const mobileTop = () => {
    const btn = document.querySelector('.mobile-top__btn');
    const btns = [...document.querySelectorAll('.top-page-inner-title__btn'),...document.querySelectorAll('.top-page-inner__btn')];
    if (btn && btns.length > 0) {
        btn.addEventListener('click',() => {
            if (window.innerWidth <= 1212) {
                btns.forEach(btn => {
                    btn.classList.add('js-popup-close');
                })
                const modalHTML = `
                <div class="nav-btns-popup">
                <div class="nav-btns-popup__container">
                    <button class="btn-reset nav-btns-popup__close" aria-label="Закрыть модальное окно">
                        <svg>
                            <use xlink:href="./img/sprite.svg#x"></use>
                        </svg>
                        <span>Закрыть</span>
                    </button>
                     <div class="nav-btns-popup__content">
                     </div>
                </div>
                </div>
                `;
    
                modal(modalHTML, '.nav-btns-popup', 300);
                const container = document.querySelector('.nav-btns-popup');
                const content = container.querySelector('.nav-btns-popup__content');
                btns.forEach(btn => {
                    content.insertAdjacentElement('beforeend', btn);
                });
            }
        })
    }
};

export default mobileTop;