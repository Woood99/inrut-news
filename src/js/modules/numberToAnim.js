const numberToAnim = (element,from,to,duration) => {
    const start = new Date().getTime();
    setTimeout(function () {
        var now = (new Date().getTime()) - start;
        var progress = now / duration;
        var result = Math.floor((to - from) * progress + from);
        element.textContent = progress < 1 ? result : to;
        if (progress < 1) setTimeout(arguments.callee, 10);
    }, 10);
};

 export default numberToAnim;
