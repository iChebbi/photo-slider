//Elements references
const photoSliderEl = document.getElementById('photo-slider')
const navigationEl = document.createElement('div')
const prevButtonEl = document.createElement('button')
const nextButtonEl = document.createElement('button')
const imageContainerEl = document.createElement('div')
const stepperEl = document.createElement('div')

function photoSlider(images, options) {
  const photoSliderState = {
    currentPhoto: 0,
    images,
    options: {
      defaultTime: options.defaultTime || 3000,
      autoStart: options.defaultTime || false,
      rewind: options.defaultTime || true,
      customClass: options.customClass || ''
    }
  }

  initialRender()
  startSlideShow()


  async function initialRender() {
    const { currentPhoto, images, options } = photoSliderState

    photoSliderEl.classList.add('photo-slider-container')

    // Images Initial render
    images.forEach((image, key) => {
      const imageEl = document.createElement('img')
      imageEl.id = 'slider-image-' + key
      imageEl.classList.add('slider-image')
      imageEl.alt = image.alt
      imageContainerEl.appendChild(imageEl)
    })

    // Stepper Initil render
    images.forEach((image, key) => {
      const stepperDotEl = document.createElement('span')
      stepperDotEl.classList.add('stepper-dot')
      stepperEl.addEventListener('click', setImage, false)
      stepperEl.appendChild(stepperDotEl)
      stepperDotEl.dataset.target = key
    })

    // Display first slide
    const firstImgEl = imageContainerEl.children[0]
    const firstImg = images[currentPhoto]
    await fetchImg(firstImgEl, firstImg.src)
    firstImgEl.classList.toggle('slider-image-active')

    //Set stepper to first step
    stepperEl.children[0].classList.toggle('stepper-dot-active')

    photoSliderEl.classList.add('photo-slider')
    if (options.customClass) photoSliderEl.classList.add(options.customClass)

    navigationEl.classList.add('navigation-container')
    imageContainerEl.classList.add('image-container')
    nextButtonEl.classList.add('btn-nav', 'next-nav')
    prevButtonEl.classList.add('btn-nav', 'prev-nav')
    stepperEl.classList.add('slider-stepper')

    nextButtonEl.innerHTML = '<svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style="vertical-align: middle;"><g><path d="m26.3 21.4q0 0.3-0.2 0.5l-10.4 10.4q-0.3 0.3-0.6 0.3t-0.5-0.3l-1.1-1.1q-0.2-0.2-0.2-0.5t0.2-0.5l8.8-8.8-8.8-8.7q-0.2-0.3-0.2-0.6t0.2-0.5l1.1-1.1q0.3-0.2 0.5-0.2t0.6 0.2l10.4 10.4q0.2 0.2 0.2 0.5z"></path></g></svg>'
    prevButtonEl.innerHTML = '<svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style="vertical-align: middle;"><g><path d="m26.5 12.1q0 0.3-0.2 0.6l-8.8 8.7 8.8 8.8q0.2 0.2 0.2 0.5t-0.2 0.5l-1.1 1.1q-0.3 0.3-0.6 0.3t-0.5-0.3l-10.4-10.4q-0.2-0.2-0.2-0.5t0.2-0.5l10.4-10.4q0.3-0.2 0.5-0.2t0.6 0.2l1.1 1.1q0.2 0.2 0.2 0.5z"></path></g></svg>'

    nextButtonEl.addEventListener('click', () => nextImage())
    prevButtonEl.addEventListener('click', () => prevImage())

    navigationEl.appendChild(prevButtonEl)
    navigationEl.appendChild(nextButtonEl)

    photoSliderEl.appendChild(navigationEl)
    photoSliderEl.appendChild(imageContainerEl)
    photoSliderEl.appendChild(stepperEl)

  }

  async function renderSliderImage() {
    const { currentPhoto, images } = photoSliderState

    const nextImgEl = imageContainerEl.children[currentPhoto]
    await fetchImg(nextImgEl, images[currentPhoto].src)

    Array.from(imageContainerEl.children).forEach((child, key) => {
      if (currentPhoto !== key) child.classList.remove('slider-image-active')
    })

    nextImgEl.classList.toggle('slider-image-active')
  }

  function renderStepper() {
    const { currentPhoto } = photoSliderState

    Array.from(stepperEl.children).forEach((child, key) => {
      if (currentPhoto === key) child.classList.toggle('stepper-dot-active')
      else child.classList.remove('stepper-dot-active')
    })
  }

  function nextImage() {
    const { currentPhoto, images } = photoSliderState
    photoSliderState.currentPhoto = images.length === currentPhoto + 1 ? 0 : currentPhoto + 1
    renderSliderImage()
    renderStepper()
  }

  function prevImage() {
    const { currentPhoto, images } = photoSliderState
    photoSliderState.currentPhoto = currentPhoto === 0 ? images.length - 1 : currentPhoto - 1
    renderSliderImage()
    renderStepper()
  }

  function setImage(e) {
    e.stopPropagation()
    const imageIndex = e.target.dataset.target
    if (!isNaN(Number(imageIndex))) {
      photoSliderState.currentPhoto = Number(imageIndex)
      renderSliderImage()
      renderStepper()
    }
  }

  function startSlideShow() {
    const { autoStart, defaultTime, rewind } = photoSliderState.options
    if (!autoStart) return

    const getDisplayTime = () => {
      const { currentPhoto, images, } = photoSliderState
      return images[currentPhoto].displayTime ? images[currentPhoto].displayTime : defaultTime
    }

    const slide = () => {
      rewind ? prevImage() : nextImage()
      const displayTime = getDisplayTime()
      setTimeout(slide, displayTime)
    }

    const initDisplayTime = getDisplayTime()
    setTimeout(slide, initDisplayTime)
  }
}

function fetchImg(imgEl, src) {
  return new Promise(resolve => {

    //display loading spinner only if loading time took more than 500 ms
    const addSpinner = () => photoSliderEl.classList.add('spinner')
    const spinnerTimeout = setTimeout(() => addSpinner(), 500)

    imgEl.onload = () => {
      photoSliderEl.classList.remove('spinner')
      clearTimeout(spinnerTimeout)
      resolve()
    }
    imgEl.src = src
  })

}
