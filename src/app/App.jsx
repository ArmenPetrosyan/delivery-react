import React, {Component} from 'react';
import {
  Well,
  Col,
  Grid,
  PageHeader,
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  ProgressBar,
  Badge,
  Pager
} from 'react-bootstrap';
import 'App.less';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

export default class App extends Component {
  constructor(props) {
    super(props);

  }

  state = {

  };

  render () {
    const coords = {
      lat: 46.953584,
      lng: 32.065843
    };

    const about = (
      <p className="text-center spacer-top-80 padding-bottom-40 padding-both-160">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi cumque deserunt distinctio est illum iusto l
        aboriosam nihil odit pariatur quisquam quod rerum, sed similique sunt tempore. Adipisci fugit possimus rem.
      </p>
    );

    const interactiveMap = (
      <Gmaps
        width={'100%'}
        height={'600px'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={14}
        loadingMessage={'Be happy'}
        params={{v: '3.exp'}}
        onMapCreated={this.onMapCreated}>
        <Marker
          lat={coords.lat}
          lng={coords.lng}
          draggable={true}
          onDragEnd={this.onDragEnd} />
        <InfoWindow
          lat={coords.lat}
          lng={coords.lng}
          content={'Основной Склад'}
          onCloseClick={this.onCloseClick} />
      </Gmaps>
    );
    return (
      <article>
        <header className="dark-theme service-header padding-top-20 padding-bottom-20">
          <Grid>
            <h1 className="heading__type-h1">
              Delivery Service
            </h1>
          </Grid>
        </header>
        <main>
          <Grid>
            { about }
            { interactiveMap }
          </Grid>
        </main>
      </article>
    );
  }
}