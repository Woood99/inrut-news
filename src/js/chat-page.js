import 'focus-visible';
import "./functions/dynamic-adapt";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';


// ==============================

import chat from './components/chat';
document.addEventListener('DOMContentLoaded', () => {
    chat();
    chatAction()
    scrollFix();

    function chatAction() {
        const chat = document.querySelector('.chat');
        const bar = document.querySelector('.chat__bar .simplebar-content-wrapper');
        const chatBottom = chat.querySelector('.chat__bottom');
        chat.style.setProperty('--chat-bottom-height', `${chatBottom.offsetHeight}px`);

        bar.scrollTo({
            top: bar.querySelector('.simplebar-content').clientHeight,
        })
    }

    function scrollFix() {
        const container = document.querySelector('.chat-page');
        const mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel';

        if (document.attachEvent) {
            container.attachEvent('on' + mousewheelevt, scroll);
        } else {
            container.addEventListener(mousewheelevt, scroll, false);
        }


        function scroll(evt) {
            if (evt.target.closest('.chat')) return;
            console.log('da');
            const scrollTarget = document.querySelector('.chat__bar .simplebar-content-wrapper');
            var delta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail)));
            scrollTarget.scrollTo({
                top: delta === 1 ? scrollTarget.scrollTop - 105 : scrollTarget.scrollTop + 105,
            })

        }
    }

})
