const inputCursorEnd = (element, event) => {
    element.addEventListener(event, function () {
        const that = this;
        setTimeout(() => {
            that.selectionStart = that.selectionEnd = 10000;
        }, 0);
    });
};

export default inputCursorEnd;
