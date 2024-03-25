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
        descrAdd(form);
        toggleObjectAddress(form, form.querySelector('[data-create-event-object]'), form.querySelector('[data-create-event-address]'));
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

    function descrAdd(form) {
        const blockBtn = form.querySelector('[data-add-descr-btn]');
        const descrSection = form.querySelector('[data-add-descr-section]');
        if (blockBtn && descrSection) {
            const btn = blockBtn.querySelector('.calendar-create-event__add');
            btn.addEventListener('click', () => {
                descrSection.removeAttribute('hidden');
                blockBtn.remove();
            })
        }
    }

    function toggleObjectAddress(form, object, address) {
        if (!(object && address)) return;
        const addressInput = address.querySelector('input');
        const objectAddress = form.querySelector('[data-create-event-object-address]');
        object.addEventListener('change', function () {
            setTimeout(() => {
                if (this.classList.contains('_selected')) {
                    address.classList.add('_disabled-opacity');
                    objectAddress.removeAttribute('hidden');
                } else {
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
