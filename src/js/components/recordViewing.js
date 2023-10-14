import scrollDrag from './scrollDrag';
import modal from '../modules/modal';
export const recordViewing = () => {
    const container = document.querySelector('.record-viewing');
    if (!container) return;
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
    createTime();
    updateBottom();
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

            createTime();
            updateBottom();
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
                        <use xlink:href="img/sprite.svg#verif"></use>
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

    function createTime() {
        time.innerHTML = `
        <h3 class="record-time__title title-3">
            Выберите время
        </h3>
        <div class="record-time__container">
            <div class="nav-arrow-secondary nav-arrow-secondary--prev record-time__prev _disabled">
                <svg>
                    <use xlink:href="img/sprite.svg#arrow-left"></use>
                </svg>
            </div>
            <ul class="record-time__list list-reset">
                <li class="record-time__item">
                    <div class="record-time__check" aria-hidden="true">
                        <svg>
                            <use xlink:href="img/sprite.svg#verif"></use>
                        </svg>
                    </div>
                    <input type="radio" name="record-time" value="08:00" class="record-time__input input-reset">
                    <span class="record-time__value">08:00</span>
                </li>
                <li class="record-time__item">
                    <div class="record-time__check" aria-hidden="true">
                        <svg>
                            <use xlink:href="img/sprite.svg#verif"></use>
                        </svg>
                    </div>
                    <input type="radio" name="record-time" value="09:00" class="record-time__input input-reset">
                    <span class="record-time__value">09:00</span>
                </li>
                <li class="record-time__item">
                    <div class="record-time__check" aria-hidden="true">
                        <svg>
                            <use xlink:href="img/sprite.svg#verif"></use>
                        </svg>
                    </div>
                    <input type="radio" name="record-time" value="10:00" class="record-time__input input-reset">
                    <span class="record-time__value">10:00</span>
                </li>
                <li class="record-time__item">
                    <div class="record-time__check" aria-hidden="true">
                        <svg>
                            <use xlink:href="img/sprite.svg#verif"></use>
                        </svg>
                    </div>
                    <input type="radio" name="record-time" value="11:00" class="record-time__input input-reset">
                    <span class="record-time__value">11:00</span>
                </li>
                <li class="record-time__item">
                    <div class="record-time__check" aria-hidden="true">
                        <svg>
                            <use xlink:href="img/sprite.svg#verif"></use>
                        </svg>
                    </div>
                    <input type="radio" name="record-time" value="12:00" class="record-time__input input-reset">
                    <span class="record-time__value">12:00</span>
                </li>
                <li class="record-time__item">
                    <div class="record-time__check" aria-hidden="true">
                        <svg>
                            <use xlink:href="img/sprite.svg#verif"></use>
                        </svg>
                    </div>
                    <input type="radio" name="record-time" value="13:00" class="record-time__input input-reset">
                    <span class="record-time__value">13:00</span>
                </li>
                <li class="record-time__item">
                    <div class="record-time__check" aria-hidden="true">
                        <svg>
                            <use xlink:href="img/sprite.svg#verif"></use>
                        </svg>
                    </div>
                    <input type="radio" name="record-time" value="14:00" class="record-time__input input-reset">
                    <span class="record-time__value">14:00</span>
                </li>
                <li class="record-time__item">
                    <div class="record-time__check" aria-hidden="true">
                        <svg>
                            <use xlink:href="img/sprite.svg#verif"></use>
                        </svg>
                    </div>
                    <input type="radio" name="record-time" value="15:00" class="record-time__input input-reset">
                    <span class="record-time__value">15:00</span>
                </li>
                <li class="record-time__item">
                    <div class="record-time__check" aria-hidden="true">
                        <svg>
                            <use xlink:href="img/sprite.svg#verif"></use>
                        </svg>
                    </div>
                    <input type="radio" name="record-time" value="16:00" class="record-time__input input-reset">
                    <span class="record-time__value">16:00</span>
                </li>
                <li class="record-time__item">
                    <div class="record-time__check" aria-hidden="true">
                        <svg>
                            <use xlink:href="img/sprite.svg#verif"></use>
                        </svg>
                    </div>
                    <input type="radio" name="record-time" value="17:00" class="record-time__input input-reset">
                    <span class="record-time__value">17:00</span>
                </li>
                <li class="record-time__item">
                    <div class="record-time__check" aria-hidden="true">
                        <svg>
                            <use xlink:href="img/sprite.svg#verif"></use>
                        </svg>
                    </div>
                    <input type="radio" name="record-time" value="18:00" class="record-time__input input-reset">
                    <span class="record-time__value">18:00</span>
                </li>
                <li class="record-time__item">
                    <div class="record-time__check" aria-hidden="true">
                        <svg>
                            <use xlink:href="img/sprite.svg#verif"></use>
                        </svg>
                    </div>
                    <input type="radio" name="record-time" value="19:00" class="record-time__input input-reset">
                    <span class="record-time__value">19:00</span>
                </li>
                <li class="record-time__item">
                    <div class="record-time__check" aria-hidden="true">
                        <svg>
                            <use xlink:href="img/sprite.svg#verif"></use>
                        </svg>
                    </div>
                    <input type="radio" name="record-time" value="20:00" class="record-time__input input-reset">
                    <span class="record-time__value">20:00</span>
                </li>
                <li class="record-time__item">
                    <div class="record-time__check" aria-hidden="true">
                        <svg>
                            <use xlink:href="img/sprite.svg#verif"></use>
                        </svg>
                    </div>
                    <input type="radio" name="record-time" value="21:00" class="record-time__input input-reset">
                    <span class="record-time__value">21:00</span>
                </li>
                <li class="record-time__item">
                    <div class="record-time__check" aria-hidden="true">
                        <svg>
                            <use xlink:href="img/sprite.svg#verif"></use>
                        </svg>
                    </div>
                    <input type="radio" name="record-time" value="22:00" class="record-time__input input-reset">
                    <span class="record-time__value">22:00</span>
                </li>
            </ul>
            <div class="nav-arrow-secondary nav-arrow-secondary--next record-time__next">
                <svg>
                    <use xlink:href="img/sprite.svg#arrow-right"></use>
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
};
export const recordViewingTwo = () => {
    const container = document.querySelector('.record-viewing-two');
    if (!container) return; 
    const cancel = container.querySelector('.record-viewing-two__cancel');
    cancel.addEventListener('click',() => {
        const modalHTML = `
        <div class="record-viewing-two-confirm">
        <div class="record-viewing-two-confirm__container">
            <button class="btn-reset record-viewing-two-confirm__close" aria-label="Закрыть модальное окно">
                <svg>
                    <use xlink:href="img/sprite.svg#x"></use>
                </svg>
                <span>Закрыть</span>
            </button>
             <div class="record-viewing-two-confirm__content">
                 <h2 class="record-viewing-two-confirm__title title-2">
                    Отменить заявку?
                 </h2>
                 <div class="record-viewing-two-confirm__btns">
                    <button type="button" class="btn btn-reset btn-primary record-viewing-two-confirm__btn record-viewing-two-confirm__btn--yes">Да, отменить</button>
                    <button type="button" class="btn btn-reset btn-secondary record-viewing-two-confirm__btn record-viewing-two-confirm__btn--no">Не отменять</button>
                 </div>
             </div>
        </div>
        </div>
        `;
        modal(modalHTML, '.record-viewing-two-confirm', 300);
    });
};
