import React, {Component} from 'react';
import MapInPopup from 'MapInPopup.jsx';
import About from 'About.jsx';
import OrdersForm from 'OrdersForm.jsx';
import PopupContainer from 'PopupContainer.jsx';
import {Order, OrderList} from 'classes/Order';
import Car from 'classes/Car';

import {
  Well,
  Col,
  Row,
  Grid,
  Table,
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  OverlayTrigger,
  Tooltip,
  ButtonGroup
} from 'react-bootstrap';

import {
  Gmaps,
  Marker,
  InfoWindow,
  Circle
} from 'react-gmaps';

import 'App.less';

// Google maps API Key - AIzaSyCAkrHDF1qzFbANyiUEFX4HNhmmVnslOSA

export default class App extends Component {
  constructor(props) {
    super(props);

    // начальный список заявок
    this.orders = [
      new Order(new google.maps.LatLng(this.storeCoords.lat,this.storeCoords.lng), new google.maps.LatLng(46.961410, 32.009178), 1200),
      new Order(new google.maps.LatLng(this.storeCoords.lat,this.storeCoords.lng), new google.maps.LatLng(47.894131, 33.410428), 1200),
      new Order(new google.maps.LatLng(this.storeCoords.lat,this.storeCoords.lng), new google.maps.LatLng(49.535360, 34.578847), 1000),
      new Order(new google.maps.LatLng(this.storeCoords.lat,this.storeCoords.lng), new google.maps.LatLng(50.383188, 50.383188), 1200),
      new Order(new google.maps.LatLng(this.storeCoords.lat,this.storeCoords.lng), new google.maps.LatLng(48.758408, 30.177106), 800),
      new Order(new google.maps.LatLng(this.storeCoords.lat,this.storeCoords.lng), new google.maps.LatLng(46.585176, 32.686837), 5500)
    ];

    // транспорт
    this.cars = [
      new Car('MAN', 10, 95, 1, 10),
      new Car('MAZ', 15, 70, 1.5, 10),
      new Car('Kamaz', 21, 60, 2, 10),
      new Car('Renault', 25, 70, 2.1, 15)
    ];
  }

  storeCoords = {
    lat: 46.953584,
    lng: 32.065843
  };

  onStoreDragEnd = (event) => {
    this.storeCoords = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
  };

  state = {
    lgShow                : false,
    aboutShow             : false,
    ordersFormPopupShow   : false,
    showOrderAddForm      : false,
    orders                : [],
    markers               : [
      <Marker
        lat={this.storeCoords.lat}
        lng={this.storeCoords.lng}
        draggable={true}
        label={'Основной Склад'}
        onDragEnd={this.onStoreDragEnd}
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

    let markers = [...this.state.markers, marker]

    this.setState({
      'markers' : markers
    });
  };

  onHideModal = () => {
    this.setState({
      lgShow : false
    });
  };

  onShowModal = () => {
    this.setState({
      lgShow : true
    });
  };

  onHideAbout = () => {
    this.setState({
      aboutShow : false
    });
  };

  onShowAbout = () => {
    this.setState({
      aboutShow : true
    });
  };

  onShowOrdersForm = () => {
    this.setState({
      ordersFormPopupShow : true
    });
  };

  onHideOrdersForm = () => {
    this.setState({
      ordersFormPopupShow : false
    });
  };

  render () {

    /////////////////
    window.Order = Order;
    window.OrderList = new OrderList(this.orders);
    // window.OrderList = OrderList;
    window.orders = this.orders;
    /////////////////

    const about = (
      <p className="dashes f1 text-center padding-top-40 padding-bottom-40">
        На карте отображены заявки на доставку товаров с указанием пунктов назначения, ценой и весом груза.
        Для получения дополнительной информации щелкните на значек автомобиля.
      </p>
    );

    const ordersForm = (<OrdersForm onShowModal={this.onShowModal} />);
    const ordersFormPopup = (
      <PopupContainer
        title="Добавить заказ"
        show={this.state.ordersFormPopupShow}
        onHide={this.onHideOrdersForm}
      >
        { ordersForm }
      </PopupContainer>
    );

    const emptyList = (
      <Row>
        <Col sm="12">
          <div className="dark-theme text-center">
            <img src="svg/ghost-2.svg" alt=""/>
            <p className="ghost-p spacer-top-20">Список заказов пуст</p>
            {ordersFormPopup}
            <Button bsStyle="success" onClick={this.onShowOrdersForm}>Создать заказ</Button>
          </div>
        </Col>
      </Row>
    );

    let activeOrders = (
      <Well>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Время поступления</th>
              <th>Откуда</th>
              <th>Куда</th>
              <th>Срок доставки</th>
              <th>Плата</th>
              <th>Штраф (грн/час)</th>
            </tr>
          </thead>
          <tbody>
            { this.orders.map((order, index) => {
              return (
                <tr>
                  <td>
                    {index}
                  </td>
                  <td>
                    {order.initialTime.toDateString()}
                  </td>
                  <td>
                    {order.from.title}
                  </td>
                  <td>
                    {order.to.title}
                  </td>
                  <td>
                    {order.time}
                  </td>
                  <td>
                    {order.amount}
                  </td>
                  <td>
                    {order.fine}
                  </td>
                  <td>
                    <Button bsStyle="link">
                      Удалить
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Well>
    );

    const modal = (
      <MapInPopup
        storeCoords = {this.storeCoords}
        show={this.state.lgShow}
        onHide={this.onHideModal}
      />
    );

    const tooltips = {
      t1: (<Tooltip id="tooltip">Грузоподъемность (тонны)</Tooltip>),
      t2: (<Tooltip id="tooltip">Средняя скорость (км/ч)</Tooltip>),
      t3: (<Tooltip id="tooltip">Время загрузки+разгрузки (ч)</Tooltip>),
      t4: (<Tooltip id="tooltip">Стоимость перевозки груза (грн/ч)</Tooltip>),
    };

    let autoRows = this.cars.map((car, index) => {
      return (
        <tr>
          <th>{index + 1}</th>
          <td>{car.name}</td>
          <td>{car.carrying}</td>
          <td>{car.speed}</td>
          <td>{car.loadingTime}</td>
          <td>{car.costs}</td>
        </tr>
      );
    });

    const autoDashboard = (
      <div>
        <h4 className="color-dark semibold">Автопарк</h4>
        <Well>
          <Table>
            <thead>
            <tr>
              <th>#</th>
              <th>
                Модель
              </th>
              <th>
                <OverlayTrigger placement="top" overlay={tooltips.t1}>
                <span>
                  Г/П <sup>т</sup>
                </span>
                </OverlayTrigger>
              </th>
              <th>
                <OverlayTrigger placement="top" overlay={tooltips.t2}>
                <span>
                  V <sup>км/ч</sup>
                </span>
                </OverlayTrigger>
              </th>
              <th>
                <OverlayTrigger placement="top" overlay={tooltips.t3}>
                <span>
                  t <sup>ч</sup>
                </span>
                </OverlayTrigger>
              </th>
              <th>
                <OverlayTrigger placement="top" overlay={tooltips.t4}>
                <span>
                  $ <sup>грн/км</sup>
                </span>
                </OverlayTrigger>
              </th>
            </tr>
            </thead>
            <tbody>
              {autoRows}
            </tbody>
          </Table>
          <Button bsStyle="success" className="add-auto">
            Добавить авто
          </Button>
        </Well>
      </div>

    );

    const ordersList = (
      <div className="padding-top-40">
        <Row>
          <Col sm="6">
            { ordersForm }
          </Col>
          <Col sm="6">
            { autoDashboard }
          </Col>
          <Col sm="12">
            <h3 className="padding-bottom-40">
              Список заказов
            </h3>
          </Col>
          <Col sm="12">
            { modal }
            { !this.orders.length && emptyList }
            { !!this.orders.length && activeOrders }
          </Col>
        </Row>
      </div>
    );

    const interactiveMap = (
      <div className="padding-top-80">
        { about }
        <Gmaps
          width={'100%'}
          height={'600px'}
          lat={this.storeCoords.lat}
          lng={this.storeCoords.lng}
          minZoom={7}
          zoom={7}
          maxZoom={7}
          loadingMessage={'Be happy'}
          params={{v: '3.exp',key:'AIzaSyCAkrHDF1qzFbANyiUEFX4HNhmmVnslOSA'}}
          onMapCreated={this.onMapCreated}
          onClick={this.createMarker }
        >
          { this.state.markers }
        </Gmaps>
      </div>

    );
    return (
      <article>
        <header className="padding-top-20 padding-bottom-20">
          <Grid>
            <Row>
              <Col sm="10">
                <h1 className="heading__type-h1">
                  Delivery Service
                </h1>
              </Col>
              <Col sm="2" className="aligned-right">
                <Button className="strange-btn" onClick={this.onShowAbout}>
                  Об авторах
                </Button>
                <About
                  show={this.state.aboutShow}
                  onHide={this.onHideAbout}
                />
              </Col>
            </Row>
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