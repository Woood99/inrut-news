const floorTable = () => {
    const table = document.querySelector('.floor-table');
    if (!table) return;
    const sortFloor = table.querySelector('.floor-table__sort-floor');
    sortFloor.addEventListener('click', () => {
        sortFloor.classList.toggle('_active');
        if (sortFloor.classList.contains('_active')) {
            sortFieldsFloor('up');
        } else {
            sortFieldsFloor('down');
        }
    });

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
};

export default floorTable;
