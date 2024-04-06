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

    function blockHidden(form, btnSelector, sectionSelector) {
        const blockBtn = form.querySelector(btnSelector);
        const section = form.querySelector(sectionSelector);
        if (!(blockBtn && section)) return;
        const btn = blockBtn.querySelector('.calendar-create-event__add');
        const field = section.querySelector('textarea') || section.querySelector('input');

        const addressSection = sectionSelector === '[data-address-section]';
        btn.addEventListener('click', () => {
            section.removeAttribute('hidden');
            blockBtn.setAttribute('hidden', '');

            if (addressSection) {
                form.querySelector('[data-create-event-object]').classList.add('_disabled-opacity');
            }
        })

        const remove = section.querySelector('.field-input__remove');
        if (remove) {
            remove.addEventListener('click', () => {
                section.setAttribute('hidden', '');
                blockBtn.removeAttribute('hidden');
                if (field) field.value = '';

                if (addressSection) {
                    form.querySelector('[data-create-event-object]').classList.remove('_disabled-opacity');
                }
            })
        }
    }

    function toggleObjectAddress(form, object, addressSection) {
        if (!(object && addressSection)) return;
        const objectAddress = form.querySelector('[data-create-event-object-address]');
        const addressBtn = form.querySelector('[data-address-btn]');
        const participantSection = form.querySelector('[data-participant-section]');
        object.addEventListener('change', function () {
            setTimeout(() => {
                if (this.classList.contains('_selected')) {
                    addressSection.setAttribute('hidden', '');
                    addressBtn.setAttribute('hidden', '');
                    objectAddress.removeAttribute('hidden');
                    participantSection.removeAttribute('hidden');
                } else {
                    addressBtn.removeAttribute('hidden');
                    objectAddress.setAttribute('hidden', '');
                    participantSection.setAttribute('hidden', '');
                }
            }, 50);
        })
    }

    function videoMeetingToggle(form) {
        const target = form.querySelector('[data-video-meeting-target]');
        const blocks = form.querySelectorAll('[data-video-meeting-block]');
        if (!(target && blocks.length > 0)) return;
        body();
        target.addEventListener('change', body);
        function body() {
            setTimeout(() => {
                const value = target.querySelector('.choices__item.choices__item--selectable').dataset.value;
                if (value === 'video-meeting') {
                    itemToggleHidden(blocks, 'remove');
                } else {
                    itemToggleHidden(blocks, 'set');
                }
            }, 1);
        }

        function itemToggleHidden(items, status) {
            if (status === 'remove') {
                items.forEach(item => item.removeAttribute('hidden'));
            }
            if (status === 'set') {
                items.forEach(item => item.setAttribute('hidden', ''));
            }
        }
    }
})
