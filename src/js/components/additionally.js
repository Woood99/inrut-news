import {
    _slideToggle
} from '../support-modules/slide'

const additionally = () => {
    const container = document.querySelector('.additionally');
    if (!container) return;
    const moreBtn = container.querySelector('.additionally__more');
    const moreBtnText = moreBtn.querySelector('span');
    const moreBtnTextDefault = moreBtnText.textContent;
    const moreItems = container.querySelector('[data-additionally-more-items]');
    moreBtn.addEventListener('click', () => {
        moreBtn.classList.toggle('_active');
        _slideToggle(moreItems);
        if (moreBtn.classList.contains('_active')) {
            moreBtnText.textContent = 'Скрыть';
        } else {
            moreBtnText.textContent = moreBtnTextDefault;

            const topGap = window.pageYOffset + container.getBoundingClientRect().top;
            const headerFixed = document.querySelector('.header-fixed');
            if (window.innerWidth >= 1212) {
                window.scrollTo({
                    top: headerFixed ? topGap - headerFixed.offsetHeight - 12 : topGap - 12,
                    behavior:'smooth'
                })
            }
        }
    });
}

export default additionally;
