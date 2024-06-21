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
    fieldRange,
    tooltipSelect,
    fieldNotif,
    filterActions,
    selectThird,
    filterCounter,
    quantitySelection,
    filterClear,
    tabsNav
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
    inputClue,
    inputSecond
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
    inputMaskCardValidity,
    confirmPhoneCodeValidate
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
import Notifications from './modules/notifications';

import { Tooltip, TooltipText } from './functions/tooltip';
import { tagsInHeight, tagsInCount } from './components/tagsIn';

document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('[data-tags-in-height]').forEach(item => {
        new tagsInHeight(item);
    })

    document.querySelectorAll('[data-tags-in-count]').forEach(item => {
        new tagsInCount(item);
    })

    const tooltipHtml = new Tooltip({
        mode: 'html',
        gap: 10,
        targetSelector: '[data-tooltip-html]',
        elementSelector: 'tooltip-html',
        positionX: 'left',
        positionY: 'bottom',
        animation: {
            type: 'fade',
            speed: 300,
        },
    });

    const comparisonNotif = new Tooltip({
        mode: 'html',
        targetSelector: '[data-tooltip-notif]',
        elementSelector: 'tooltip-notif',
        event: 'click',
        positionDocument: true,
        animation: {
            type: 'fade',
            speed: 300,
        },
    });

    const tooltip = new Tooltip({
        mode: 'default',
        gap: 10,
        positionX: 'left',
        positionY: 'bottom',
    });

    const tooltipText = new TooltipText({
        positionX: 'center',
        positionY: 'bottom',
    })


    header();
    getHeightBlock('.header', '--header-height');
    window.addEventListener('scroll', () => {
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
    selectThird();
    fieldSelect();
    fieldRange();
    choicesSelect();
    tooltipSelect();
    fieldNotif();
    filterActions();
    tabsNav();
    simplebar('.simplebar-primary');
    simplebar('.simplebar-secondary');
    simplebar('.simplebar-third');

    inputText();
    inputSecond()
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


    document.querySelectorAll('.filter').forEach(filter => filterCounter(filter));
    document.querySelectorAll('.filter').forEach(filter => filterClear(filter));
    document.querySelectorAll('.quantity-selection').forEach(container => quantitySelection(container));


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
    confirmPhoneCodeValidate();


    document.querySelectorAll('[data-notifications]').forEach(item => {
        new Notifications(item);
    })

    document.addEventListener('click', (e) => {
        const target = e.target;
        const searchSelectOne = document.querySelectorAll('.search-select-one');
        const selectThird = document.querySelectorAll('.select-third');
        const metroInfoActive = document.querySelectorAll('.metro-info__other._active');
        if (searchSelectOne.length > 0) {
            const currentContainer = target.closest('.search-select-one');
            if (currentContainer && !currentContainer.classList.contains('_active') || !currentContainer) {
                searchSelectOne.forEach(container => container.classList.remove('_active'));
            }
        }
        if (metroInfoActive.length > 0) {
            if (!target.closest('.metro-info') && window.innerWidth > 1212) {
                metroInfoActive.forEach(item => item.classList.remove('_active'));
            }
        }
        if (selectThird.length > 0) {
            const currentContainer = target.closest('.select-third');
            if (currentContainer && !currentContainer.classList.contains('_show') || !currentContainer) {
                selectThird.forEach(container => container.classList.remove('_show'));
            }
        }

        if (target.closest('.comparison-btn')) {
            e.preventDefault();
        }

        const favoriteBtn = target.closest('.favorite-btn-default');
        
        if (favoriteBtn) {

            e.preventDefault();
            if (!favoriteBtn.classList.contains('_prevent')) {
                setTimeout(() => {
                    favoriteBtn.classList.add('_prevent');
                    favoriteBtn.innerHTML = `
                        <svg class="tw-w-4 tw-h-4">
                             <use xlink:href="./img/sprite.svg#favorite"></use>
                        </svg>
                        <span>Удалить ЖК из избранного</span>
                    `;
                }, 1);
            } else {
                setTimeout(() => {
                    favoriteBtn.classList.remove('_prevent');
                    favoriteBtn.innerHTML = `
                        <svg class="tw-w-4 tw-h-4">
                            <use xlink:href="./img/sprite.svg#favorite-stroke"></use>
                        </svg>
                        <span>Добавить ЖК в избранное</span>
                    `
                }, 1);
            }

        }



        // const comparisonBtn = target.closest('.comparison-btn-default');
        // if (comparisonBtn) {
        //     e.preventDefault();
        //     if (!comparisonBtn.classList.contains('_prevent')) {
        //         setTimeout(() => {
        //             comparisonBtn.classList.add('_prevent');
        //         }, 1);
        //         comparisonBtn.innerHTML = `
        //             <svg class="tw-fill-[#005bff]">
        //                 <use xlink:href="./img/sprite.svg#comparison-active"></use>
        //             </svg>
        //             <span>Удалить ЖК из сравнения</span>
        //         `;
        //     } else {
        //         setTimeout(() => {
        //             comparisonBtn.classList.remove('_prevent');
        //         }, 1);
        //         comparisonBtn.innerHTML = `
                    // <svg>
                    //     <use xlink:href="./img/sprite.svg#comparison"></use>
                    // </svg>
                    // <span>Добавить ЖК к сравнению</span>
        //         `;
        //     }
        // }
    })


    // employee =============================
    const employeeRole = document.querySelector('[data-employee-role]');
    const selects = document.querySelectorAll('[data-employee-select-name]');
    if (employeeRole && selects.length > 0) {
        employeeRole.addEventListener('change', (e) => {
            const value = e.target.value;
            if (value === 'developers') {
                body({
                    set: ['developers', 'complex', 'city', 'experience'],
                    hidden: ['direction', 'agency']
                });

                return;
            }

            if (value === 'agent') {
                body({
                    set: ['direction', 'experience', 'city', 'agency'],
                    hidden: ['complex', 'developers']
                });

                return;
            }

            body({
                set: [],
                hidden: ['developers', 'complex', 'direction', 'city', 'experience', 'agency']
            });
        })

        function body(values) {
            const setItems = Array.from(selects).filter(item => values.set.includes(item.dataset.employeeSelectName));
            const hiddenItems = Array.from(selects).filter(item => values.hidden.includes(item.dataset.employeeSelectName));
            if (setItems.length > 0) {
                setItems.forEach(item => item.removeAttribute('hidden'));
            }
            if (hiddenItems.length > 0) {
                hiddenItems.forEach(item => item.setAttribute('hidden', ''));
            }
        }
    }

    // present
    const createPresents = document.querySelectorAll('.place-present');
    if (createPresents.length > 0) {
        createPresents.forEach(createPresent => {
            const checkboxes = createPresent.querySelector('.place-present__checkboxes');
            const summBlock = createPresent.querySelector('.place-present__summ');
            const quantityBlock = createPresent.querySelector('.place-present__quantity');
            checkboxes.addEventListener('change', (e) => {
                const target = e.target;
                const summ = target.closest('.place-present-checkbox-summ');
                const quantity = target.closest('.place-present-checkbox-quantity');
                if (summ) {
                    summBlock.removeAttribute('hidden');
                    quantityBlock.setAttribute('hidden', '');
                }
                if (quantity) {
                    quantityBlock.removeAttribute('hidden');
                    summBlock.setAttribute('hidden', '');
                }
            })
        })
    }


    const createPresentsField = document.querySelector('[data-create-present]');
    if (createPresentsField) {
        const input = createPresentsField.querySelector('[data-create-present-input]');
        const apartments = createPresentsField.querySelector('[data-create-present-apartments]');
        const select = createPresentsField.querySelector('[data-create-present-select]');
        if (!(input && apartments && select)) {
            return
        }
        const apartmentsItems = apartments.querySelectorAll('.checkbox');
        input.addEventListener('change', () => {
            select.setAttribute('hidden', '');
            apartmentsItems.forEach(item => item.querySelector('input').checked = false);
            if (input.checked) {
                apartmentsItems.forEach(item => item.classList.add('_disabled'));
            } else {
                apartmentsItems.forEach(item => item.classList.remove('_disabled'));
            }
        })
        apartments.addEventListener('change', (e) => {
            const isActive = Array.from(apartmentsItems).find(item => item.querySelector('input').checked);
            if (isActive) {
                select.removeAttribute('hidden');
            } else {
                select.setAttribute('hidden', '');
            }
        })
    }





});