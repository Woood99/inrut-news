export default class Tooltip {
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
        this.position = options.position ? options.position : 'top';
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

        window.addEventListener('resize', this.updateTooltipsCoords.bind(this));
        window.addEventListener('scroll', this.updateTooltipsCoords.bind(this));
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
                if (element.isOpen) {
                    this.setCoordsElement(element.target, element.el);
                }
            })

            return;
        }
    }

    clicked(e) {
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
        if (this.mode === 'html') {
            const config = {
                target,
                el: null,
                isOpen: true
            };
            this.elements.push(config);
            this.createHTML(target);
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
                if (this.animation) {
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
        document.body.append(config.el);


        const setCoordsConfig = this.getCurrentConfigFromTarget(target, false);
        this.setCoordsElement(setCoordsConfig.target, setCoordsConfig.el);

        this.animations(target);
    }

    clear(config, target) {
        if (!config) return;
        const index = this.getCurrentConfigIndexFromTarget(target);
        config.el.remove();
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
        const mapCoords = {
            top() {
                let top = coords.top - el.offsetHeight - this.gap;
                if (top < 0) top = coords.top + target.offsetHeight + this.gap;
                return top;
            },
            bottom() {
                let bottom = coords.top + target.offsetHeight + this.gap;
                if (window.innerHeight - coords.bottom - el.offsetHeight - this.gap < 0) bottom = coords.top - el.offsetHeight - this.gap;
                return bottom;
            },

            left() {
                let left = coords.left + (target.offsetWidth - el.offsetWidth) / 2;
                if (left < 0) left = this.gap;
                return left;
            }
        };

        el.style.left = `${mapCoords.left.call(this)}px`;
        if (this.position === 'top') {
            el.style.top = `${mapCoords.top.call(this)}px`;
        }
        if (this.position === 'bottom') {
            el.style.top = `${mapCoords.bottom.call(this)}px`;
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