export const _slideUp = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding, opacity';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = `${target.offsetHeight}px`;
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.opacity = 0;
        target.style.height = showmore ? `${showmore}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = !showmore ? true : false;
            !showmore ? target.style.removeProperty('height') : null;
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('opacity');
            !showmore ? target.style.removeProperty('overflow') : null;
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');

            document.dispatchEvent(new CustomEvent("slideUpDone", {
                detail: {
                    target: target
                }
            }));
        }, duration);
    }
}
export const _slideDown = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.hidden = target.hidden ? false : null;
        showmore ? target.style.removeProperty('height') : null;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.opacity = 0;
        target.style.height = showmore ? `${showmore}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding, opacity";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('opacity');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');

            document.dispatchEvent(new CustomEvent("slideDownDone", {
                detail: {
                    target: target
                }
            }));
        }, duration);
    }
}
export const _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
}



export const _displayFadeUp = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'opacity';
        target.style.transitionDuration = duration + 'ms';
        target.style.opacity = 1;
        setTimeout(() => {
            target.style.opacity = 0;
        }, 0);
        setTimeout(() => {
            target.hidden = !showmore ? true : false;
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.style.removeProperty('opacity');
            target.classList.remove('_slide');
        }, duration);
    }
};

export const _displayFadeDown = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.hidden = target.hidden ? false : null;
        target.style.transitionProperty = 'opacity';
        target.style.transitionDuration = duration + 'ms';
        target.style.opacity = 0;
        setTimeout(() => {
            target.style.opacity = 1;
        }, 0);
        setTimeout(() => {
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.style.removeProperty('opacity');
            target.classList.remove('_slide');
        }, duration);
    }
};

export const _displayFadeToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _displayFadeDown(target, duration);
    } else {
        return _displayFadeUp(target, duration);
    }
}