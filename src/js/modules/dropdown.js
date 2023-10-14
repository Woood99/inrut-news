const dropdown = (containerSelector, targetSelector) => {
    const container = document.querySelectorAll(containerSelector);
    container.forEach(el => {
        const target = el.querySelector(targetSelector);
        const chatItem = el.closest('.chat__item');
        if (!el.classList.contains('_hover')) {
            target.addEventListener('click', (e) => {
                e.preventDefault();
                container.forEach(el => {
                    if (e.target.closest(containerSelector) !== el) {
                        el.classList.remove('_active');
                        if (el.closest('.chat__item')) {
                            el.closest('.chat__item').classList.remove('_dropdown-active');
                        }
                    }
                });
                el.classList.toggle('_active');

                if (chatItem) {
                    chatItem.classList.toggle('_dropdown-active');
                }
            });
        } else {
            target.addEventListener('click', (e) => {
                if (window.innerWidth <= 1212) {
                    e.preventDefault();
                    container.forEach(el => {
                        if (e.target.closest(containerSelector) !== el) {
                            el.classList.remove('_active');
                        }
                    });
                    el.classList.toggle('_active');
                }
            });
        }
        document.addEventListener('click', (e) => {
            if (!e.target.closest(containerSelector)) {
                if (el.classList.contains('_active')) el.classList.remove('_active');
                if (chatItem && chatItem.classList.contains('_dropdown-active')) {
                    chatItem.classList.remove('_dropdown-active');
                }
            }
        })
    });
}

export default dropdown;
