import PropTypes from 'prop-types';
import css from '../ImageGallery/ImageGallery.module.css'


export const ImageGallery = ({ children }) => {
  return (
        <div>
          <ul className={css.ImageGallery}>{children}</ul>
        </div>
  )
}

ImageGallery.propTypes = {
  children: PropTypes.array.isRequired,
};
