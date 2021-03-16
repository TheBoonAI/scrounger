const SIZE = 224
const QUALITY = 0.8

export const uploadAsset = ({ uploadedAssets, setUploadedAssets }) => async (
  event,
) => {
  const file = event.target.files[0]

  if (!file) return

  const fileName = file.name

  // create img element from File object
  const img = document.createElement('img')

  img.src = await new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.readAsDataURL(file)
  })

  await new Promise((resolve) => {
    img.onload = resolve
  })

  // create canvas
  const canvas = document.createElement('canvas')

  canvas.width = SIZE
  canvas.height = SIZE

  canvas.getContext('2d').clearRect(0, 0, SIZE, SIZE)

  // find proper resize ratio and position
  const ratioWidth = img.width / canvas.width
  const ratioHeight = img.height / canvas.height

  const ratioAspect = ratioWidth > 1 ? ratioWidth : ratioHeight

  const newWidth = img.width / ratioAspect
  const newHeight = img.height / ratioAspect

  const offsetX = canvas.width / 2 - newWidth / 2
  const offsetY = canvas.height / 2 - newHeight / 2

  // resize
  canvas.getContext('2d').drawImage(img, offsetX, offsetY, newWidth, newHeight)

  // export base64
  const dataURL = canvas.toDataURL('image/jpeg', QUALITY)

  // save
  setUploadedAssets({ ...uploadedAssets, [fileName]: dataURL })
}
