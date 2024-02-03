import Image from 'next/image'

export const sizeList = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

const StrapiImage = ({ image, size }) => {
  const { formats } = image.data.attributes
  //console.log(formats[sizeList.medium].url)
  return <Image url={formats[size].url} width={formats[size].width} height={formats[size].height} />
}

export default StrapiImage
