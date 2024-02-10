import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';
import {
    dropImage
} from './components/dropImage';
// ==============================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#app-verif-form');
    if (!form) return;
    dropImage();
    const clientToggle = form.querySelector('.service-moving-client__toggle input');
    const recipient = form.querySelector('[data-service-moving-recipient]');


    clientToggle.addEventListener('input', () => {
        if (!clientToggle.checked) {
            recipient.removeAttribute('hidden');
        } else {
            recipient.setAttribute('hidden', '');
        }
    })

})
