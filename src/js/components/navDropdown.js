const navDropdown = () => {
    const target = document.querySelector('.header-main__menu');
    const container = document.querySelector('.nav');
    if (!(target && container)) return;
    const body = document.body;
    const targetDefaultHTML = target.innerHTML;
    const targetActiveHTML = `
    <svg width="24" height="24" viewBox="-4 -4 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg"><path xmlns="http://www.w3.org/2000/svg" d="M9.41429 7.99997L15.0718 2.34244L13.6576 0.928223L8.00008 6.58576L2.3439 0.929582L0.929688 2.3438L6.58586 7.99997L0.929688 13.6561L2.3439 15.0704L8.00008 9.41418L13.6576 15.0717L15.0718 13.6575L9.41429 7.99997Z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    <span>Меню</span>
    `;
    setFirstItem();
    target.addEventListener('click', () => {
        target.classList.contains('_active') ? closeMenu() : openMenu();
    })
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.closest('.header') && body.classList.contains('_nav-active-mask')) {
            closeMenu();
        }
    })
    const targetItems = container.querySelectorAll('.nav-menu__item._dropdown');
    targetItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (window.innerWidth <= 1212) return;
            removeActiveNav();
            setActiveItem(item);
        })
    })

    function removeActiveNav() {
        container.querySelectorAll('.nav-content__body._active').forEach(item => item.classList.remove('_active'));
        const activeItem = container.querySelector('.nav-menu__item._dropdown._active');
        if (activeItem) {
            activeItem.classList.remove('_active');
        }
    }

    function setActiveItem(item) {
        item.classList.add('_active');
        const currentID = item.dataset.navDropdownTarget;
        container.querySelector(`[data-nav-dropdown-content='${currentID}']`).classList.add('_active');
    }

    function setFirstItem() {
        const firstTarget = container.querySelector('.nav-menu__item._dropdown');
        const firstTargetID = firstTarget.dataset.navDropdownTarget;
        const currentContentItem = container.querySelector(`[data-nav-dropdown-content='${firstTargetID}']`);
        firstTarget.classList.add('_active');
        currentContentItem.classList.add('_active');
    }


    function openMenu() {
        target.classList.add('_active');
        target.innerHTML = targetActiveHTML;
        container.classList.add('_active-menu');
        body.classList.add('_nav-active-mask');
    }

    function closeMenu() {
        target.classList.remove('_active');
        target.innerHTML = targetDefaultHTML;
        container.classList.remove('_active-menu');
        body.classList.remove('_nav-active-mask')
    }
};

export default navDropdown;
