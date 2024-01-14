import {
    filterControl,
    uiSliderOne,
    filterSum,
    filterDropdownChoice,
    filterMobile,
    filterCustomSelectCheckboxes,
    dropdownDefault,
    searchSelect,
    searchSelectOne,
    fieldSelect,
    fieldRange
} from './components/filter';
import getHeightBlock from './modules/getHeightBlock'
import {
    choicesSelect
} from './components/choices';
import {
    simplebar
} from './components/simplebar';
import {
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
    inputText,
    inputOnlyNumber,
    textareaSecondary,
    textareaTags,
    inputClue
} from './components/inputs';
import {
    calendarPrimary
} from './components/calendar';
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
    inputMaskPhone,
    inputMaskSeriesNumber,
    inputMaskDepartCode,
    inputMaskSnils,
    inputMaskOgrn,
    inputMaskOgrnip,
    inputMaskInn,
    submitAppValidate
} from './components/formValidate';
import dropdown from './modules/dropdown';
import dropdownItems from './modules/dropdownItems';
import dropdownDown from './modules/dropdownDown';
import {
    emergingBlockScroll
} from './modules/emergingBlockScroll';
import {
    controlCards
} from './components/controlCards';
import videoBlock from './components/videoBlock';
import reviewModal from './components/reviewModal';
import placeSaleOptionMore from './components/placeSaleOptionMore';
import {
    dropImage
} from './components/dropImage';
import checkboard from './components/checkboard';
import headerFixed from './components/headerFixed';
import mortgage from './components/mortgage';
// import choicePay from './components/choicePay';
// import genplan from './components/genplan';
import mapMetro from './components/mapMetro';
import tag from './components/tag';
import chat from './components/chat';
import city from './components/city';
import scrollDrag from './components/scrollDrag';
import {
    cardSecondaryActions,
    cardPrimaryActions
} from './components/cardActions';
import {
    furnishingSets
} from './components/furnishingSets';
import bookConsultation from './components/bookConsultation';
import {
    recordViewing,
    recordViewingTwo
} from './components/recordViewing';
// import wallet from './components/wallet';
// import {
//     favoritesPage,
//     favoriteChoicePopup
// } from './components/favorites';
import {
    clientPage
} from './components/clientPage';
import requisites from './components/requisites'
import navDropdown from './components/navDropdown';
import videoModal from './components/videoModal';
import favoriteBtn from './components/favoriteBtn';
// import advancePayment from './components/advancePayment';
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
import AirDatepicker from 'air-datepicker';
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
import shorts from './components/shorts';
import modal from './modules/modal';
document.addEventListener('DOMContentLoaded', () => {

    // ==================================================

    getHeightBlock('.header-fixed', '--header-fixed-height');
    getHeightBlock('.header', '--header-height');

    // ==================================================

    choicesSelect();

    // ==================================================

    filterControl();
    uiSliderOne();
    filterSum();
    filterDropdownChoice();
    filterMobile();
    filterCustomSelectCheckboxes();
    dropdownDefault('.presentation', '.presentation__btn', '.presentation__dropdown');
    searchSelect();
    searchSelectOne();
    fieldSelect();
    fieldRange();

    // ==================================================

    simplebar('.simplebar-primary');
    simplebar('.simplebar-secondary');
    simplebar('.simplebar-third');

    // ==================================================

    linkCopy('.share-app-popup__btn');

    // ==================================================

    inputText();
    inputOnlyNumber();
    textareaSecondary();
    textareaTags();
    // ==================================================

    cardSecondaryActions();
    cardPrimaryActions();

    // ==================================================
    navDropdown();
    // ==================================================
    bidMap();
    complaintObjectMap();
    mapDraw2();
    popupMap();
    controlCardsMap();
    mapDraw();
    placeSaleAddressMap();
    objectMaps();
    // ==================================================

    calendarPrimary('.calendar-page .calendar-primary', 'eventsCalendar.json', true);
    calendarPrimary('.home-services__calendar .calendar-primary', 'eventsCalendar.json', false);
    controlCards();
    videoBlock();
    reviewModal();
    placeSaleOptionMore();
    dropImage();
    checkboard();
    headerFixed();
    mortgage();
    // choicePay();
    // genplan();
    mapMetro();
    tag();
    chat();
    city();
    furnishingSets();
    // bookConsultation();
    scrollDrag('.object-location__infrastructure', 1000, true);
    scrollDrag('.buy-apartment__tags .tags__list', 1000, 1180);
    scrollDrag('.home-services__list', 1000, 1180);
    scrollDrag('.tabs-primary.tabs-primary--controls .tabs__navigation', 1000, true);
    recordViewing();
    recordViewingTwo();
    // wallet();
    // favoritesPage();
    // favoriteChoicePopup();
    clientPage();
    requisites();
    videoModal();
    favoriteBtn();
    // advancePayment();
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
    moveToFromBlock('[data-move-block-to="bid-user"]', '[data-move-block-from="bid-user"]', 99999, 1212, `${window.innerWidth >= 1920 ? 1.35 : 1}`);
    replaceText();
    shorts();
    // ==================================================
    inputClue('.input-clue', 'clue-primary', `
    <div class="clue-primary">
        <div class="clue-primary__close">
            <svg>
              <use xlink:href="./img/sprite.svg#x"></use>
            </svg>
        </div>
        <svg class="clue-primary__icon">
            <use xlink:href="./img/sprite.svg#info"></use>
        </svg>
        <h4 class="clue-primary__title title-3">
            Для вашего профиля редактирование данных недоступно.
        </h4>
        <p class="clue-primary__descr">
            Обратитесь в техподдержку
        </p>
    </div>
    `);
    inputClue('.offer-room-clue', 'clue-primary', `
        <div class="clue-primary">
        <div class="clue-primary__close">
            <svg>
              <use xlink:href="./img/sprite.svg#x"></use>
            </svg>
        </div>
        <picture class="clue-primary__img">
            <source srcset="./img/lora_face.webp" type="image/webp">
            <img loading="lazy" src="./img/lora_face.png" width="48" height="48" alt="lora">
        </picture>
        <h4 class="clue-primary__title title-3">
            Этот объект не подходит под выбранную цену
        </h4>
        </div>
    `, 'offer-room-clue', true);
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
        if (metroOther) {
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
    })
    // ==================================================


    const datePickers = document.querySelectorAll('.date-picker');
    datePickers.forEach(datePicker => {
        const input = datePicker.querySelector('.date-picker__input');
        const wrapper = new AirDatepicker(input, {
            autoClose: true,
            isMobile: true,
            onSelect: (fd) => {
                fd.date ? datePicker.classList.add('_active') : datePicker.classList.remove('_active');
            },
        })
    })
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


    function scrollTarget() {
        const targets = document.querySelectorAll('[data-scroll-target]');
        if (targets.length === 0) return;
        targets.forEach(target => {
            target.addEventListener('click', () => {
                const name = target.dataset.scrollTarget;
                const to = document.querySelector(`[data-scroll-block="${name}"]`);
                if (to) {
                    const gap = target.dataset.scrollTargetGap ? target.dataset.scrollTargetGap : 0;
                    const topGap = window.pageYOffset + to.getBoundingClientRect().top;
                    const headerFixed = document.querySelector('.header-fixed') ? document.querySelector('.header-fixed').clientHeight : 0;
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    window.scrollTo({
                        top: window.innerWidth > 1212 ? topGap - gap - headerFixed : topGap - gap - headerFixed - headerHeight + 8,
                        behavior: 'smooth'
                    })
                }
            });
        })
    }
    scrollTarget();

    const btnScrollUp = document.querySelector('.scroll-up');
    if (btnScrollUp) {
        scrollUp();
        document.addEventListener('scroll', () => {
            scrollUp();
        })
        btnScrollUp.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        })
    }

    function scrollUp() {
        const currentOffset = window.pageYOffset
        if (currentOffset >= 250) {
            btnScrollUp.classList.add('_active');
        } else {
            btnScrollUp.classList.remove('_active');
        }
    }

    const suggestObject = document.querySelector('.suggest-object');
    if (suggestObject) {
        const btns = suggestObject.querySelectorAll('[data-suggest-object-btn]');
        const go = suggestObject.closest('.popup-primary--suggest-object').querySelector('.suggest-object__btn');
        btns.forEach(btn => {
            const btnSpan = btn.querySelector('span');
            const btnStartText = btnSpan.textContent;
            btn.addEventListener('click', () => {
                if (!btn.classList.contains('_suggest-active')) {
                    btn.classList.add('_suggest-active');
                    btnSpan.textContent = 'Объект выбран';
                    toggleGo();
                } else {
                    btn.classList.remove('_suggest-active');
                    btnSpan.textContent = btnStartText;
                    toggleGo();
                }
            });
        })


        function toggleGo() {
            let result = false;
            for (let i = 0; i < Array.from(btns).length; i++) {
                if (btns[i].classList.contains('_suggest-active')) {
                    result = true;
                    break;
                }
            }
            if (result) {
                go.removeAttribute('disabled');
            } else {
                go.setAttribute('disabled', '');
            }
        }
    }


})
