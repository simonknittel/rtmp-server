const form = document.querySelector('form')
const keyInput = form.querySelector('input')
const error = form.querySelector('.error')

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
      width: [{
        delay: 0,
        duration: 750,
        value: '100px'
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
        duration: 500,
        value: 720,
        easing: 'easeInOutExpo'
      }
    }, 0)
}

videojs('player').ready(function() {
  const player = this;

  player.on('error', (a, b, c) => {
    error.innerHTML = 'Stream key wrong or stream offline'
  })

  player.on('durationchange', () => {
    error.innerHTML = ''

    const hiddenPlayer = document.querySelector('.hide')
    if (hiddenPlayer) {
      transition();
    }

    player.play()
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    player.src({
      src: `/hls/${keyInput.value}.m3u8`,
      type: 'application/x-mpegURL'
    })
  })

  keyInput.focus()
})
