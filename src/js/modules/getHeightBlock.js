const getHeightBlock = (selector, nameVariable) => {
    const element = document.querySelector(selector);
    if (element) {
        const elementHeight = element.offsetHeight;
        if (nameVariable) {
            document.querySelector(':root').style.setProperty(nameVariable, `${elementHeight}px`);
        }
        return elementHeight;
    }
}
export default getHeightBlock;


// getHeightBlock('.header', '--header-height');
