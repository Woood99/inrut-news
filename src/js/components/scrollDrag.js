const scrollDrag = (blockSelector, speed, viewportWidth) => {

    let scrollBlock = typeof blockSelector === 'string' ? document.querySelector(blockSelector) : blockSelector;
    if (!scrollBlock) return;
    let left = scrollBlock.scrollLeft;
    let drag = false;
    let coorX = 0;

    scrollBlock.addEventListener('mousedown', function (e) {
        if (viewportWidth === true || checkViewport()) {
            drag = true;
            coorX = e.pageX - this.offsetLeft;
        }
    });
    document.addEventListener('mouseup', function () {
        if (viewportWidth === true || checkViewport()) {
            drag = false;
            left = scrollBlock.scrollLeft;
        }
    });
    scrollBlock.addEventListener('mousemove', function (e) {
        if (viewportWidth === true || checkViewport()) {
            if (drag) {
                scrollBlock.classList.add('_drag');
                this.scrollLeft = left - (e.pageX - this.offsetLeft - coorX) * (speed / 1000);
            } else {
                scrollBlock.classList.remove('_drag');
            }
        }
    });


    function checkViewport() {
        return window.innerWidth <= viewportWidth ? true : false;
    }
};

export default scrollDrag;
