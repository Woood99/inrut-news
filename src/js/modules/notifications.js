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
        this.hideTime = 4000;

        this.init();

        this.block.addEventListener('click',(e) => {
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
}

export default Notifications;