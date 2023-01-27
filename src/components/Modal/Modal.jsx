import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from '../Modal/Modal.module.css'
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root')

export const Modal = ({ largeImage, toggleModal }) => {
    const handleClose = (e) => {
      if(e.target === e.currentTarget || e.code === 'Escape') 
        toggleModal()
    }

    useEffect(() => {
      window.addEventListener('keydown', handleClose)
      return() => {
        window.removeEventListener('keydown', handleClose)
    }
})

  return createPortal(
      <div
         className={css.Overlay}
         onClick={handleClose}>
        <div className={css.Modal}>
          <img src={largeImage} alt="" />
        </div>
      </div>,
      modalRoot
    )
}


Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
}
