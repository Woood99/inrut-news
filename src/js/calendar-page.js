import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

// ==============================
import { calendarPrimary } from './components/calendar';
document.addEventListener('DOMContentLoaded', () => {
    calendarPrimary('.calendar-page__calendar .calendar-primary','.calendar-page__calendar .calendar-primary-events', false);
})

