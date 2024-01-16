import modal from "../modules/modal";
import videoBlock from "./videoBlock";
const videoModal = () => {
    const targets = document.querySelectorAll('[data-video-modal]');
    if (targets.length === 0) return;
    targets.forEach(target => {
        target.addEventListener('click',(e) => {
            if (!e.target.closest('.dots-dropdown')) {
                const modalHTML = `
                <div class="video-modal">
                <div class="video-modal__container">
                    <button class="btn-reset video-modal__close" aria-label="Закрыть модальное окно">
                        <svg>
                            <use xlink:href="./img/sprite.svg#x"></use>
                        </svg>
                        <span>Закрыть</span>
                    </button>
                     <div class="video-modal__content review-modal-content">
                     <div class="video-block video-block--auto">
                     <button type="button" class="btn btn-reset video-block__button" data-src="${target.dataset.videoModal}">
                         ${target.querySelector('.video-card__image') ? target.querySelector('.video-card__image').innerHTML : ''}
                         ${target.querySelector('.card-short__link picture') ? target.querySelector('.card-short__link picture').innerHTML : ''}
                         <div class="video-block__video">
     
                         </div>
                         <div class="video-block__play">
                             <svg>
                                 <use xlink:href="./img/sprite.svg#play"></use>
                             </svg>
                         </div>
                     </button>
                 </div>
                     </div>
                </div>
                </div>
                `;
                modal(modalHTML, '.video-modal', 300);
                document.querySelector('.video-modal .video-block img').classList.add('video-block__poster');
                videoBlock(document.querySelector('.video-modal .video-block'));
            }
        });
    });
};

export default videoModal;