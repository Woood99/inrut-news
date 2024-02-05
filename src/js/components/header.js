const header = () => {
    const headerFixed = document.querySelector('.header-fixed');
    const header = document.querySelector('.header');
    if (headerFixed || !header || window.innerWidth <= 1212) return;
    const main = document.querySelector('.main');
    main.style.paddingTop = '105px';
    header.classList.add('header--fixed');
    let lastScroll = 0;

    function scrollPosition() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }

    function containActive() {
        return header.classList.contains('_active');
    }
    body();
    setTimeout(() => {
        updateDynamicHeader();
    }, 25);
    window.addEventListener('scroll', () => {
        body();
        if (scrollPosition() > 105) {
            header.classList.add('_hide-top');
        } else {
            header.classList.remove('_hide-top');
        }


        updateDynamicHeader();
    })

    function body() {
        if (header.classList.contains('header--menu-active')) return;
        if (scrollPosition() > lastScroll && !containActive() && scrollPosition() > 200) {
            header.classList.add('_active');
        } else if (scrollPosition() < lastScroll && containActive()) {
            header.classList.remove('_active');
        }
        lastScroll = scrollPosition();
    }


    function updateDynamicHeader() {
        if (header.classList.contains('_hide-top') && !header.classList.contains('_active')) {
            document.querySelector(':root').style.setProperty('--dynamic-header-height', `${header.querySelector('.header-main').clientHeight}px`);
        } else {
            document.querySelector(':root').style.setProperty('--dynamic-header-height', '0px');
        }
    }
};

export default header;
