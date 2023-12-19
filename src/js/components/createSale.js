const createSale = () => {
    const saleCreate = document.querySelector('.place-sale-create');
    const vidoeCreate = document.querySelector('.place-video-create');
    if (saleCreate) {
        const cards = saleCreate.querySelector('.place-sale-sale__cards');
        const wrapper = cards.querySelector('.swiper-wrapper');
        wrapper.addEventListener('click', (e) => {
            const target = e.target;
            const remove = target.closest('.card-stock-secondary__remove');
            if (remove) {
                e.preventDefault();
                const item = remove.closest('.swiper-slide');
                item.remove();
                checkLengthCards(cards,wrapper);
            }
        })
        checkLengthCards(cards,wrapper);
        const title = document.querySelector('.add-complex .add-complex--complex .search-select-one__button-wrapper div:nth-child(2) span').textContent;

        const name = saleCreate.querySelector('.place-sale-sale__field--name');
        const nameInput = name.querySelector('input');

        const start = saleCreate.querySelector('.place-sale-sale__field--start');
        const startInput = start.querySelector('input');

        const ending = saleCreate.querySelector('.place-sale-sale__field--ending');
        const endingInput = ending.querySelector('input');


        const descr = saleCreate.querySelector('.place-sale-sale__field--descr');
        const descrInput = saleCreate.querySelector('.textarea-primary__input');

        const photo = saleCreate.querySelector('.photo-load');
        const photoInput = photo.querySelector('input');
        const btn = saleCreate.querySelector('.place-sale-sale__save');

        btn.addEventListener('click', () => {
            create();
            clearAllField();
            checkLengthCards(cards,wrapper);
        });

        function create() {
            let file = photoInput.files[0];
            const image = file ? window.URL.createObjectURL(file) : '';
            const saleHTML = `
            <div class="swiper-slide drag-drop__item" draggable="true">
            <article class="card-stock-secondary">
                <a href="./promotion.html" class="card-stock-secondary__container">
                    <button type="button" class="btn btn-reset card-stock-secondary__remove">
                        <svg>
                          <use xlink:href="./img/sprite.svg#trash"></use>
                        </svg>
                    </button>
                    <div class="card-stock-secondary__image ibg">
                        <picture>
                            <source srcset="${image}" type="image/webp">
                            <img loading="lazy" src="${image}" width="323" height="207" alt="${title}">
                        </picture>
                    </div>
                    <div class="card-stock-secondary__content">
                        <div class="row">
                            <h3 class="card-stock-secondary__title title-4">
                                ${title}
                            </h3>
                        </div>
                        <div class="card-stock-secondary__name">
                            ${nameInput.value}
                        </div>
                        <p class="card-stock-secondary__descr">
                            ${descrInput.value}
                        </p>
                    </div>
                    <div class="card-stock-secondary__times">
                        <div>
                            <span>Начало:</span>
                            <span>${startInput.value}</span>
                        </div>
                        <div>
                            <span>Окончание:</span>
                            <span>${endingInput.value}</span>
                        </div>
                    </div>
                </a>
            </article>
            </div>
            `;
            wrapper.insertAdjacentHTML('beforeend', saleHTML);
        }

        function clearAllField() {
            name.classList.remove('_active');
            nameInput.value = '';

            start.classList.remove('_active');
            startInput.value = '';

            ending.classList.remove('_active');
            endingInput.value = '';

            descr.classList.remove('_active');
            descrInput.value = '';

            photoInput.value = '';

            const photos = saleCreate.querySelectorAll('.place-sale-photo__image');
            photos.forEach(photo => {
                if (photo) photo.remove();
            });
        }
    }



    function checkLengthCards(cards,wrapper) {
        const cardsLength = wrapper.querySelectorAll('.swiper-slide').length;
        if (cardsLength >= 1) {
            cards.classList.add('_active');
        } else {
            cards.classList.remove('_active');
        }
    }
};

export default createSale;
