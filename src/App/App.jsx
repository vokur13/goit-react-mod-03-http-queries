import React, { Component } from 'react';
import axios from 'axios';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { SearchBar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Loader } from 'components/Loader';
import { Modal } from 'components/Modal';
// import Button from '@mui/material/Button';

const url =
  'https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12';

export class App extends Component {
  state = {
    showModal: false,
    isGalleryLoaded: false,
    selectedGallery: '',
  };

  async componentDidMount() {
    const response = await axios.get(url);
    this.setState({ selectedGallery: response.data.hits });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.setState({ isGalleryLoaded: false });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { showModal, isGalleryLoaded, selectedGallery } = this.state;
    const showLoader = this.state.selectedGallery && !isGalleryLoaded;
    //     const gallerySize = isGalleryLoaded ? '100%' : 0;

    return (
      <>
        <SearchBar />
        <Box display="grid" gridTemplateColumns="1fr" gridGap={4} pb={5}>
          {selectedGallery.length > 0 ? (
            <ImageGallery selectedGallery={selectedGallery} />
          ) : null}
          {/* <ImageGallery
            selectedGallery={selectedGallery}
            url={this.state.selectedGallery}
            width={gallerySize}
            height={gallerySize}
            onReady={() => this.setState({ isGalleryLoaded: true })}
          /> */}
          {showLoader && <Loader />}
        </Box>
        <button type="button" onClick={this.toggleModal}>
          Open modal
        </button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <h1>Hello, this is modal content as children!</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa et
              ab provident esse tempora dolorum dicta neque officia, distinctio
              ad?
            </p>
            <button type="button" onClick={this.toggleModal}>
              Close
            </button>
          </Modal>
        )}
      </>
    );
  }
}
