export default function () {
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
      sounds[sound].pause()
    }
  }

  return {
    pressButton,
    timeEnd,
    startSound,
    stopAllSounds
  }
}
