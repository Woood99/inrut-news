const emergingBlockScroll = (targetThemSelector, emergingBlockSelector, screenSize, beforeContainer = false) => {
    const target = document.querySelector(targetThemSelector);
    const block = document.querySelector(emergingBlockSelector);
    if (!(target && block)) return;
    window.addEventListener('scroll', () => {
        targetScroll();
    })
    targetScroll();


    function targetScroll() {
        if (window.innerWidth >= screenSize) return;
        const pageOffsetTop = window.pageYOffset;
        const targetOffsetTop = target.getBoundingClientRect().top;
        console.log(block);
        if (beforeContainer) {
            if (targetOffsetTop > innerHeight || pageOffsetTop >= targetOffsetTop + pageOffsetTop) {
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
};
export default emergingBlockScroll;
