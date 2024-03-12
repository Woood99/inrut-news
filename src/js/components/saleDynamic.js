import {
    createPopper
} from '@popperjs/core';

const saleDynamic = () => {
    const container = document.querySelector('.sale-dynamic');
    if (!container) return;
    tabs(container);
    popper(container)
    diagramSetHeight(container);

    function tabs(container) {
        const btns = container.querySelectorAll('[data-sale-dynamic-tab]');
        const items = container.querySelectorAll('[data-sale-dynamic-content]');
        container.addEventListener('click', (e) => {
            const target = e.target;
            const btn = target.closest('[data-sale-dynamic-tab]');
            if (btn) {
                const currentID = btn.dataset.saleDynamicTab;
                const currentContent = container.querySelector(`[data-sale-dynamic-content="${currentID}"]`);
                btns.forEach(currentBtn => {
                    if (currentBtn === btn) {
                        currentBtn.classList.add('_active');
                    } else {
                        currentBtn.classList.remove('_active')
                    }
                });
                items.forEach(item => {
                    if (item === currentContent) {
                        item.removeAttribute('hidden');
                    } else {
                        item.setAttribute('hidden', '');
                    }
                })



            }
        })
    }

    function popper(container) {
        const items = container.querySelectorAll('.dynamic-section-item');
        items.forEach(item => {
            let popper;
            item.addEventListener('mouseenter', () => {
                const content = item.querySelector('.dynamic-section-item__tooltip');
                item.classList.add('_active');
                if (content) {
                    popper = createPopper(item, content, {
                        placement: 'top-start',
                        modifiers: [{
                            name: 'offset',
                            options: {
                                offset: [0, 5]
                            }
                        }]
                    });
                }
            });
            item.addEventListener('mouseleave', () => {
                item.classList.remove('_active');
                popper.destroy();
            });
        });
    }

    function diagramSetHeight(container) {
        const items = container.querySelectorAll('.dynamic-section');
        items.forEach(item => {
            const elements = item.querySelectorAll('.dynamic-section-item');
            let maxValueElement = elements[0];
            elements.forEach(element => {
                const currentValue = element.querySelector('[data-diagram-value]').dataset.diagramValue;
                const elementValue = maxValueElement.querySelector('[data-diagram-value]').dataset.diagramValue;
                if (Number(currentValue) >= Number(elementValue)) {
                    maxValueElement = element;
                }
            })
            maxValueElement.querySelector('[data-diagram-value]').style.height = '50%';
            const maxValue = maxValueElement.querySelector('[data-diagram-value]').dataset.diagramValue;
            elements.forEach(element => {
                if (maxValueElement !== element){
                    const currentValue = element.querySelector('[data-diagram-value]').dataset.diagramValue;
                    element.querySelector('[data-diagram-value]').style.height = `${(currentValue / maxValue * 100) / 2}%`;
                }  
            })
        });
    }
};

export default saleDynamic;
