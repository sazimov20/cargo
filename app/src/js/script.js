// nav
const navBtn = document.querySelector('.nav__btn');
const navContent = document.querySelector('.nav-content');
navBtn.addEventListener('click',function() {
    navContent.classList.toggle('active')
    this.classList.toggle('active')
})

// slider

const sliderItems = document.querySelectorAll('.slider__item');
const sliderBtns = document.querySelectorAll('[data-target]');
let activeSlide = 0

for (let i = 0; i < sliderItems.length; i++) {
    if (sliderItems[i].classList.contains('active')) {
        activeSlide = i
    }
}
for (let i = 0; i < sliderBtns.length; i++) {
    sliderBtns[i].addEventListener('click',function (e) {
        move(e.target.getAttribute('data-target'))
    })
}
function move(btn) {
    if (btn === 'next') {
        if (activeSlide < sliderItems.length-1) {
            activeSlide++
        } else {
            activeSlide = 0
        }
    }else{
        if (activeSlide > 0) {
            activeSlide--
        } else {
            activeSlide = sliderItems.length-1
        }
    }
    sliderItems.forEach(item=>{
        item.classList.remove('active')
    })
    sliderItems[activeSlide].classList.add('active')
}

// apply form

const applyStep = document.querySelectorAll('.apply-step');
const applyBlock = document.querySelectorAll('.apply-block');
const applyBtn = document.querySelectorAll('.apply-btn, .apply-back, .apply-next');

for (let i = 0; i < applyBtn.length; i++) {
    applyBtn[i].addEventListener('click',function (e) {
        e.preventDefault()
        if (i === 0) {
            applyStep[1].classList.add('active')
            applyBlock[0].classList.remove('active')
            applyBlock[1].classList.add('active')
        }
        if (i === 1) {
            applyStep[1].classList.remove('active')
            applyBlock[0].classList.add('active')
            applyBlock[1].classList.reomve('active')
        }
        if (i === 2) {
            for (let i = 0; i < applyStep.length; i++) {
                applyStep[i].style.display = 'none'
            }
            applyBlock[2].style = 'background:transparent;padding:0;'
            applyBlock[1].classList.remove('active')
            applyBlock[2].classList.add('active')
        }
    })
    
}

// video

const video = document.querySelector('.video-mp4');
const speedWatch = document.querySelector('.video__speed-watch');
const prevSpeed = document.querySelector('.video__prev-speed');
const nextSpeed = document.querySelector('.video__next-speed');
const prev = document.querySelector('.video__prev');
const next = document.querySelector('.video__next');
const play = document.querySelector('.video__play');
const start = document.querySelector('#start');
const end = document.querySelector('#end');
const duration = document.querySelector('.video-duration');
const line = document.querySelector('.video-line');
const volume = document.querySelector('.video-volume input');
const volumeIcon = document.querySelector('.video__volume-icon');
play.addEventListener('click', function () {playPause()})
video.addEventListener('click', function () {playPause()})
prevSpeed.addEventListener('click',function () {videoSpeed('-')})
nextSpeed.addEventListener('click',function () {videoSpeed('+')})

function playPause() {
    play.classList.toggle('active')
    if (video.paused) {
        video.play()
        endTime()
        startTime()
    }else{
        video.pause()
    }
}

function videoSpeed(symbol) {
    if (symbol === '+' && video.playbackRate < 2) {
        video.playbackRate += 0.25
    }else if (symbol === '-' && video.playbackRate > 0) {
        video.playbackRate += -0.25
    }
    speedWatch.style.display = 'flex'
    speedWatch.innerHTML = video.playbackRate + 'x'
    setTimeout(() => {
        speedWatch.style.display = 'none'
    }, 1500);
}

prev.addEventListener('click',function () {alert('no video!!!')})
next.addEventListener('click',function () {alert('no video!!!')})

function startTime() {
    setInterval(() => {
        start.innerHTML = formatTime(video.currentTime)
    }, 1000);
}
function endTime() {
    end.innerHTML = formatTime(video.duration)
}

function formatTime(num) {
    const noll = (time)=> time < 10 ? '0'+time : time
    let hour = Math.trunc(num / 3600)
    num -= (hour * 3600)
    let min = Math.trunc(num / 60)
    num -= (min * 60)
    num = Math.trunc(num)
    return `${noll(min)}:${noll(num)}`
}

duration.addEventListener('click',function (e) {
    console.log(duration.clientWidth);
    let videoTime = (e.offsetX / duration.clientWidth) * video.duration
    video.currentTime = videoTime
})
video.addEventListener('timeupdate', function () {
    let lineWidth = (video.currentTime / video.duration)
    line.style.width = lineWidth * 100 + '%'
})
video.addEventListener('dblclick', function () {video.requestFullscreen()})

const volumeClass = ['mute','off','down','normal','up']

video.onvolumechange = ()=>{
    for (let i = 0; i < volumeClass.length; i++) {
        volumeIcon.classList.remove(volumeClass[i]) 
    }
    let volume = video.volume * 100
    if (volume.muted) {
        volumeIcon.classList.add('mute')
    }else if (volume > 75) {
        volumeIcon.classList.add('up')
    }else if (volume > 45) {
        volumeIcon.classList.add('normal')
    }else if (volume > 15) {
        volumeIcon.classList.add('down')
    }else if (volume > 0) {
        volumeIcon.classList.add('off')
    }else if (volume == 0) {
        volumeIcon.classList.add('mute')
    }
}
volumeIcon.addEventListener('click', function () {
    video.muted ? video.muted = false : video.muted = true
})

volume.addEventListener('click', function (e) {
    video.volume = e.target.value / 100
})

// service slider

const serviceBlock = document.querySelector('.service__block');
const serviceBox = document.querySelectorAll('.service__box');
const serviceLeft = document.querySelector('.service__left');
const serviceRight = document.querySelector('.service__right');
serviceLeft.addEventListener('click', function () {
    serviceBlock.scrollLeft = serviceBlock.scrollLeft - 150
})
serviceRight.addEventListener('click', function () {
    serviceBlock.scrollLeft = serviceBlock.scrollLeft + 150
})
let serviceWidth = serviceBlock.scrollWidth - serviceBlock.clientWidth

function serviceSlider() {
    if (serviceBlock.scrollLeft > (serviceWidth - 1)) {
        serviceBlock.scrollLeft -= serviceWidth
    }else{
        serviceBlock.scrollLeft += 1
    }
}
setInterval(() => {
    serviceSlider()
}, 15);

// accardion

const accardionBox = document.querySelectorAll('.accardion__box');

for (let i = 0; i < accardionBox.length; i++) {
    accardionBox[i].addEventListener('click', function () {
        for (let j = 0; j < accardionBox.length; j++) {
            accardionBox[j].classList.remove('active')
        }
        accardionBox[i].classList.add('active')
    })
}