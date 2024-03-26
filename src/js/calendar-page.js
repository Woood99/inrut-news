import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

// ==============================
import {
    calendarSecondary
} from './components/calendar';
import {
    reverseDate
} from './modules/date';
import AirDatepicker from 'air-datepicker';
import {
    dropImage
} from './components/dropImage';
import {
    emergingBlockScroll
} from './modules/emergingBlockScroll';
document.addEventListener('DOMContentLoaded', () => {
    emergingBlockScroll('.calendar-create-event .calendar-create-event__btn', '.footer-fixed.calendar-create-event-fixed', 99999999, true);
    const createEvent = document.querySelector('.calendar-create-event');
    const calendarPage = document.querySelector('.calendar-page');
    if (calendarPage) {
        calendarSecondary('.calendar-page__calendar .calendar-primary', '.calendar-page__calendar .calendar-primary-events', false);
    }
    if (createEvent) {
        const dateEvent = document.querySelector('[date-current]').value;
        const form = createEvent.querySelector('.calendar-create-event__form');
        timeAndDate(form, dateEvent);
        dropImage();
        blockHidden(form, '[data-add-descr-btn]', '[data-add-descr-section]');
        blockHidden(form, '[data-address-btn]', '[data-address-section]');
        toggleObjectAddress(form, form.querySelector('[data-create-event-object]'), form.querySelector('[data-address-section]'));
        videoMeetingToggle(form);
    }



    function timeAndDate(form, dateEvent) {
        const date = form.querySelector('.calendar-create-event__date');
        date.value = reverseDate(dateEvent);
        new AirDatepicker(date, {
            autoClose: true,
            isMobile: true,
        })
    }

    function blockHidden(form,btnSelector,sectionSelector) {
        const blockBtn = form.querySelector(btnSelector);
        const section = form.querySelector(sectionSelector);
        if (!(blockBtn && section)) return;
        const btn = blockBtn.querySelector('.calendar-create-event__add');
        const field = section.querySelector('textarea') || section.querySelector('input'); 
        btn.addEventListener('click', () => {
            section.removeAttribute('hidden');
            blockBtn.setAttribute('hidden', '');
        })

        const remove = section.querySelector('.field-input__remove');
        if (remove) {
            remove.addEventListener('click', () => {
                section.setAttribute('hidden', '');
                blockBtn.removeAttribute('hidden');
                if (field) field.value = '';

                if (sectionSelector === '[data-address-section]'){
                    form.querySelector('[data-create-event-object]').classList.remove('_disabled-opacity');
                }
            })
        }
    }

    function toggleObjectAddress(form, object, addressSection) {
        if (!(object && addressSection)) return;
        const addressInput = form.querySelector('[data-create-event-address] input');
        const objectAddress = form.querySelector('[data-create-event-object-address]');
        const addressBtn = form.querySelector('[data-address-btn]');
        object.addEventListener('change', function () {
            setTimeout(() => {
                if (this.classList.contains('_selected')) {
                    addressSection.setAttribute('hidden','');
                    addressBtn.setAttribute('hidden','');
                    objectAddress.removeAttribute('hidden');
                } else {
                    addressSection.removeAttribute('hidden');
                    addressBtn.removeAttribute('hidden');
                    objectAddress.setAttribute('hidden', '');
                }
            }, 50);
        })
        addressInput.addEventListener('input', function () {
            if (this.value.length > 0) {
                object.classList.add('_disabled-opacity');
            } else {
                object.classList.remove('_disabled-opacity');
            }
        })
    }

    function videoMeetingToggle(form) {
        const target = form.querySelector('[data-video-meeting-target]');
        const block = form.querySelector('[data-video-meeting-block]');
        if (!(target && block)) return;
        body();
        target.addEventListener('change', body);

        function body() {
            setTimeout(() => {
                const input = target.querySelector('.search-select-one__input-hidden');
                if (input.value === 'video-meeting') {
                    block.removeAttribute('hidden');
                } else {
                    block.setAttribute('hidden', '');
                }
            }, 1);
        }
    }
})
