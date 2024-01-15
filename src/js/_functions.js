import burgerMenu from './functions/burger';
import {tabs} from "./functions/tabs";
import spollers from "./functions/spollers";
import {
    galleryPrimary,
    galleryStories
} from './components/gallery';
import videoBlock from './components/videoBlock';
burgerMenu();
tabs();
spollers();
galleryPrimary();
galleryStories();
// ========================================================================================

import "./functions/sliders";
import './functions/fix-fullheight';

// ========================================================================================
import popup from './functions/popup';
import inputResize from './modules/inputResize';
popup(null, 'city');
popup(null, 'add');
popup(null, 'personal-area');
popup(null, 'edit-profile');
popup(null, 'edit-profile_agent');
popup(null, 'share-app');
popup(null, 'complaint');
popup(null, 'complaint-user');
popup(null, 'complaint-object');
popup(null, 'complaint-object-two');
popup(null, 'thanks');
popup(null, 'thanks-object');
popup(null, 'object-not');
popup(null, 'object-not-two');
popup(null, 'interest-rate-modal');
popup({
    isOpen: (settingsModal) => {
        inputResize(settingsModal.container.querySelector('.filter-range-one__input--w-auto'));
        if (document.body.querySelector('.main').classList.contains('mortgage')) {
            const itemsBody = document.querySelectorAll('.object-calc-mort__btn');
            const itemsModal = settingsModal.container.querySelectorAll('[data-mortgage-card]');
            itemsBody.forEach(itemBody => {
                itemsModal.forEach(itemModal => {
                    if (itemBody.dataset.mortgageCard === itemModal.dataset.mortgageCard) {
                        if (itemBody.classList.contains('_active')) {
                            itemModal.classList.add('_active');
                        } else {
                            itemModal.classList.remove('_active');
                        }
                    }
                })
            })
        }
    },
    isClose: () => {

    }
}, 'interest-rate-modal-two');
popup(null, 'construct-progress-popup');
popup({
    isOpen: () => {
        if (window.innerWidth > 1212) return;
        const container = document.querySelector('.genplan');
        const wrapper = container.querySelector('.genplan__wrapper');
        setTimeout(() => {
            wrapper.scrollIntoView({
                inline: 'end',
            })
            container.scrollTo({
                left: container.scrollLeft / 2
            })
        }, 5);

    },
    isClose: () => {
        if (window.innerWidth > 1212) return;
        const container = document.querySelector('.genplan');
        const mask = container.querySelector('.genplan__mask');
        mask.classList.remove('hidden');
        mask.classList.add('_active');
    },
}, 'popup-genplan');

popup(null, 'popup-map_buy-apartment-building');
popup(null, 'search-area');
popup(null, 'search-area-two');
popup({
    isOpen: (settingsModal) => {
        const chat = document.querySelector('.chat');
        if (!chat) return;
        const bar = document.querySelector('.chat__bar .simplebar-content-wrapper');
        const chatBottom = chat.querySelector('.chat__bottom');
        const chatTags = chat.querySelector('.chat__tags');
        chat.style.setProperty('--chat-bottom-height', `${chatBottom.offsetHeight}px`);
        chat.style.setProperty('--chat-tags-height', `${chatTags.offsetHeight}px`);

        if (settingsModal.currentBtn.closest('.record-viewing-two')) {
            const btnHTML = `
                <button type="button" class="btn btn-reset btn-primary chat__booking-btn">Детали брониварония</button>
            `;

            chatBottom.insertAdjacentHTML('beforebegin', btnHTML);
            chat.style.setProperty('--chat-booking-height', `${chat.querySelector('.chat__booking-btn').offsetHeight + 16}px`);
        }

        bar.scrollTo({
            top: bar.querySelector('.simplebar-content').clientHeight,
        })
    },
    isClose: (settingsModal) => {
        const chat = document.querySelector('.chat');
        if (!chat) return;
        const bookingbtn = chat.querySelector('.chat__booking-btn');
        chat.style.setProperty('--chat-booking-height', `0px`);
        if (bookingbtn) bookingbtn.remove();
    }
}, 'chat');
popup(null, 'online-display-popup');
popup(null, 'authorization');
popup(null, 'sber-tied');
popup(null, 'kit-composition');
popup(null, 'book-consultation');
popup(null, 'record-viewing-three');
popup({
    isOpen: (settingsModal) => {
        videoBlock(settingsModal.container.querySelector('.screen-demonstation__video'));
    },
    isClose: (settingsModal) => {
        settingsModal.container.querySelector('.video-block__video').innerHTML = '';
    }

}, 'screen-demonstation-popup');
popup(null, 'record-viewing');
popup(null, 'record-viewing-two');
popup(null, 'personal-area-two');
popup(null, 'client-fixed');
popup(null, 'add-card');
popup(null, 'favorite-two');
popup(null, 'add-contact');
popup(null, 'add-addit-contact');
popup(null, 'create-agree');
popup(null, 'create-document');
popup(null, 'create-deal');
popup(null, 'edit-user');
popup(null, 'create-meeting-show');
popup(null, 'suggest-object');
popup(null, 'history-changes');
popup(null, 'furnishing-sets-popup');
popup(null, 'object-apart-renov-popup');
popup(null, 'object-ecology-parks-popup');
popup(null, 'videos-popup');
popup(null, 'stock-offers-popup');
popup(null, 'tariff-popup');
popup(null, 'tariff-bank-popup');
popup(null, 'want-discount');
popup(null, 'want-discount2');
popup(null, 'proposal-sent');
popup({
    isOpen: (settingsModal) => {
        const currentBtn = settingsModal.currentBtn;
        const items = currentBtn.closest('.swiper-wrapper').querySelectorAll('.swiper-slide');
        const currentSlide = currentBtn.closest('.swiper-slide');
        let index = 0;
        items.forEach((item, currentIndex) => {
            if (item === currentSlide) index = currentIndex;
        })
        const container = settingsModal.container;
        const navItems = container.querySelectorAll('[data-tabs-title]');
        const imagesItems = container.querySelectorAll('[data-tabs-item]')
        navItems.forEach((item, currentIndex) => {
            currentIndex === index ? item.classList.add('_tab-active') : item.classList.remove('_tab-active');
        })
        imagesItems.forEach((item, currentIndex) => {
            currentIndex === index ? item.removeAttribute('hidden') : item.setAttribute('hidden','');
        })
    },
}, 'object-gallery');
popup(null, 'object-gallery--two');
popup(null, 'warning-remove');
popup(null, 'warning-remove2');
popup(null, 'select-bank');
popup(null, 'metro-map');
popup(null, 'im-buying');
popup(null, 'change-mind');
popup(null, 'change-mind-two');
popup({
    isOpen: (settingsModal) => {
        const chat = document.querySelector('.chat');
        if (!chat) return;
        const bar = document.querySelector('.chat__bar .simplebar-content-wrapper');
        const chatBottom = chat.querySelector('.chat__bottom');
        const chatTags = chat.querySelector('.chat__tags');
        chat.style.setProperty('--chat-bottom-height', `${chatBottom.offsetHeight}px`);
        chat.style.setProperty('--chat-tags-height', `${chatTags.offsetHeight}px`);

        if (settingsModal.currentBtn.closest('.record-viewing-two')) {
            const btnHTML = `
                <button type="button" class="btn btn-reset btn-primary chat__booking-btn">Детали брониварония</button>
            `;

            chatBottom.insertAdjacentHTML('beforebegin', btnHTML);
            chat.style.setProperty('--chat-booking-height', `${chat.querySelector('.chat__booking-btn').offsetHeight + 16}px`);
        }

        bar.scrollTo({
            top: bar.querySelector('.simplebar-content').clientHeight,
        })
    },
    isClose: (settingsModal) => {
        const chat = document.querySelector('.chat');
        if (!chat) return;
        const bookingbtn = chat.querySelector('.chat__booking-btn');
        chat.style.setProperty('--chat-booking-height', `0px`);
        if (bookingbtn) bookingbtn.remove();
    }
}, 'chat-lora');
// ========================================================================================
