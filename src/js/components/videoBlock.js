const videoBlock = (currentVideoBlock) => {
    if (currentVideoBlock) {
        const btn = currentVideoBlock.querySelector('.video-block__button');
        const content = currentVideoBlock.querySelector('.video-block__video');
        createVideoBlock(btn, content);
        return;
    }


    const videos = document.querySelectorAll('.video-block');
    if (!videos) return;
    videos.forEach(video => {
        if (!video.classList.contains('video-block--auto')) {
            const btn = video.querySelector('.video-block__button');
            const content = video.querySelector('.video-block__video');
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                createVideoBlock(btn, content);
            });
        }
    })

    function createVideoBlock(btn, content) {
        const contentHTML = `
            <iframe src="${btn.dataset.src}?autoplay=1&mute=0" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen></iframe>
            </iframe>
            `
        content.insertAdjacentHTML('beforeend', contentHTML);
    }
}
export default videoBlock;
