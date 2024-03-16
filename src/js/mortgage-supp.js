import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';
import dataFaq2 from './data/dataFaq2';
import {
    getCurrentTime
} from './modules/date';
// ==============================

document.addEventListener('DOMContentLoaded', () => {
    const dataFaq = dataFaq2;
    const mortgageSupp = document.querySelector('.mortgage-supp');
    if (mortgageSupp) {
        let sections = {};
        const wrapper = mortgageSupp.querySelector('.create-policy-faq__wrapper');
        const faq = document.querySelector('.create-policy-faq');
        if (!faq) return;
        const content = faq.querySelector('.simplebar-content');
        faq.addEventListener('click', (e) => {
            const target = e.target;
            const tag = target.closest('[data-chat-tag]');
            const addTag = target.closest('[data-chat-add-tag]');
            const finishedTag = target.closest('[data-chat-finished-tag]');

            const tagBack = target.closest('[data-chat-tag-back]');
            const tagAddBack = target.closest('[data-chat-add-tag-back]');
            if (tag) {
                const currentText = tag.textContent.trim();
                const currentFaq = dataFaq[currentText];
                if (!currentFaq) return;
                appendAddTags(currentText, currentFaq);
            }
            if (addTag) {
                const currentTagText = addTag.textContent.trim();
                const currentFaq = dataFaq[sections.one].additionalTags[currentTagText].tags;
                if (!currentFaq) return;
                appendFinishedTags(currentTagText,currentFaq);
            }
            if (finishedTag){
                const currentTagText = finishedTag.textContent.trim();
                const currentFaq = dataFaq.questions[currentTagText];
                content.insertAdjacentHTML('beforeend', generateMessageMe(currentTagText));
                content.insertAdjacentHTML('beforeend', generateMessageAi('Печатает...', true));
                scrollContent();
                scrollToBlock();
                hiddenCurrentFaq(finishedTag);

                const lastMessage = content.querySelector('.message-item.chat__message:last-child');
                if (lastMessage) {
                    const dots = Array.from(lastMessage.querySelectorAll('.message-item__text-dots span'));
                    let currentActiveIndex = 0;
                    let dotsInterval = setInterval(() => {
                        dots.forEach(dot => dot.classList.remove('_active'));
                        dots[currentActiveIndex].classList.add('_active');
                        currentActiveIndex += 1;
                        if (currentActiveIndex >= dots.length) currentActiveIndex = 0;
                    }, 300);
                    setTimeout(() => {
                        clearInterval(dotsInterval);
                        lastMessage.outerHTML = generateMessageAi(currentFaq, false);
                        scrollContent();
                        scrollToBlock();
                    }, 2500);
                }
            }

            if (tagBack) {
                const addTags = tagBack.closest('.create-policy-faq__add-tags');
                addTags.remove();
                delete sections.one;
            }
            if (tagAddBack){
                const addTags = tagAddBack.closest('.create-policy-faq__add-tags');
                 addTags.remove();
                const currentFaq = dataFaq[sections.one];
                 appendAddTags(sections.one, currentFaq);
                 delete sections.two;
            }
        })

        function createAddTags(addTags,tagName) {
            if (!addTags) return;
            let html = '';
            for (const tag in addTags) {
                html += `
                    <button type="button" class="btn btn-reset tag tag--message" ${tagName}>
                        <span>
                            ${tag.trim()}
                        </span>
                    </button>
                `;
            }
            return html.trim();
        }

        function appendAddTags(currentText, currentFaq) {
            sections.one = currentText;
            const htmlTags = createAddTags(currentFaq.additionalTags,'data-chat-add-tag');
            const defaultTags = wrapper.querySelector('.create-policy-faq__tags');
            const html = `
                <div class="create-policy-faq__add-tags">
                    <button type="button" class="btn btn-reset btn-primary btn-primary--small" data-chat-tag-back>
                        Назад
                    </button>
                    ${htmlTags}
                </div>
            `;
            wrapper.insertAdjacentHTML('beforeend', html);
        }
        function appendFinishedTags(currentText,currentFaq){
            sections.two = currentText;
            const htmlTags = currentFaq.map(item => {
                return `
                    <button type="button" class="btn btn-reset tag tag--message" data-chat-finished-tag>
                        <span>
                            ${item.trim()}
                        </span>
                    </button>
                `;
            })
            const addTags = wrapper.querySelector('.create-policy-faq__add-tags');
            const html = `
                <div class="create-policy-faq__add-tags">
                    <button type="button" class="btn btn-reset btn-primary btn-primary--small" data-chat-add-tag-back>
                        Назад
                    </button>
                    ${htmlTags.join('')}
                </div>
            `;
            addTags.remove();
            wrapper.insertAdjacentHTML('beforeend', html);
        }


        function generateMessageMe(text) {
            const html = `
                <div class="message-item chat__message chat__message--me">
                    <div class="message-item__user">
                        <div class="message-item__avatar avatar">
                            <img loading="lazy" src="./img/avatar-1.jpg" width="30" height="30" alt="Лора">
                        </div>
                        <span class="message-item__name">
                            Вы
                        </span>
                    </div>
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

        function generateMessageAi(text, dots) {
            let dotsHTML = '';
            if (dots) {
                dotsHTML = `
                    <div class="message-item__text-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    `;
            }
            const html = `
                <div class="message-item chat__message">
                    <div class="message-item__user">
                        <div class="message-item__avatar avatar">
                            <img loading="lazy" src="./img/lora_face.png" width="30" height="30" alt="Лора">
                        </div>
                        <span class="message-item__name">
                            Лола
                        </span>
                        <span class="message-item__pos">Искусственный интеллект</span>
                    </div>
                    <div class="message-item__text ${dots ? '_dots' : ''}">
                        ${dotsHTML}
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
                top: content.clientHeight - lastMessageMe.clientHeight - lastMessage.clientHeight - 24 - 24 - 24,
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
})
