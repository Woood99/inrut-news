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
    const headers = Array.from(document.querySelectorAll('.comparison-header'));
    const blocks = Array.from(comparison.querySelectorAll('[data-comparison-block]'));

    comparison.addEventListener('click', updateNumberCard);
    updateNumberCard();
    headers.forEach(header => nav(header));

    if (document.querySelector('.comparison-header')) {
        comparisonHeaderToggle();
        window.addEventListener('scroll', comparisonHeaderToggle);
    }



    function updateNumberCard() {
        blocks.forEach(item => body(item));

        function body(comparison) {
            const cards = comparison.querySelectorAll('.comparison-block__card');
            const length = cards.length;
            if (length === 0) return;
            cards.forEach((card, index) => {
                const number = card.querySelector('.comparison-card__number');
                number.textContent = `${index+1}/${length}`;
            })
        }
    }

    function nav(header) {
        const comparison = blocks.find(item => item.dataset.comparisonBlock == header.dataset.comparisonHeader);

        const blockPrev = comparison.querySelector('.comparison-block__prev');
        const blockNext = comparison.querySelector('.comparison-block__next');

        const headerPrev = header.querySelector('.comparison-header__prev');
        const headerNext = header.querySelector('.comparison-header__next');

        const options = comparison.querySelectorAll('.comparison-block__options');

        blockPrev.addEventListener('click', () => {
            const formula = getScrollLeft() - getWidth();
            body(formula);
        });
        blockNext.addEventListener('click', () => {
            const formula = getScrollLeft() + getWidth();
            body(formula);
        });


        if (header && headerPrev && headerNext) {
            headerPrev.addEventListener('click', () => {
                const formula = getScrollLeft() - getWidth();
                body(formula);
            });
            headerNext.addEventListener('click', () => {
                const formula = getScrollLeft() + getWidth();
                body(formula);
            });
        }

        function body(formula) {
            const topContainer = comparison.querySelector('.comparison-block__top-container');
            const spollers = comparison.querySelectorAll('.comparison-block__body .spollers__item');
            let speed = 0;
            spollers.forEach(item => {
                if (!item.classList.contains('_active')) {
                    speed = 500;
                    item.classList.add('_active');
                    _slideDown(item.querySelector('.spollers__body'));
                }
            })
            
            interimDisabledNavBtn();
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
               setTimeout(() => {
                checkNavBtn();
               }, 300);
            }, speed);
        }

        function getWidth() {
            return comparison.querySelector('.comparison-block__col-top').getBoundingClientRect().width;
        }

        function getScrollLeft() {
            return comparison.querySelector('.comparison-block__top-container').scrollLeft;
        }

        function checkNavBtn() {
            const wrapper = comparison.querySelector('.comparison-block__top-container');

            blockPrev.classList.remove('_disabled');
            blockNext.classList.remove('_disabled');

            headerPrev.classList.remove('_disabled');
            headerNext.classList.remove('_disabled');

            if (wrapper.scrollLeft === 0) {
                blockPrev.classList.add('_disabled-hidden');
                headerPrev.classList.add('_disabled-hidden');
            } else {
                blockPrev.classList.remove('_disabled-hidden');
                headerPrev.classList.remove('_disabled-hidden');
            }
            if (Math.round(wrapper.offsetWidth + wrapper.scrollLeft) === wrapper.scrollWidth || 
            Math.round(wrapper.offsetWidth + wrapper.scrollLeft + 1) === wrapper.scrollWidth ||
            Math.round(wrapper.offsetWidth + wrapper.scrollLeft + 4) === wrapper.scrollWidth) {
                blockNext.classList.add('_disabled-hidden');
                headerNext.classList.add('_disabled-hidden');
            } else {
                blockNext.classList.remove('_disabled-hidden');
                headerNext.classList.remove('_disabled-hidden');
            }
        }

        function interimDisabledNavBtn() {
            blockPrev.classList.add('_disabled');
            blockNext.classList.add('_disabled');

            headerPrev.classList.add('_disabled');
            headerNext.classList.add('_disabled');
        }
    }

    function comparisonHeaderToggle() {
        const currentHeader = headers.find(item => !item.hasAttribute('hidden'));
        const currentID = currentHeader.dataset.comparisonHeader;
        const currentBlock = document.querySelector(`[data-comparison-block="${currentID}"]`);

        const top = currentBlock.querySelector('.comparison-block__top');
        const topContainer = currentBlock.querySelector('.comparison-block__top-container');

        const posTop = top.getBoundingClientRect().top;
        if (posTop + topContainer.clientHeight <= 0) {
            currentHeader.classList.add('_active');
        } else {
            currentHeader.classList.remove('_active');
        }

    }
})