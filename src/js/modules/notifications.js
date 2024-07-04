import { mapCoords } from "../functions/tooltip";

export class Notifications {
    constructor(container) {
        this.block = container;
        if (!this.block) return;

        this.blockValue = this.block.dataset.notifications;
        if (this.blockValue !== '') {
            if (this.blockValue === 'desktop' && window.innerWidth <= 1212) return;
            if (this.blockValue === 'mobile' && window.innerWidth > 1212) return;
        }

        this.items = this.block.querySelectorAll('[data-notifications-item]');
        this.startTime = 350;

        this.interval = 500;
        this.hideTime = this.block.dataset.notificationsHideTime || 4000;
        this.initial = false;

        this.positionTarget = this.block.hasAttribute('data-notifications-position') ? document.querySelector(this.block.dataset.notificationsPosition) : null;

        this.init();

        this.block.addEventListener('click', (e) => {
            const itemClose = e.target.closest('[data-notifications-close]');
            if (!itemClose) return;
            const item = itemClose.closest('[data-notifications-item]');
            if (!item) return;
            this.hide(item, 0);
        })
        
        document.addEventListener('click',(e) => {
            const target = e.target;
            if (target.closest('button') && this.initial) {
              this.block.setAttribute('hidden','');
            }
        })
    }

    init() {
        setTimeout(() => {
            this.initial = true;
            for (let count = 0; count < this.items.length; count++) {
                setTimeout(() => {
                    this.show(this.items[count]);
                    let status = false;
                    window.addEventListener('scroll',() => {
                        if (status === false) {
                            status = true;
                            this.items[count].classList.remove('_visible');
                            this.items[count].setAttribute('hidden', '');
                        }
                    })
                }, this.interval * count);
            }

        }, this.startTime);
    }

    show(item) {
        item.removeAttribute('hidden');
        setTimeout(() => {
            item.classList.add('_visible');
            if (this.positionTarget) {
                this.gap = 16;
                this.setCoordsElement(this.positionTarget, item);
            }
            this.hide(item);
        }, 300);
    }

    hide(item, hideTime = this.hideTime) {
        setTimeout(() => {
            if (item) {
                item.classList.remove('_visible');
                item.setAttribute('hidden', '');
            }
        }, hideTime);
    }

    setCoordsElement(target, el) {
        const coords = target.getBoundingClientRect();
        const targetPositionX = this.block.dataset.tooltipPositionX || 'right';
        const targetPositionY = this.block.dataset.tooltipPositionY || 'centerY';

        this.block.style.left = `${mapCoords[targetPositionX].call(this,coords,this.block,target)}px`;
        this.block.style.top = `${mapCoords[targetPositionY].call(this,coords,this.block,target)}px`;
    }
}

export default Notifications;