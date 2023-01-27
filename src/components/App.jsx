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
    const [error, setError] = useState(null)

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

    const totalHits = totalHits => {
      setTotalHits(totalHits)
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
          const { hits, totalhits} = await pixabayApi(search, page)
          if (hits.length === 0) {
            return toast.error(`No find images`)
          }
          if (page === 1) {
            toast.success(`We found ${totalhits} images`)
          }
          imageList(hits)
          totalHits(totalhits)
        } catch (error) {
          setError(error)
          return toast.error(`Please, try again later`)
        } finally {
          statusChange(false)
        }
       }
       data()
    }, [page, search])

    //   async componentDidUpdate(_,prevProps) {
//     const currentSearch = this.state.search
//     const prevSearch = prevProps.search
//     const currentPage = this.state.page
//     const prevPage = prevProps.page

//     if (prevSearch !== currentSearch || prevPage !== currentPage) {
//       this.statusChange(true)
//       try {
//         const data = await pixabayApi(currentSearch, currentPage)
        // if (data.hits.length === 0) {
        //   return toast.error(`No find images`)
        // }
        // if (currentPage === 1) {
        //   toast.success(`We found ${data.totalHits} images`)
        // }
//         this.imageList(data.hits)
//         this.totalHits(data.totalHits)
//       } catch (error) {
//         this.setState({ error })
        // return toast.error(`Please, try again later`)
//       } finally {
//         this.statusChange(false)
//       }
//     }
//   }

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
            {list && totalhits > 12 && (
              <Button loadMore={loadMore} />
            )}
        </div>
      )
}

