import {
    filterControl,
    uiSliderOne,
    filterSum,
    filterDropdownChoice,
    filterMobile,
    filterCustomSelectCheckboxes,
    dropdownDefault,
    searchSelect,
    searchSelectOne
} from './components/filter';
import getHeightBlock from './modules/getHeightBlock'
import choicesSelect from './components/choices';
import {
    simplebar
} from './components/simplebar';
import maps from './components/maps';
import linkCopy from './modules/linkCopy';
import {
    inputText,
    inputOnlyNumber,
    textareaSecondary,
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
    inputMask
} from './components/formValidate';
import dropdown from './modules/dropdown';
import dropdownItems from './modules/dropdownItems';
import dropdownDown from './modules/dropdownDown';
import emergingBlockScroll from './modules/emergingBlockScroll';
import controlCards from './components/controlCards';
import videoBlock from './components/videoBlock';
import reviewModal from './components/reviewModal';
import placeSaleOptionMore from './components/placeSaleOptionMore';
import {
    dropImage
} from './components/dropImage';
import checkboard from './components/checkboard';
import headerFixed from './components/headerFixed';
import mortgage from './components/mortgage';
import choicePay from './components/choicePay';
import genplan from './components/genplan';
import mapMetro from './components/mapMetro';
import cardStockPopup from './components/cardStockPopup';
import tag from './components/tag';
import chat from './components/chat';
import city from './components/city';
import scrollDrag from './components/scrollDrag';
import {
    cardSecondaryActions,
    cardPrimaryActions
} from './components/cardActions';
import furnishingSets from './components/furnishingSets';
import bookConsultation from './components/bookConsultation';
import {
    recordViewing,
    recordViewingTwo
} from './components/recordViewing';
import wallet from './components/wallet';
import {
    favoritesPage,
    favoriteChoicePopup
} from './components/favorites';
import {
    clientPage
} from './components/clientPage';
import requisites from './components/requisites'
import navDropdown from './components/navDropdown';
import videoModal from './components/videoModal';
import favoriteBtn from './components/favoriteBtn';
import advancePayment from './components/advancePayment';
import submitApp from './components/submitApp';
import wantDiscount from './components/wantDiscount';
import onlineDisplay from './components/onlineDisplay';
import bankOffer from './components/bankOffer';
import {
    tooltipSecondary
} from './components/tooltips';
import {
    dragDrops
} from './components/dragDrop';
import AirDatepicker from 'air-datepicker';
import createCalc from './components/createCalc';
import createSale from './components/createSale';
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

    // ==================================================

    cardSecondaryActions();
    cardPrimaryActions();

    // ==================================================
    navDropdown();
    maps();
    calendarPrimary('.request-calendar .calendar-primary', 'eventsCalendar.json', false);
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
    choicePay();
    genplan();
    mapMetro();
    cardStockPopup('.stock-developer__content .cards-list__items');
    cardStockPopup('.block-stock .block-stock__slider');
    cardStockPopup('.stock-offers-popup__items');
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
    wallet();
    favoritesPage();
    favoriteChoicePopup();
    clientPage();
    requisites();
    videoModal();
    favoriteBtn();
    advancePayment();
    submitApp();
    wantDiscount();
    onlineDisplay();
    bankOffer();
    tooltipSecondary();
    dragDrops();
    createCalc();
    createSale();
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
    inputMask();
    // ==================================================

    dropdown('.dots-dropdown', '.dots-dropdown__target');
    dropdownItems('.your-app-bid__item--dropdown', 'button', 'Скрыть');
    dropdownItems('.object-characteristics__container', '.object-characteristics__more', 'Скрыть');
    dropdownDown('.object-data__text', '.object-data__more');

    // ==================================================

    emergingBlockScroll('.object-body__user .bid-user__btn--message', '.object-plate-bottom', 1212, true);
    emergingBlockScroll('.purchase-request .bid-user__btn', '.purchase-request-plate-bottom', 1212, true);
    emergingBlockScroll('.agent .bid-user__btn', '.agent-plate-bottom', 1212, true);
    emergingBlockScroll('.develop-inner .object-body__wrapper .bid-user__btn', '.object-plate-bottom', 1212, true);
    emergingBlockScroll('.detailed-flat .object-body__user .bid-user__btn', '.object-plate-bottom', 1212, true);
    emergingBlockScroll('.object-base-inner .object-body__user .card-user__btn', '.object-plate-bottom', 1212, true);


    // ==================================================
    inputClue('.input-clue', 'clue-primary', `
    <div class="clue-primary">
        <div class="clue-primary__close">
            <svg>
              <use xlink:href="img/sprite.svg#x"></use>
            </svg>
        </div>
        <svg class="clue-primary__icon">
            <use xlink:href="img/sprite.svg#info"></use>
        </svg>
        <h4 class="clue-primary__title title-3">
            Для вашего профиля редактирование данных недоступно.
        </h4>
        <p class="clue-primary__descr">
            Обратитесь в техподдержку
        </p>
    </div>
    `);


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
})
