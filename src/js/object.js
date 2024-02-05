import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

// ==============================
import getHeightBlock from './modules/getHeightBlock'
// import {
//     mapPrimary,
//     objectMaps
// } from './components/maps';
import linkCopy from './modules/linkCopy';
import {
    validateRadioPrimary,
    validateCheckboxPrimary,
    bookConsultationValidate,
    clientFixedValidate,
    createAgreeValidate,
    addContactValidate,
    createDealValidate,
    editUserValidate,
} from './components/formValidate';
import {
    emergingBlockScroll
} from './modules/emergingBlockScroll';
import videoBlock from './components/videoBlock';
import headerFixed from './components/headerFixed';
import mortgage from './components/mortgage';
import mapMetro from './components/mapMetro';
import tag from './components/tag';
import chat from './components/chat';
import scrollDrag from './components/scrollDrag';
import {
    cardSecondaryActions,
    cardPrimaryActions
} from './components/cardActions';
import {
    furnishingSets
} from './components/furnishingSets';
import {
    recordViewing,
    recordViewingTwo
} from './components/recordViewing';
import videoModal from './components/videoModal';
import submitApp from './components/submitApp';
import wantDiscount from './components/wantDiscount';
import onlineDisplay from './components/onlineDisplay';
import bankOffer from './components/bankOffer';
import {
    dragDrops
} from './components/dragDrop';

import shorts from './components/shorts';
import suggestObject from './components/suggestObject';
import datePickers from './components/datePickers';
import scrollTarget from './components/scrollTarget';
import metroInfo from './components/metroInfo';
import apartKitchen from './components/apartKitchen';
document.addEventListener('DOMContentLoaded', () => {
    getHeightBlock('.header-fixed', '--header-fixed-height');
    linkCopy('.share-app-popup__btn');
    cardSecondaryActions();
    cardPrimaryActions();
    videoBlock();
    headerFixed();
    mortgage();
    mapMetro();
    tag();
    chat();
    furnishingSets();
    scrollDrag('.object-location__infrastructure', 1000, true);
    scrollDrag('.tabs-primary.tabs-primary--controls .tabs__navigation', 1000, true);
    recordViewing();
    recordViewingTwo();
    videoModal();
    submitApp();
    wantDiscount();
    onlineDisplay();
    bankOffer();
    dragDrops();
    validateRadioPrimary('.complaint-popup__form', '.textarea-primary__input', '.complaint-popup__btn', '.radio-primary__input');
    validateRadioPrimary('.complaint-user-popup__form', '.textarea-primary__input', '.complaint-user-popup__btn', '.radio-primary__input');
    validateRadioPrimary('.complaint-object-popup__form', '.textarea-primary__input', '.complaint-object-popup__btn', '.radio-primary__input');
    validateCheckboxPrimary('.object-not-popup__form', '.textarea-primary__input', '.object-not-popup__btn', '.checkbox-secondary__input');
    bookConsultationValidate();
    clientFixedValidate();
    createAgreeValidate();
    addContactValidate();
    createDealValidate();
    editUserValidate();
    emergingBlockScroll('.object-body__user .bid-user__btn--message', '.object-plate-bottom', 1212, true);
    emergingBlockScroll('.object-body__user .bid-user__btn--comment', '.object-plate-bottom', 1212, true);
    emergingBlockScroll('.develop-inner .object-body__wrapper .bid-user__btn', '.object-plate-bottom', 1212, true);
    emergingBlockScroll('.detailed-flat .object-body__user .bid-user__btn', '.object-plate-bottom', 1212, true);
    emergingBlockScroll('.object-base-inner .object-body__user .card-user__btn', '.object-plate-bottom', 1212, true);
    shorts();
    suggestObject();
    datePickers();
    scrollTarget();
    metroInfo();
    apartKitchen();
    // ==============================================

    // ==== maps ====
    // mapPrimary();
    // objectMaps();
})

