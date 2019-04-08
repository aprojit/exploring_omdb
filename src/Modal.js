import { Component } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

class Modal extends Component {
  render() {
    return createPortal(this.props.children, modalRoot);
  }
}

export default Modal;
