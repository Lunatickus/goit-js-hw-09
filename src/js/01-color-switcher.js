const refs = {
    startBtn: document.querySelector("button[data-start]"),
    stopBtn: document.querySelector("button[data-stop]"),
    body: document.querySelector("body")
}

const colorSwitcher = {
    intervalId: null,
    start() {
        refs.startBtn.disabled = true;
        refs.stopBtn.disabled = false;
        this.intervalId = setInterval(() => {
            refs.body.style.backgroundColor = getRandomHexColor();
        }, 1000);
    },
    stop() {
        refs.startBtn.disabled = false;
        refs.stopBtn.disabled = true;
        clearInterval(this.intervalId);
    }
}

refs.startBtn.addEventListener("click", () => {
    colorSwitcher.start();
});

refs.stopBtn.addEventListener("click", () => {
    colorSwitcher.stop();
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }