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
        toggleObjectAddress(form.querySelector('[data-create-event-object]'), form.querySelector('[data-create-event-address]'));
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

    function toggleObjectAddress(object, address) {
        if (!(object && address)) return;
        const addressInput = address.querySelector('input');
        object.addEventListener('change', function() {
            setTimeout(() => {
                if (this.classList.contains('_selected')) {
                    address.classList.add('_disabled-opacity');
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
})
