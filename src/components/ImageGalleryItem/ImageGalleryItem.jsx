import PropTypes from 'prop-types';
import { Component } from 'react';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css'


export class ImageGalleryItem extends Component {
  clickModal = () => {
    this.props.largeImages(this.props.largeImg)
    this.props.toggleModal()
  };

  render() {
    const { image, tags } = this.props
    return (
      <li
        className={css.ImageGalleryItem} 
        onClick={this.clickModal}>
        <img src={image} alt={tags} />
      </li>
    )
  }
}

ImageGalleryItem.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImages: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
}
