import getHeightBlock from './modules/getHeightBlock'
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
getHeightBlock('.header', '--header-height');

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
