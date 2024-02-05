import getHeightBlock from './modules/getHeightBlock';
import header from './components/header';
import {
    filterControl,
    uiSliderOne,
    filterSum,
    filterDropdownChoice,
    filterMobile,
    filterCustomSelectCheckboxes,
    searchSelect,
    searchSelectOne,
    fieldSelect,
    fieldRange
} from './components/filter';
import {
    choicesSelect
} from './components/choices';
import {
    simplebar
} from './components/simplebar';
import {
    inputText,
    inputOnlyNumber,
    textareaSecondary,
    textareaTags,
    inputClue
} from './components/inputs';
import navDropdown from './components/navDropdown';
import city from './components/city';
import {
    inputMaskPhone,
    inputMaskSeriesNumber,
    inputMaskDepartCode,
    inputMaskSnils,
    inputMaskOgrn,
    inputMaskOgrnip,
    inputMaskInn,
    inputMaskTime,
    inputMaskCard,
    inputMaskCardValidity
} from './components/formValidate';
import dropdown from './modules/dropdown';
import dropdownItems from './modules/dropdownItems';
import dropdownDown from './modules/dropdownDown';
import replaceText from './components/replaceText';
import requisites from './components/requisites';
import burgerMenu from './functions/burger';
import {
    tabs
} from "./functions/tabs";
import spollers from "./functions/spollers";
import {
    tooltipSecondary,
    tooltipMain
} from './components/tooltips';
document.addEventListener('DOMContentLoaded', () => {

    header();
    getHeightBlock('.header', '--header-height');
    window.addEventListener('scroll',() => {
        getHeightBlock('.header', '--header-height');
    })
    filterControl();
    uiSliderOne();
    filterSum();
    filterDropdownChoice();
    filterMobile();
    filterCustomSelectCheckboxes();
    searchSelect();
    searchSelectOne();
    fieldSelect();
    fieldRange();
    choicesSelect();

    simplebar('.simplebar-primary');
    simplebar('.simplebar-secondary');
    simplebar('.simplebar-third');

    inputText();
    inputOnlyNumber();
    textareaSecondary();
    textareaTags();
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
    navDropdown();
    city();



    const inputsMaskPhone = document.querySelectorAll('.input-phone-mask');
    const inputsMaskSeriesNumber = document.querySelectorAll('.input-series-number-mask');
    const inputsMaskDepartCode = document.querySelectorAll('.input-depart-code-mask');
    const inputsMaskSnils = document.querySelectorAll('.input-snils-mask');
    const inputsMaskOgrn = document.querySelectorAll('.input-ogrn-mask');
    const inputsMaskOgrnip = document.querySelectorAll('.input-ogrnip-mask');
    const inputsInnMask = document.querySelectorAll('.input-inn-mask');
    const inputsTimeMask = document.querySelectorAll('.input-time');
    const inputsCardMask = document.querySelectorAll('.input-card-mask');
    const inputsCardValidityMask = document.querySelectorAll('.input-card-validity-mask');

    inputsMaskPhone.forEach(input => inputMaskPhone(input));
    inputsMaskSeriesNumber.forEach(input => inputMaskSeriesNumber(input));
    inputsMaskDepartCode.forEach(input => inputMaskDepartCode(input));
    inputsMaskSnils.forEach(input => inputMaskSnils(input));
    inputsMaskOgrn.forEach(input => inputMaskOgrn(input));
    inputsMaskOgrnip.forEach(input => inputMaskOgrnip(input));
    inputsInnMask.forEach(input => inputMaskInn(input));
    inputsTimeMask.forEach(input => inputMaskTime(input));
    inputsCardMask.forEach(input => inputMaskCard(input));
    inputsCardValidityMask.forEach(input => inputMaskCardValidity(input));

    dropdown('.dots-dropdown', '.dots-dropdown__target');
    dropdownItems('.your-app-bid__item--dropdown', 'button', 'Скрыть');
    dropdownItems('.object-characteristics__container', '.object-characteristics__more', 'Скрыть');
    dropdownDown('.object-data__text', '.object-data__more');
    replaceText();
    requisites();

    burgerMenu();
    tabs();
    spollers();
    tooltipSecondary();
    tooltipMain();
});
