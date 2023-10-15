const headerFixed = () => {
    const headerFixed = document.querySelector('.header-fixed');
    if (!(headerFixed && window.innerWidth >= 1212)) return;
    const header = document.querySelector('.header');
    const links = headerFixed.querySelectorAll('.header-fixed__item-link');
    const headerHeight = headerFixed.offsetHeight;
    const gap = 100;
    const smallGap = 20;

    toggleActiveClass(window.scrollY);
    glattScroll();
    showHeader(window.scrollY);
    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 1212) return;
        let scrollDistance = window.scrollY;
        toggleActiveClass(scrollDistance);
        showHeader(scrollDistance);
    })

    function toggleActiveClass(scrollDistance) {
        const sections = document.querySelectorAll('.section-observ');
        sections.forEach((section, index) => {
            if (section.offsetTop - headerHeight - gap <= scrollDistance) {
                links.forEach(link => {
                    if (link.classList.contains('_active')) {
                        link.classList.remove('_active');
                    }
                })
                links[index].classList.add('_active');
            }

            if (sections[0].offsetTop - headerHeight - gap >= scrollDistance) {
                links.forEach(link => {
                    if (link.classList.contains('_active')) link.classList.remove('_active');
                })
            }
            if (sections[sections.length - 1].offsetTop + sections[sections.length - 1].offsetHeight - gap - headerHeight <= scrollDistance) {
                links.forEach(link => {
                    if (link.classList.contains('_active')) link.classList.remove('_active');
                })
            }
        });
    }

    function glattScroll() {
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('href').replace('#', '');
                window.scrollTo({
                    top: document.getElementById(sectionId).offsetTop - headerHeight - smallGap,
                    behavior: 'smooth',
                })
            })
        })
    }

    function showHeader(scrollDistance) {
        const filterBlock = document.querySelector('.object-body__filter');
        const layoutsTitle = document.querySelectorAll('.tabs__title')[1];
        const main = document.querySelector('.main');
        if (document.querySelector('.client-fixed__btn') && document.querySelector('.client-fixed__btn').classList.contains('_validate')) {
            headerFixed.classList.remove('_active');
            return;
        }
        if (filterBlock && scrollDistance >= filterBlock.offsetTop - (headerHeight / 2) &&
            scrollDistance <= filterBlock.offsetTop + filterBlock.offsetHeight - headerHeight &&
            layoutsTitle.classList.contains('_tab-active')) {
            headerFixed.classList.remove('_active');
            return;
        }
        if (scrollDistance >= header.offsetHeight + headerHeight + gap) {
            headerFixed.classList.add('_active');
            main.classList.add('_header-fixed');
        } else {
            headerFixed.classList.remove('_active');
            main.classList.remove('_header-fixed');
        }
    }
}

export default headerFixed;
