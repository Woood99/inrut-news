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
    cardPrimaryActions,
    cardSecondaryActions,
    cardSecondaryActionsBody
} from './components/cardActions';

import scrollUp from './components/scrollUp';
import scrollTarget from './components/scrollTarget';
import metroInfo from './components/metroInfo';
import { galleryPrimary } from './components/gallery'
document.addEventListener('DOMContentLoaded', () => {
    cardSecondaryActions();
    cardPrimaryActions();
    controlCardsMap();
    controlCards();
    mapMetro();
    bookConsultationValidate();
    scrollUp();
    scrollTarget();
    metroInfo();

    galleryPrimary();
    // ==============================================

    // ==== maps ====

    // mapPrimary();
    // mapDraw();


    document.addEventListener('listingUpdate', () => {
        const cards = document.querySelectorAll('.cards-list__items .card-secondary');
        if (cards.length > 0) {
            cards.forEach(card => cardSecondaryActionsBody(card));
        }
    })
})