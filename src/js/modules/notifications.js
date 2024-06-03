import { mapCoords } from "../functions/tooltip";

class Notifications {
    constructor(container) {
        this.block = container;
        if (!this.block) return;

        this.blockValue = this.block.dataset.notifications;

        if (this.blockValue === 'desktop' && window.innerWidth <= 1212) return;
        if (this.blockValue === 'mobile' && window.innerWidth > 1212) return;

        this.items = this.block.querySelectorAll('[data-notifications-item]');
        this.startTime = 350;

        this.interval = 500;
        this.hideTime = this.block.dataset.notificationsHideTime || 4000;

        this.positionTarget = this.block.hasAttribute('data-notifications-position') ? document.querySelector(this.block.dataset.notificationsPosition) : null;

        this.init();

        this.block.addEventListener('click', (e) => {
            const itemClose = e.target.closest('[data-notifications-close]');
            if (!itemClose) return;
            const item = itemClose.closest('[data-notifications-item]');
            if (!item) return;
            this.hide(item, 0);
        })
    }

    init() {
        setTimeout(() => {
            for (let count = 0; count < this.items.length; count++) {
                setTimeout(() => {
                    this.show(this.items[count]);
                }, this.interval * count);
            }

        }, this.startTime);
    }

    show(item) {
        item.removeAttribute('hidden');
        setTimeout(() => {
            item.classList.add('_visible');
            if (this.positionTarget) {
                // this.gap = 16;
                // this.setCoordsElement(this.positionTarget, item);
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
        const targetPositionX = 'left';
        const targetPositionY = 'top';

        this.block.style.left = `${mapCoords[targetPositionX].call(this,coords,this.block,target)}px`;
        this.block.style.top = `${mapCoords[targetPositionY].call(this,coords,this.block,target)}px`;
    }
}

export default Notifications;