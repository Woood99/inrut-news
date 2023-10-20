import numberReplace from './numberReplace';

const numberToAnim = (element, from, to, prefix = undefined) => {
    let result = from;
    let stap = (to - from) / 80;
    if (to) {
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
            return prefix ? `${numberReplace(String(result))} ${prefix}` : numberReplace(String(result));
        }
    }

}


export default numberToAnim;
