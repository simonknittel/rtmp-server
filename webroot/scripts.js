const form = document.querySelector('form')
const keyInput = form.querySelector('input')
const errorMessage = form.querySelector('.error')
const video = document.querySelector('#video')
const canvas = document.getElementById('ambilight')
const ctx = canvas.getContext('2d')
let initial = true
let keyByParamter = false

const t1 = anime.timeline({
  autoplay: false,
  easing: 'easeInOutBack'
})

const t2 = anime.timeline({
  autoplay: false,
  easing: 'easeInOutBack',
})

t1
  .add({
    targets: 'button',
    opacity: [{
      duration: 500,
      value: 0
    }]
  }, 0)

  .add({
    targets: 'input',
    color: [{
      duration: 500,
      value: '#111'
    }],
    paddingLeft: [{
      delay: 300,
      duration: 1,
      value: 0
    }],
    paddingRight: [{
      delay: 300,
      duration: 1,
      value: 0
    }]
  }, 0)

  .add({
    targets: 'form',
    maxWidth: [{
      duration: 750,
      value: '65px'
    }]
  }, 0)

  .add({
    targets: '.loady',
    opacity: [{
      delay: 750,
      duration: 250,
      value: 1
    }]
  }, 0)

t2
  .add({
    targets: 'button',
    opacity: [{
      delay: 2000,
      duration: 1,
      value: 1
    }]
  }, 0)

  .add({
    targets: 'input',
    color: [{
      delay: 2000,
      duration: 1,
      value: '#fff'
    }],
    paddingLeft: [{
      delay: 1700,
      duration: 1,
      value: '1rem'
    }],
    paddingRight: [{
      delay: 1700,
      duration: 1,
      value: '8rem'
    }]
  }, 0)

  .add({
    targets: 'form',
    maxWidth: [{
      delay: 2000,
      duration: 1,
      value: '480px'
    }],
    translateY: [{
      delay: 1500,
      duration: 500,
      value: -200
    }, {
      delay: 500,
      duration: 1,
      value: 0
    }],
    opacity: [{
      delay: 750,
      duration: 500,
      value: 1
    }]
  }, 0)

  .add({
    targets: '.loady',
    opacity: [{
      delay: 1250,
      duration: 1,
      value: 0
    }]
  }, 0)

  .add({
    targets: '.video-wrapper',
    height: {
      delay: 2000,
      duration: 1000,
      value: video.scrollHeight,
      easing: 'easeInOutExpo'
    }
  }, 0)

function playT1() {
  t1.direction = 'normal'
  t1.play()
}

function reverseT1(error) {
  t1.direction = 'reverse'
  t1.play()

  if (!error) return
  t1.finished.then(() => {
    errorMessage.innerText = 'Stream key wrong or stream offline'
  })
}

function showVideo() {
  reverseT1()

  if (!initial) return
  initial = true

  console.trace('t2.play()')
  t2.play()
  t2.finished.then(() => {
    if (keyByParamter) errorMessage.Text = 'Your video is muted'

    document.querySelector('.video-wrapper').style.overflow = 'visible'
    document.querySelector('.video-wrapper').style.height = 'auto'

    window.setInterval(() => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    }, 50)
  })
}

function onSuccess() {
  if (t1.completed) showVideo() // t1 finished before manifest loaded
  else t1.finished.then(showVideo) // t1 finishes after manifest loads

  video.play()
  video.focus()
}

function onError(_, error) {
  if (error.details === 'bufferAppendError' || error.details === 'bufferStalledError') {
    console.warn(error)
    return
  }

  if (t1.completed) reverseT1(true)
  else t1.finished.then(reverseT1.bind(null, true)) // TODO: Show error message

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
