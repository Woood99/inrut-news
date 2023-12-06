const tag = () => {
    const containers = document.querySelectorAll('.tags');

    if (containers.length) {
        containers.forEach(container => {
            const list = container.querySelector('.tags__list');
            const moreBtn = container.querySelector('.tags__btn');
            let items = container.querySelectorAll('.tags__item:not([hidden])');
            if (list && moreBtn && items.length && window.innerWidth > 1180) {
                onlyOneLine();

                function onlyOneLine() {
                    for (let i = 0; i < items.length - 1; i++) {
                        items = container.querySelectorAll('.tags__item:not([hidden])');
                        const firstTag = items[0];
                        const lastTag = items[items.length - 1];
                        const style = getComputedStyle(firstTag);
                        const heightTag = firstTag.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom);
                        const heightList = list.offsetHeight;
                        if (heightList > heightTag) {
                            lastTag.setAttribute('hidden', '');
                        }
                    }
                }
                const btnTextMap = {
                    more: moreBtn.querySelector('span').textContent,
                    none: 'Скрыть теги'
                }
                if (!container.querySelector('.tags__item[hidden]')) moreBtn.remove();
                if (moreBtn) {
                    moreBtn.addEventListener('click', () => {
                        if (container.classList.contains('_active')) {
                            moreBtn.querySelector('span').textContent = btnTextMap.more;
                            container.classList.remove('_active');

                            container.querySelectorAll('.tags__item').forEach(tag => tag.removeAttribute('hidden'));
                            items = container.querySelectorAll('.tags__item:not([hidden])');
                            onlyOneLine();
                        } else {
                            moreBtn.querySelector('span').textContent = btnTextMap.none;
                            container.classList.add('_active');

                            container.querySelectorAll('.tags__item').forEach(tag => tag.removeAttribute('hidden'));
                        }
                    });
                }
            }

            const tags = container.querySelectorAll('.tag');
            tags.forEach(tag => {
                tag.addEventListener('click', () => {
                    if (tag.classList.contains('_no-select')) return;
                    if (tag.closest('._drag')) return;
                    if (!tag.classList.contains('_active')) {
                        tag.classList.add('_active');
                    } else {
                        tag.classList.remove('_active');
                    }
                })
            })
        })
    }
};
export default tag;
