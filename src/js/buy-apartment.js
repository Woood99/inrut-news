import 'focus-visible';
// ==============================
import "./functions/dynamic-adapt";
import burgerMenu from './functions/burger';
import {
    tabs
} from "./functions/tabs";
import spollers from "./functions/spollers";
burgerMenu();
tabs();
spollers();

import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';


// ==============================






import {
    controlCardsMap,
    mapDraw,
} from './components/maps';

import {
    bookConsultationValidate,
    inputMaskPhone,
    inputMaskSeriesNumber,
    inputMaskDepartCode,
    inputMaskSnils,
    inputMaskOgrn,
    inputMaskOgrnip,
    inputMaskInn,
} from './components/formValidate';
import dropdown from './modules/dropdown';
import dropdownItems from './modules/dropdownItems';
import dropdownDown from './modules/dropdownDown';
import {
    controlCards
} from './components/controlCards';

import mapMetro from './components/mapMetro';

import {
    cardSecondaryActions,
} from './components/cardActions';

import {
    recordViewing,
    recordViewingTwo
} from './components/recordViewing';
import requisites from './components/requisites'

import videoModal from './components/videoModal';
import favoriteBtn from './components/favoriteBtn';
import submitApp from './components/submitApp';
import wantDiscount from './components/wantDiscount';
import onlineDisplay from './components/onlineDisplay';
import bankOffer from './components/bankOffer';
import {
    tooltipSecondary,
    tooltipMain
} from './components/tooltips';
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
import moveToFromBlock from './modules/moveToFromBlock';
import replaceText from './components/replaceText';
import metroItems from './components/metroItems';
import modal from './modules/modal';
import mobileTop from './components/mobileTop';
import scrollUp from './components/scrollUp';
import suggestObject from './components/suggestObject';
import datePickers from './components/datePickers';
import scrollTarget from './components/scrollTarget';
document.addEventListener('DOMContentLoaded', () => {
    cardSecondaryActions();
    mapDraw();
    controlCardsMap();
    controlCards();
    mapMetro();


    recordViewing();
    recordViewingTwo();
    requisites();
    videoModal();
    favoriteBtn();
    submitApp();
    wantDiscount();
    onlineDisplay();
    bankOffer();
    tooltipSecondary();
    tooltipMain();
    dragDrops();
    createCalc();
    videoLoad();
    сharacteristicsBlock();
    submitAppOffers();
    mortgageRequests();
    bookConsultationValidate();

    const inputsMaskPhone = document.querySelectorAll('.input-phone-mask');
    const inputsMaskSeriesNumber = document.querySelectorAll('.input-series-number-mask');
    const inputsMaskDepartCode = document.querySelectorAll('.input-depart-code-mask');
    const inputsMaskSnils = document.querySelectorAll('.input-snils-mask');
    const inputsMaskOgrn = document.querySelectorAll('.input-ogrn-mask');
    const inputsMaskOgrnip = document.querySelectorAll('.input-ogrnip-mask');
    const inputsInnMask = document.querySelectorAll('.input-inn-mask');

    inputsMaskPhone.forEach(input => inputMaskPhone(input));
    inputsMaskSeriesNumber.forEach(input => inputMaskSeriesNumber(input));
    inputsMaskDepartCode.forEach(input => inputMaskDepartCode(input));
    inputsMaskSnils.forEach(input => inputMaskSnils(input));
    inputsMaskOgrn.forEach(input => inputMaskOgrn(input));
    inputsMaskOgrnip.forEach(input => inputMaskOgrnip(input));
    inputsInnMask.forEach(input => inputMaskInn(input));

    // ==================================================

    dropdown('.dots-dropdown', '.dots-dropdown__target');
    dropdownItems('.your-app-bid__item--dropdown', 'button', 'Скрыть');
    dropdownItems('.object-characteristics__container', '.object-characteristics__more', 'Скрыть');
    dropdownDown('.object-data__text', '.object-data__more');

    // ==================================================
    moveToFromBlock('[data-move-block-to="bid-user"]', '[data-move-block-from="bid-user"]', 99999, 1212, `${window.innerWidth >= 1920 ? 1.35 : 1}`);
    replaceText();
    mobileTop();
    // ==================================================
    scrollUp();
    suggestObject();
    datePickers();
    scrollTarget();
    // ==================================================
    const objectMetro = document.querySelectorAll('.object-data__metro');
    if (objectMetro.length > 0) {
        body();
        setTimeout(() => {
            body();
        }, 1);
        window.addEventListener('resize', () => {
            body();
        });

        function body() {
            objectMetro.forEach(container => {
                metroItems(container, container.closest('.object-body__data'));
            })
        }
    }
    document.addEventListener('click', (e) => {
        const metroOther = e.target.closest('.metro-info__other');
        const metroClose = e.target.closest('.metro-info__close');
        if (metroOther && !e.target.closest('.metro-info__other-items')) {
            e.preventDefault();
            metroOther.classList.toggle('_active');
            if (window.innerWidth <= 1212) {
                const modalHTML = `
                <div class="metro-info-modal">
                    <div class="metro-info-modal__container">
                        <button class="btn-reset metro-info-modal__close" aria-label="Закрыть модальное окно">
                            <svg>
                                <use xlink:href="./img/sprite.svg#x"></use>
                            </svg>
                            <span>Закрыть</span>
                        </button>
                        <div class="metro-info-modal__content">
                            ${metroOther.querySelector('.metro-info__other-items').innerHTML}
                        </div>
                    </div>
                </div>
                `;
                modal(modalHTML, '.metro-info-modal', 300);
                const metroInfoModal = document.querySelector('.metro-info-modal');
            }
        }
        if (metroClose) {
            e.preventDefault();
            metroOther.classList.remove('_active');
        }
    })
})

