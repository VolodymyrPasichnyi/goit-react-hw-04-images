import PropTypes from 'prop-types';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css'


export const ImageGalleryItem = ({ image, tags, largeImages, largeImg, toggleModal }) => {
  const clickModal = () => {
    largeImages(largeImg)
    toggleModal()
  }

  return (
    <li
      className={css.ImageGalleryItem} 
      onClick={clickModal}>
      <img src={image} alt={tags} />
    </li>
  )
}

ImageGalleryItem.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImages: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
}
