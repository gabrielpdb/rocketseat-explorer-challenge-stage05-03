import Sounds from './sounds.js'

const buttonPlay = document.querySelector('button#play')
const buttonStop = document.querySelector('button#stop')
const buttonMore = document.querySelector('button#more')
const buttonLess = document.querySelector('button#less')
const buttonTree = document.querySelector('button.tree-song')
const buttonCloud = document.querySelector('button.cloud-song')
const buttonMarket = document.querySelector('button.market-song')
const buttonFire = document.querySelector('button.fire-song')
const minutesDisplay = document.querySelector('span#minutes')
const secondsDisplay = document.querySelector('span#seconds')
let timerTimeout

// const sounds = Sounds()

function setActiveSoundButton(button) {
  if (button.classList.contains('active')) {
    stopAllSounds()
    button.classList.remove('active')
    return false
  }

  stopAllSounds()
  buttonTree.classList.remove('active')
  buttonCloud.classList.remove('active')
  buttonMarket.classList.remove('active')
  buttonFire.classList.remove('active')
  button.classList.add('active')

  return true
}

function countdown() {
  timerTimeout = setTimeout(() => {
    let seconds = Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)
    let isFinished = minutes <= 0 && seconds <= 0

    if (isFinished) {
      clearTimeout(timerTimeout)
      minutesDisplay.textContent = String(25).padStart(2, '0')
      secondsDisplay.textContent = String(seconds).padStart(2, '0')
      timeEnd()
      return
    }

    if (seconds <= 0) {
      seconds = 59
      --minutes
    } else {
      --seconds
    }

    minutesDisplay.textContent = String(minutes).padStart(2, '0')
    secondsDisplay.textContent = String(seconds).padStart(2, '0')

    countdown()
  }, 1000)
}

buttonPlay.addEventListener('click', () => {
  pressButton()
  countdown()
})
buttonStop.addEventListener('click', () => {
  pressButton()
  clearTimeout(timerTimeout)
  minutesDisplay.textContent = String(25).padStart(2, '0')
  secondsDisplay.textContent = String(0).padStart(2, '0')
  timeEnd()
})
buttonMore.addEventListener('click', () => {
  pressButton()
  minutesDisplay.textContent = String(
    Number(minutesDisplay.textContent) + 5
  ).padStart(2, '0')
})
buttonLess.addEventListener('click', () => {
  pressButton()
  let newMinutes = Number(minutesDisplay.textContent) - 5
  if (newMinutes <= 0) {
    clearTimeout(timerTimeout)
    minutesDisplay.textContent = String(25).padStart(2, '0')
    secondsDisplay.textContent = String(0).padStart(2, '0')
    timeEnd()
  } else {
    minutesDisplay.textContent = String(
      Number(minutesDisplay.textContent) - 5
    ).padStart(2, '0')
  }
})
buttonTree.addEventListener('click', () => {
  if (setActiveSoundButton(buttonTree)) {
    startSound('floresta')
  }
})
buttonCloud.addEventListener('click', () => {
  if (setActiveSoundButton(buttonCloud)) {
    startSound('chuva')
  }
})
buttonMarket.addEventListener('click', () => {
  if (setActiveSoundButton(buttonMarket)) {
    startSound('cafeteria')
  }
})
buttonFire.addEventListener('click', () => {
  if (setActiveSoundButton(buttonFire)) {
    startSound('lareira')
  }
})

const buttonPressAudio = new Audio(
  'https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true'
)
const kitchenTimer = new Audio(
  'https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true'
)

const sounds = {
  cafeteria: new Audio('./assets/Cafeteria.wav'),
  chuva: new Audio('./assets/Chuva.wav'),
  floresta: new Audio('./assets/Floresta.wav'),
  lareira: new Audio('./assets/Lareira.wav')
}

function pressButton() {
  buttonPressAudio.play()
}

function timeEnd() {
  kitchenTimer.play()
}

function startSound(sound) {
  sounds[sound].play()
}

function stopAllSounds() {
  for (const sound in sounds) {
    if (!sounds[sound].paused) {
      sounds[sound].pause()
    }
  }
}
