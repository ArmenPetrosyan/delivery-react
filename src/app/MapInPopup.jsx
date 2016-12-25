import React, {Component} from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import {Popover, Modal, Button} from 'react-bootstrap';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    markers : [
      <Marker
        lat={this.props.storeCoords.lat}
        lng={this.props.storeCoords.lng}
        draggable={false}
        title={'Основной Склад'}
        icon = 'svg/transport-1.svg'
      />
    ]
  };

  createMarker = (event) => {
    let marker = (
      <Marker
        lat={event.latLng.lat()}
        lng={event.latLng.lng()}
        draggable={false}
        content={'!'}
        icon = 'svg/transport-2.svg'
      />
    );

    let markers = this.state.markers;
    markers[1] = marker;

    this.setState({
      'markers' : markers
    });

    if(typeof this.props.saveMarker === "function") { this.props.saveMarker();}
  };

  render () {

    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Выберите пункт назначения</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Выберите город на карте</p>
          <Gmaps
            width={'100%'}
            height={'400px'}
            lat={this.props.storeCoords.lat}
            lng={this.props.storeCoords.lng}
            zoom={7}
            loadingMessage={'Be happy'}
            params={{v: '3.exp'}}
            onMapCreated={this.onMapCreated}
            onClick={this.createMarker}
          >
            { this.state.markers }
          </Gmaps>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Сохранить</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}