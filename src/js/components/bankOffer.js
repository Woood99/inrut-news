export const bankOffer = (item) => {
    if (!item) return;

    const newPrcEl = item.querySelector("[data-bank-offer-new-prc]");
    const defaultPrcEl = item.querySelector("[data-bank-offer-default-prc]");
    let defaultPrc = fixedNumberPrc(item.dataset.bankOfferPrc);
    let discount = 0;

    updateTopInfo();
    item.addEventListener("click", handleClickSpollerBtn);
    item.addEventListener("change", updateTopInfo);

    function handleClickSpollerBtn(e) {
        const target = e.target;
        const btn = target.closest(".bank-offer__spoller-btn");
        const close = target.closest(".bank-offer__close");
        const moreBtn = target.closest(".bank-offer__more-btn");
        if (btn) {
            toggle(btn.closest(".bank-offer__spoller"));
        }

        if (close) {
            toggle(close.closest(".bank-offer__spoller"));
        }

        if (moreBtn) {
            const content = moreBtn.parentNode.querySelector(".bank-offer__more");
            if (!moreBtn.classList.contains("_active")) {
                moreBtn.classList.add("_active");
                content.removeAttribute("hidden");
            } else {
                moreBtn.classList.remove("_active");
                content.setAttribute("hidden", "");
            }
        }

        function toggle(spoller) {
            const btn = spoller.querySelector(".bank-offer__spoller-btn");
            const content = spoller.querySelector(".bank-offer__spoller-content");
            if (!spoller.classList.contains("_active")) {
                btn.setAttribute("hidden", "");
                spoller.classList.add("_active");
                content.removeAttribute("hidden");
            } else {
                btn.removeAttribute("hidden");
                spoller.classList.remove("_active");
                content.setAttribute("hidden", "");
            }
        }
    }

    function updateTopInfo() {
        defaultPrc = fixedNumberPrc(item.dataset.bankOfferPrc);
        discount = 0;
        newPrcEl.textContent = "";
        defaultPrcEl.textContent = `${defaultPrc}%`;

        const inputsDown = item.querySelectorAll("[data-bank-offer-input-down]");

        inputsDown.forEach((input) => {
            if (input.checked) {
                const value = input.dataset.bankOfferInputDown;
                discount += fixedNumberPrc(value);
            }
        });

        if (discount != 0) {
            newPrcEl.removeAttribute("hidden");
            newPrcEl.textContent = `${fixedNumber(defaultPrc - discount)}%`;
            newPrcEl.parentNode.classList.add("_discount");
        } else {
            newPrcEl.setAttribute("hidden", "");
            newPrcEl.parentNode.classList.remove("_discount");
        }

        // item.dispatchEvent(
        //     new CustomEvent("mortgageCalcFormUpdate", {
        //         bubbles: true,
        //         detail: {},
        //     })
        // );
    }
};


export function fixedNumberPrc(number) {
    return +(+(Math.round((number.replace("%", "").replace(",", ".") + 'e+' + 2)) + 'e-' + 2)).toFixed(2);
}
export function fixedNumber(number) {
    return +(+(Math.round((number + 'e+' + 2)) + 'e-' + 2)).toFixed(2);
}
