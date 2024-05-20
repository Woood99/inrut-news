export const emergingBlockScroll = (targetThemSelector, emergingBlockSelector, screenSize, beforeContainer = false, onlyCheck = false) => {
    const target = document.querySelector(targetThemSelector);
    const block = document.querySelector(emergingBlockSelector);
    if (!(target && block)) return;
    if (!onlyCheck) {
        window.addEventListener('scroll', () => {
            targetScroll(target, block, screenSize, beforeContainer);
        })
        targetScroll(target, block, screenSize, beforeContainer);
    } else {
        setTimeout(() => {
            targetScroll(target, block, screenSize, beforeContainer);
        }, 1);
    }
};

function targetScroll(target, block, screenSize, beforeContainer) {
    if (window.innerWidth >= screenSize) return;
    const pageOffsetTop = window.pageYOffset;
    const targetOffsetTop = target.getBoundingClientRect().top;
    const start = document.querySelector('.object-body__slider') ? document.querySelector('.object-body__slider').offsetTop : 0;
    const footer = document.querySelector('.footer');
    if (beforeContainer) {
        if ((targetOffsetTop > innerHeight || pageOffsetTop >= targetOffsetTop + pageOffsetTop) && pageOffsetTop > start && 
        footer.offsetTop + block.clientHeight > pageOffsetTop + innerHeight) {
            block.classList.add('active-fixed');
        } else {
            block.classList.remove('active-fixed');
        }

    } else {
        if (pageOffsetTop >= targetOffsetTop + pageOffsetTop) {
            block.classList.add('active-fixed');
        } else {
            block.classList.remove('active-fixed');
        }
    }
}
