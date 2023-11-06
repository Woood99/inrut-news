export const videoLoad = () => {
    const containers = document.querySelectorAll('.video-load');
    containers.forEach(container => {
        const wrapper = container.querySelector('.video-load__wrapper');
        const btn = container.querySelector('.video-load__btn');
        const inputField = container.querySelector('.video-load__input');
        const input = inputField.querySelector('input');
        if (btn) {
            btn.addEventListener('click', () => {
                const value = input.value;
                if (validateYouTubeUrl(value)) {
                    if (!container.querySelector('video-card')) {
                        wrapper.setAttribute('hidden', '');
                        container.insertAdjacentHTML('beforeend', generateVideoCard(value));
                    }
                }
            })
        }
        container.addEventListener('click', (e) => {
            const target = e.target;
            if (target.closest('.video-card__remove')) {
                e.preventDefault();
                input.value = '';
                wrapper.removeAttribute('hidden');
                container.querySelector('.video-load__content').remove();
            }
        })
    })
};

export const currentVideoLoad = (container) => {
    if (!container) return;
    const wrapper = container.querySelector('.video-load__wrapper');
    const btn = container.querySelector('.video-load__btn');
    const inputField = container.querySelector('.video-load__input');
    const input = inputField.querySelector('input');
    if (btn) {
        btn.addEventListener('click', () => {
            const value = input.value;
            if (validateYouTubeUrl(value)) {
                if (!container.querySelector('video-card')) {
                    wrapper.setAttribute('hidden', '');
                    container.insertAdjacentHTML('afterbegin', generateVideoCard(value));
                }
            }
        })
    }
    container.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('.video-card__remove')) {
            e.preventDefault();
            input.value = '';
            wrapper.removeAttribute('hidden');
            container.querySelector('.video-load__content').remove();
        }
    })
};

function generateVideoCard(url) {
    const videoCardHTML = `
    <div class="video-load__content">
        <article class="video-card">
            <div class="video-card__image ibg">
                <picture>
                    <source srcset="./img/video-card-1.webp" type="image/webp">
                    <img loading="lazy" src="./img/video-card-1.jpg" width="323" height="207" alt="1-комн. квартира, 54 м², 12/12 эт.">
                </picture>
            </div>
            <button type="button" class="btn btn-reset video-card__remove" title="Удалить видео">
                <svg>
                    <use xlink:href="img/sprite.svg#trash"></use>
                </svg>
            </button>
        </article>
    </div>
    `;
    return videoCardHTML;
}

function validateYouTubeUrl(url) {
    if (url) {
        var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url.match(regExp)) return true;
    }
    return false;
}
