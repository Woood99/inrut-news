import numberReplace from './numberReplace';

const numberToAnim = (element, from, to, stap, duration, prefix = undefined) => {
    let result = from;
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
        }, duration);

        function finalReturn(result) {
            return prefix ? `${numberReplace(String(result))} ${prefix}` : numberReplace(String(result));
        }
    }

}


export default numberToAnim;
