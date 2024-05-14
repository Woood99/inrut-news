class Notifications {
    constructor() {
        this.block = document.querySelector('[data-notifications]');
        if (!this.block) return;

        this.items = this.block.querySelectorAll('[data-notifications-item]');
        this.startTime = 500;

        this.interval = 1000;
        this.hideTime = 5000;

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