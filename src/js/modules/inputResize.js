const inputResize = (input) => {
    if (input.classList.contains('_width-auto')) {
        input.style.width = 0;
        input.style.width = input.scrollWidth + 'px';
    }
};

export default inputResize;
