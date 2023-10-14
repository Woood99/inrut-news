import SimpleBar from 'simplebar';
export const simplebar = (selector) => {
    document.querySelectorAll(selector).forEach(el => {
        new SimpleBar(el);

        if (el.parentElement.classList.contains('bid-messages__wrapper')) {
            el.querySelector('.simplebar-content-wrapper').scrollTo({
                top: el.querySelector('.simplebar-content').clientHeight,
            })
        }
    });
}
