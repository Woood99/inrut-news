const dynamicCircle = () => {
    const circles = document.querySelectorAll('.dynamic-circle');
    circles.forEach(el => {

        const progress = el.querySelector('.progress');
        const valueBlock = el.querySelector('.dynamic-circle__value');
        const radius = progress.getAttribute('r');
        const circleLength = 2 * Math.PI * radius;
        const full = el.dataset.full;
        const value = el.dataset.value;
        const percentageProgress = Math.floor(value / full * 100);
        valueBlock.textContent = el.dataset.percentage ? `${percentageProgress}%` : value;
        progress.setAttribute('stroke-dasharray', circleLength);
        progress.setAttribute('stroke-dashoffset', circleLength - circleLength * percentageProgress / 100);


    });

};

export default dynamicCircle;
