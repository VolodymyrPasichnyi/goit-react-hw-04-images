import PropTypes from 'prop-types';
import css from '../Button/Button.module.css'


export const Button = ({ loadMore }) => {
  return (
    <div>
      <button
        className={css.Button}
        type="button"
        onClick={loadMore}>Load more</button>
    </div>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
