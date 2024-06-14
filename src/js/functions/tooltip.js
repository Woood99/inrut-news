import modal from '../modules/modal';

export const mapCoords = {
    top(coords, el, target) {
        let top = coords.top - el.offsetHeight - this.gap;
        if (top < 0) top = coords.top + target.offsetHeight + this.gap;
        return top;
    },

    bottom(coords, el, target) {
        let bottom = coords.top + target.offsetHeight + this.gap;
        if (window.innerHeight - coords.bottom - el.offsetHeight - this.gap < 0) bottom = coords.top - el.offsetHeight - this.gap;
        return bottom;
    },

    centerY(coords,el,target) {
        let pos = coords.top + (target.offsetHeight / 2) + this.gap;
        return pos;
    },

    left(coords, el, target) {
        let left = coords.left;
        if (window.innerWidth - coords.left - el.offsetWidth - this.gap < 0) left = this.gap;
        return left;
    },

    right(coords, el, target) {
        let right = coords.right - el.offsetWidth - target.offsetWidth - this.gap;
        return right;
    },

    center(coords, el, target) {
        let left = coords.left + (target.offsetWidth - el.offsetWidth) / 2;
        if (left < 0) left = this.gap;
        return left;
    }
};

export class Tooltip {
    constructor(options) {
        this.mode = options.mode ? options.mode : 'default';
        this.gap = options.gap ? options.gap : 0;
        this.event = options.event ? options.event : 'move';
        if (this.mode === 'html') {
            this.elements = [];
            this.targetSelector = options.targetSelector;
            this.elementSelector = options.elementSelector;
            this.animation = options.animation ? options.animation : null;
            if (this.animation) {
                this.animation.speed = this.animation.speed ? this.animation.speed : 0;
            }
        }
        if (this.mode === 'default') {
            this.targetSelector = '[data-tooltip-path]';
            this.elementSelector = '[data-tooltip-target]';
        }
        if (options.positionDocument) {
            this.positionDocument = true;
        } else {
            this.positionY = options.positionY || 'top';
            this.positionX = options.positionX || 'center';
        }

        if (window.innerWidth <= 1212) {
            this.event = 'click';
        }
        this.init();
    }

    init() {
        if (!(this.targetSelector && this.elementSelector)) return;
        if (this.event === 'move') {
            document.addEventListener('mouseover', this.open.bind(this));
            document.addEventListener('mouseout', this.close.bind(this));
        }
        if (this.event === 'click') {
            this.isClick = true;
            document.addEventListener('click', this.clicked.bind(this));
        }

        if (!this.positionDocument) {
            window.addEventListener('resize', this.updateTooltipsCoords.bind(this));
            window.addEventListener('scroll', this.updateTooltipsCoords.bind(this));
        }
    }

    updateTooltipsCoords() {
        if (this.mode === 'default') {
            const items = document.querySelectorAll('[data-tooltip-target]');
            items.forEach(item => {
                if (item.classList.contains('_visible')) {
                    this.setCoordsElement(document.querySelector(`[data-tooltip-path=${item.dataset.tooltipTarget}]`), item);
                }
            })
            return;
        }
        if (this.mode === 'html') {
            if (this.elements.length < 1) return;

            this.elements.forEach(element => {
                if (element.isOpen && !element.target.hasAttribute('data-tooltip-mobile-popup')) {
                    this.setCoordsElement(element.target, element.el);
                }
            })

            return;
        }
    }

    clicked(e) {
        // e.preventDefault();
        if (e.target.closest(`.${this.elementSelector}`)) {
            return;
        }
     
        if (!this.isClick) return;
        this.isClick = false;
        setTimeout(() => {
            this.isClick = true;
        }, this.animation ? this.animation.speed + 1 : 0);
        const target = this.getCurrentTarget(e);
        if (this.mode === 'html') {
            if (!target) {
                this.closeAll();
                return;
            }
            const config = this.getCurrentConfigFromTarget(target, true);
            this.closeAll();
            if (!config) {
                this.open(e);
            } else {
                this.close(e);
            }
            return;
        }
        if (this.mode === 'default') {
            if (!target) {
                this.closeAll();
                return;
            }
            const currentEl = this.getTargetEl(target);
            this.closeAll(currentEl);

            if (!currentEl.classList.contains('_visible')) {
                this.open(e);
            } else {
                this.close(e);
            }
            return;
        }
    }

    open(e) {
        const target = this.getCurrentTarget(e);
        if (!target) return;
        if (target.classList.contains('_prevent')) return;
        if (this.mode === 'html') {
            const config = {
                target,
                el: null,
                isOpen: true
            };
            this.elements.push(config);
            if (config.target.hasAttribute('data-tooltip-mobile-popup') && window.innerWidth <= 1212) {
                this.createPopup(target);
            } else {
                this.createHTML(target);
            }
            if (this.positionDocument) {
                setTimeout(() => {
                    this.close(e);
                }, 3000);
            }
            return;
        }
        if (this.mode === 'default') {
            const targetEl = this.getTargetEl(target);
            if (!targetEl) return;

            targetEl.classList.add('_visible');

            this.setCoordsElement(target, targetEl);
            return;
        }
    }

    close(e) {
        const target = this.getCurrentTarget(e);
        if (!target) return;
        if (this.mode === 'html') {
            const config = this.getCurrentConfigFromTarget(target, true);
            if (!config) return;
            if (this.animation) {
                config.el.style.opacity = 0;
                config.isOpen = false;
                setTimeout(() => {
                    this.clear(config, target);
                }, this.animation.speed);

                return;
            }

            this.clear(config, target);
        }
        if (this.mode === 'default') {
            const pathAttr = target.dataset.tooltipPath;
            const targetEl = document.querySelector(`[data-tooltip-target=${pathAttr}]`);
            if (!targetEl) return;

            targetEl.classList.remove('_visible');

            return;
        }
    }

    closeAll(element = null) {
        if (this.mode === 'html') {
            this.elements.forEach(config => {
                if (this.animation && !config.target.hasAttribute('data-tooltip-mobile-popup')) {
                    config.el.style.opacity = 0;
                    config.isOpen = false;
                    setTimeout(() => {
                        this.clear(config, config.target);
                    }, this.animation.speed);

                    return;
                }

                this.clear(config, config.target);
            })
        }
        if (this.mode === 'default') {
            const items = document.querySelectorAll('[data-tooltip-target]');
            items.forEach(item => {
                if (item !== element) {
                    item.classList.remove('_visible');
                }
            });
        }
    }

    createHTML(target) {
        const html = target.getAttribute(this.targetSelector.replace(/[\[\]']+/g, ''));
        const config = this.getCurrentConfigFromTarget(target, false);
        config.el = document.createElement('div');
        config.el.classList.add(this.elementSelector);
        config.el.innerHTML = html;
        config.el.classList.add(target.dataset.tooltipAddSelector);
        document.body.append(config.el);


        const setCoordsConfig = this.getCurrentConfigFromTarget(target, false);
        this.setCoordsElement(setCoordsConfig.target, setCoordsConfig.el);

        this.animations(target);
    }

    createPopup(target) {
        const html = target.getAttribute(this.targetSelector.replace(/[\[\]']+/g, ''));
        const config = this.getCurrentConfigFromTarget(target, false);

        const modalHTML = `
            <div class="tooltip-modal">
                <div class="tooltip-modal__container">
                    <button class="btn-reset tooltip-modal__close" aria-label="Закрыть модальное окно">
                        <svg>
                            <use xlink:href="./img/sprite.svg#x"></use>
                        </svg>
                        <span>Закрыть</span>
                    </button>
                    <div class="tooltip-modal__content">
                        ${html}
                    </div>
                </div>
            </div>
        `;
        modal(modalHTML, '.tooltip-modal', 300);
    }

    clear(config, target) {
        if (!config) return;
        const index = this.getCurrentConfigIndexFromTarget(target);
        if (config.el) {
            config.el.remove();
        }
        this.elements.splice(index, 1);
    }

    animations(target) {
        if (!this.animation) return;
        const config = this.getCurrentConfigFromTarget(target, false);
        this.animationFade(config);
        this.animationFadeUp(config);
    };

    animationFade(config) {
        if (this.animation.type !== 'fade') return;
        config.el.style.opacity = 0;
        setTimeout(() => {
            config.el.style.transition = `opacity ${this.animation.speed / 1000}s ease-in-out`;
            config.el.style.opacity = 1;
        }, 15);
    }

    animationFadeUp(config) {
        if (this.animation.type !== 'fade-up') return;

        config.el.style.opacity = 0;
        config.el.style.transform = `translateY(${this.animation.transformGap})`;
        setTimeout(() => {
            config.el.style.transition = `opacity ${this.animation.speed / 1000}s ease-in-out, transform ${this.animation.speed / 1000}s ease-in-out`;
            config.el.style.opacity = 1;
            config.el.style.transform = 'translateY(0)';
        }, 15);
    }

    setCoordsElement(target, el) {
        const coords = target.getBoundingClientRect();
        const targetPositionX = target.dataset.tooltipPositionX || this.positionX;
        const targetPositionY = target.dataset.tooltipPositionY || this.positionY;

        if (!this.positionDocument) {
            el.style.left = `${mapCoords[targetPositionX].call(this,coords,el,target)}px`;
            el.style.top = `${mapCoords[targetPositionY].call(this,coords,el,target)}px`;
        }
    }

    getCurrentTarget(e) {
        return e.target.closest(this.targetSelector);
    }

    getCurrentConfigFromTarget(target, isOpen = false) {
        if (isOpen === false) {
            return this.elements.findLast(item => item.target === target);
        } else {
            return this.elements.findLast(item => item.target === target && item.isOpen);
        }
    }

    getCurrentConfigIndexFromTarget(target) {
        return this.elements.findLastIndex(item => item.target === target && item.isOpen === false);
    }

    getTargetEl(target) {
        const pathAttr = target.dataset.tooltipPath;
        return document.querySelector(`[data-tooltip-target=${pathAttr}]`);
    }
}


export class TooltipText {
    constructor(options) {
        if (window.innerWidth <= 1024) {
            return
        }
        this.positionX = options.positionX || 'center';
        this.positionY = options.positionY || 'top';
        this.gap = 10;
        this.elements = [];
        this.init();
    }

    init() {
        document.addEventListener('mouseover', this.openInit.bind(this));
        document.addEventListener('mouseout', this.close.bind(this));
    }

    openInit(e) {
        const target = e.target.closest('[data-tooltip-text]');
        if (!target) return;
        if (target.classList.contains('_tooltip-text-active')) return;

        const arr = target.dataset.tooltipText.split(',');

        const map = {
            target,
            html: arr[0],
            class: arr[1],
            id: Date.now()
        };
        this.open(target, map);
    }

    open(target, map) {
        target.classList.add('_tooltip-text-active');
        const html = `
            <div class="${map.class}" data-tooltip-text-id="${map.id}">
                ${map.html}
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
        map.el = this.getEl(map.id);
        map.target = target;
        this.elements.push(map);
        this.setCoordsElement(map);
        this.animationFade(map);
    }

    close(e) {
        const target = e.target.closest('[data-tooltip-text]');
        if (!target) return;
        if (!target.classList.contains('_tooltip-text-active')) return;
        const map = this.getMap(target);
        target.classList.remove('_tooltip-text-active');
        map.el.remove();
        this.elements = [];
    }

    setCoordsElement(map) {
        const el = this.getEl(map.id);
        const target = map.target;

        const coords = target.getBoundingClientRect();
        const targetPositionX = this.positionX;
        const targetPositionY = this.positionY;
        el.style.left = `${mapCoords[targetPositionX].call(this,coords,el,target)}px`;
        el.style.top = `${mapCoords[targetPositionY].call(this,coords,el,target)}px`;
    }

    getEl(id) {
        return document.querySelector(`[data-tooltip-text-id="${id}"]`)
    }

    getMap(target) {
        return this.elements.findLast(item => item.target === target);
    }

    animationFade(map) {
        map.el.style.opacity = 0;
        setTimeout(() => {
            map.el.style.transition = `opacity 0.25s ease-in-out`;
            map.el.style.opacity = 1;
        }, 15);
    }
}





// const tooltipHtml = new Tooltip({
//     mode: 'html',
//     gap: 10,
//     targetSelector: '[data-tooltip-html]',
//     elementSelector: 'tooltip-html',
//     animation: {
//         type: 'fade-up',
//         speed: 300,
//         transformGap: '10px'
//     },
// });

// const tooltip = new Tooltip({
//     mode: 'default',
//     gap: 10,
//     position: 'top',
// });

/* <button data-tooltip-html="длинный текст с подсказкой">Кнопка 1</button>
<button data-tooltip-path="tooltip1a5f">Кнопка 1</button>

<div class="tooltip" data-tooltip-target="tooltip1a5f">
    Lorem i
</div> */