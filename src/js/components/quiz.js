const quiz = (dataQuiz) => {
    const form = document.querySelector('.quiz__form');
    if (!form) return;
    init();

    const chat = document.querySelector('.quiz__chat');
    const title = form.querySelector('[data-quiz-title]');
    const step = form.querySelector('[data-quiz-step]');
    const maxStep = form.querySelector('[data-quiz-step-max]');
    let stepCount = 1;

    function init() {
        const questions = form.querySelectorAll('[data-question-id]');
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

        form.addEventListener('click', (e) => {
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
        form.addEventListener('change', (e) => {
            const target = e.target;
            if (chat && target.hasAttribute('data-question-name') && !target.classList.contains('_processed')) {
                const name = target.dataset.questionName.trim();
                const text = dataQuiz[name] ? dataQuiz[name].answer : undefined;
                if (!text) return;
                target.classList.add('_processed')
                const html = `
                    <div>
                        <p>
                            <strong>
                               ${name}
                            </strong>
                        </p>
                        ${text}
                    </div>
                `;
    
                chat.querySelector('.simplebar-content').insertAdjacentHTML('beforeend',html);
            }

            maxStepUpdate(target.dataset.questionRShow);
        })
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
        const question = form.querySelector(`[data-question-id='${id}']`);
        const currentQuestion = form.querySelector('[data-question-id]._current');
        if (!(question && currentQuestion)) return;

        currentQuestion.classList.remove('_current');

        changeTitle(question);
        stepCount--;
        changeStep();

        question.classList.add('_current');
    }

    function questionToggle(currentQuestion, id) {
        const question = form.querySelector(`[data-question-id='${id}']`);
        if (!(currentQuestion && question)) return;
        currentQuestion.classList.remove('_current');
        question.classList.add('_current');
        changeTitle(question);
        stepCount++;
        changeStep();

        const buttonBack = question.querySelector('.question__back');
        if (buttonBack) {
            buttonBack.setAttribute('data-question-back', `${currentQuestion.dataset.questionId}`);
        }
    }

    function changeTitle(question) {
        title.innerHTML = question.dataset.questionSubtitle.trim();
    }

    function changeStep() {
        step.innerHTML = stepCount;
    }

    function maxStepUpdate(id) {
        if (id === '173670') {
            maxStep.innerHTML = 10;
         }
         if (id === '173671') {
            maxStep.innerHTML = 9;
         }
    }
};

export default quiz;