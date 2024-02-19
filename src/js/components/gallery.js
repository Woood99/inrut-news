import lightGallery from 'lightgallery';
import lgVideo from 'lightgallery/plugins/video';
import disableScroll from '../modules/disableScroll';
import enableScroll from '../modules/enableScroll';
export const galleryPrimary = () => {
    const defaultGalleryItems = document.querySelectorAll('.default-gallery');
    if (defaultGalleryItems.length >= 1) {
        defaultGalleryItems.forEach((gallery, index) => galleryPrimaryBody(gallery, `gallery-primary-container--default-${index+1}`,'default-gallery__item'));
    }
}
export const galleryStories = () => {
    const items = document.querySelectorAll('.stories');
    if (items.length === 0) return;
    items.forEach(gallery => {
        const galleryContainer = lightGallery(gallery, {
            licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
            selector: '.stories__item',
            addClass: 'gallery-stories-container',
            speed: 400,
            mode: 'lg-fade',
            enableDrag: false,
            zoomFromOrigin: false,
            allowMediaOverlap: true,

            download: false,
            videoMaxSize: 'none',
            closeOnTap: false,
            appendCounterTo: '.lg-content',
        });
        gallery.addEventListener('lgAfterOpen', () => {
            document.body.style.scrollBehavior = 'auto';
            document.documentElement.style.scrollBehavior = 'auto';
            disableScroll();
        });
        gallery.addEventListener('lgAfterClose', () => {
            enableScroll();
            document.body.style.scrollBehavior = 'auto';
            document.documentElement.style.scrollBehavior = 'auto';
        });
        const nextBtnHTML = `
        <button type="button" class="btn btn-reset nav-arrow-primary nav-arrow-primary--next gallery-stories-container__next">
            <div class="nav-arrow-primary__wrapper">
                <svg>
                    <use xlink:href="./img/sprite.svg#arrow-right"></use>
                </svg>
            </div>
        </button>
        `;
        const prevBtnHTML = `
        <button type="button" class="btn btn-reset nav-arrow-primary nav-arrow-primary--prev gallery-stories-container__prev">
            <div class="nav-arrow-primary__wrapper">
                <svg>
                    <use xlink:href="./img/sprite.svg#arrow-right"></use>
                </svg>
            </div>
        </button>
        `;
        const container = document.querySelector('.gallery-stories-container');

        container.querySelector('.lg-content').insertAdjacentHTML('beforeend', `${prevBtnHTML} ${nextBtnHTML}`);
        container.querySelector('.gallery-stories-container__prev').addEventListener('click', () => galleryContainer.goToPrevSlide());
        container.querySelector('.gallery-stories-container__next').addEventListener('click', () => galleryContainer.goToNextSlide());
        container.querySelector('.lg-backdrop').addEventListener('click', () => galleryContainer.closeGallery());
    });
}

export const galleryPrimaryBody = (gallery, containerEl,itemEl) => {
    const galleryContainer = lightGallery(gallery, {
        plugins: [lgVideo],
        licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
        selector: `.${itemEl}`,
        addClass: `gallery-primary-container ${containerEl}`,
        speed: 400,

        animateThumb: true,
        zoomFromOrigin: false,
        allowMediaOverlap: true,
        toggleThumb: true,

        download: false,
        videoMaxSize: 'none',
        loadYouTubeThumbnail: false,
        enableThumbSwipe: true,
        closeOnTap: false,
        appendCounterTo: '.lg-content',

    });
    gallery.addEventListener('lgAfterOpen', () => {
        if (!bodyContainsPopup()){
            document.body.style.scrollBehavior = 'auto';
            document.documentElement.style.scrollBehavior = 'auto';
            disableScroll();
        }
    });
    gallery.addEventListener('lgAfterClose', () => {
        if (!bodyContainsPopup()){
            enableScroll();
            document.body.style.scrollBehavior = 'auto';
            document.documentElement.style.scrollBehavior = 'auto';
        }
    });
    const closeBtnHTML = `
    <button class="btn btn-reset gallery-primary-container__close">
        <svg>
            <use xlink:href="./img/sprite.svg#x"></use>
        </svg>
    </button>
    `;
    const nextBtnHTML = `
    <button type="button" class="btn btn-reset nav-arrow-primary nav-arrow-primary--next gallery-primary-container__next">
        <div class="nav-arrow-primary__wrapper">
            <svg>
                <use xlink:href="./img/sprite.svg#arrow-right"></use>
            </svg>
        </div>
    </button>
    `;
    const prevBtnHTML = `
    <button type="button" class="btn btn-reset nav-arrow-primary nav-arrow-primary--prev gallery-primary-container__prev">
        <div class="nav-arrow-primary__wrapper">
            <svg>
                <use xlink:href="./img/sprite.svg#arrow-right"></use>
            </svg>
        </div>
    </button>
    `;
    const container = document.querySelector(`.${containerEl}`);

    container.querySelector('.lg-toolbar').insertAdjacentHTML('beforeend', closeBtnHTML);
    container.querySelector('.lg-content').insertAdjacentHTML('beforeend', `${prevBtnHTML} ${nextBtnHTML}`);
    container.querySelector('.lg-backdrop').addEventListener('click', () => galleryContainer.closeGallery());
    container.querySelector('.gallery-primary-container__close').addEventListener('click', () => galleryContainer.closeGallery());
    container.querySelector('.gallery-primary-container__prev').addEventListener('click', () => galleryContainer.goToPrevSlide());
    container.querySelector('.gallery-primary-container__next').addEventListener('click', () => galleryContainer.goToNextSlide());
    return itemEl === 'object-gallery__item' ? container : undefined;


    function bodyContainsPopup(){
        return document.body.classList.contains('_popup-open');
    }
}