import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

// ==============================

import {
    mapPrimary,
    controlCardsMap,
    mapDraw,
} from './components/maps';

import {
    bookConsultationValidate,
} from './components/formValidate';

import {
    controlCards
} from './components/controlCards';
import mapMetro from './components/mapMetro';
import {
    cardSecondaryActions,
} from './components/cardActions';

import scrollUp from './components/scrollUp';
import scrollTarget from './components/scrollTarget';
import metroInfo from './components/metroInfo';
document.addEventListener('DOMContentLoaded', () => {
    cardSecondaryActions();
    setTimeout(() => {
        mapPrimary();
    }, 100);
    mapDraw();
    controlCardsMap();
    controlCards();
    mapMetro();
    bookConsultationValidate();
    scrollUp();
    scrollTarget();
    metroInfo();
})

