import {
    _slideUp,
    _slideDown
} from '../support-modules/slide';
const modalActiveList = [];

const popup = (options, modalName) => {
    const container = document.querySelector(`[data-popup-target=${modalName}]`);
    if (!container) return;
    const modal = container.parentElement;
    let defaultOptions = {
        isOpen: () => {},
        isClose: () => {},
    }
    const settingsModal = {
        btnSelector: `[data-popup-path=${modalName}]`,
        modal,
        container,
        speed: modal.hasAttribute('data-popup-mobile-fast') && window.innerWidth <= 1212 ? 0 : 300,
        animation: 'fade',
        options: Object.assign(defaultOptions, options),
        previousActiveElement: false,
        fixBlocks: document.querySelectorAll('.fix-block'),
        focusElements: [
            'a[href]',
            'input',
            'select',
            'textarea',
            'button',
            'iframe',
            '[contenteditable]',
            '[tabindex]:not([tabindex^="-"])'
        ],
    };
    document.addEventListener('click',(e) => {
        const target = e.target;
        const btn = target.closest(settingsModal.btnSelector); 
        if (btn) {
            if (!target.closest('.nav-arrow-secondary') && !target.classList.contains('_disabled-popup')) {
                modalOpen(btn);
            }
        }
    })

    modal.querySelectorAll('.js-popup-close').forEach(el => {
        el.addEventListener('click', () => {
            if (el.closest('.genplan__to-layouts')) {
                const name = el.closest('[data-layouts]').dataset.layouts;
                const currentLayouts = document.querySelector('.layouts').querySelector(`[data-layouts=${name}]`);
                const target = currentLayouts.querySelector('.layouts__item-body');
                if (target.hidden) {
                    document.querySelector('.layouts').querySelectorAll(`[data-layouts]`).forEach(item => {
                        item.querySelector('.layouts__item-btn').classList.remove('_spoller-active');
                        item.querySelector('.layouts__item-body').setAttribute('hidden', '');
                    })

                    target.previousElementSibling.classList.add('_spoller-active');
                    _slideDown(target, 0);
                }
                setTimeout(() => {
                    const topGap = target.previousElementSibling.offsetTop;
                    const headerFixed = document.querySelector('.header-fixed');
                    const topHeaderMobile = document.querySelector('.top-page-inner');
                    window.scrollTo({
                        top: topGap - (window.innerWidth > 1212 ? headerFixed.offsetHeight : topHeaderMobile.offsetHeight) - 16,
                        behavior: 'smooth'
                    })
                }, 200);
            }
            if (el.classList.contains('client-fixed__btn')) {
                setTimeout(() => {
                    if (el.classList.contains('_validate')) modalClose();
                }, 1);
                return;
            }
            if (el.classList.contains('object-not-popup__btn') && document.querySelector('.popup-primary--record-viewing-two').classList.contains('is-open')) {
                setTimeout(() => {
                    modalClose(document.querySelector('.popup-primary--record-viewing-two'));
                    enableScroll();
                }, 1);
            }
            if (!el.classList.contains('_disabled-popup')){
                modalClose()
            }
        })
    })
    modal.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('popup') && target.classList.contains('is-open') && settingsModal.modal.classList.contains('is-open')) {
            modalClose();
        }
    });
    window.addEventListener('keydown', (e) => {
        if (e.keyCode === 27 && settingsModal.modal.classList.contains('is-open')) {
            if (document.querySelector('.checkboard-popup-card') && document.querySelector('.checkboard-popup-card').classList.contains('is-open')) {
                return;
            }
            if (document.querySelector('.checkboard-cst-popup') && document.querySelector('.checkboard-cst-popup').classList.contains('is-open') && document.querySelector('.popup-genplan') && document.querySelector('.popup-genplan').classList.contains('is-open')) {
                return
            }
            if (modalActiveList[modalActiveList.length - 1] !== modalName) return;
            modalClose();
        }
        if (e.keyCode === 9 && settingsModal.modal.classList.contains('is-open')) {
            focusCatch(e);
        }
    });


    function modalOpen(target) {
        settingsModal.currentBtn = target,
            settingsModal.previousActiveElement = document.activeElement;
        if (settingsModal.modal.classList.contains('is-open')) return;
        settingsModal.container.scrollTo(0, 0);
        settingsModal.modal.style.setProperty('--transition-time', `${settingsModal.speed / 1000}s`);
        settingsModal.modal.classList.add('is-open');
        document.body.style.scrollBehavior = 'auto';
        document.documentElement.style.scrollBehavior = 'auto';

        if (modalActiveList.length < 1) disableScroll();

        settingsModal.container.classList.add('popup-open');
        settingsModal.container.classList.add(settingsModal.animation);

        setTimeout(() => {
            settingsModal.options.isOpen(settingsModal);
            settingsModal.container.classList.add('animate-open');
            popupLastString(modalName, 'added');
            focusTrap();
        }, settingsModal.speed);
    }

    function modalClose(target) {
        if (target) {
            const modal = target;
            const container = target.querySelector('.popup__container');
            if (!modal.classList.contains('is-open')) return
            container.classList.remove('animate-open');
            container.classList.remove(settingsModal.animation);
            modal.classList.remove('is-open');
            container.classList.remove('popup-open');
            popupLastString(modalName, 'delete');
            document.body.style.scrollBehavior = 'auto';
            document.documentElement.style.scrollBehavior = 'auto';
            focusTrap();
        } else {
            if (!settingsModal.modal.classList.contains('is-open')) return;

            settingsModal.container.classList.remove('animate-open');
            settingsModal.container.classList.remove(settingsModal.animation);
            settingsModal.modal.classList.remove('is-open');
            settingsModal.container.classList.remove('popup-open');
            popupLastString(modalName, 'delete');
            if (modalActiveList.length === 0) {
                if (!document.querySelector('[data-menu]').classList.contains('menu--active')) {
                    if (!document.querySelector('.lg-container.gallery-primary-container.lg-show')) {
                        enableScroll();
                    }
                }
    
            }
            document.body.style.scrollBehavior = 'auto';
            document.documentElement.style.scrollBehavior = 'auto';
            settingsModal.options.isClose(settingsModal);
            focusTrap();
        }
    }

    function disableScroll() {
        let pagePosition = window.scrollY;
        lockPadding();
        document.body.classList.add('dis-scroll');
        document.body.dataset.position = pagePosition;
        document.body.style.top = -pagePosition + 'px';
    }

    function enableScroll() {
        let pagePosition = parseInt(document.body.dataset.position, 10);
        unlockPadding();
        document.body.style.top = 'auto';
        document.body.classList.remove('dis-scroll');
        window.scrollTo({
            top: pagePosition,
            left: 0
        });
        document.body.removeAttribute('data-position');
    }

    function lockPadding() {

        let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
        settingsModal.fixBlocks.forEach((el) => {
            el.style.paddingRight = paddingOffset;
        });
        document.body.style.paddingRight = paddingOffset;
    }

    function unlockPadding() {
        settingsModal.fixBlocks.forEach((el) => {
            el.style.paddingRight = '0px';
        });
        document.body.style.paddingRight = '0px';
    }

    function popupLastString(modalName, status) {
        if (status === 'added') {
            modalActiveList.push(modalName);
        }
        if (status === 'delete') {
            const index = modalActiveList.indexOf(modalName);
            if (index > -1) modalActiveList.splice(index, 1);
        }
    }

    function focusCatch(e) {
        const nodes = settingsModal.container.querySelectorAll(settingsModal.focusElements);
        const nodesArray = Array.prototype.slice.call(nodes);
        const focusedItemIndex = nodesArray.indexOf(document.activeElement)
        if (e.shiftKey && focusedItemIndex === 0) {
            nodesArray[nodesArray.length - 1].focus();
            e.preventDefault();
        }
        if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
            nodesArray[0].focus();
            e.preventDefault();
        }
    }

    function focusTrap() {
        const nodes = settingsModal.container.querySelectorAll(settingsModal.focusElements);
        if (settingsModal.modal.classList.contains('is-open')) {
            if (nodes.length) nodes[0].focus();
        } else {
            settingsModal.previousActiveElement.focus();
            settingsModal.previousActiveElement.classList.remove('focus-visible');
        }
    }
};

export default popup;
