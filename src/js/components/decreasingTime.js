const decreasingTime = () => {
    const containers = document.querySelectorAll('[data-decreasing-time]');
    if (containers.length === 0) return;
    containers.forEach(container => {
        init(container);
    });

    function init(container) {
        const start = container.dataset.decreasingTimeStart;
    }
};
