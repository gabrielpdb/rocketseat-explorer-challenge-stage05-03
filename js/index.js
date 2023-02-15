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

const sounds = Sounds()

function setActiveSoundButton(button) {
  if (button.classList.contains('active')) {
    button.classList.remove('active')
    sounds.stopAllSounds()
    return
  } else {
    sounds.stopAllSounds()
    buttonTree.classList.remove('active')
    buttonCloud.classList.remove('active')
    buttonMarket.classList.remove('active')
    buttonFire.classList.remove('active')
    button.classList.add('active')
  }
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
      sounds.timeEnd()
      return
    }

    if (seconds <= 0) {
      seconds = 3
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
  sounds.pressButton()
  countdown()
})
buttonStop.addEventListener('click', () => {
  sounds.pressButton()
  clearTimeout(timerTimeout)
  minutesDisplay.textContent = String(25).padStart(2, '0')
  secondsDisplay.textContent = String(0).padStart(2, '0')
  sounds.timeEnd()
})
buttonMore.addEventListener('click', () => {
  sounds.pressButton()
  minutesDisplay.textContent = String(
    Number(minutesDisplay.textContent) + 5
  ).padStart(2, '0')
})
buttonLess.addEventListener('click', () => {
  sounds.pressButton()
  let newMinutes = Number(minutesDisplay.textContent) - 5
  if (newMinutes <= 0) {
    clearTimeout(timerTimeout)
    minutesDisplay.textContent = String(25).padStart(2, '0')
    secondsDisplay.textContent = String(0).padStart(2, '0')
    sounds.timeEnd()
  } else {
    minutesDisplay.textContent = String(
      Number(minutesDisplay.textContent) - 5
    ).padStart(2, '0')
  }
})
buttonTree.addEventListener('click', () => {
  setActiveSoundButton(buttonTree)
  sounds.startSound('floresta')
})
buttonCloud.addEventListener('click', () => {
  setActiveSoundButton(buttonCloud)
  sounds.startSound('chuva')
})
buttonMarket.addEventListener('click', () => {
  setActiveSoundButton(buttonMarket)
  sounds.startSound('cafeteria')
})
buttonFire.addEventListener('click', () => {
  setActiveSoundButton(buttonFire)
  sounds.startSound('lareira')
})
