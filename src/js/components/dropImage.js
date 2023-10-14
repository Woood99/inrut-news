const dropImage = () => {
    const fileInputs = document.querySelectorAll('[data-upload-drop]');
    if (fileInputs.length === 0) return;
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        })
    });
    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => {
                input.closest('.photo-load').classList.add('_active');
            });
        })
    });
    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => {
                input.closest('.photo-load').classList.remove('_active');
            });
        })
    })

    fileInputs.forEach(input => input.addEventListener('change', (e) => inputChange(input, e)));
    fileInputs.forEach(input => input.addEventListener('drop', (e) => inputChange(input, e)));




    function subtitleFile(input) {
        let dots;
        const target = input.files[0].name.split('.');
        target[0].length >= 20 ? dots = '...' : dots = '.';
        const name = target[0].substring(0, 20) + dots + target[1]
        input.previousElementSibling.textContent = name;
    }

    function inputChange(input, e) {
        if (e.type === 'change') {
            subtitleFile(input);
        }
        if (e.type === 'drop') {
            input.files = e.dataTransfer.files;
            subtitleFile(input);
        }
    }
};

export default dropImage;
