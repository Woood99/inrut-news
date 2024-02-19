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
document.addEventListener('DOMContentLoaded', () => {
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
})
