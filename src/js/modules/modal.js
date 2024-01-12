import disableScroll from '../modules/disableScroll';
import enableScroll from '../modules/enableScroll';


const modal = (modalHTML, container, speed = 300, target = false) => {
    if (document.querySelectorAll(container).length <= 0 && modalHTML) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modalEl = document.querySelector(container);
        const modalContainerEl = modalEl.querySelector(`${container}__container`);
        const modalCloseEl = modalEl.querySelector(`${container}__close`);
        const genplanClose = modalEl.querySelectorAll('.genplan__to-layouts');
        const clientFixedSendReload = modalEl.querySelector('.client-fixed-sent__btn');
        const recordViewingTwoConfirmBtnYes = modalEl.querySelector('.record-viewing-two-confirm__btn--yes');
        const recordViewingTwoConfirmBtnNo = modalEl.querySelector('.record-viewing-two-confirm__btn--no');
        const settingsModal = {
            modal: modalEl,
            container: modalContainerEl,
            isOpen: false,
            speed: speed,
            animation: 'fade',
            scrollValue: document.querySelector('.page__body').classList.contains('dis-scroll') ? true : false,
        };
        setTimeout(() => {
            modalOpen(settingsModal);
        }, 1);
        modalCloseEl.addEventListener('click', () => {
            modalClose(settingsModal);
        });
        if (genplanClose.length >= 1) {
            genplanClose.forEach(el => {
                el.addEventListener('click', () => {
                    modalClose(settingsModal);
                });
            })
        }
        if (clientFixedSendReload) {
            clientFixedSendReload.addEventListener('click', () => {
                window.location.reload();
            })
        }
        if (recordViewingTwoConfirmBtnNo) {
            recordViewingTwoConfirmBtnNo.addEventListener('click', () => {
                modalClose(settingsModal);
            })
        }
        if (recordViewingTwoConfirmBtnYes) {
            recordViewingTwoConfirmBtnYes.addEventListener('click', () => {
                modalClose(settingsModal);
            })
        }
        modalEl.addEventListener('click', (e) => {
            if (e.target.classList.contains(container.replace(/^\./, ""))) {
                modalClose(settingsModal);
            }
            if (e.target.closest('.choices__item')) {
                modalClose(settingsModal);
            }
            if (e.target.closest('.search-select-one__item')) {
                modalClose(settingsModal);
            }
            if (e.target.closest('.js-popup-close')) {
                modalClose(settingsModal);
            }
        })
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 27) {
                modalClose(settingsModal);
            }
        })
    }

    function modalClose(settingsModal) {
        if (settingsModal.isOpen) {
            settingsModal.container.classList.remove('animate-open');
            settingsModal.container.classList.remove(settingsModal.animation);
            settingsModal.modal.classList.remove('is-open');
            settingsModal.container.classList.remove('open');

             if (!settingsModal.scrollValue) {
                enableScroll();
                document.body.style.scrollBehavior = 'auto';
                document.documentElement.style.scrollBehavior = 'auto';
             }

            setTimeout(() => {
                if (settingsModal.modal.classList.contains('filter-modal')) {
                    target.classList.remove('active');
                    if (settingsModal.modal.classList.contains('filter-modal--select-sort')) {
                        target.querySelector('.choices').insertAdjacentElement('beforeend', settingsModal.container.querySelector('.select-sort').children[0]);
                    } else {
                        target.insertAdjacentElement('beforeend', settingsModal.container.querySelector('.filter-modal__content').children[0]);
                    }
                }
                settingsModal.modal.remove();
            }, settingsModal.speed);
            settingsModal.isOpen = false;


            if (target && target.classList.contains('advantages-card')) {
                target.classList.remove('_active');
            }
            if (target && target.classList.contains('card-stock-secondary')) {
                target.classList.remove('_active');
                target.querySelector('.card-stock-secondary__container').blur();
            }
            if (target && target.classList.contains('card-stock-third')) {
                target.classList.remove('_active');
                target.querySelector('.card-stock-third__container').blur();
            }
        }
    }

    function modalOpen(settingsModal) {
        if (!settingsModal.isOpen) {
            settingsModal.container.scrollTo(0, 0);
            settingsModal.modal.style.setProperty('--transition-time', `${settingsModal.speed / 1000}s`);
            settingsModal.modal.classList.add('is-open');
            if (!settingsModal.scrollValue) {
                document.body.style.scrollBehavior = 'auto';
                document.documentElement.style.scrollBehavior = 'auto';
                disableScroll();
            }
            settingsModal.container.classList.add('open');
            settingsModal.container.classList.add(settingsModal.animation);
            setTimeout(() => {
                settingsModal.container.classList.add('animate-open');
            }, settingsModal.speed);
            settingsModal.isOpen = true;
        }
    }
}

export default modal;
