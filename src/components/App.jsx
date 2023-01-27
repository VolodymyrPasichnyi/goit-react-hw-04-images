import React, { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import toast from 'react-hot-toast';
import { pixabayApi } from 'services/pixabayApi';


export class App extends Component {
  state = {
    search: '',
    page: 1,
    list: [],
    totalhits: 0,
    largeImage: null,
    status: false,
    modal: false,
    error: null,
  };

  handleSubmit = search => {
    this.setState({ search, page: 1, list: [] })
  }

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }))
  }


  async componentDidUpdate(_,prevProps) {
    const currentSearch = this.state.search
    const prevSearch = prevProps.search
    const currentPage = this.state.page
    const prevPage = prevProps.page

    if (prevSearch !== currentSearch || prevPage !== currentPage) {
      this.statusChange(true)
      try {
        const data = await pixabayApi(currentSearch, currentPage)
        if (data.hits.length === 0) {
          return toast.error(`No find images`)
        }
        if (currentPage === 1) {
          toast.success(`We found ${data.totalHits} images`)
        }
        this.imageList(data.hits)
        this.totalHits(data.totalHits)
      } catch (error) {
        this.setState({ error })
        return toast.error(`Please, try again later`)
      } finally {
        this.statusChange(false)
      }
    }
  }

  statusChange = value => {
    this.setState({ status: value })
  }

  toggleModal = () => {
    this.setState(({ modal }) => ({ modal: !modal }))
  }

  largeImages = largeImage => {
    this.setState({ largeImage })
  }

  totalHits = totalhits => {
    this.setState({ totalhits })
  }

  imageList = data => {
    if (!this.state.list) {
      this.setState({ list: data })
      return
    }
    if (this.state.list) {
      this.setState(({ list }) => ({
        list: [...list, ...data],
      }))
      return
    }
  }

  render() {
    const {
      // search,
      // page,
      list,
      totalhits,
      largeImage,
      status,
      modal,
    } = this.state
    return (
      <div>
        <Toaster />
        <Searchbar onSubmit={this.handleSubmit} />
        {list.length > 0 && (
        <ImageGallery
          list={list}
        >
          {list?.map(el => (
            <ImageGalleryItem
              key={el.id}
              image={el.webformatURL}
              largeImg={el.largeImageURL}
              tags={el.tags}
              toggleModal={this.toggleModal}
              largeImages={this.largeImages}
            ></ImageGalleryItem>
          ))}
        </ImageGallery>)}
        {status && <Loader />}
        {modal && (
          <Modal 
            largeImage={largeImage}
            toggleModal={this.toggleModal}
          />
        )}
        {list && totalhits > 12 && (
          <Button loadMore={this.loadMore} />
        )}
      </div>
    )
  }
}
