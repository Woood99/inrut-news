const bookConsultation = (container) => {
    if (!container) return;
    const modal = container.closest('.popup-primary--book-consultation');
    const form = container.querySelector('.book-consultation__form');
    const agentToggle = container.querySelector('.toggle-checkbox input');
    const agentsContainer = container.querySelector('.book-consultation__agents');
    const agentsList = container.querySelectorAll('.card-agent');
    const button = container.querySelector('.book-consultation__btn');
    const navArrows = container.querySelectorAll('.book-consultation__nav .nav-arrow-secondary');
    agentToggle.addEventListener('input', () => {
        if (agentToggle.checked) {
            agentsContainer.classList.add('_active');
            movingButton();
            modal.scrollTo({
                top: modal.scrollHeight,
                behavior: "smooth",
            });
            navArrows.forEach(arrow => arrow.classList.remove('_disabled'));
        } else {
            agentsContainer.classList.remove('_active');
            movingButtonDefault();
            modal.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            navArrows.forEach(arrow => arrow.classList.add('_disabled'));
        }
    })
    agentsList.forEach(currentAgent => {
        currentAgent.addEventListener('input', () => {
            agentsList.forEach(agent => agent.classList.remove('_active'));
            currentAgent.classList.add('_active');
        });
    })

    function movingButton() {
        form.insertAdjacentElement('beforeend', button);
        button.classList.add('_moving');
    }

    function movingButtonDefault() {
        container.querySelector('.book-consultation__screen-demonstration').insertAdjacentElement('afterend', button);
        button.classList.remove('_moving');
    }
};

export default bookConsultation;
