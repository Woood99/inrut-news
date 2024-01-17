const suggestObject = () => {
    const container = document.querySelector('.suggest-object');
    if (container) {
        const btns = container.querySelectorAll('[data-suggest-object-btn]');
        const go = container.closest('.popup-primary--suggest-object').querySelector('.suggest-object__btn');
        btns.forEach(btn => {
            const btnSpan = btn.querySelector('span');
            const btnStartText = btnSpan.textContent;
            btn.addEventListener('click', () => {
                if (!btn.classList.contains('_suggest-active')) {
                    btn.classList.add('_suggest-active');
                    btnSpan.textContent = 'Объект выбран';
                    toggleGo();
                } else {
                    btn.classList.remove('_suggest-active');
                    btnSpan.textContent = btnStartText;
                    toggleGo();
                }
            });
        })
    
    
        function toggleGo() {
            let result = false;
            for (let i = 0; i < Array.from(btns).length; i++) {
                if (btns[i].classList.contains('_suggest-active')) {
                    result = true;
                    break;
                }
            }
            if (result) {
                go.removeAttribute('disabled');
            } else {
                go.setAttribute('disabled', '');
            }
        }
    }
};

export default suggestObject;

