import {
    createPopper
} from '@popperjs/core';
import numberReplace from '../modules/numberReplace';
import convertSum from '../modules/convertSum';
const saleDynamic = () => {
    const container = document.querySelector('.sale-dynamic');
    if (!container) return;
    tabs(container);
    popper(container)
    diagramSetHeight(container);
    Chart.register(ChartDataLabels);
    chartLine(container);

    function tabs(container) {
        const btns = container.querySelectorAll('[data-sale-dynamic-tab]');
        const items = container.querySelectorAll('[data-sale-dynamic-content]');
        container.addEventListener('click', (e) => {
            const target = e.target;
            const btn = target.closest('[data-sale-dynamic-tab]');
            if (btn) {
                const currentID = btn.dataset.saleDynamicTab;
                const currentContent = container.querySelector(`[data-sale-dynamic-content="${currentID}"]`);
                btns.forEach(currentBtn => {
                    if (currentBtn === btn) {
                        currentBtn.classList.add('_active');
                    } else {
                        currentBtn.classList.remove('_active')
                    }
                });
                items.forEach(item => {
                    if (item === currentContent) {
                        item.removeAttribute('hidden');
                        setWidthDynamicLine(item);
                    } else {
                        item.setAttribute('hidden', '');
                    }
                })



            }
        })
    }

    function popper(container) {
        const items = container.querySelectorAll('.dynamic-section-item');
        items.forEach(item => {
            let popper;
            item.addEventListener('mouseenter', () => {
                const content = item.querySelector('.dynamic-section-item__tooltip');
                item.classList.add('_active');
                if (content) {
                    popper = createPopper(item, content, {
                        placement: 'auto-start',
                        modifiers: [{
                            name: 'offset',
                            options: {
                                offset: [0, 5]
                            }
                        }]
                    });
                }
            });
            item.addEventListener('mouseleave', () => {
                item.classList.remove('_active');
                if (popper) popper.destroy();
            });
        });
    }

    function diagramSetHeight(container) {
        const items = container.querySelectorAll('.dynamic-section');
        items.forEach(item => {
            const elements = item.querySelectorAll('.dynamic-section-item');
            let maxValueElement = elements[0];
            elements.forEach(element => {
                const currentValue = element.querySelector('[data-diagram-value]').dataset.diagramValue;
                const elementValue = maxValueElement.querySelector('[data-diagram-value]').dataset.diagramValue;
                if (Number(currentValue) >= Number(elementValue)) {
                    maxValueElement = element;
                }
            })
            maxValueElement.querySelector('[data-diagram-value]').style.height = '50%';
            const maxValue = maxValueElement.querySelector('[data-diagram-value]').dataset.diagramValue;
            elements.forEach(element => {
                if (maxValueElement !== element) {
                    const currentValue = element.querySelector('[data-diagram-value]').dataset.diagramValue;
                    element.querySelector('[data-diagram-value]').style.height = `${(currentValue / maxValue * 100) / 2}%`;
                }
            })
        });
    }

    function chartLine(container) {
        const items = container.querySelectorAll('.dynamic-section__svg');
        items.forEach(item => {
            setWidthDynamicLine(item.closest('.sale-dynamic__content'));
            const data = item.dataset.values.split('-');
            const canvas = item.querySelector('.dynamic-section__canvas');
            new Chart(canvas, {
                type: 'line',
                data: {
                    labels: data.map(() => ''),
                    datasets: [{
                        data,
                        borderColor: "#2a6be4",
                        backgroundColor: '#fff',
                        fill: false,
                        lineTension: 0.4
                    }]
                },
                options: {
                    layout: {
                        padding: {
                            left: 32,
                            right: 32,
                            bottom: 0,
                            top: 32,
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                            border: {
                                display: false,
                            }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                display: false,
                                beginAtZero: true
                            },
                            border: {
                                display: false,
                            },
                            grid: {
                                display: false,
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                        datalabels: {
                            align: "top",
                            anchor: "auto",
                            font: {
                                size: 11
                            },
                            formatter: function (value, context) {
                                return convertSum(value);
                            },
                        },
                    },
                },
            });
        })
    }

    function setWidthDynamicLine(container) {
        if (!container) return;
        const svg = container.querySelector('.dynamic-section__svg');
        const list = container.querySelector('.dynamic-section__items');
        if (svg && list) {
            svg.style.width = `${list.scrollWidth}px`;
        }
    }
};

export default saleDynamic;
