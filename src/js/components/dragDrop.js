const dragDrop = () => {
    const containers = document.querySelectorAll('.drag-drop');
    if (!containers.length) return;
    containers.forEach(tasksListElement => {
        const taskElements = tasksListElement.querySelectorAll(`.drag-drop__item`);
        
        for (const task of taskElements) {
          task.draggable = true;
        }
        
        tasksListElement.addEventListener(`dragstart`, (evt) => {
            const item = evt.target.closest('.drag-drop__item');
            if (item) item.classList.add(`selected`);
        });
        
        tasksListElement.addEventListener(`dragend`, (evt) => {
            const item = evt.target.closest('.drag-drop__item');
            if (item) item.classList.remove(`selected`);
        });
        
        const getNextElement = (cursorPosition, currentElement) => {
          const currentElementCoord = currentElement.getBoundingClientRect();
          const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
          
          const nextElement = (cursorPosition < currentElementCenter) ?
            currentElement :
            currentElement.nextElementSibling;
          
          return nextElement;
        };
        
        tasksListElement.addEventListener(`dragover`, (evt) => {
          evt.preventDefault();
          
          const activeElement = tasksListElement.querySelector(`.selected`);
          const currentElement = evt.target;
          const isMoveable = activeElement !== currentElement &&
            currentElement.classList.contains(`drag-drop__item`);
            
          if (!isMoveable) {
            return;
          }
          
          const nextElement = getNextElement(evt.clientY, currentElement);
          
          if (
            nextElement && 
            activeElement === nextElement.previousElementSibling ||
            activeElement === nextElement
          ) {
            return;
          }
                
            tasksListElement.insertBefore(activeElement, nextElement);
        });

    });
};

export default dragDrop;
