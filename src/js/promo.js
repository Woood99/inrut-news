import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

// ==============================
import videoModal from './components/videoModal';
import { galleryPrimary } from './components/gallery';

document.addEventListener('DOMContentLoaded', () => {
    videoModal();
    galleryPrimary();
})
