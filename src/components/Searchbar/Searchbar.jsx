import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import css from '../Searchbar/Searchbar.module.css'
import { useState } from 'react';



export const Searchbar = ({ onSubmit }) => {
    const [search, setSearch] = useState('')

    const handleChange = e => {
      const { value } = e.target
      const normalizeValue = value.toLowerCase()
      setSearch(normalizeValue)
    }

    const handleSubmit = e => {
      e.preventDefault()
      if (!search.trim()) {
        return toast.error('Error')
      }
      onSubmit(search)
      setSearch('')
    }

    return (
      <header className={css.Searchbar}>
        <form 
          className={css.SearchForm} 
          onSubmit={handleSubmit}>
          <button 
            className={css.SearchFormButton}
            type="submit">
            <span>Search</span>
          </button>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            name="search"
            value={search}
            className={css.SearchFormInput}
          />
        </form>
      </header>
    )
}


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
