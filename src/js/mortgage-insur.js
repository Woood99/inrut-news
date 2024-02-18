import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

import datePickers from './components/datePickers'
import setCurrentDate from './modules/setCurrentDate';
import { _slideDown,_slideUp } from './support-modules/slide';
import { getCurrentTime } from './modules/date';
import dataFaq from './data/dataFaq';
// ==============================

document.addEventListener('DOMContentLoaded', () => {
    datePickers();
    setCurrentDate();
    const form = document.querySelector('.mortgage-insur__form');
    const faq = document.querySelector('.create-policy__faq');
    if (form) {
        const bankFilter = form.querySelector('.mortgage-insur__bank');
        const itemsToggle = form.querySelectorAll('.mortgage-insur__item-hidden');
        bankFilter.addEventListener('click', () => {
            const itemActive = bankFilter.querySelector('.search-select-one__item._active');
            if (itemActive) {
                if (!itemActive.hasAttribute('data-bank-second')) {
                    itemsToggle.forEach(item => item.setAttribute('hidden', ''));
                } else {
                    itemsToggle.forEach(item => item.removeAttribute('hidden'));
                }
            }
        });
    }
    if (faq) {
        const content = faq.querySelector('.simplebar-content');
        faq.addEventListener('click', (e) => {
            const target = e.target;
            const tag = target.closest('[data-chat-tag-id]');
            if (!tag) return;
            const currentID = tag.dataset.chatTagId;
            const currentFaq = dataFaq[currentID];
            if (currentFaq) {
                content.insertAdjacentHTML('beforeend', generateMessageMe(currentFaq.question));
                content.insertAdjacentHTML('beforeend', generateMessageAi(currentFaq.answer));
                scrollContent();
                if (!faq.classList.contains('_active')) faq.classList.add('_active');
                scrollToBlock();
                hiddenCurrentFaq(tag);
            }
        })


        function generateMessageMe(text) {
            const html = `
            <div class="message-item chat__message chat__message--me">
                <div class="message-item__text">
                    <p>
                       ${text}
                    </p>
                    <span>${getCurrentTime()}</span>
                </div>
            </div>
            `;
            return html;
        }

        function generateMessageAi(text) {
            const html = `
            <div class="message-item chat__message">
                <div class="message-item__text">
                    ${text}
                    <span>${getCurrentTime()}</span>
                </div>
            </div>
            `;
            return html;
        }
        function scrollContent() {
            const element = faq.querySelector('.simplebar-content-wrapper');
            const content = element.querySelector('.simplebar-content');
            const lastMessageMe = element.querySelector('.message-item:nth-last-child(2)');
            const lastMessage = element.querySelector('.message-item:last-child');
            element.scrollTo({
                top: content.clientHeight - lastMessageMe.clientHeight - lastMessage.clientHeight - 24,
            })
        }
        function scrollToBlock() {
            const topGap = window.pageYOffset + faq.getBoundingClientRect().top;
            window.scrollTo({
                top: topGap - 55 - 16,
                behavior: 'smooth'
            })
        }

        function hiddenCurrentFaq(target) {
            if (!target) return;
            target.remove();
        }
    }


    document.addEventListener('click', (e) => {
        const target = e.target;
        const bank = target.closest('.bank-info--second') || target.closest('.bank-info--three');
        if (bank) {
            const more = target.closest('.bank-info__dropdown-target');
            if (more) {
                const dropdown = bank.querySelector('.bank-info__dropdown');
                if (!more.classList.contains('_active')) {
                    more.classList.add('_active');
                    _slideDown(dropdown);
                } else {
                    more.classList.remove('_active');
                    _slideUp(dropdown);
                }
            }
        }
    })
})
