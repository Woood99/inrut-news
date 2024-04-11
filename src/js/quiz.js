import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';

// ==============================

document.addEventListener('DOMContentLoaded', () => {
    const quiz = document.querySelector('.quiz__form');
    if (!quiz) return;
    init();

    let prevQuestionID = null;

    function init() {
        const questions = quiz.querySelectorAll('[data-question-id]');
        questions.forEach(question => {
            const id = question.dataset.questionId;
            const radios = question.querySelectorAll('.radio-primary__item');
            const checkboxes = question.querySelectorAll('.checkbox-secondary');
            radios.forEach((radio, index) => {
                const input = radio.querySelector('.radio-primary__input');
                const label = radio.querySelector('.radio-primary__label');
                if (input && label) {
                    input.setAttribute('id', `question-${id}_${index}`);
                    label.setAttribute('for', `question-${id}_${index}`);
                }
            })
            checkboxes.forEach((checkbox, index) => {
                const input = checkbox.querySelector('.checkbox-secondary__input');
                const label = checkbox.querySelector('.checkbox-secondary__label');
                if (input && label) {
                    input.setAttribute('id', `question-${id}_${index}`);
                    label.setAttribute('for', `question-${id}_${index}`);
                }
            })
        })

        quiz.addEventListener('click', (e) => {
            const target = e.target;
            const next = target.closest('.question__go');
            const prev = target.closest('.question__back');
            if (next) {
                const currentQuestion = next.closest('[data-question-id]')
                nextQuestion(currentQuestion);
            }
            if (prev) {
                const id = prev.dataset.questionBack;
                prevQuestion(id);
            }
        });
    }

    function nextQuestion(currentQuestion) {
        const radio = currentQuestion.querySelector('[data-question-r-show]:checked');
        const checkbox = currentQuestion.querySelector('[data-question-c-show]:checked');
        const input = currentQuestion.querySelector('[data-question-i-show]');
        if (radio) {
            questionToggle(currentQuestion, radio.dataset.questionRShow);
            return;
        }
        if (checkbox) {
            questionToggle(currentQuestion, checkbox.dataset.questionCShow);
            return;
        }
        if (input) {
            if (input.value.length > 0) {
                questionToggle(currentQuestion, input.dataset.questionIShow);
            } else {
                // length < 1
            }
            return;
        }

        // error
    }

    function prevQuestion(id) {
        const question = quiz.querySelector(`[data-question-id='${id}']`);
        const currentQuestion = quiz.querySelector('[data-question-id]._current');
        if (!(question && currentQuestion)) return;

        currentQuestion.classList.remove('_current');
        currentQuestion.classList.remove('_answered');

        question.classList.add('_current');
        question.classList.remove('_answered');
    }

    function questionToggle(currentQuestion, id) {
        const question = quiz.querySelector(`[data-question-id='${id}']`);
        if (!(currentQuestion && question)) return;
        // prevQuestionID = currentQuestion;
        currentQuestion.classList.remove('_current');
        currentQuestion.classList.add('_answered');
        question.classList.add('_current');

        const buttonBack = question.querySelector('.question__back');
        if (buttonBack){
            buttonBack.setAttribute('data-question-back',`${currentQuestion.dataset.questionId}`);
        }

    }
})
