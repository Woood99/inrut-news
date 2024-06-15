import 'focus-visible';
import "./functions/dynamic-adapt";
import "./functions/sliders";
import './functions/fix-fullheight';
import './_popups';
import './_main-scripts';
import { _slideDown, _displayFadeDown } from './support-modules/slide';
import getRemainingScrollToBottom from './modules/getRemainingScrollToBottom';
// ==============================

document.addEventListener('DOMContentLoaded', () => {
    const comparison = document.querySelector('.comparison-block');
    if (!comparison) return;

    const blocks = Array.from(comparison.querySelectorAll('[data-comparison-block]'));
    const tabsBlock = comparison.querySelector('[data-tabs]');

    if (tabsBlock) {
        setWidthOptions.call(tabsBlock);
        tabsBlock.addEventListener('tabChange', setWidthOptions.bind(tabsBlock));
    }

    if (window.innerWidth > 1212) {
        document.querySelectorAll('.comparison-block__option').forEach(option => {
            option.addEventListener('mouseenter', moveBlockHover.bind(option));
            option.addEventListener('mouseleave', moveBlockHoverDelete.bind(option));
        })
    }

    class Comparison {
        constructor(element) {
            this.element = element;
            if (!this.element) return;

            this.cards = this.element.querySelectorAll('.comparison-block__card');
            this.headers = Array.from(document.querySelectorAll('.comparison-header'));
            this.currentHeader = this.headers.find(el => el.dataset.comparisonHeader === this.element.dataset.comparisonBlock);
            this.currentHeaderList = this.currentHeader.querySelector('.comparison-header__list');
            this.options = this.element.querySelectorAll('.comparison-block__option');
            this.differences = [...this.element.querySelectorAll('[data-comparison-differences]'), ...this.currentHeaderList.querySelectorAll('[data-comparison-differences]')];
            this.init();
        }

        init() {
            this.setNumberCards();
            this.nav();
            this.checkNavBtn();
            this.setBestField();

            this.headerToggle();
            window.addEventListener('scroll', this.headerToggle.bind(this));
            this.element.addEventListener('scroll', () => {
                this.currentHeaderList.scrollLeft = this.element.scrollLeft;
            })
            this.differences.forEach(diff => {
                diff.addEventListener('change', () => {
                    if (diff.checked) {
                        this.setOptionsDifferences();
                    } else {
                        this.removeOptionsDifferences();
                    }
                })
            })
        }

        setNumberCards() {
            const length = this.cards.length;
            if (length === 0) return;
            this.cards.forEach((card, index) => {
                const number = card.querySelector('.comparison-card__number');
                number.textContent = `${index+1}/${length}`;
            })
        }

        nav() {
            this.bodyPrevButton = this.element.querySelector('.comparison-block__prev');
            this.bodyNextButton = this.element.querySelector('.comparison-block__next');

            this.headerPrevButton = this.currentHeader.querySelector('.comparison-header__prev');
            this.headerNextButton = this.currentHeader.querySelector('.comparison-header__next');


            this.bodyPrevButton.addEventListener('click', this.prev.bind(this));
            this.headerPrevButton.addEventListener('click', this.prev.bind(this));

            this.bodyNextButton.addEventListener('click', this.next.bind(this));
            this.headerNextButton.addEventListener('click', this.next.bind(this));
        }

        prev() {
            if (this.bodyPrevButton.classList.contains('_disabled-class')) return;
            const formula = this.element.scrollLeft - this.element.querySelector('.comparison-block__col-top').getBoundingClientRect().width;
            this.change(formula);
        }

        next() {
            if (this.bodyNextButton.classList.contains('_disabled-class')) return;
            const formula = this.element.scrollLeft + this.element.querySelector('.comparison-block__col-top').getBoundingClientRect().width;
            this.change(formula);
        }

        change(formula) {
            const spollers = comparison.querySelectorAll('.comparison-block__body .spollers__item');
            let speed = 0;

            spollers.forEach(item => {
                if (!item.classList.contains('_active')) {
                    speed = 500;
                    item.classList.add('_active');
                    _displayFadeDown(item.querySelector('.spollers__body'), 300);
                }
            })
            this.interimDisabledNavBtn();

            setTimeout(() => {
                this.element.scrollTo({
                    left: formula,
                    behavior: 'smooth',
                });

                // this.currentHeaderList.scrollTo({
                //     left: formula,
                //     behavior: 'smooth',
                // })

                setTimeout(() => {
                    this.checkNavBtn();
                }, 500);
            }, speed);
        }

        setBestField() {
            const fields = this.element.querySelectorAll('[data-comparison-field]');
            fields.forEach(field => {
                if (field.dataset.comparisonField === 'down') {
                    body(field, 'down');
                }
                if (field.dataset.comparisonField === 'up') {
                    body(field, 'up');
                }
            })

            function body(field, action) {
                const items = Array.from(field.querySelectorAll('.comparison-block__col'));
                if (items.length == 0) return;

                let currentItem = items[0];
                for (let i = 1; i < items.length; i++) {
                    const elem = items[i];
                    const currentSpan = getSpan(elem);

                    const prevSpan = getSpan(currentItem);
                    if (currentSpan && currentSpan.textContent.length > 0 && currentItem && prevSpan.textContent.length > 0) {

                        if (action === 'down') {
                            if (currentSpan.textContent.replace(/\D/g, '') < prevSpan.textContent.replace(/\D/g, '')) {
                                currentItem = elem;
                            }
                        }

                        if (action === 'up') {
                            if (currentSpan.textContent.replace(/\D/g, '') > prevSpan.textContent.replace(/\D/g, '')) {
                                currentItem = elem;
                            }
                        }

                    }
                }


                function getSpan(el) {
                    return el.querySelector('span');
                }


                if (getSpan(currentItem)) {
                    getSpan(currentItem).classList.add('_active');
                }


            }

        }

        headerToggle() {
            const top = this.element.querySelector('.comparison-block__top');
            const topContainer = this.element.querySelector('.comparison-block__top-container');

            const posTop = top.getBoundingClientRect().top;
            if (posTop + topContainer.clientHeight <= 0 && getRemainingScrollToBottom() > 250) {
                this.currentHeader.classList.add('_active');
            } else {
                this.currentHeader.classList.remove('_active');
            }
        }

        checkNavBtn() {
            this.bodyPrevButton.classList.remove('_disabled-class');
            this.bodyNextButton.classList.remove('_disabled-class');

            this.headerPrevButton.classList.remove('_disabled-class');
            this.headerNextButton.classList.remove('_disabled-class');

            if (this.element.scrollLeft === 0) {
                this.bodyPrevButton.classList.add('_disabled-hidden');
                this.headerPrevButton.classList.add('_disabled-hidden');
            } else {
                this.bodyPrevButton.classList.remove('_disabled-hidden');
                this.headerPrevButton.classList.remove('_disabled-hidden');
            }

            if (this.element.scrollLeft >= (this.element.scrollWidth - this.element.clientWidth - 20)) {
                this.bodyNextButton.classList.add('_disabled-hidden');
                this.headerNextButton.classList.add('_disabled-hidden');
            } else {
                this.bodyNextButton.classList.remove('_disabled-hidden');
                this.headerNextButton.classList.remove('_disabled-hidden');
            }
        }


        interimDisabledNavBtn() {
            this.bodyPrevButton.classList.add('_disabled-class');
            this.bodyNextButton.classList.add('_disabled-class');

            this.headerPrevButton.classList.add('_disabled-class');
            this.headerNextButton.classList.add('_disabled-class');
        }

        setOptionsDifferences() {
            this.differences.forEach(diff => diff.checked = true);
            for (let i = 0; i < this.options.length; i++) {
                const option = this.options[i];
                const cols = option.querySelectorAll('.comparison-block__col');
                let arr = [];
                for (let k = 0; k < cols.length; k++) {
                    const col = cols[k].textContent.trim();
                    arr.push(col);
                }
                if (arr[arr.length - 1] === '') {
                    arr.pop();
                }
                if ([...new Set(arr)].length === 1) {
                   option.setAttribute('hidden','');
                }
            }
        }

        removeOptionsDifferences() {
            this.differences.forEach(diff => diff.checked = false);
            this.options.forEach(option => {
                option.removeAttribute('hidden');
            })
        }

    }

    blocks.forEach(el => {
        new Comparison(el);
    })



    function setWidthOptions() {
        const activeBody = this.activeBody;
        if (activeBody.classList.contains('_init')) return;
        activeBody.classList.add('_init');

        activeBody.style.setProperty('--width-option-line', `${Math.ceil(activeBody.scrollWidth - 32 + 12)}px`);
    }

    function moveBlockHover() {
        if (window.innerWidth <= 1212) return;
        this.classList.add('_hover');
        const rect = this.getBoundingClientRect();
        const map = {
            width: 1180,
            height: rect.height,
            top: rect.top + window.scrollY,
            left: tabsBlock.getBoundingClientRect().left
        }

        const block = document.createElement('div');

        block.style.backgroundColor = '#f0f0f0';
        block.style.position = 'absolute';
        block.style.pointerEvents = 'none';

        block.style.width = `${map.width}px`;
        block.style.height = `${map.height}px`;
        block.style.top = `${map.top}px`;
        block.style.left = `${map.left}px`;

        block.classList.add('move-block-hover');

        document.body.insertAdjacentElement('beforeend', block);
    }

    function moveBlockHoverDelete() {
        if (window.innerWidth <= 1212) return;
        this.classList.remove('_hover');
        const moveBlockHover = document.querySelector('.move-block-hover');
        if (moveBlockHover) {
            moveBlockHover.remove();
        }
    }

})