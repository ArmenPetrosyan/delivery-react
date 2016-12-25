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
    orders: []
  };

  render () {
    const coords = {
      lat: 46.953584,
      lng: 32.065843
    };

    const about = (
      <p className="dashes f1 text-center padding-top-40 padding-bottom-40 padding-both-160">
        На карте отображены заявки на доставку товаров с указанием пунктов назначения, ценой и весом груза.
        Для получения дополнительной информации щелкните на значек автомобиля.
      </p>
    );

    const emptyList = (
      <div className="dark-theme text-center">
        <img src="svg/ghost-2.svg" alt=""/>
        <p className="ghost-p bold spacer-top-20">Список заказов пуст</p>
        <Button bsStyle="success">Создать заказ</Button>
      </div>
    );

    let activeOrders = (
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Откуда</th>
            <th>Куда</th>
            <th>О</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
          </tr>
        </thead>
      </Table>
      this.state.orders.map((current) => {
          return (

          );
      })
    );

    const ordersForm = (
      <Form horizontal>
        <FormGroup controlId="formFrom">
          <Col sm={3}>
            <ControlLabel>
              Откуда
            </ControlLabel>
            <FormControl type="email" placeholder="Email" />
          </Col>
        </FormGroup>
      </Form>
    );

    const ordersList = (
      <div>
        <h3 className="padding-bottom-40">
          Список заказов
        </h3>
        { !this.state.orders.length ? emptyList : activeOrders }
        {/*{ ordersForm }*/}
      </div>
    );

    const interactiveMap = (
      <div className="padding-top-80">
        { about }
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
            content={'Основной Склад'}
            onDragEnd={this.onDragEnd}
            icon = 'svg/trolley.svg'
          />
          <InfoWindow
            lat={coords.lat}
            lng={coords.lng}
            content={'Основной Склад'}
            onCloseClick={this.onCloseClick} />
        </Gmaps>
      </div>

    );
    return (
      <article>
        <header className="padding-top-20 padding-bottom-20">
          <Grid>
            <h1 className="heading__type-h1">
              Delivery Service
            </h1>
          </Grid>
        </header>
        <main className="dark-theme service-header padding-bottom-40">
          <Grid>
            { ordersList }
            { interactiveMap }
          </Grid>
        </main>
      </article>
    );
  }
}