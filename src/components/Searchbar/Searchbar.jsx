import { Component } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import css from '../Searchbar/Searchbar.module.css'


export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = e => {
    const { value } = e.target
    const normalizeValue = value.toLowerCase()
    this.setState({ search: normalizeValue })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { search } = this.state
    if (!search.trim()) {
      return toast.error('Error')
    }
    this.props.onSubmit(search)
    this.setState({ search: '' })
  }


  render() {
    const { search } = this.state
    return (
      <header className={css.Searchbar}>
        <form 
          className={css.SearchForm} 
          onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
            name="search"
            value={search}
            className={css.SearchFormInput}
          />
        </form>
      </header>
    )
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
