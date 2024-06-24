import debounce from "../functions/debounce";

export class tagsInHeight {
    constructor(el) {
        this.container = el;
        if (!this.container) return;
        this.maxHeight = el.dataset.tagsInHeight;
        this.itemsAdd = [];
        this.itemsHTML = [];
        this.init();
        this.container.tagsInHeight = this;
    }

    init() {
        this.items = Array.from(this.container.querySelectorAll('[data-tags-in-height-item]'));
        if (this.items.length === 0) return;


        this.body();
        this.container.tagsInHeight = this;

        window.addEventListener('resize', debounce(this.body.bind(this), 500));
    }

    body() {
        if (this.items.length === 0) return;

        this.items.forEach(item => item.removeAttribute('hidden'));
        this.itemsAdd = [];
        this.deleteMorebtn();


        for (let i = this.items.length - 1; i >= 0; i--) {
            const element = this.items[i];
            this.container.insertAdjacentHTML('beforeend', `
            <button type="button" class="btn btn-reset tag tag--very-small _no-hover" data-tags-in-height-more data-tooltip-mobile-popup data-tooltip-position-y="top" data-tooltip-add-selector="max-w-320" data-tooltip-html='
                <div class="tw-flex tw-items-center tw-flex-wrap tw-gap-[6px]">
                       
                </div>
                '>
                    <span>ещё +0</span>
            </button>
            `);

            if (this.container.clientHeight > this.maxHeight) {
                this.itemsAdd.push(element.innerHTML.trim());
                element.setAttribute('hidden', '');
            }
            this.deleteMorebtn();
        }
        if (this.itemsAdd.length === 0) return;
        const itemsAddHTML = this.itemsAdd.map(item => {
            return `<div class="tag tag--white tag--very-small _no-hover tw-gap-2">${item}</div>`;
        });

        const html = `
        <button type="button" class="btn btn-reset tag tag--very-small _no-hover" data-tags-in-height-more data-tooltip-mobile-popup data-tooltip-position-y="top" data-tooltip-add-selector="max-w-320" data-tooltip-html='
            <div class="tw-flex tw-items-center tw-flex-wrap tw-gap-[6px]">
                    ${itemsAddHTML.join('')}
            </div>
            '>
                <span>ещё +${this.itemsAdd.length}</span>
        </button>
       `;

        this.container.insertAdjacentHTML('beforeend', html);
    }

    deleteMorebtn() {
        const moreBtn = this.container.querySelector('[data-tags-in-height-more]');
        if (moreBtn) moreBtn.remove();
    }

    update() {
        this.body();
    }
}

export class tagsInCount {
    constructor(el) {
        this.container = el;
        if (!this.container) return;
        this.maxCount = el.dataset.tagsInCount;

        this.itemsAdd = [];
        this.itemsHTML = [];
        this.init();
    }

    init() {
        this.items = Array.from(this.container.querySelectorAll('[data-tags-in-count-item]'));
        if (this.items.length === 0) return;

        this.body();

        this.container.tagsInCount = this;
    }

    body() {
        if (this.items.length === 0) return;

        this.itemsAdd = this.items.reduce((acc, item,index) => {
            if (index + 1 > this.maxCount) {
                acc.push(item);
            }
            return acc;
        }, [])

        if (this.itemsAdd.length === 0) return;

        const itemsAddHTML = this.itemsAdd.map(item => {
            return `<div class="tag tag--white tag--very-small _no-hover tw-gap-2">${item.innerHTML}</div>`;
        });

        const html = `
        <button type="button" class="btn btn-reset tag tag--very-small _no-hover" data-tags-in-height-more data-tooltip-mobile-popup data-tooltip-position-y="top" data-tooltip-add-selector="max-w-320" data-tooltip-html='
            <div class="tw-flex tw-items-center tw-flex-wrap tw-gap-[6px]">
                    ${itemsAddHTML.join('')}
            </div>
            '>
                <span>ещё +${this.itemsAdd.length}</span>
        </button>
       `;

        this.container.insertAdjacentHTML('beforeend', html);
        this.itemsAdd.forEach(item => item.remove());
    }
}