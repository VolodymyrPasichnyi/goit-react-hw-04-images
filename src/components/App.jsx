import { Toaster } from 'react-hot-toast';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import toast from 'react-hot-toast';
import { pixabayApi } from 'services/pixabayApi';
import { useState } from 'react';
import { useEffect } from 'react';


export const App = () => {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [list, setList] = useState([])
    const [totalhits, setTotalHits] = useState(0)
    const [largeImage, setLargeImage] = useState(null)
    const [status, setStatus] = useState(false)
    const [modal, setModal] = useState(false)

    const handleSubmit = search => {
      setSearch(search)
      setPage(1)
      setList([])
    }

    const loadMore = () => {
      setPage(prevPage => prevPage + 1)
    }

    const toggleModal = () => {
      setModal(prevState => !prevState)
    }

    const largeImages = largeImage => {
      setLargeImage(largeImage)
    }

    const statusChange = value => {
      setStatus(value)
    }

    const totalHits = totalhits => {
      setTotalHits(totalhits)
    }

    const imageList = data => {
      if (!setList) {
        return setList(data)
      }
      if (setList) {
        return setList(prevState => [...prevState,...data])
      }
    }
    
    useEffect(() => {
      if (!search) {
        return
      }
       const data = async () => {
        statusChange(true)
        try {
          const { hits, total} = await pixabayApi(search, page)
          if (hits.length === 0) {
            return toast.error(`No find images`)
          }
          if (page === 1) {
             toast.success(`We found ${total} images`)
          }
          imageList(hits)
          totalHits(total)
        } catch (error) {
          return toast.error(`Please, try again later`)
        } finally {
          statusChange(false)
        }
       }
       data()
    }, [page, search])


  return (
        <div>
            <Toaster />
            <Searchbar onSubmit={handleSubmit} />
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
                  toggleModal={toggleModal}
                  largeImages={largeImages}
                ></ImageGalleryItem>
              ))}
            </ImageGallery>)}
            {status && <Loader />}
            {modal && (
              <Modal 
                largeImage={largeImage}
                toggleModal={toggleModal}
              />
            )}
            {list.length && !status && totalhits > 12 && (
              <Button loadMore={loadMore} />
            )}
        </div>
      )
}

 