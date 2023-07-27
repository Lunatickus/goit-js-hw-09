const refs = {
    startBtn: document.querySelector("button[data-start]"),
    stopBtn: document.querySelector("button[data-stop]"),
    body: document.querySelector("body")
}

disableStopBtn()

const colorSwitcher = {
    intervalId: null,
    start() {
        disableStartBtn();
        disableStopBtn();
        this.intervalId = setInterval(() => {
            refs.body.style.backgroundColor = getRandomHexColor();
        }, 1000);
    },
    stop() {
        disableStartBtn();
        disableStopBtn();
        clearInterval(this.intervalId);
    }
}

refs.startBtn.addEventListener("click", () => {
    colorSwitcher.start();
});

refs.stopBtn.addEventListener("click", () => {
    colorSwitcher.stop();
});

function disableStartBtn() {
    refs.startBtn.disabled = !refs.startBtn.disabled;
}

function disableStopBtn() {
    refs.stopBtn.disabled = !refs.stopBtn.disabled;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}