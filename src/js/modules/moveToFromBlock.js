const moveToFromBlock = (selectorFrom, selectorTo, screenSizeMax, screenSizeMin, coef = 1) => {
    const block = document.querySelector(selectorFrom);
    const blockTo = document.querySelector(selectorTo);

    if (block && blockTo) {
        const blockParent = block.parentElement;
        update();
        window.addEventListener('scroll', () => {
            update();
        })


        function update() {
            if (window.innerWidth <= screenSizeMax && window.innerWidth > screenSizeMin) {
                let scrollPos = window.scrollY;
                let blockPos = blockParent.offsetTop + (blockParent.clientHeight - block.clientHeight);
                if (blockPos < scrollPos - (block.clientHeight / coef)) {
                    if (!blockTo.querySelector(selectorFrom)) {
                        blockTo.insertAdjacentElement('beforeend', block);
                    }
                } else {
                    if (blockTo.querySelector(selectorFrom)) {
                        blockParent.insertAdjacentElement('beforeend', block);
                    }
                }
            }
        }
    }
}

export default moveToFromBlock;
