import Notiflix from "notiflix";

const refs = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  form: document.querySelector(".form")
}

refs.form.addEventListener("submit", fulfillPromises);

Notiflix.Notify.init({
  useIcon: false
});

function fulfillPromises(evt) {
  evt.preventDefault();

  let firstDelay = Number(refs.delay.value);
  const delayStep = Number(refs.step.value);

  for(let i = 1; i <= refs.amount.value; i += 1) {
    createPromise(i, firstDelay).then(value => {
      Notiflix.Notify.success(value);
    }).catch(value => {
      Notiflix.Notify.failure(value);
    });

    firstDelay += delayStep;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if(shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }

      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}


