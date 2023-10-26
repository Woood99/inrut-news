"use strict";

const dragDrops = () => {
    const containers = document.querySelectorAll('.drag-drop');
    if (!containers.length) return;
    containers.forEach(container => {
        let dragSrcEl;

        function dragStart(e) {
            this.classList.add('_dragg');
            dragSrcEl = this;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.innerHTML);
        };

        function dragEnter(e) {
            this.classList.add('_over');
        }

        function dragLeave(e) {
            e.stopPropagation();
            this.classList.remove('_over');
        }

        function dragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            return false;
        }

        function dragDrop(e) {
            if (dragSrcEl != this) {
                dragSrcEl.innerHTML = this.innerHTML;
                this.innerHTML = e.dataTransfer.getData('text/html');
                dragEnd();
            }
            return false;
        }

        function dragEnd() {
            container.querySelectorAll('.drag-drop__item').forEach(item => {
                item.classList.remove('_over');
                item.classList.remove('_dragg');
            });
        }

        function addEventsDragAndDrop(el) {
            el.addEventListener('dragstart', dragStart, false);
            el.addEventListener('dragenter', dragEnter, false);
            el.addEventListener('dragover', dragOver, false);
            el.addEventListener('dragleave', dragLeave, false);
            el.addEventListener('drop', dragDrop, false);
            el.addEventListener('dragend', dragEnd, false);
        }

        const listItens = container.querySelectorAll('.drag-drop__item');
        [].forEach.call(listItens, function (item) {
            addEventsDragAndDrop(item);
        });

    });
};

export default dragDrops;
