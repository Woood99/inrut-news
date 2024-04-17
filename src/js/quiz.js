import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

import dataQuiz from './data/dataQuiz';
import quiz from './components/quiz';

// ==============================

document.addEventListener('DOMContentLoaded', () => {
    quiz(dataQuiz);
})
