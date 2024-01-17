import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

// ==============================
import {
    validateRadioPrimary,
} from './components/formValidate';
import videoModal from './components/videoModal';
import shorts from './components/shorts';
import scrollUp from './components/scrollUp';
document.addEventListener('DOMContentLoaded', () => {
    videoModal();
    validateRadioPrimary('.complaint-user-popup__form', '.textarea-primary__input', '.complaint-user-popup__btn', '.radio-primary__input');
    shorts();
    scrollUp();
})

