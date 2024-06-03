export const controlCards = () => {
    const containers = document.querySelectorAll('.control-cards');
    if (containers.length === 0) return;
    containers.forEach(container => {
        const btns = container.querySelectorAll('.control-cards__btn');
        const content = container.querySelector('.control-cards__content');
        const currentBtn = document.querySelector('.filter-actions__btn._active');
        if (container && content && currentBtn) actionForCards(container, content, currentBtn);
        btns.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => {
                    btns.forEach(el => el.classList.remove('_active'));
                    content.classList.remove('control-cards__content--horizontal', 'control-cards__content--vertical', 'control-cards__content--horizontal-map');
                    actionForCards(container, content, btn);
                });
            }
        })
    })
}

export const actionForCards = (container, content, btn) => {
    const containerWrapper = container.querySelector('.control-cards__container');
    if (checkHorizontal(btn)) {
        content.classList.add('control-cards__content--horizontal');
        container.querySelectorAll('.control-cards__btn--horizontal').forEach(el => el.classList.add('_active'));

        // maps
        if (container.classList.contains('control-cards--maps')) {
            container.classList.add('_map-active');
            document.body.classList.add('_vertical');
            document.body.classList.remove('_horizontal');
            if (containerWrapper) {
                containerWrapper.classList.remove('container');
            }
        }
    }
    if (checkVertical(btn)) {
        content.classList.add('control-cards__content--vertical');
        container.querySelectorAll('.control-cards__btn--vertical').forEach(el => el.classList.add('_active'));
        // maps
        if (container.classList.contains('control-cards--maps')) {
            container.classList.remove('_map-active');

            document.body.classList.remove('_vertical');
            document.body.classList.add('_horizontal');

            if (containerWrapper) {
                containerWrapper.classList.add('container');
            }
        }
    }


    controlCardsCardSecondary(content, btn);
    if (content.querySelectorAll('.card-primary').length >= 1) {
        const cardsPrimary = content.querySelectorAll('.card-primary');

        cardsPrimary.forEach(card => {
            const dislike = card.querySelector('.card-primary__info--dislike');
            const comment = card.querySelector('.card-primary__info--comment');
            const favorite = card.querySelector('.card-primary__info--favorite');
            const note = card.querySelector('.card-primary__info--note');
            const tags = card.querySelector('.card-primary__info--tags');
            const bottom = card.querySelector('.card-primary__bottom');
            if (bottom) {
                const bottomMobile = bottom.querySelector('.card-primary__info--mobile');
                if (bottomMobile) {
                    if (dislike) {
                        if (checkVertical(btn)) {
                            if (!bottomMobile.querySelector('.card-primary__info--dislike')) {
                                const clone = dislike.cloneNode(true);
                                bottomMobile.appendChild(clone);
                            }
                            bottomMobile.querySelector('.card-primary__info--dislike').removeAttribute('hidden');
                        }
                        if (checkHorizontal(btn) && bottomMobile.querySelector('.card-primary__info--dislike')) {
                            bottomMobile.querySelector('.card-primary__info--dislike').setAttribute('hidden', '');
                        }
                    }
                    if (comment) {
                        if (checkVertical(btn)) {
                            if (!bottomMobile.querySelector('.card-primary__info--comment')) {
                                const clone = comment.cloneNode(true);
                                bottomMobile.appendChild(clone);
                            }
                            bottomMobile.querySelector('.card-primary__info--comment').removeAttribute('hidden');
                        }
                        if (checkHorizontal(btn) && bottomMobile.querySelector('.card-primary__info--comment')) {
                            bottomMobile.querySelector('.card-primary__info--comment').setAttribute('hidden', '');
                        }
                    }
                    if (favorite) {
                        if (checkVertical(btn)) {
                            if (!bottomMobile.querySelector('.card-primary__info--favorite')) {
                                if (!favorite.hasAttribute('data-popup-path')) {
                                    const clone = favorite.cloneNode(true);
                                    bottomMobile.appendChild(clone);
                                } else {
                                    bottomMobile.insertAdjacentElement('afterbegin', favorite);
                                }
                            }
                            bottomMobile.querySelector('.card-primary__info--favorite').removeAttribute('hidden');
                        }
                        if (checkHorizontal(btn)) {
                            bottomMobile.querySelector('.card-primary__info--favorite').setAttribute('hidden', '');
                            if (favorite.hasAttribute('data-popup-path')) {
                                card.querySelector('.card-primary__info--btns-right').insertAdjacentElement('afterbegin', favorite);
                                favorite.removeAttribute('hidden');
                            }
                        }
                    }
                    if (note) {
                        if (checkVertical(btn)) {
                            if (!bottomMobile.querySelector('.card-primary__info--note')) {
                                const clone = note.cloneNode(true);
                                bottomMobile.appendChild(clone);
                            }
                            bottomMobile.querySelector('.card-primary__info--note').removeAttribute('hidden');
                        }
                        if (checkHorizontal(btn)) {
                            bottomMobile.querySelector('.card-primary__info--note').setAttribute('hidden', '');
                        }
                    }
                }
                if (checkVertical(btn)) {
                    bottom.classList.add('_vertical-active');
                }
                if (checkHorizontal(btn)) {
                    bottom.classList.remove('_vertical-active');
                }
            }
        })
    }
}


export const controlCardsCardSecondary = (content, btn) => {
    const cardsSecondary = content.querySelectorAll('.card-secondary');
    if (cardsSecondary.length === 0) return;
    if (!btn) return;
    cardsSecondary.forEach(card => {
        const favorite = card.querySelector('.card-secondary__info--favorite');
        const bottom = card.querySelector('.card-secondary__bottom');
        const bottomMobile = bottom.querySelector('.card-secondary__info--mobile');
        const quantity = card.querySelector('.card-secondary__quantity');
        const actions = card.querySelector('.card-secondary__actions');

        const content = card.querySelector('.card-secondary__content');
        const options = card.querySelector('.card-secondary__options');

        const pricesMain = card.querySelector('.card-secondary__prices--1');
        if (favorite && bottomMobile) {
            if (checkVertical(btn)) {
                if (!bottomMobile.querySelector('.card-secondary__info--favorite')) {
                    if (!favorite.hasAttribute('data-popup-path')) {
                        const clone = favorite.cloneNode(true);
                        bottomMobile.appendChild(clone);
                    } else {
                        bottomMobile.insertAdjacentElement('afterbegin', favorite);
                    }
                }
                bottomMobile.querySelector('.card-secondary__info--favorite').removeAttribute('hidden');
            }
            if (checkHorizontal(btn) && bottomMobile.querySelector('.card-secondary__info--favorite')) {
                bottomMobile.querySelector('.card-secondary__info--favorite').setAttribute('hidden', '');
                if (favorite.hasAttribute('data-popup-path')) {
                    card.querySelector('.card-secondary__info--btns-right').insertAdjacentElement('afterbegin', favorite);
                    favorite.removeAttribute('hidden');
                }
            }
        }
        if (btn === 'list' || checkVertical(btn)) {
            bottom.classList.add('_vertical-active');

            if (quantity) {
                const to = card.querySelector('.card-secondary__prices--2');
                if (to) {
                    to.insertAdjacentElement('beforeend', quantity);
                }
            }
            if (pricesMain) {
                pricesMain.removeAttribute('hidden');
            }
            if (options) {
                const to = card.querySelector('.card-secondary__prices--2');
                if (to) {
                    to.insertAdjacentElement('beforeend', options);
                }
            }
            if (actions) {
                content.insertAdjacentElement('beforeend', actions);
            }
        }
        if (btn !== 'list' && checkHorizontal(btn)) {
            bottom.classList.remove('_vertical-active');
            if (quantity) {
                const to = card.querySelector('.card-secondary__prices');
                if (to) {
                    to.setAttribute('hidden', '');
                    to.insertAdjacentElement('beforebegin', quantity);
                }
            }
            if (pricesMain) {
                pricesMain.setAttribute('hidden', '');
            }
            if (options) {
                const to = card.querySelector('[data-top-content] .col');
                if (to) {
                    to.insertAdjacentElement('afterbegin', options);
                }
            }
            if (actions) {
                const to = card.querySelector('[data-top-content]');
                if (to) {
                    to.insertAdjacentElement('beforeend', actions);
                }
            }
        }
    })
}

function checkHorizontal(target) {
    if (target) return target.classList.contains('control-cards__btn--horizontal') || target.classList.contains('filter-actions__map');
}

function checkVertical(target) {
    if (target) return target.classList.contains('control-cards__btn--vertical') || target.classList.contains('filter-actions__list');
}

export const cardSchemeTag = (container) => {
    const cards = container.querySelectorAll('.card-scheme');
    if (cards.length === 0) return;
    const heightTag = 24;
    const tooltipContentHTML = `
    <div class="secondary-tooltip">
        <div class="secondary-tooltip__btn">
            ещё +<span>0</span>
        </div>
        <div class="secondary-tooltip__content">

        </div>
    </div>
    `;
    cards.forEach(card => {
        const tagsContainer = card.querySelector('.card-scheme__tags');
        if (tagsContainer) {
            const tagsItems = card.querySelectorAll('.card-scheme__tags > span');
            const tooltip = card.querySelector('.secondary-tooltip');
            if (tooltip) tooltip.remove();
            let tooltipAvav = false;
            if (tagsItems.length > 0) {
                for (let i = tagsItems.length - 1; i >= 0; i--) {
                    const element = tagsItems[i];
                    if (tagsContainer.offsetHeight > heightTag) {
                        if (tooltipAvav === false) {
                            tagsContainer.insertAdjacentHTML('beforeend', tooltipContentHTML);
                            tooltipAvav = true;
                        }
                        if (tooltipAvav === true) {
                            const tooltip = tagsContainer.querySelector('.secondary-tooltip__content');
                            tooltip.insertAdjacentElement('beforeend', element);
                        }
                    }
                }
                if (tooltipAvav === true) {
                    const tooltip = tagsContainer.querySelector('.secondary-tooltip__content');
                    const count = card.querySelector('.secondary-tooltip__btn > span');
                    const tooltipItemLength = tooltip.querySelectorAll('.secondary-tooltip__content > span').length;
                    count.textContent = tooltipItemLength;
                }
            }
        }
    })
}