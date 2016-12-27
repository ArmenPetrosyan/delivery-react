import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

const PopupContainer = (props) => {
    return (
      <Modal {...props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { props.children }
        </Modal.Body>
        <Modal.Footer>
          { !!props.btnTitle &&
            <Button onClick={props.onHide}>{props.btnTitle}</Button>
          }
        </Modal.Footer>
      </Modal>
    );
};

export default PopupContainer;