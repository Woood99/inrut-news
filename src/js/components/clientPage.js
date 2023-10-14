import {
    _slideDown,
    _slideUp
} from '../support-modules/slide'

export const clientPage = () => {
    const btnMore = document.querySelector('[data-client-more-btn]');
    const contentMore = document.querySelectorAll('[data-client-more-content');
    if (!btnMore || contentMore.length === 0) return;
    btnMore.addEventListener('click', () => {
        if (!btnMore.classList.contains('_active')) {
            contentMore.forEach(el => {
                _slideDown(el);
            })
            btnMore.classList.add('_active');
            btnMore.querySelector('span').textContent = 'Скрыть';
        } else {
            contentMore.forEach(el => {
                _slideUp(el);
            })
            btnMore.classList.remove('_active');
            btnMore.querySelector('span').textContent = 'Показать полностью';
        }
    });
}
