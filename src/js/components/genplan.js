import {
    createPopper
} from '@popperjs/core';
import modal from '../modules/modal';
import spollers from "../functions/spollers";


const genplan = () => {
    const container = document.querySelector('.genplan');
    if (!container) return;
    const infrastructureBtn = container.querySelector('.genplan__infrastructure');
    const marks = container.querySelectorAll('.genplan__mark');
    const visualInfo = container.querySelectorAll('.visual-info');
    const innerWidth = 1212;

    function togglePopper(container) {
        container.forEach(item => {
            let popper;
            item.addEventListener('mouseenter', () => {
                if (!item.classList.contains('_static')) {
                    item.classList.add('_active');
                    item.classList.add('_big-index');
                    const btn = item.querySelector('button');
                    const content = item.querySelector('.visual-info__content') ? item.querySelector('.visual-info__content') : item.querySelector('div');
                    if (btn && content) {
                        popper = createPopper(btn, content, {
                            placement: 'auto',
                            modifiers: [{
                                name: 'offset',
                                options: {
                                    offset: [5, 5]
                                }
                            }]
                        });
                    }
                }
            });
            item.addEventListener('mouseleave', () => {
                if (!item.classList.contains('_static')) {
                    item.classList.remove('_active');
                    setTimeout(() => {
                        item.classList.remove('_big-index');
                    }, 150);
                    setTimeout(() => {
                        if (!item.classList.contains('_active')) popper.destroy();
                    }, 300);
                }
            });
        });
    }

    if (window.innerWidth > innerWidth) {
        togglePopper(marks);
        togglePopper(visualInfo);
    } else {

        marks.forEach(item => {
            item.addEventListener('click', () => {
                const card = item.querySelector('.genplan-mark');


                const modalHTML = `
                <div class="genplan-popup-card">
                <div class="genplan-popup-card__container">
                    <button class="btn-reset genplan-popup-card__close" aria-label="Закрыть модальное окно">
                        <span>Закрыть</span>
                    </button>
                     <div class="genplan-popup-card__content">
                        ${card.outerHTML}
                     </div>
                </div>
                </div>
                `;

                modal(modalHTML, '.genplan-popup-card', 300);
                spollers();
            })
        })
        visualInfo.forEach(item => {
            item.addEventListener('click', () => {
                visualInfo.forEach(el => {
                    if (item !== el) el.classList.remove('_active')
                });
                item.classList.toggle('_active');
            });
        })


        const mask = container.querySelector('.genplan__mask');
        mask.addEventListener('touchstart', () => {
            mask.classList.remove('_active');
            setTimeout(() => {
                mask.classList.add('hidden');
            }, 500);
        });
    }

    visualInfo.forEach(item => item.classList.add('_no-visible'));
    infrastructureBtn.addEventListener('click', () => {
        const checked = infrastructureBtn.querySelector('input').checked;
        if (checked) {
            visualInfo.forEach(item => item.classList.remove('_no-visible'));
        } else {
            visualInfo.forEach(item => item.classList.add('_no-visible'));
        }
    })

}
export default genplan;
