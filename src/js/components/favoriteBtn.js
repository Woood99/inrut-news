const favoriteBtn = () => {
    const btns = document.querySelectorAll('.favorite-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.hasAttribute('data-popup-path')) return;
            if (!btn.classList.contains('_active')) {
                btn.classList.add('_active');
                btn.setAttribute('title', 'Удалить с избранного');
                btn.querySelector('svg use').setAttribute('xlink:href', 'img/sprite.svg#favorite')
            } else {
                btn.classList.remove('_active');
                btn.setAttribute('title', 'Добавить в избранное');
                btn.querySelector('svg use').setAttribute('xlink:href', 'img/sprite.svg#favorite-stroke')
            }
        });
    })
};

export default favoriteBtn;
