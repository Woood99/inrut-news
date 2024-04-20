import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';


// ==============================
import {
    mapPrimary,
    mapDraw,
} from './components/maps';
import {
    submitAppValidate
} from './components/formValidate';
import {
    emergingBlockScroll
} from './modules/emergingBlockScroll';
import mapMetro from './components/mapMetro';
import tag from './components/tag';
import chat from './components/chat';
import submitApp from './components/submitApp';
import submitAppOffers from './components/submitAppOffers';

import dataQuiz from './data/dataQuiz';
import quiz from './components/quiz';
document.addEventListener('DOMContentLoaded', () => {
    mapMetro();
    tag();
    chat();
    submitApp();
    submitAppOffers();
    submitAppValidate();
    emergingBlockScroll('.submit-app .submit-app__btn', '.footer-fixed.submit-app-fixed', 99999999, true);
    emergingBlockScroll('.place-sale .place-sale__btn', '.footer-fixed.submit-app-fixed', 99999999, true);
    // ==== maps ====
    //  mapPrimary();
    //  mapDraw();

    quiz(dataQuiz);
})

