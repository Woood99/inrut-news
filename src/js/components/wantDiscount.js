import numberReplace from "../modules/numberReplace";
const wantDiscount = () => {
    const container = document.querySelector('.want-discount__form');
    if (!container) return;
    const defaultPrice = container.dataset.wantDiscountDefaultPrice;
    const input = container.querySelector('.want-discount__input input');
    const btns = container.querySelectorAll('.want-discount__prc');

    input.value = numberReplace((+defaultPrice + (defaultPrice / 100 * btns[0].dataset.wantDiscountPrc)).toString());
    btns[0].classList.add('_active');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(btn => btn.classList.remove('_active'));
            btn.classList.add('_active');
           container.querySelector('.want-discount__input').classList.add('_active');
            const result = +defaultPrice + (defaultPrice / 100 * btn.dataset.wantDiscountPrc);
            input.value = numberReplace(result.toString());
        })
    })
    input.addEventListener('input', () => {
        btns.forEach(btn => btn.classList.remove('_active'));
    });
};

export default wantDiscount;
