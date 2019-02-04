const form = document.querySelector('form')
const innerForm = document.querySelector('.inner-form')
const button = form.querySelector('button')
const autoconnectWrapper = form.querySelector('#autoconnect_wrapper')
const keyInput = form.querySelector('#key_input')
const loady = form.querySelector('.loady')
const errorMessage = form.querySelector('.error')
const video = document.getElementById('video')
const videoWrapper = document.querySelector('.video-wrapper')
const canvas = document.getElementById('ambilight')
const ctx = canvas.getContext('2d')
const autoconnect = document.getElementById('autoconnect')
let initial = true
let gotKeyThroughGetParameter = false
let t1IsPlaying = false
let autoconnectInterval = null


function resetErrorMessage() {
  errorMessage.innerText = ''
}


function playT1() {
  t1IsPlaying = true
  button.style.opacity = 0
  autoconnectWrapper.style.opacity = 0
  keyInput.style.color = '#111'
  keyInput.style.paddingLeft = 0
  keyInput.style.paddingRight = 0
  form.style.maxWidth = '65px'
  setTimeout(() => loady.style.opacity = 1, 500)
}


function reverseT1(error = true) {
  form.removeEventListener('transitionend', reverseT1)
  t1IsPlaying = false

  loady.removeAttribute('style')
  setTimeout(() => {
    button.removeAttribute('style')
    autoconnectWrapper.removeAttribute('style')
    form.removeAttribute('style')
  }, 250)
  setTimeout(() => keyInput.removeAttribute('style'), 500)

  if (!error) return
  setTimeout(() => errorMessage.innerText = 'Stream key wrong or stream offline', 750)
}


function transitionToT2() {
  innerForm.style.transform = 'translateY(-200px)'
  form.style.opacity = 0
  setTimeout(() => videoWrapper.style.maxHeight = video.scrollHeight + 'px', 250)

  setTimeout(() => {
    innerForm.removeAttribute('style')
    button.removeAttribute('style')
    autoconnectWrapper.removeAttribute('style')
    keyInput.removeAttribute('style')
    form.style.maxWidth = '480px'
    loady.removeAttribute('style')
  }, 500)
}


function afterT2() {
  form.removeAttribute('style')
  setTimeout(() => {
    if (gotKeyThroughGetParameter) errorMessage.Text = 'Your video is muted'
  }, 500)

  document.querySelector('.video-wrapper').style.overflow = 'visible'
  document.querySelector('.video-wrapper').style.height = 'auto'

  setInterval(() => ctx.drawImage(video, 0, 0, canvas.width, canvas.height), 50)
}


function showVideo() {
  loady.removeEventListener('transitionend', showVideo)
  t1IsPlaying = false

  setTimeout(() => {
    if (initial) {
      initial = false
      transitionToT2()
      setTimeout(afterT2, 1500)
    } else {
      reverseT1(false)
    }
  }, 500)
}


function onSuccess() {
  if (t1IsPlaying) loady.addEventListener('transitionend', showVideo) // t1 finishes after manifest loaded
  else showVideo() // t1 finished before manifest loaded

  video.play()
  video.focus()
}


function onError(_, error) {
  if (error.details === 'bufferAppendError' || error.details === 'bufferStalledError') {
    console.warn(error)
    return
  }

  if (t1IsPlaying) form.addEventListener('transitionend', reverseT1) // t1 finishes after manifest loaded
  else reverseT1() // t1 finished before manifest loaded

  keyInput.focus()
  console.error(error)
}


function initVideo() {
  const hls = new Hls()
  // hls.loadSource(`/hls/${keyInput.value}.m3u8`)
  hls.loadSource(`https://stream.ind3x.me/hls/${keyInput.value}.m3u8`)
  hls.attachMedia(video)

  hls.on(Hls.Events.MANIFEST_PARSED, onSuccess)
  hls.on(Hls.Events.ERROR, onError)
}


function onSubmit() {
  resetErrorMessage()
  keyInput.blur()

  playT1()
  initVideo()
}


function autoSubmitOnPageLoad() {
  const searchParams = new URLSearchParams(window.location.search)
  if (!searchParams.has('key')) return

  gotKeyThroughGetParameter = true
  keyInput.value = searchParams.get('key')
  onSubmit()
}


function onChange() {
  if (autoconnect.checked) {
    autoconnectInterval = setInterval(() => {
      console.table(video)
      if () return // TODO: Return when playing

      gotKeyThroughGetParameter = false
      video.muted = false
      onSubmit()
    }, 5000)
  } else {
    clearInterval(autoconnectInterval)
  }
}


function init() {
  keyInput.focus()

  autoSubmitOnPageLoad()

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    gotKeyThroughGetParameter = false
    video.muted = false
    onSubmit()
  })

  autoconnect.addEventListener('change', onChange)

  video.addEventListener('volumechange', resetErrorMessage)
}


init()
