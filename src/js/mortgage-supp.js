import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';
import dataFaq2 from './data/dataFaq2';
// ==============================

document.addEventListener('DOMContentLoaded', () => {
    const dataFaq = dataFaq2;
    const mortgageSupp = document.querySelector('.mortgage-supp');
    if (mortgageSupp) {
        const wrapper = mortgageSupp.querySelector('.create-policy-faq__wrapper');
        const faq = document.querySelector('.create-policy-faq');
        if (!faq) return;
        const content = faq.querySelector('.simplebar-content');
        faq.addEventListener('click', (e) => {
            const target = e.target;
            const tag = target.closest('[data-chat-tag]');
            const tagBack = target.closest('[data-chat-tag-back]');
            if (tag){
                const currentText = tag.textContent.trim();
                const currentFaq = dataFaq[currentText];
                if (!currentFaq) return;
                const addTags = currentFaq.additionalTags;
                const addTagsHTML = createAddTags(addTags);
                appendAddTags(addTagsHTML);
            }
            if (tagBack){
               const addTags = tagBack.closest('.create-policy-faq__add-tags');
               const defaultTags = wrapper.querySelector('.create-policy-faq__tags');
               addTags.remove();
               defaultTags.removeAttribute('hidden');
            }
        })

        function createAddTags(tags) {
            let html = '';
            for (const tag in tags) {
                html += `
                    <button type="button" class="btn btn-reset tag tag--message" data-chat-add-tag>
                        <span>
                            ${tag.trim()}
                        </span>
                    </button>
                `;
            }
            return html.trim();
        }

        function appendAddTags(htmlTags) {
            const defaultTags = wrapper.querySelector('.create-policy-faq__tags');
            const html = `
                <div class="create-policy-faq__add-tags">
                    <button type="button" class="btn btn-reset btn-primary btn-primary--small" data-chat-tag-back>
                        Назад
                    </button>
                    ${htmlTags}
                </div>
            `;
            defaultTags.setAttribute('hidden', '');
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
