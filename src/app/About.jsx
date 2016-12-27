import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const About = (props) => {
  return (
    <Modal {...props} bsSize="small" aria-labelledby="contained-modal-title-sm">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-sm">Авторы</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Петросян Армен</h4>
        <h4>Ясенко Наталья</h4>
        <h4>Нагорный Владимир</h4>
        <p>Группа 501м - 2016г</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Ок да</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default About;