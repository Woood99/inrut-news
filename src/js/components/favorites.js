export const favoritesPage = () => {
    const container = document.querySelector('.favorites__tab--client');
    if (container) {
        const client = container.querySelector('[data-favorite-client-select]');
        const selection = container.querySelector('[data-favorite-selection-select]');
        if (client && selection) {
            const select = client.querySelector('.select-secondary');
            if (select) {
                select.addEventListener('change', () => {
                    selection.removeAttribute('hidden');
                })
            }
        }
    }
}

export const favoriteChoicePopup = () => {
    const container = document.querySelector('.favorite-two');
    if (!container) return;

    const myListBtn = container.querySelector('[data-favorite-announcement-btn]');
    const clientBtn = container.querySelector('[data-favorite-client-btn]');

    const announcement = container.querySelector('[data-favorite-announcement-select]');
    const client = container.querySelector('[data-favorite-client-select]');
    const selection = container.querySelector('[data-favorite-selection-select]');
    const selectionTwo = container.querySelector('[data-favorite-selection-select-two]');
    myListBtn.addEventListener('click', () => {
        clientBtn.classList.remove('_active');
        myListBtn.classList.add('_active');

        announcement.removeAttribute('hidden');
        client.setAttribute('hidden', '');
        selection.setAttribute('hidden', '');

        if (announcement.classList.contains('_selected')) {
            selectionTwo.removeAttribute('hidden');
        }
    })
    clientBtn.addEventListener('click', () => {
        myListBtn.classList.remove('_active');
        clientBtn.classList.add('_active');

        announcement.setAttribute('hidden', '');
        selectionTwo.setAttribute('hidden', '');
        client.removeAttribute('hidden');
        if (client.classList.contains('_selected')) {
            selection.removeAttribute('hidden');
        }
    })
    announcement.addEventListener('change', () => {
        if (announcement.classList.contains('_selected')) {
            selectionTwo.removeAttribute('hidden');
        }
    });
}
