const requisites = () => {
    const modal = document.querySelector('.popup-primary--edit-profile-agent');
    const container = document.querySelector('.requisites');
    if (!modal || !container) return;
    const btns = container.querySelectorAll('[data-requisites-btn]');
    const items = container.querySelectorAll('[data-requisites-content]');
    container.addEventListener('click', (e) => {
        const target = e.target;
        const btn = target.closest('[data-requisites-btn]');
        if (btn && !btn.classList.contains('_active')) {
            const name = btn.dataset.requisitesBtn;
            btns.forEach(item => item.classList.remove('_active'));
            items.forEach(item => item.setAttribute('hidden', ''));

            btn.classList.add('_active');

            if (name !== 'individual') {
                const currentItem = container.querySelector(`[data-requisites-content=${name}]`);
                currentItem.removeAttribute('hidden');
                modal.scrollTo({
                    top: currentItem.offsetTop,
                    behavior: "smooth",
                })
            }
            if (name === 'individual') {
                modal.scrollTo({
                    top: modal.offsetHeight,
                    behavior: "smooth",
                })
            }
        }
    })
}

export default requisites;
