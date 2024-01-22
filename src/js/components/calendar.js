import {
    Calendar
} from 'fullcalendar';
import SimpleBar from 'simplebar';
import modal from '../modules/modal';
import numberReplace from '../modules/numberReplace';

export const calendarPrimary = (containerSelector, eventsSelector, edit = false) => {
    const calendarEl = document.querySelector(containerSelector);
    const calendarEvents = document.querySelector(eventsSelector);
    if (!(calendarEl && calendarEvents)) return;
    const array = JSON.parse(calendarEvents.value);
    const calendaryPrimary = new Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ru',
        dayMaxEvents: 1,
        firstDay: 1,
        moreLinkContent: (obj) => `+ еще ${obj.num}`,
        fixedWeekCount: false,
        eventClassNames: 'fc-event-container',
        eventSources: [array],
        headerToolbar: {
            center: 'title',
            right: 'customNext',
            left: 'customPrev',
        },
        eventContent: (obj) => {
            return {
                html: `
            <span>${obj.event._def.extendedProps.time}</span>
            <span>${obj.event._def.title}</span>
            `
            }
        },
        customButtons: {
            customPrev: {
                text: 'Предыдущий месяц',
                icon: 'chevron-left',
                click: function () {
                    calendaryPrimary.prev();
                    addedClassesCalendar();
                }
            },
            customNext: {
                text: 'Следующий месяц',
                icon: 'chevron-right',
                click: function () {
                    calendaryPrimary.next();
                    addedClassesCalendar();
                }
            },
        }
    })

    calendaryPrimary.render();
    eventModal(array);
    addedClassesCalendar();

    function eventModal(eventsArray) {
        calendarEl.addEventListener('click', (e) => {
            if (!(e.target.classList.contains('.fc-event') || e.target.closest('.fc-event'))) return false;
            const event = e.target.closest('.fc-event');
            const eventDate = event.closest('[data-date]').dataset.date;
            const modalHTML = `
            <div class="calendar-event" data-date="${eventDate}">
            <div class="calendar-event__container">
                <button class="btn-reset calendar-event__close" aria-label="Закрыть модальное окно">
                    <svg>
                        <use xlink:href="./img/sprite.svg#x"></use>
                    </svg>
                    <span>Закрыть</span>
                </button>
                <div class="calendar-event__content">
                    <ul class="calendar-event__list list-reset calendar-event-simplebar">

                    </ul>
                </div>
            </div>
            </div>
            `;
            modal(modalHTML, '.calendar-event', 300);
            let editHTML = '';
            if (edit) {
                editHTML = `
                <div class="calendar-event-item__bottom">
                    <button type="button" class="btn btn-reset calendar-event-item__cancel">
                        <svg>
                            <use xlink:href="./img/sprite.svg#x"></use>
                        </svg>
                        Отменить
                    </button>
                    <button type="button" class="btn btn-reset calendar-event-item__edit">
                        <svg>
                            <use xlink:href="./img/sprite.svg#pencil"></use>
                        </svg>
                        Редактировать
                    </button>
                </div>
                `;
            }
            eventsArray.forEach(el => {
                if (el.date === eventDate) {
                    const itemHTML = `
                <li class="calendar-event__item calendar-event-item">
                    <div class="calendar-event-item__time">
                        <svg>
                            <use xlink:href="./img/sprite.svg#clock"></use>
                        </svg>
                        <div>
                            <span>${el.time}</span>
                            <span>${el.date}</span>
                        </div>
                    </div>
                    <div class="calendar-event-item__location">
                        <svg>
                            <use xlink:href="./img/sprite.svg#location"></use>
                        </svg>
                        ${el.location}
                    </div>
                        <div class="calendar-event-item__title">
                            ${el.title}
                        </div>
                        <span class="calendar-event-item__price">${numberReplace(`${el.price}`)} ₽</span>
                        <div class="calendar-event-item__user user-info">
                            <div class="user-info__avatar avatar">
                                <img loading="lazy" src="${el.user.avatar}" width="32" height="32" alt="${el.user.name}">
                            </div>
                            <span class="user-info__name">
                                ${el.user.name}
                            </span>
                            <span class="user-info__pos">
                                ${el.user.pos}
                            </span>
                        </div>
                        ${editHTML}
                </li>
                    `;
                    document.querySelector('.calendar-event__list').insertAdjacentHTML('beforeend', itemHTML);
                }
            })
            const calendarEventSimplebar = document.querySelector('.calendar-event-simplebar');
            new SimpleBar(calendarEventSimplebar);
        });
    }

    function addedClassesCalendar() {
        setTimeout(() => {
            document.querySelectorAll('.fc-event-container').forEach(el => {
                if (el.closest('.fc-day')) el.closest('.fc-day').classList.add('fc-day-event');
            });
            document.querySelectorAll('.fc-day-event').forEach(el => {
                el.querySelectorAll('.fc-event--circle').forEach(circle => circle.remove());
                const events = el.querySelectorAll('.fc-event');
                for (let i = 0; i < events.length; i++) {
                    const circleHTML = `<span class="fc-event--circle">Событие</span>`;
                    events[0].insertAdjacentHTML('beforeend', circleHTML);
                }
            });
        }, 200);
    }
}
