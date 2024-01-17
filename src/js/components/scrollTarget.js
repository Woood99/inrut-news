const scrollTarget = () => {
    const targets = document.querySelectorAll('[data-scroll-target]');
    if (targets.length === 0) return;
    targets.forEach(target => {
        target.addEventListener('click', () => {
            const name = target.dataset.scrollTarget;
            const to = document.querySelector(`[data-scroll-block="${name}"]`);
            if (to) {
                const gap = target.dataset.scrollTargetGap ? target.dataset.scrollTargetGap : 0;
                const topGap = window.pageYOffset + to.getBoundingClientRect().top;
                const headerFixed = document.querySelector('.header-fixed') ? document.querySelector('.header-fixed').clientHeight : 0;
                const headerHeight = document.querySelector('.header').offsetHeight;
                window.scrollTo({
                    top: window.innerWidth > 1212 ? topGap - gap - headerFixed : topGap - gap - headerFixed - headerHeight + 8,
                    behavior: 'smooth'
                })
            }
        });
    })
};
export default scrollTarget;