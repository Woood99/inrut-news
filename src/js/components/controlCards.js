export const controlCards = () => {
    const containers = document.querySelectorAll('.control-cards');
    if (containers.length === 0) return;
    containers.forEach(container => {
        const btns = container.querySelectorAll('.control-cards__btn');
        const content = container.querySelector('.control-cards__content');
        const currentBtn = container.querySelector('.control-cards__btn._active');
        if (container && content && currentBtn) actionForCards(container, content, currentBtn);
        btns.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => {
                    btns.forEach(el => el.classList.remove('_active'));
                    content.classList.remove('control-cards__content--horizontal', 'control-cards__content--vertical','control-cards__content--horizontal-map');
                    actionForCards(container, content, btn);
                });
            }
        })

    })
}

export const actionForCards = (container, content, btn) => {
    if (checkHorizontal(btn)) {
        content.classList.add('control-cards__content--horizontal');
        container.querySelectorAll('.control-cards__btn--horizontal').forEach(el => el.classList.add('_active'));

        // maps
        if (container.classList.contains('control-cards--maps')) {
            container.classList.add('_map-active');
        }
    }
    if (checkVertical(btn)) {
        content.classList.add('control-cards__content--vertical');
        container.querySelectorAll('.control-cards__btn--vertical').forEach(el => el.classList.add('_active'));

        // maps
        if (container.classList.contains('control-cards--maps')) {
            container.classList.remove('_map-active');
        }
    }



    controlCardsCardSecondary(content,btn);
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


export const controlCardsCardSecondary = (content,btn) => {
    if (content.querySelectorAll('.card-secondary').length >= 1) {
        const cardsSecondary = content.querySelectorAll('.card-secondary');

        cardsSecondary.forEach(card => {
            const favorite = card.querySelector('.card-secondary__info--favorite');
            const bottom = card.querySelector('.card-secondary__bottom');
            const bottomMobile = bottom.querySelector('.card-secondary__info--mobile')
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

            if (checkVertical(btn)) {
                bottom.classList.add('_vertical-active');
            }
            if (checkHorizontal(btn)) {
                bottom.classList.remove('_vertical-active');
            }
        })
    }
}

function checkHorizontal(target) {
    if (target) return target.classList.contains('control-cards__btn--horizontal');
}

function checkVertical(target) {
    if (target) return target.classList.contains('control-cards__btn--vertical');
}
