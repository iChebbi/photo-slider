# photo-slider

A simple photo slider

## Usage

Include `css` & `js` files
and call `photoSlider(images <Array>, options<Object>)` function

## Example

```javascript
const images = [
  { src: 'link', alt: '', displayTime: 1000 },
  { src: 'link', alt: '', displayTime: 1000 }
]

const options = {
  defaultTime: 3000,
  autoStart: false,
  rewind: true,
  customClass: 'custom-photo-slider'
  }

photoSlider(images, options)
```