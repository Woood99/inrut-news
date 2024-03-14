const dynamicRow = () => {
    const containers = document.querySelectorAll('.dynamic-row');
    if (containers.length === 0) return;
    containers.forEach(container => {
        const elements = container.querySelectorAll('.dynamic-row__item');
        let maxValueElement = elements[0];

        elements.forEach(element => {
            const currentValue = element.querySelector('.dynamic-row__value').textContent.replace('млн.','').replace('шт.','').trim();
            const elementValue = maxValueElement.querySelector('.dynamic-row__value').textContent.replace('млн.','').replace('шт.','').trim();
            console.log(Number(currentValue));
            console.log(Number(elementValue));
            if (Number(currentValue) >= Number(elementValue)) {
                maxValueElement = element;
            }
        })
        maxValueElement.querySelector('.dynamic-row__line span').style.width = '100%';
        const maxValue = maxValueElement.querySelector('.dynamic-row__value').textContent.replace('млн.','').replace('шт.','').trim();
        elements.forEach(element => {
            if (maxValueElement !== element) {
                const currentValue = element.querySelector('.dynamic-row__value').textContent.replace('млн.','').replace('шт.','').trim();
                element.querySelector('.dynamic-row__line span').style.width = `${(currentValue / maxValue * 100)}%`;
            }
        })
    })
};

export default dynamicRow;