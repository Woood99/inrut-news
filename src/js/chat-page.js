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

    function chatAction() {
        const chat = document.querySelector('.chat');
        const bar = document.querySelector('.chat__bar .simplebar-content-wrapper');
        const chatBottom = chat.querySelector('.chat__bottom');
        chat.style.setProperty('--chat-bottom-height', `${chatBottom.offsetHeight}px`);

        bar.scrollTo({
            top: bar.querySelector('.simplebar-content').clientHeight,
        })
    }
})
