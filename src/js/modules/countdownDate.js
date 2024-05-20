const countdownDate = (item) => {
    const start = new Date(new Date().getTime() + +item.dataset.countdownDate)
    if (updateCounter(item, start) === false) {
        setResultText(item);
    } else {
        let interval = setInterval(() => {
            const checkValue = updateCounter(item, start);
            if (checkValue === false) {
                setResultText(item);
                clearInterval(interval);
            }
        }, 1000)
    }

    function updateCounter(item, start) {
        let startTime;
        if (start) {
            startTime = new Date(start);
        } else {
            startTime = new Date(item.dataset.countdownDate);
        }
        const diff = startTime - getCurrentTime();
        if (diff < 0) {
            return false;
        }
        const daysLeft = Math.floor(diff / 1000 / 60 / 60 / 24);
        const hoursLeft = Math.floor(diff / 1000 / 60 / 60) % 24;
        const minutesLeft = Math.floor(diff / 1000 / 60) % 60;
        const secondsLeft = Math.floor(diff / 1000) % 60;
        setValues(item, daysLeft, hoursLeft, minutesLeft, secondsLeft);
    }

    function getCurrentTime() {
        return new Date();
    }

    function getMapElements(item) {
        return {
            days: item.querySelector('[data-countdown-date-field="days"]'),
            hours: item.querySelector('[data-countdown-date-field="hours"]'),
            minutes: item.querySelector('[data-countdown-date-field="minutes"]'),
            seconds: item.querySelector('[data-countdown-date-field="seconds"]'),
        }
    }

    function setValues(item, daysLeft, hoursLeft, minutesLeft, secondsLeft) {
        const mapElement = getMapElements(item);
        if (mapElement.days) {
            mapElement.days.textContent = daysLeft < 10 ? `0${daysLeft}` : daysLeft;
        }
        if (mapElement.hours) {
            mapElement.hours.textContent = hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft;
        }
        if (mapElement.minutes) {
            mapElement.minutes.textContent = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;
        }
        if (mapElement.seconds) {
            mapElement.seconds.textContent = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;
        }
    }

    function setResultText(item) {
        const resultText = item.dataset.countdownDateResult;
        item.innerHTML = `
            <li class="countdown-date__item _result">
                <span>${resultText}</span>
            </li>
        `;
    }
};

export default countdownDate;