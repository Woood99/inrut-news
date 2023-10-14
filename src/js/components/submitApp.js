const submitApp = () => {
    const contianer = document.querySelector('.submit-app');
    if (!contianer) return;
    const checkbox = contianer.querySelector('.submit-app-maps__checkbox .checkbox-secondary__input');
    const maps = contianer.querySelector('.submit-app-maps__map');
    checkbox.addEventListener('change',() => {
        if (checkbox.checked) maps.setAttribute('hidden','');
        if (!checkbox.checked) maps.removeAttribute('hidden');
    })
};

export default submitApp;