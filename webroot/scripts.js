const form = document.querySelector('form')
const keyInput = form.querySelector('input')
const errorMessage = form.querySelector('.error')
let initial = true
let player = document.querySelector('#player')
let keyByParamter = false

function transition() {
  const t1 = anime.timeline({
    easing: 'easeInOutBack',
  })

  t1
    .add({
      targets: 'button',
      opacity: [{
        delay: 0,
        duration: 500,
        value: 0
      }, {
        delay: 2000,
        duration: 1,
        value: 1
      }]
    }, 0)

    .add({
      targets: 'input',
      color: [{
        delay: 0,
        duration: 500,
        value: '#111'
      }, {
        delay: 2000,
        duration: 1,
        value: '#fff'
      }],
      paddingLeft: [{
        delay: 300,
        duration: 1,
        value: 0
      }, {
        delay: 1700,
        duration: 1,
        value: '1rem'
      }],
      paddingRight: [{
        delay: 300,
        duration: 1,
        value: 0
      }, {
        delay: 1700,
        duration: 1,
        value: '8rem'
      }]
    }, 0)

    .add({
      targets: 'form',
      maxWidth: [{
        delay: 0,
        duration: 750,
        value: '65px'
      }, {
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
        delay: 1500,
        duration: 500,
        value: 0
      }, {
        delay: 750,
        duration: 500,
        value: 1
      }],
      complete: () => {
        if (keyByParamter) {
          errorMessage.innerHTML = 'Your player is muted'
        }
      }
    }, 0)

    .add({
      targets: '.loady',
      opacity: [{
        delay: 750,
        duration: 250,
        value: 1
      }, {
        delay: 1250,
        duration: 1,
        value: 0
      }]
    }, 0)

    .add({
      targets: '.player-wrapper',
      height: {
        delay: 2000,
        duration: 1000,
        value: player.scrollHeight,
        easing: 'easeInOutExpo'
      },
      complete: () => {
        document.querySelector('.player-wrapper').style.height = 'auto'
      }
    }, 0)
}

function onError(_, error) {
  if (error.details === 'bufferAppendError' || error.details === 'bufferStalledError') {
    console.warn(error)
    return
  }

  console.error(error)
  errorMessage.innerHTML = 'Stream key wrong or stream offline'
  keyInput.focus()
}

function onSuccess() {
  errorMessage.innerHTML = ''

  player.play().then(() => {
    if (initial) {
      initial = false
      transition()
    }
  })
}

function onSubmit() {
  keyInput.blur()

  const hls = new Hls()
  hls.loadSource(`/hls/${keyInput.value}.m3u8`)
  hls.attachMedia(player)

  hls.on(Hls.Events.MANIFEST_PARSED, onSuccess);
  hls.on(Hls.Events.ERROR, onError);
}

function initializePlayer() {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    keyByParamter = false
    player.muted = false
    onSubmit()
  })

  keyInput.focus()

  const searchParams = new URLSearchParams(window.location.search)
  if (searchParams.has('key')) {
    keyByParamter = true
    keyInput.value = searchParams.get('key')
    onSubmit()
  }

  player.addEventListener('volumechange', () => {
    errorMessage.innerHTML = ''
  })
}

initializePlayer()
