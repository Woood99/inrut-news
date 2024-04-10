const dynamicRow = () => {
    const containers = document.querySelectorAll('.dynamic-row');
    if (containers.length === 0) return;
    containers.forEach(container => {
        const elements = container.querySelectorAll('.dynamic-row__item');
        let maxValueElement = elements[0];
        elements.forEach(element => {
            const currentValue = element.querySelector('.dynamic-row__value').textContent.replace('млн.','').replace('шт.','').trim();
            const elementValue = maxValueElement.querySelector('.dynamic-row__value').textContent.replace('млн.','').replace('шт.','').trim();
            
            if (Number(currentValue) >= Number(elementValue)) {
                maxValueElement = element;
            }
        })
        maxValueElement.querySelector('.dynamic-row__line').style.width = '45%';
        const maxValue = maxValueElement.querySelector('.dynamic-row__value').textContent.replace('млн.','').replace('шт.','').trim();
        elements.forEach(element => {
            if (maxValueElement !== element) {
                const currentValue = element.querySelector('.dynamic-row__value').textContent.replace('млн.','').replace('шт.','').trim();
                element.querySelector('.dynamic-row__line').style.width = `${(currentValue / maxValue * 45)}%`;
            }
        })
    })
};

export default dynamicRow;