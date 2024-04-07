const floorTable = () => {
    const table = document.querySelector('.floor-table');
    if (!table) return;
    let tableItemsHidden = [];
    table.addEventListener('click', (e) => {
        const target = e.target;

        const sortFloor = target.closest('.floor-table__sort-floor');
        const morebtn = target.closest('.floor-table__more');

        if (sortFloor) {
            sortFloor.classList.toggle('_active');
            if (sortFloor.classList.contains('_active')) {
                sortFieldsFloor('up');
            } else {
                sortFieldsFloor('down');
            }
        }

        if (morebtn) {
            morebtn.classList.toggle('_active');

            if (morebtn.classList.contains('_active')) {
                morebtn.querySelector('span').textContent = 'Скрыть';
                saveHiddenItems();
                visibleAllItems();
            } else {
                morebtn.querySelector('span').textContent = 'Показать полностью';
                hiddenItems();
            }
            scrollTo();
        }
    })

    function sortFieldsFloor(status) {
        const list = table.querySelector('.floor-table__list');
        const fields = Array.from(list.querySelectorAll('.floor-table__item'));
        let sortedFields;
        if (status === 'up') {
            sortedFields = fields.sort((a, b) => getFloor(b) - getFloor(a));
        }
        if (status === 'down') {
            sortedFields = fields.sort((a, b) => getFloor(a) - getFloor(b));
        }

        function getFloor(item) {
            return item.querySelector('.floor-table__item-floor').textContent.trim().replace(/\D/g, '');
        }
        list.append(...sortedFields);
    }

    function saveHiddenItems() {
        tableItemsHidden.splice(0, tableItemsHidden.length);
        tableItemsHidden = Array.from(table.querySelectorAll('.floor-table__item')).filter(item => item.hasAttribute('hidden'));
    }

    function visibleAllItems() {
        tableItemsHidden.forEach(item => item.removeAttribute('hidden'));
    }

    function hiddenItems() {
        tableItemsHidden.forEach(item => item.setAttribute('hidden', ''));
    }

    function scrollTo() {
        const apartmentography = table.closest('.apartmentography');
        if (apartmentography) {
            const topGap = window.pageYOffset + apartmentography.getBoundingClientRect().top;
            const headerFixed = document.querySelector('.header-fixed');
            window.scrollTo({
                top: headerFixed && headerFixed.classList.contains('_active') ?  topGap - headerFixed.offsetHeight - 16 : topGap - 16,
                behavior: 'smooth'
            })
        }
    }
};

export default floorTable;
