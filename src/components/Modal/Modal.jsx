import { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

// - Модальное окно (componentDidMount и componentWillUnmount)
//   - Проблема z-index, как решать без костылей (порталы)
//   - Слушатель на keydown для Escape
//   - Слушатель на клик по Backdrop

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClic = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="overlay" onClick={this.handleBackDropClic}>
        <div className="modal">
          {this.props.children}
          <img src="#" alt="#" />
        </div>
      </div>,
      modalRoot
    );
  }
}
