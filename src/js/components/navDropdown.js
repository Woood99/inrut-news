const navDropdown = () => {
    const container = document.querySelector('.header-main__nav');
    if (!container) return;
    const items = container.querySelectorAll('.nav-dropdown');
    let time;
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (window.innerWidth <= 1180) return;
            removeActiveNav();
            if (!item.classList.contains('_active')) {
                time = setTimeout(() => {
                    item.classList.add('_active');
                    toggleMask();
                }, 400);
            }
        })
        item.addEventListener('mouseleave', () => {
            if (window.innerWidth <= 1180) return;
            clearTimeout(time);
            removeActiveNav();
            setTimeout(() => {
                toggleMask();
            }, 400);
        });
    })

    function toggleMask() {
        const activeItem = container.querySelector('.nav-dropdown._active');
        const body = document.body;
        activeItem ? body.classList.add('_nav-active-mask') : body.classList.remove('_nav-active-mask');
    }

    function removeActiveNav() {
        const activeItem = container.querySelector('.nav-dropdown._active');
        if (activeItem) activeItem.classList.remove('_active');
    }
};

export default navDropdown;
