import numberReplace from './numberReplace';

const numberToAnim = (element, from, to) => {

    if (isNaN(Number(from))) {
        from = 0;
    }
    let result = +from;
    to = to.replace(/\s/g, '');
    let stap = (to - from) / 80;
    if (!to) return;

    let interval = setInterval(() => {
        if (result >= to) {
            result = to;
            element.textContent = finalReturn(result);
            clearInterval(interval);
        } else {
            result += stap;
            element.textContent = finalReturn(result);
        }
    }, 3);

    function finalReturn(result) {
        return numberReplace(String(result));
    }

}


export default numberToAnim;