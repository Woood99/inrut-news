import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

// ==============================
import {
    mapPrimary,
    bidMap,
    mapDraw,
    agentMap
} from './components/maps';
import linkCopy from './modules/linkCopy';
import {
    validateRadioPrimary,
    validateCheckboxPrimary,
    bookConsultationValidate,
} from './components/formValidate';
import {
    emergingBlockScroll
} from './modules/emergingBlockScroll';
import videoBlock from './components/videoBlock';
import mortgage from './components/mortgage';
import mapMetro from './components/mapMetro';
import tag from './components/tag';
import chat from './components/chat';
import {
    cardSecondaryActions,
    cardPrimaryActions
} from './components/cardActions';
import {
    recordViewing,
    recordViewingTwo
} from './components/recordViewing';
import submitApp from './components/submitApp';
import wantDiscount from './components/wantDiscount';
import mobileTop from './components/mobileTop';
import suggestObject from './components/suggestObject';
import metroInfo from './components/metroInfo';
import rating from './modules/rating';
import { galleryPrimary } from './components/gallery';

import saleDynamic from './components/saleDynamic';
import dynamicCircle from './components/dynamicCircle';
import videoModal from './components/videoModal';
document.addEventListener('DOMContentLoaded', () => {
    linkCopy('.share-app-popup__btn');
    cardSecondaryActions();
    cardPrimaryActions();
    videoBlock();
    mortgage();
    mapMetro();
    tag();
    chat();
    recordViewing();
    recordViewingTwo();
    submitApp();
    wantDiscount();
    validateRadioPrimary('.complaint-popup__form', '.textarea-primary__input', '.complaint-popup__btn', '.radio-primary__input');
    validateRadioPrimary('.complaint-user-popup__form', '.textarea-primary__input', '.complaint-user-popup__btn', '.radio-primary__input');
    validateRadioPrimary('.complaint-object-popup__form', '.textarea-primary__input', '.complaint-object-popup__btn', '.radio-primary__input');
    validateCheckboxPrimary('.object-not-popup__form', '.textarea-primary__input', '.object-not-popup__btn', '.checkbox-secondary__input');
    bookConsultationValidate();
    emergingBlockScroll('.purchase-request .bid-user__btn', '.purchase-request-plate-bottom', 1212, true);
    mobileTop();
    suggestObject();
    metroInfo();
    rating();
    galleryPrimary();
    saleDynamic(false);
    videoModal();
    // ==== maps ====
     mapPrimary();
    // bidMap();
    // mapDraw();
    agentMap();
})

