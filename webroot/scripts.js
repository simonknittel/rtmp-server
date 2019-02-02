const pageWrapper = document.querySelector('.page-wrapper')
const form = document.querySelector('form')
const keyInput = form.querySelector('input')
const errorMessage = form.querySelector('.error')
const video = document.querySelector('#video')
const canvas = document.getElementById('ambilight')
const ctx = canvas.getContext('2d')
let initial = true
let keyByParamter = false

function playT1() {
  pageWrapper.classList.add('t1')
}

function reverseT1(error) {
  // TODO: Reverse play CSS animation
  pageWrapper.classList.remove('t1')

  if (!error) return
  t1.finished.then(() => {
    errorMessage.innerText = 'Stream key wrong or stream offline'
  })
}

function showVideo() {
  reverseT1()

  if (!initial) return
  initial = true

  pageWrapper.classList.add('t2')
  // t2.finished.then(() => {
  //   if (keyByParamter) errorMessage.Text = 'Your video is muted'
  //
  //   document.querySelector('.video-wrapper').style.overflow = 'visible'
  //   document.querySelector('.video-wrapper').style.height = 'auto'
  //
  //   window.setInterval(() => {
  //     ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  //   }, 50)
  // })
}

function onSuccess() {
  // if (t1.completed) showVideo() // t1 finished before manifest loaded
  // else t1.finished.then(showVideo) // t1 finishes after manifest loads
  showVideo()

  video.play()
  video.focus()
}

function onError(_, error) {
  if (error.details === 'bufferAppendError' || error.details === 'bufferStalledError') {
    console.warn(error)
    return
  }

  // if (t1.completed) reverseT1(true)
  // else t1.finished.then(reverseT1.bind(null, true)) // TODO: Show error message
  reverseT1()

  keyInput.focus()
  console.error(error)
}

function onSubmit() {
  errorMessage.innerText = ''
  playT1()
  keyInput.blur()

  const hls = new Hls()
  // hls.loadSource(`/hls/${keyInput.value}.m3u8`)
  hls.loadSource(`https://stream.ind3x.me/hls/${keyInput.value}.m3u8`)
  hls.attachMedia(video)

  hls.on(Hls.Events.MANIFEST_PARSED, onSuccess)
  hls.on(Hls.Events.ERROR, onError)
}

function init() {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    keyByParamter = false
    video.muted = false
    onSubmit()
  })

  keyInput.focus()

  const searchParams = new URLSearchParams(window.location.search)
  if (searchParams.has('key')) {
    keyByParamter = true
    keyInput.value = searchParams.get('key')
    onSubmit()
  }

  video.addEventListener('volumechange', () => errorMessage.innerText = '')
}

init()
