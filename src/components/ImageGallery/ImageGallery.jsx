import { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../ImageGallery/ImageGallery.module.css'


export class ImageGallery extends Component {

  render() {
    return (
      <div>
        <ul className={css.ImageGallery}>{this.props.children}</ul>
      </div>
      )
  }
}

ImageGallery.propTypes = {
  children: PropTypes.array.isRequired,
};
