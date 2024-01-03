const shorts = () => {
    const container = document.querySelector('.shorts');
    if (!container) return;
    const list = container.querySelector('.shorts__list');
    const prevBtn = container.querySelector('.shorts__prev');
    const nextBtn = container.querySelector('.shorts__next');
    const heightShort = container.querySelector('.shorts__item').offsetHeight;
    setIndex();

    nextBtn.addEventListener('click', () => {
        list.scrollTo({
            top: list.scrollTop + heightShort + 17,
            behavior: 'smooth'
        })
    })
    prevBtn.addEventListener('click', () => {
        list.scrollTo({
            top: list.scrollTop - heightShort - 17,
            behavior: 'smooth'
        })
    })


    function setIndex() {
        const shorts = list.querySelectorAll('.short');
        shorts.forEach((item, index) => {
            item.setAttribute('data-short-index', index);
        })
    }
};

export default shorts;
