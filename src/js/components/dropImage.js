import { currentDragDrop } from "./dragDrop";


export const dropImage = () => {
    const photoLoad = document.querySelectorAll('.photo-load');
    if (photoLoad.length === 0) return;
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        photoLoad.forEach(photo => {
            const input = photo.querySelector('[data-upload-drop]');
            input.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        })
    });
    ['dragenter', 'dragover'].forEach(eventName => {
        photoLoad.forEach(photo => {
            const input = photo.querySelector('[data-upload-drop]');
            input.addEventListener(eventName, () => {
                photo.classList.add('_active');
            });
        })
    });
    ['dragleave', 'drop'].forEach(eventName => {
        photoLoad.forEach(photo => {
            const input = photo.querySelector('[data-upload-drop]');
            input.addEventListener(eventName, () => {
                photo.classList.remove('_active');
            });
        })
    })

    photoLoad.forEach(photo => {
        const input = photo.querySelector('[data-upload-drop]');
        input.addEventListener('change', (e) => inputChange(input, e))
    });
    photoLoad.forEach(photo => {
        const input = photo.querySelector('[data-upload-drop]');
        input.addEventListener('drop', (e) => inputChange(input, e))
    });




    function subtitleFile(input) {
        let dots;
        const target = input.files[0].name.split('.');
        target[0].length >= 20 ? dots = '...' : dots = '.';
        const name = target[0].substring(0, 20) + dots + target[1]
        input.previousElementSibling.textContent = name;
    }

    function showImage(input) {
        const container = input.closest('.photo-load');
        const placeSaleImages = container.querySelector('.place-sale-photo__images');
        if (placeSaleImages) {
            let files = input.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const imageURL = window.URL.createObjectURL(file);
                placeSaleImages.innerHTML += placeSalePhotoGenerate(imageURL);
            }
            if (placeSaleImages.classList.contains('drag-drop')) {
            currentDragDrop(placeSaleImages)
            }
        }
    }

    function inputChange(input, e) {
        if (e.type === 'change') {
            showImage(input);
        }
        if (e.type === 'drop') {
            input.files = e.dataTransfer.files;
            showImage(input);
        }
    }

    function placeSalePhotoGenerate(url) {
        const placeSalePhotoHTML = `
        <div class="place-sale-photo__image ibg drag-drop__item" draggable="true">
            <picture>
                <source srcset="${url}" type="image/webp">
                <img loading="lazy" src="${url}" width="271" height="190" alt="">
            </picture>
            <div class="place-sale-photo__icon">
                <svg>
                    <use xlink:href="img/sprite.svg#right-left"></use>
                </svg>
            </div>
            <button type="button" class="btn btn-reset place-sale-photo__remove" title="Удалить фото">
                <svg>
                    <use xlink:href="img/sprite.svg#trash"></use>
                </svg>
            </button>
            <button type="button" class="btn btn-reset place-sale-photo__rotate place-sale-photo__rotate--1">
                <svg>
                    <use xlink:href="img/sprite.svg#rotate-1"></use>
                </svg>
            </button>
            <button type="button" class="btn btn-reset place-sale-photo__rotate place-sale-photo__rotate--2">
                <svg>
                    <use xlink:href="img/sprite.svg#rotate-2"></use>
                </svg>
            </button>
        </div>
        `;
        return placeSalePhotoHTML;
    }
};

export const currentDropImage = (container) => {
    if (!container) return;
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
            const input = container.querySelector('[data-upload-drop]');
            input.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
    });
    ['dragenter', 'dragover'].forEach(eventName => {
            const input = container.querySelector('[data-upload-drop]');
            input.addEventListener(eventName, () => {
                container.classList.add('_active');
            });
    });
    ['dragleave', 'drop'].forEach(eventName => {
            const input = container.querySelector('[data-upload-drop]');
            input.addEventListener(eventName, () => {
                container.classList.remove('_active');
            });
    })


        const input = container.querySelector('[data-upload-drop]');

        input.addEventListener('change', (e) => inputChange(input, e))
        input.addEventListener('drop', (e) => inputChange(input, e))




    function subtitleFile(input) {
        let dots;
        const target = input.files[0].name.split('.');
        target[0].length >= 20 ? dots = '...' : dots = '.';
        const name = target[0].substring(0, 20) + dots + target[1]
        input.previousElementSibling.textContent = name;
    }

    function showImage(input) {
        const container = input.closest('.photo-load');
        const placeSaleImages = container.querySelector('.place-sale-photo__images');
        if (placeSaleImages) {
            let files = input.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const imageURL = window.URL.createObjectURL(file);
                placeSaleImages.innerHTML += placeSalePhotoGenerate(imageURL);
            }
            if (placeSaleImages.classList.contains('drag-drop')) {
            currentDragDrop(placeSaleImages)
            }
        }
    }

    function inputChange(input, e) {
        if (e.type === 'change') {
            showImage(input);
        }
        if (e.type === 'drop') {
            input.files = e.dataTransfer.files;
            showImage(input);
        }
    }

    function placeSalePhotoGenerate(url) {
        const placeSalePhotoHTML = `
        <div class="place-sale-photo__image ibg drag-drop__item" draggable="true">
            <picture>
                <source srcset="${url}" type="image/webp">
                <img loading="lazy" src="${url}" width="271" height="190" alt="">
            </picture>
            <div class="place-sale-photo__icon">
                <svg>
                    <use xlink:href="img/sprite.svg#right-left"></use>
                </svg>
            </div>
            <button type="button" class="btn btn-reset place-sale-photo__remove" title="Удалить фото">
                <svg>
                    <use xlink:href="img/sprite.svg#trash"></use>
                </svg>
            </button>
            <button type="button" class="btn btn-reset place-sale-photo__rotate place-sale-photo__rotate--1">
                <svg>
                    <use xlink:href="img/sprite.svg#rotate-1"></use>
                </svg>
            </button>
            <button type="button" class="btn btn-reset place-sale-photo__rotate place-sale-photo__rotate--2">
                <svg>
                    <use xlink:href="img/sprite.svg#rotate-2"></use>
                </svg>
            </button>
        </div>
        `;
        return placeSalePhotoHTML;
    }
};
