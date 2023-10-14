import modal from '../modules/modal';

const cardStockPopup = (containerSelector) => {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    container.addEventListener('click', (e) => {
        const target = e.target;
        const cardSecondary = target.closest('.card-stock-secondary');
        const cardThird = target.closest('.card-stock-third');
        const cardStock = target.closest('.card-stock');
        const cardOnlineDisplay = target.closest('.online-display__item');
        if (cardSecondary) {
            const modalHTML = `
            <div class="stock-popup">
            <div class="stock-popup__container">
                <button class="btn-reset stock-popup__close" aria-label="Закрыть модальное окно">
                    <svg>
                        <use xlink:href="img/sprite.svg#x"></use>
                    </svg>
                    <span>Закрыть</span>
                </button>
                <div class="stock-popup__content">
                    <div class="stock-popup__image ibg">
                        ${cardSecondary.querySelector('.card-stock-secondary__image').innerHTML}
                    </div>
                    <div class="stock-popup__row">
                        ${cardSecondary.querySelector('.row').innerHTML}
                    </div>
                    <div class="stock-popup__name">
                        ${cardSecondary.querySelector('.card-stock-secondary__name').innerHTML}
                    </div>
                    <div class="stock-popup__descr">
                        ${cardSecondary.querySelector('.card-stock-secondary__descr').dataset.cardStockDescrFull}
                    </div>
                    <div class="stock-popup__row-bottom">
                        <a href="${cardSecondary.dataset.stockLink}" class="stock-popup__link">Смотреть</a>
                        <div class="stock-popup__user user-info">
                            ${cardSecondary.querySelector('.card-stock-secondary__user').innerHTML}
                        </div>
                    </div>
                    <div class="stock-popup__btns">
                    <button type="button" class="btn btn-reset btn-primary stock-popup__call">
                        Показать телефон
                    </button>
                    <button type="button" class="btn btn-reset btn-secondary stock-popup__message">
                        Задать вопрос
                    </button>
                </div>
            </div>
            </div>
            `;
            cardSecondary.classList.add('_active');
            modal(modalHTML, '.stock-popup', 300, cardSecondary);
        }
        if (cardThird) {
            if (target.closest('.card-stock-third__tooltip')) return;
            const modalHTML = `
            <div class="stock-popup">
            <div class="stock-popup__container">
                <button class="btn-reset stock-popup__close" aria-label="Закрыть модальное окно">
                    <svg>
                        <use xlink:href="img/sprite.svg#x"></use>
                    </svg>
                    <span>Закрыть</span>
                </button>
                 <div class="stock-popup__content">
                    <div class="stock-popup__row">
                      ${cardThird.querySelector('.card-stock-third__title').outerHTML}
                       ${cardThird.querySelector('.card-stock-third__time').outerHTML}
                    </div>
                    <div class="stock-popup__name">
                        ${cardThird.querySelector('.card-stock-third__name').innerHTML}
                    </div>
                    <div class="stock-popup__descr">
                        ${cardThird.querySelector('.card-stock-third__descr').dataset.cardStockDescrFull}
                    </div>
                    <div class="stock-popup__row-bottom">
                        <a href="${cardThird.dataset.stockLink}" class="stock-popup__link">Смотреть</a>
                        <div class="stock-popup__user user-info">
                        ${cardThird.querySelector('.card-stock-third__user').innerHTML}
                        </div>
                    </div>
                    <div class="stock-popup__btns">
                    <button type="button" class="btn btn-reset btn-primary stock-popup__call">
                        Показать телефон
                    </button>
                    <button type="button" class="btn btn-reset btn-secondary stock-popup__message">
                        Задать вопрос
                    </button>
                 </div>
            </div>
            </div>
            `;
            cardThird.classList.add('_active');
            modal(modalHTML, '.stock-popup', 300, cardThird);
        }
        if (cardStock) {
            if (target.closest('.card-stock-third__tooltip')) return;
            const modalHTML = `
             <div class="stock-popup">
             <div class="stock-popup__container">
                 <button class="btn-reset stock-popup__close" aria-label="Закрыть модальное окно">
                     <svg>
                         <use xlink:href="img/sprite.svg#x"></use>
                     </svg>
                     <span>Закрыть</span>
                 </button>
                  <div class="stock-popup__content">
                    <div class="stock-popup__row">
                        ${cardStock.dataset.stockTitle}
                        ${cardStock.querySelector('.card-stock__time').outerHTML}
                    </div>
                     <div class="stock-popup__name">
                         ${cardStock.dataset.stockName}
                     </div>
                     <div class="stock-popup__descr">
                         ${cardStock.dataset.stockDescr}
                     </div>
                     <div class="stock-popup__row-bottom">
                         <div class="stock-popup__user user-info">
                            ${cardStock.querySelector('.user-info').innerHTML}
                         </div>
                     </div>
                     <div class="stock-popup__btns">
                     <button type="button" class="btn btn-reset btn-primary stock-popup__call">
                         Показать телефон
                     </button>
                     <button type="button" class="btn btn-reset btn-secondary stock-popup__message">
                         Задать вопрос
                     </button>
                     </div>
             </div>
             </div>
             `;
            cardStock.classList.add('_active');
            modal(modalHTML, '.stock-popup', 300, cardThird);
        }
        if (cardOnlineDisplay){
            const modalHTML = `
            <div class="stock-popup">
            <div class="stock-popup__container">
                <button class="btn-reset stock-popup__close" aria-label="Закрыть модальное окно">
                    <svg>
                        <use xlink:href="img/sprite.svg#x"></use>
                    </svg>
                    <span>Закрыть</span>
                </button>
                 <div class="stock-popup__content">
                   <div class="stock-popup__row">
                       ${cardOnlineDisplay.dataset.stockTitle}
                       <time class="card-stock__time">
                       ${cardOnlineDisplay.dataset.stockTime}
                       </time>
                   </div>
                    <div class="stock-popup__name">
                        ${cardOnlineDisplay.dataset.stockName}
                    </div>
                    <div class="stock-popup__descr">
                        ${cardOnlineDisplay.dataset.stockDescr}
                    </div>
                    <div class="stock-popup__row-bottom">
                        <div class="stock-popup__user user-info">
                        <div class="user-info__avatar avatar online">
                            <img loading="lazy" src="./img/avatar-1.jpg" width="40" height="40" alt="Алексей Г.">
                        </div>
                        <span class="user-info__pos">
                            Застройщик
                        </span>
                        <span class="user-info__name">
                            Югстройинвест
                        </span>
                        </div>
                    </div>
                    <div class="stock-popup__btns">
                    <button type="button" class="btn btn-reset btn-primary stock-popup__call">
                        Показать телефон
                    </button>
                    <button type="button" class="btn btn-reset btn-secondary stock-popup__message">
                        Задать вопрос
                    </button>
                    </div>
            </div>
            </div>
            `;
            cardOnlineDisplay.classList.add('_active');
           modal(modalHTML, '.stock-popup', 300, cardThird);
        }
    })
};

export default cardStockPopup;
