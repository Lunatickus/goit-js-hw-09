import Notiflix from "notiflix";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    datetimePicker: document.querySelector("#datetime-picker"),
    startBtn: document.querySelector("button[data-start]"),
    dataDays: document.querySelector(".value[data-days]"),
    dataHours: document.querySelector(".value[data-hours]"),
    dataMinutes: document.querySelector(".value[data-minutes]"),
    dataSeconds: document.querySelector(".value[data-seconds]")
};

disableStartBtn();

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(getCurrentDate() > selectedDates[0]) {
            Notiflix.Notify.failure("Please choose a date in the future");
            return;
        }
      disableStartBtn();
    },
};

const fp = flatpickr(refs.datetimePicker, options);

refs.startBtn.addEventListener("click", countDown);

function countDown() {
    let timer = getSelectedDate() - getCurrentDate();
    disableStartBtn();
    disableDatetimePicker();

    const intervalId = setInterval(() => {
        timer -= 1000;
        if(timer <= 0) {
            disableDatetimePicker();
            clearInterval(intervalId);
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(timer);
        refs.dataDays.textContent = days;
        refs.dataHours.textContent = hours;
        refs.dataMinutes.textContent = minutes;
        refs.dataSeconds.textContent = seconds;
    }, 1000)
}

function getCurrentDate() {
    return new Date();
}

function getSelectedDate() {
    return new Date(refs.datetimePicker.value);
}

function disableStartBtn() {
    refs.startBtn.disabled = !refs.startBtn.disabled;
}

function disableDatetimePicker() {
    refs.datetimePicker.disabled = !refs.datetimePicker.disabled;
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
  