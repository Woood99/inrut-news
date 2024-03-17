import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';


// ==============================
import {
    galleryPrimary,
    galleryStories
} from './components/gallery';
import getHeightBlock from './modules/getHeightBlock'
import {
    mapPrimary,
    bidMap,
    complaintObjectMap,
    mapDraw2,
    popupMap,
    controlCardsMap,
    mapDraw,
    placeSaleAddressMap,
    objectMaps
} from './components/maps';
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
    createMeetingShowValidate,
    requisitesValidate,
    submitAppValidate
} from './components/formValidate';
import {
    emergingBlockScroll
} from './modules/emergingBlockScroll';
import {
    controlCards
} from './components/controlCards';
import videoBlock from './components/videoBlock';
import placeSaleOptionMore from './components/placeSaleOptionMore';
import {
    dropImage
} from './components/dropImage';
import checkboard from './components/checkboard';
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
import {
    clientPage
} from './components/clientPage';
import videoModal from './components/videoModal';
import favoriteBtn from './components/favoriteBtn';
import submitApp from './components/submitApp';
import wantDiscount from './components/wantDiscount';
import onlineDisplay from './components/onlineDisplay';
import bankOffer from './components/bankOffer';
import {
    dragDrops
} from './components/dragDrop';
import {
    createCalc
} from './components/createCalc';
import {
    videoLoad
} from './components/videoLoad';
import сharacteristicsBlock from './components/сharacteristicsBlock';
import submitAppOffers from './components/submitAppOffers';
import mortgageRequests from './components/mortgageRequests';
import mobileTop from './components/mobileTop';
import scrollUp from './components/scrollUp';
import suggestObject from './components/suggestObject';
import datePickers from './components/datePickers';
import scrollTarget from './components/scrollTarget';
import metroInfo from './components/metroInfo';
import dynamicRow from './components/dynamicRow';
document.addEventListener('DOMContentLoaded', () => {
    galleryPrimary();
    galleryStories();
    getHeightBlock('.header-fixed', '--header-fixed-height');


    // ==================================================

    linkCopy('.share-app-popup__btn');

    // ==================================================

    cardSecondaryActions();
    cardPrimaryActions();


    // ==================================================

    controlCards();
    videoBlock();
    placeSaleOptionMore();
    dropImage();
    checkboard();
    headerFixed();
    mortgage();
    mapMetro();
    tag();
    chat();
    furnishingSets();
    scrollDrag('.object-location__infrastructure', 1000, true);
    scrollDrag('.buy-apartment__tags .tags__list', 1000, 1180);
    scrollDrag('.home-services__list', 1000, 1180);
    scrollDrag('.tabs-primary.tabs-primary--controls .tabs__navigation', 1000, true);
    recordViewing();
    recordViewingTwo();
    clientPage();
    videoModal();
    favoriteBtn();
    submitApp();
    wantDiscount();
    onlineDisplay();
    bankOffer();
    dragDrops();
    createCalc();
    videoLoad();
    сharacteristicsBlock();
    submitAppOffers();
    mortgageRequests();
    // ==================================================

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
    createMeetingShowValidate();
    requisitesValidate();
    submitAppValidate();

    // ==================================================

    emergingBlockScroll('.object-body__user .bid-user__btn--message', '.object-plate-bottom', 1212, true);
    emergingBlockScroll('.object-body__user .bid-user__btn--comment', '.object-plate-bottom', 1212, true);
    emergingBlockScroll('.purchase-request .bid-user__btn', '.purchase-request-plate-bottom', 1212, true);
    emergingBlockScroll('.agent .bid-user__btn', '.agent-plate-bottom', 1212, true);
    emergingBlockScroll('.develop-inner .object-body__wrapper .bid-user__btn', '.object-plate-bottom', 1212, true);
    emergingBlockScroll('.detailed-flat .object-body__user .bid-user__btn', '.object-plate-bottom', 1212, true);
    emergingBlockScroll('.object-base-inner .object-body__user .card-user__btn', '.object-plate-bottom', 1212, true);

    emergingBlockScroll('.add-complex .place-sale__btn', '.footer-fixed.complex-fixed', 99999999, true);
    emergingBlockScroll('.create-calc .create-calc__btn', '.footer-fixed.create-calc-fixed', 99999999, true);
    emergingBlockScroll('.mortgage-requests .mortgage-requests__save', '.footer-fixed.mortgage-requests-fixed', 99999999, true);
    emergingBlockScroll('.submit-app .submit-app__btn', '.footer-fixed.submit-app-fixed', 99999999, true);

    // ==================================================
    mobileTop();
    scrollUp();
    suggestObject();
    datePickers();
    scrollTarget();
    metroInfo();
    dynamicRow();
    // ==================================================


    const typeValueTarget = document.querySelector('[data-type-value-target]');
    const typeValueField = document.querySelector('[data-type-value-field]');
    if (typeValueTarget && typeValueField) {
        toggle(typeValueTarget, typeValueField);
        typeValueTarget.addEventListener('change', () => {
            toggle(typeValueTarget, typeValueField);
        });

        function toggle(typeValueTarget, typeValueField) {
            const value = typeValueTarget.querySelector('.choices__list.choices__list--single .choices__item.choices__item--selectable').dataset.value;
            if (value === 'list-one' || value === 'list-multiple') {
                typeValueField.removeAttribute('hidden');
            } else {
                typeValueField.setAttribute('hidden', '');
            }
        }
    }

    const createPresent = document.querySelector('.place-present');
    if (createPresent) {
        const checkboxes = createPresent.querySelector('.place-present__checkboxes');
        const summBlock = createPresent.querySelector('.place-present__summ');
        const quantityBlock = createPresent.querySelector('.place-present__quantity');
        checkboxes.addEventListener('change', (e) => {
            const target = e.target;
            const summ = target.closest('.place-present-checkbox-summ');
            const quantity = target.closest('.place-present-checkbox-quantity');
            console.log(summBlock);
            if (summ){
                summBlock.removeAttribute('hidden');
                quantityBlock.setAttribute('hidden','');
            }
            if (quantity){
                quantityBlock.removeAttribute('hidden');
                summBlock.setAttribute('hidden','');
            }
        })
    }

    // ==============================================

    // ==== maps ====
    mapPrimary();
    complaintObjectMap();
    mapDraw2();
    popupMap();
    controlCardsMap();

    // bidMap();
    // mapDraw();
    // placeSaleAddressMap();
    // objectMaps();
})
