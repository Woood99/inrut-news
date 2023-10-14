const furnishingSets = () => {
    const containers = document.querySelectorAll('.furnishing-sets');
    if (!containers) return;
    containers.forEach(container => {
        container.querySelectorAll('.furnishing-sets__item').forEach(item => {
            const btns = item.querySelectorAll('.furnishing-sets__btn');
            const tabs = item.querySelectorAll('.furnishing-sets__tab');
            btns.forEach((btn, indexBtn) => {
                btn.addEventListener('click', () => {
                    btns.forEach(btn => btn.classList.remove('_active'));
                    btn.classList.add('_active');
                    tabs.forEach((tab, indexTab) => {
                        if (indexBtn !== indexTab) {
                            tab.setAttribute('hidden', '')
                        } else {
                            tab.removeAttribute('hidden');
                        }
                    })
                });
            })
        })
    })
};

export default furnishingSets;
