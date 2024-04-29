import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';
import { _slideDown } from './support-modules/slide';
// ==============================
document.addEventListener('DOMContentLoaded', () => {
    const comparison = document.querySelector('.comparison-block');
    if (!comparison) return;
    const header = document.querySelector('.comparison-header');
    updateNumberCard();
    nav();
    comparison.addEventListener('click', updateNumberCard);
    const top = comparison.querySelector('.comparison-block__top');
    const topContainer = comparison.querySelector('.comparison-block__top-container');
    if (header) {
        comparisonHeaderToggle();
        window.addEventListener('scroll', comparisonHeaderToggle);
    }



    function updateNumberCard() {
        const cards = comparison.querySelectorAll('.comparison-block__card');
        const length = cards.length;
        if (length === 0) return;
        cards.forEach((card, index) => {
            const number = card.querySelector('.comparison-card__number');
            number.textContent = `${index+1}/${length}`;
        })
    }

    function nav(){
        const width = comparison.querySelector('.comparison-block__col-top').getBoundingClientRect().width;
        const prev = comparison.querySelector('.comparison-block__prev');
        const next = comparison.querySelector('.comparison-block__next');

        const options = comparison.querySelectorAll('.comparison-block__options');
        next.addEventListener('click', () => {
            const formula = top.scrollLeft + width;
            body(formula);
        });
        prev.addEventListener('click', () => {
            const formula = top.scrollLeft - width;
            body(formula);
        });
        

        if (header) {
            const prev = header.querySelector('.comparison-header__prev');
            const next = header.querySelector('.comparison-header__next');
            next.addEventListener('click', () => {
                const formula = top.scrollLeft + width;
                body(formula);
            });
            prev.addEventListener('click', () => {
                const formula = top.scrollLeft - width;
                body(formula);
            });
        }

        function body(formula) {
            const spollers = comparison.querySelectorAll('.comparison-block__body .spollers__item');
            let speed = 0;
            spollers.forEach(item => {
                if (!item.classList.contains('_active')){
                    speed = 500;
                    item.classList.add('_active');
                    _slideDown(item.querySelector('.spollers__body'));
                }
            })
            setTimeout(() => {
                topContainer.scrollTo({
                    left: formula,
                    behavior: 'smooth',
                })
                options.forEach(option => {
                    option.scrollTo({
                        left: formula,
                        behavior: 'smooth'
                    })
                })

                const headerList = header ? header.querySelector('.comparison-header__list') : null;
                if (headerList) {
                    headerList.scrollTo({
                        left: formula,
                        behavior: 'smooth',
                    })
                }
            }, speed);
        }
    }

    function comparisonHeaderToggle() {
        const posTop = top.getBoundingClientRect().top;
        if (posTop + topContainer.clientHeight <= 0){
            header.classList.add('_active');
        } else {
            header.classList.remove('_active');
        }
    }
})
