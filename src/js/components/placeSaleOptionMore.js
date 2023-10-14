import {
    _slideToggle
} from '../support-modules/slide'

function placeSaleOptionMore() {
    const container = document.querySelector('.place-sale-options');
    if (!container) return;
    const itemsHidden = container.querySelectorAll('.place-sale-options__row[hidden]');
    const moreBtn = container.querySelector('.place-sale-options__more');
    const btnTextMap = {
        more: moreBtn.querySelector('span').textContent,
        none: 'Меньше параметров',
    }
    if (itemsHidden.length === 0) {
        moreBtn.remove();
        return;
    };
    moreBtn.addEventListener('click', () => {
        if (container.classList.contains('_active')) {
            itemsHidden.forEach(item => {
                _slideToggle(item, 700);
            });
            moreBtn.querySelector('span').textContent = btnTextMap.more;
            container.classList.remove('_active');
        } else {
            itemsHidden.forEach(item => {
                _slideToggle(item, 700);
            });
            moreBtn.querySelector('span').textContent = btnTextMap.none;
            container.classList.add('_active');
        }
    });
}

export default placeSaleOptionMore;



