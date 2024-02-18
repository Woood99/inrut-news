import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

// ==============================
import { calendarSecondary } from './components/calendar';
document.addEventListener('DOMContentLoaded', () => {
    calendarSecondary('.calendar-page__calendar .calendar-primary','.calendar-page__calendar .calendar-primary-events', false);
})

