const documentsBlock = () => {
    const containers = document.querySelectorAll('.documents-block');
    containers.forEach(container => {
        container.addEventListener('click', (e) => {
            const target = e.target;
            const tag = target.closest('[data-document-tag]');
            if (tag) {
                clearTagsAndCards(container);
                tag.classList.add('_active');
                const currentID = tag.dataset.documentTag.trim();
                visibleCards(container,currentID);
            }
        })
    })

    function clearTagsAndCards(container) {
        const tags = container.querySelectorAll('[data-document-tag]');
        const cards = container.querySelectorAll('[data-document-card]');
        tags.forEach(tag => tag.classList.remove('_active'));
        cards.forEach(card => card.setAttribute('hidden', ''));
    }
    function visibleCards(container,currentID) {
        const cards = container.querySelectorAll('[data-document-card]');
        if (currentID === 'all'){
            cards.forEach(card => card.removeAttribute('hidden'));
            return;
        }
        const currentCards = Array.from(cards).filter(card => card.dataset.documentCard.trim() === currentID);
        currentCards.forEach(card => card.removeAttribute('hidden'));
    }
};

export default documentsBlock;
