import scrollDrag from './scrollDrag';
import modal from '../modules/modal';
export const recordViewing = () => {
    const containers = document.querySelectorAll('.record-viewing');
    if (containers.length === 0) return;
    containers.forEach(container => {

        const newDate = new Date();
        const maps = {
            daysOfWeek: [
                'Воскресенье',
                'Понедельник',
                'Вторник',
                'Среда',
                'Четверг',
                'Пятница',
                'Суббота',
            ],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            months2: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
        };

        const listDays = container.querySelector('.record-day__list');
        const time = container.querySelector('.record-viewing__time');
        const btn = container.querySelector('.record-viewing__btn');

        createDays();
        createTime(true);
        updateBottom();
        checkNavBtn(time.querySelector('.record-time__list'), time.querySelector('.record-time__prev'), time.querySelector('.record-time__next'));
        listDays.addEventListener('input', (e) => {
            const target = e.target;
            const rightTarget = target.closest('.record-day__input');
            const item = target.closest('.record-day__item');
            if (rightTarget && !listDays.classList.contains('_drag')) {

                if (!item.classList.contains('_busy')) {
                    listDays.querySelectorAll('.record-day__item').forEach(item => item.classList.remove('_active'));
                    if (rightTarget.checked) {
                        item.classList.add('_active');
                    }
                } else {
                    // если занято
                }

                const currentDay = new Date().getDate();
                const itemDay = new Date(rightTarget.value).getDate();
                createTime(currentDay === itemDay ? true : false);
                updateBottom();
                checkNavBtn(time.querySelector('.record-time__list'), time.querySelector('.record-time__prev'), time.querySelector('.record-time__next'));
            }
        })
        time.addEventListener('input', (e) => {
            const target = e.target;
            const rightTarget = target.closest('.record-time__input');
            const item = target.closest('.record-time__item');
            if (rightTarget && !time.querySelector('.record-time__list').classList.contains('_drag')) {

                if (!item.classList.contains('_busy')) {
                    time.querySelector('.record-time__list').querySelectorAll('.record-time__item').forEach(item => item.classList.remove('_active'));
                    if (rightTarget.checked) {
                        item.classList.add('_active');
                    }
                } else {
                    // если занято
                }

                validate();
                updateBottom();
            }
        })

        function createDays() {
            for (let i = 0; i < 14; i++) {
                const date = new Date(newDate.setDate(newDate.getDate() + (i === 0 ? 0 : 1)));
                const stringDate = `${date.getFullYear()}-${date.getMonth() < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
                let item = '';
                // создать другой item если продавец занят в какой-то день
                item = `
            <li class="record-day__item ${i === 0 ? '_active' : ''}">
                <div class="record-day__check" aria-hidden="true">
                    <svg>
                        <use xlink:href="./img/sprite.svg#verif"></use>
                    </svg>
                </div>
                <input type="radio" name="record-day" value=${stringDate} ${i === 0 ? 'checked' : ''} class="record-day__input input-reset">
                <span class="record-day__day-week">${maps.daysOfWeek[date.getDay()]}</span>
                <span class="record-day__day-month">${date.getDate()}</span>
                <span class="record-day__month">${maps.months[date.getMonth()]}</span>
            </li>
            `;
                listDays.insertAdjacentHTML('beforeend', item);
            }
            if (window.innerWidth <= 1212) {
                scrollDrag(listDays, 1000);
            }
            slider(listDays, listDays.querySelector('.record-day__item'), container.querySelector('.record-day__prev'), container.querySelector('.record-day__next'));
        }

        function createTime(currentDay) {
            time.innerHTML = `
        <h3 class="record-time__title title-3">
            Выберите время
        </h3>
        <div class="record-time__container">
            <div class="nav-arrow-secondary nav-arrow-secondary--prev record-time__prev _disabled">
                <svg>
                    <use xlink:href="./img/sprite.svg#arrow-left"></use>
                </svg>
            </div>
            <ul class="record-time__list list-reset">
                ${generateItemTime(8,currentDay)}
                ${generateItemTime(9,currentDay)}
                ${generateItemTime(10,currentDay)}
                ${generateItemTime(11,currentDay)}
                ${generateItemTime(12,currentDay)}
                ${generateItemTime(13,currentDay)}
                ${generateItemTime(14,currentDay)}
                ${generateItemTime(15,currentDay)}
                ${generateItemTime(16,currentDay)}
                ${generateItemTime(17,currentDay)}
                ${generateItemTime(18,currentDay)}
                ${generateItemTime(19,currentDay)}
                ${generateItemTime(20,currentDay)}
                ${generateItemTime(21,currentDay)}
                ${generateItemTime(22,currentDay)}
            </ul>
            <div class="nav-arrow-secondary nav-arrow-secondary--next record-time__next">
                <svg>
                    <use xlink:href="./img/sprite.svg#arrow-right"></use>
                </svg>
            </div>
        </div>
        `;
            slider(time.querySelector('.record-time__list'), time.querySelector('.record-time__item'), time.querySelector('.record-time__prev'), time.querySelector('.record-time__next'));
            validate();
            if (window.innerWidth <= 1212) {
                scrollDrag(time.querySelector('.record-time__list'), 1000);
            }
        }

        function slider(wrapper, slide, prev, next) {
            prev.addEventListener('click', () => {
                wrapper.scrollTo({
                    left: wrapper.scrollLeft - (slide.offsetWidth * 3),
                    behavior: 'smooth',
                });
            });
            next.addEventListener('click', () => {
                wrapper.scrollTo({
                    left: wrapper.scrollLeft + (slide.offsetWidth * 3),
                    behavior: 'smooth',
                });
            });

            wrapper.addEventListener('scroll', () => {
                checkNavBtn(wrapper, prev, next);
            })
        }

        function generateItemTime(hour, currentDay) {
            const currentHour = new Date().getHours();
            const convertHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;
            let result = '';
            if (currentHour < hour && currentDay === true) {
                result = `
            <li class="record-time__item">
                <div class="record-time__check" aria-hidden="true">
                    <svg>
                        <use xlink:href="./img/sprite.svg#verif"></use>
                    </svg>
                </div>
                <input type="radio" name="record-time" value="${convertHour}" class="record-time__input input-reset">
                <span class="record-time__value">${convertHour}</span>
            </li>
            `;
            }
            if (currentDay === false) {
                result = `
            <li class="record-time__item">
                <div class="record-time__check" aria-hidden="true">
                    <svg>
                        <use xlink:href="./img/sprite.svg#verif"></use>
                    </svg>
                </div>
                <input type="radio" name="record-time" value="${convertHour}" class="record-time__input input-reset">
                <span class="record-time__value">${convertHour}</span>
            </li>
            `;
            }
            return result;
        }

        function checkNavBtn(wrapper, prev, next) {
            if (wrapper.scrollLeft === 0) {
                prev.classList.add('_disabled');
            } else {
                prev.classList.remove('_disabled');
            }
            if (Math.round(wrapper.offsetWidth + wrapper.scrollLeft) === wrapper.scrollWidth || Math.round(wrapper.offsetWidth + wrapper.scrollLeft - 1) === wrapper.scrollWidth) {
                next.classList.add('_disabled');
            } else {
                next.classList.remove('_disabled');
            }
        }

        function validate() {
            if (listDays.querySelector('.record-day__input:checked') && container.querySelector('.record-time__container') && container.querySelector('.record-time__input:checked')) {
                btn.removeAttribute('disabled');
            } else {
                btn.setAttribute('disabled', '');
            }
        }

        function updateBottom() {
            const bottomDate = container.querySelector('.record-viewing__bottom-date');
            const bottomTime = container.querySelector('.record-viewing__bottom-time');
            const dateItem = listDays.querySelector('.record-day__item._active');
            const timeItem = time.querySelector('.record-time__item._active');

            bottomDate.textContent = '-';
            bottomTime.textContent = '-';
            if (dateItem) {
                const dayWeekString = `${dateItem.querySelector('.record-day__day-week').textContent}`;
                const dayMonthString = `${dateItem.querySelector('.record-day__day-month').textContent}`;
                const month = maps.months2[maps.months.indexOf(dateItem.querySelector('.record-day__month').textContent)];
                bottomDate.textContent = `${dayWeekString},  ${dayMonthString} ${month}`;
            }

            if (timeItem) {
                bottomTime.textContent = timeItem.querySelector('.record-time__value').textContent;
            }

        }
    })
};
export const recordViewingTwo = () => {
    const containers = document.querySelectorAll('.record-viewing-two');
    if (containers.length === 0) return;
    containers.forEach(container => {
        const btns = container.querySelectorAll('.record-viewing-two__cancel');
        btns.forEach(cancel => {
            cancel.addEventListener('click', () => {
                const ID = cancel.hasAttribute('data-suggestion-id') ? cancel.dataset.suggestionId : false;
                const modalHTML = `
                <div class="record-viewing-two-confirm">
                <div class="record-viewing-two-confirm__container">
                    <button class="btn-reset record-viewing-two-confirm__close" aria-label="Закрыть модальное окно">
                        <svg>
                            <use xlink:href="./img/sprite.svg#x"></use>
                        </svg>
                        <span>Закрыть</span>
                    </button>
                     <div class="record-viewing-two-confirm__content">
                         <h2 class="record-viewing-two-confirm__title title-2">
                            Выберите причину отмены
                         </h2>
                         <div class="record-viewing-two-confirm__btns">
                            <button type="button" class="btn btn-reset btn-primary record-viewing-two-confirm__btn record-viewing-two-confirm__btn--yes">Выбрал случайно</button>
                            <button type="button" class="btn btn-reset btn-primary record-viewing-two-confirm__btn record-viewing-two-confirm__btn--no js-popup-close" data-popup-path="object-not-two" ${ID ? `data-suggestion-id='${ID}'` : ''}>
                                Объект не подходит
                            </button>
                         </div>
                     </div>
                </div>
                </div>
                `;
                modal(modalHTML, '.record-viewing-two-confirm', 300);
            });
        })
    })
};
export const recordViewingTwo2 = () => {
    const containers = document.querySelectorAll('.record-viewing-two');
    if (containers.length === 0) return;
    containers.forEach(container => {
        const btns = container.querySelectorAll('.record-viewing-two__cancel-two');
        btns.forEach(cancel => {
            cancel.addEventListener('click', () => {
                const modalHTML = `
                <div class="record-viewing-two-confirm">
                <div class="record-viewing-two-confirm__container">
                    <button class="btn-reset record-viewing-two-confirm__close" aria-label="Закрыть модальное окно">
                        <svg>
                            <use xlink:href="./img/sprite.svg#x"></use>
                        </svg>
                        <span>Закрыть</span>
                    </button>
                     <div class="record-viewing-two-confirm__content">
                         <h2 class="record-viewing-two-confirm__title title-2">
                           Дейсвительно хотите 
                         </h2>
                         <div class="record-viewing-two-confirm__btns">
                            <button type="button" class="btn btn-reset btn-primary record-viewing-two-confirm__btn record-viewing-two-confirm__btn--yes">Выбрал случайно</button>
                            <button type="button" class="btn btn-reset btn-primary record-viewing-two-confirm__btn record-viewing-two-confirm__btn--no js-popup-close" data-popup-path="object-not-two">Объект не подходит</button>
                         </div>
                     </div>
                </div>
                </div>
                `;
                modal(modalHTML, '.record-viewing-two-confirm', 300);
            });
        })
    })
};