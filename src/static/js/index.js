let flag = false

const detect = async (e) => {
  try {
    const img = e.target
    //load model
    const model = await cocoSsd.load()
    //classify the image
    const predictions = await model.detect(img)
    console.log(predictions)
    for (let x = 0; x < predictions.length; x++) {
			const p = document.createElement('p');
			p.innerText =
				predictions[x].class +
				' - with ' +
				Math.round(parseFloat(predictions[x].score) * 100) +
				'% confidence.';
			p.style =
				'margin-left: ' +
				predictions[x].bbox[0] +
				'px; margin-top: ' +
				(predictions[x].bbox[1] - 10) +
				'px; width: ' +
				(predictions[x].bbox[2] - 10) +
				'px; top: 0; left: 0;';

			const innerSquare = document.createElement('div');
			innerSquare.setAttribute('class', 'innerSquare');
			innerSquare.style =
				'left: ' +
				predictions[x].bbox[0] +
				'px; top: ' +
				predictions[x].bbox[1] +
				'px; width: ' +
				predictions[x].bbox[2] +
				'px; height: ' +
				predictions[x].bbox[3] +
				'px;';

			e.target.parentNode.appendChild(innerSquare);
			e.target.parentNode.appendChild(p);
		}
  } catch (err) {
    console.log(err)
  }
}

const handleClick = e => {
  //console.log(e.target)
  if(!flag) return 

  detect(e)

}

const handleChange = e => {
  const image = e.target.files[0]
  const preview = document.querySelector('#preview-image')
  preview.src = URL.createObjectURL(image)
  flag = true
}

const file = document.querySelector('#image-upload')
const image = document.querySelector('#preview-image')

file.addEventListener('change', handleChange)
image.addEventListener('click', handleClick)
