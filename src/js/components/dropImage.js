import {
    currentDragDrop
} from "./dragDrop";


export const dropImage = () => {
    const photoLoad = document.querySelectorAll('.photo-load');
    if (photoLoad.length === 0) return;

    photoLoad.forEach(container => toggleLoadedClass(container));
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        photoLoad.forEach(photo => {
            const input = photo.querySelector('[data-upload-drop]');
            if (input) {
                input.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                });
            }
        })
    });
    ['dragenter', 'dragover'].forEach(eventName => {
        photoLoad.forEach(photo => {
            const input = photo.querySelector('[data-upload-drop]');
            if (input) {
                input.addEventListener(eventName, () => {
                    photo.classList.add('_active');
                });
            }
        })
    });
    ['dragleave', 'drop'].forEach(eventName => {
        photoLoad.forEach(photo => {
            const input = photo.querySelector('[data-upload-drop]');
            if (input) {
                input.addEventListener(eventName, () => {
                    photo.classList.remove('_active');
                });
            }
        })
    })

    photoLoad.forEach(photo => {
        const input = photo.querySelector('[data-upload-drop]');
        if (input) {
            input.addEventListener('change', (e) => inputChange(input, e))
        }
    });
    photoLoad.forEach(photo => {
        const input = photo.querySelector('[data-upload-drop]');
        if (input) {
            input.addEventListener('drop', (e) => inputChange(input, e))
        }
    });
};

export const currentDropImage = (container) => {
    if (!container) return;
    toggleLoadedClass(container);

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        const input = container.querySelector('[data-upload-drop]');
        if (input) {
            input.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        }
    });
    ['dragenter', 'dragover'].forEach(eventName => {
        const input = container.querySelector('[data-upload-drop]');
        if (input) {
            input.addEventListener(eventName, () => {
                container.classList.add('_active');
            });
        }
    });
    ['dragleave', 'drop'].forEach(eventName => {
        const input = container.querySelector('[data-upload-drop]');
        if (input) {
            input.addEventListener(eventName, () => {
                container.classList.remove('_active');
            });
        }
    })


    const input = container.querySelector('[data-upload-drop]');
    if (input) {
        input.addEventListener('change', (e) => inputChange(input, e))
        input.addEventListener('drop', (e) => inputChange(input, e))
    }
};

document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.place-sale-photo__remove')) {
        e.preventDefault();
        deleteTarget(target);
    }
})

function deleteTarget(target) {
    const currentImg = target.closest('.place-sale-photo__image');
    const container = target.closest('.photo-load');
    const input = container.querySelector('[data-upload-drop]');
    currentImg.remove();

    // тестовое удаление файла из input
    input.value = '';

    toggleLoadedClass(container);
}

function subtitleFile(input, length) {
    let dots;
    const file = input.files[0];
    if (file) {
        const target = file.name.split('.');
        target[0].length >= length ? dots = '...' : dots = '.';
        const name = target[0].substring(0, length) + dots + target[1]
        return name;
    }
}

function showPdf(input) {
    const container = input.closest('.photo-load');
    const placeSaleImages = container.querySelector('.place-sale-photo__images');
    if (placeSaleImages) {
        let file = input.files[0];
        if (file) {
            const pdfURL = window.URL.createObjectURL(file);
            placeSaleImages.innerHTML = pdfGenerate(pdfURL, file.name);
        }
        toggleLoadedClass(container);
    }
}

function showDefault(input,maxLength = false) {
    const container = input.closest('.photo-load');
    const images = container.querySelector('.photo-load__images');
    if (images) {
        let files = input.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            images.innerHTML += defaultGenerate(file.name, input,maxLength);
        }
        toggleLoadedClass(container);
    }
}

function toggleLoadedClass(container) {
    const images = container.querySelector('.photo-load__images');
    if (images) {
        images.children.length > 0 ? container.classList.add('_loaded') : container.classList.remove('_loaded');
    }
}

function showImage(input) {
    const container = input.closest('.photo-load');
    const placeSaleImages = container.querySelector('.place-sale-photo__images');
    if (placeSaleImages) {
        let files = input.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const imageURL = window.URL.createObjectURL(file);
            placeSaleImages.innerHTML += photoGenerate(imageURL, file.name);
        }
        if (placeSaleImages.classList.contains('drag-drop')) {
            currentDragDrop(placeSaleImages)
        }
        toggleLoadedClass(container);
    }
}

function inputChange(input, e) {
    if (input.hasAttribute('data-upload-drop-pdf')) {
        if (e.type === 'change') {
            showPdf(input);
        }
        if (e.type === 'drop') {
            input.files = e.dataTransfer.files;
            showPdf(input);
        }
    } else if (input.hasAttribute('data-upload-drop-default')) {
        if (e.type === 'change') {
            showDefault(input,12);
        }
        if (e.type === 'drop') {
            input.files = e.dataTransfer.files;
            showDefault(input);
        }
    } else {
        if (e.type === 'change') {
            showImage(input);
        }
        if (e.type === 'drop') {
            input.files = e.dataTransfer.files;
            showImage(input);
        }
    }
}

function photoGenerate(url, name) {
    const placeSalePhotoHTML = `
        <div class="place-sale-photo__image ibg drag-drop__item" draggable="true" title="${name}">
            <picture>
                <source srcset="${url}" type="image/webp">
                <img loading="lazy" src="${url}" width="271" height="190" alt="">
            </picture>
            <div class="place-sale-photo__icon">
                <svg>
                    <use xlink:href="./img/sprite.svg#right-left"></use>
                </svg>
            </div>
            <button type="button" class="btn btn-reset place-sale-photo__remove" title="Удалить фото">
                <svg>
                    <use xlink:href="./img/sprite.svg#trash"></use>
                </svg>
            </button>
            <button type="button" class="btn btn-reset place-sale-photo__rotate place-sale-photo__rotate--1">
                <svg>
                    <use xlink:href="./img/sprite.svg#rotate-1"></use>
                </svg>
            </button>
            <button type="button" class="btn btn-reset place-sale-photo__rotate place-sale-photo__rotate--2">
                <svg>
                    <use xlink:href="./img/sprite.svg#rotate-2"></use>
                </svg>
            </button>
        </div>
        `;
    return placeSalePhotoHTML;
}

function pdfGenerate(url, name) {
    const placeSalePhotoHTML = `
            <a href="${url}" class="place-sale-photo__image drag-drop__item ibg" draggable="true" target="_blank" title="${name}">
                <picture>
                    <source srcset="./img/pdf.webp" type="image/webp">
                    <img loading="lazy" src="./img/pdf.png" width="271" height="190" alt="">
                </picture>
                <button type="button" class="btn btn-reset place-sale-photo__remove" title="Удалить PDF">
                    <svg>
                        <use xlink:href="./img/sprite.svg#trash"></use>
                    </svg>
                </button>
            </a>
        `;
    return placeSalePhotoHTML;
}


function defaultGenerate(name, input,maxLength) {
    const placeSalePhotoHTML = `
    <div class="place-sale-photo__image ibg" title="${name}">
        <div>
            <svg>
            <use xlink:href="./img/sprite.svg#save"></use>
            </svg>
            <span>${subtitleFile(input,maxLength ? maxLength : 18)}</span>
        </div>
        <button type="button" class="btn btn-reset place-sale-photo__remove" title="Удалить фото">
            <svg>
                <use xlink:href="./img/sprite.svg#trash"></use>
            </svg>
        </button>
    </div>
    `;
    return placeSalePhotoHTML;
}
