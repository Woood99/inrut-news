const scrollUp = () => {
    const btnScrollUp = document.querySelector('.scroll-up');
    if (btnScrollUp) {
        scrollUp();
        document.addEventListener('scroll', () => {
            scrollUp();
        })
        btnScrollUp.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        })
    }
    function scrollUp() {
        const currentOffset = window.pageYOffset
        if (currentOffset >= 250) {
            btnScrollUp.classList.add('_active');
        } else {
            btnScrollUp.classList.remove('_active');
        }
    }
};

export default scrollUp;