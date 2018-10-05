# photo-slider

A simple photo slider

## Usage

Include `css` & `js` files
and call `photoSlider(images <Array>, options<Object>)` function

## Example

A live demo is available [here](https://ichebbi.github.io/photo-slider/)

```javascript
const images = [
  { src: 'link', alt: '', displayTime: 1000 },
  { src: 'link', alt: '', displayTime: 1000 }
]

const options = {
  defaultTime: 3000,
  autoStart: false,
  rewind: true,
  hideNavigation: true,
  hideStepper: true,
  customClass: 'custom-photo-slider'
  }

photoSlider(images, options)
```