const inputResize = (input) => {
    if (input.classList.contains('filter-range-one__input--w-auto')) {
        input.style.width = 0;
        input.style.width = input.scrollWidth + 'px';
    }
};

export default inputResize;
