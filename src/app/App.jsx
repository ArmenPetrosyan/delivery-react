import React, {Component} from 'react';
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
import 'App.less';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import MapInPopup from 'MapInPopup.jsx';
import About from 'About.jsx';

// Google maps API Key - AIzaSyCAkrHDF1qzFbANyiUEFX4HNhmmVnslOSA

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  coords = {
    lat: 46.953584,
    lng: 32.065843
  };

  onStoreDragEnd = (event) => {
    this.coords = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
  };

  state = {
    lgShow            : false,
    aboutShow         : false,
    showOrderAddForm  : false,
    orders            : [],
    markers           : [
      <Marker
        lat={this.coords.lat}
        lng={this.coords.lng}
        draggable={true}
        title={'Основной Склад'}
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

  render () {
    const about = (
      <p className="dashes f1 text-center padding-top-40 padding-bottom-40 padding-both-160">
        На карте отображены заявки на доставку товаров с указанием пунктов назначения, ценой и весом груза.
        Для получения дополнительной информации щелкните на значек автомобиля.
      </p>
    );

    const emptyList = (
      <Row>
        <Col sm="12">
          <div className="dark-theme text-center">
            <img src="svg/ghost-2.svg" alt=""/>
            <p className="ghost-p bold spacer-top-20">Список заказов пуст</p>
            <Button bsStyle="success">Создать заказ</Button>
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
          { this.state.orders.map((current) => {

          })}
          </tbody>
        </Table>
      </Well>
    );

    const ordersForm = (
      <Well>
        <Form horizontal>
          <FormGroup controlId="formFrom">
            <Col sm={2}>
              <ControlLabel>
                Откуда
              </ControlLabel>
              <br/>
              <br/>
              <a onClick={this.onShowModal}>
                Указать
              </a>
            </Col>
            <Col sm={2}>
              <ControlLabel>
                Куда
              </ControlLabel>
              <br/>
              <br/>
              <a onClick={this.onShowModal}>
                Указать
              </a>
            </Col>
            <Col sm={2}>
              <ControlLabel>
                Объем <sup>кг</sup>
              </ControlLabel>
              <br/>
              <br/>
              <FormControl
                type="number"
                onChange={this.handleChange}
              />
            </Col>
            <Col sm={3}>
              <ControlLabel>
                Стоимость <sup>грн</sup>
              </ControlLabel>
              <br/>
              <br/>
              <FormControl
                type="number"
                onChange={this.handleChange}
              />
            </Col>
            <Col sm={3}>
              <ControlLabel>
                Штраф <sup>грн/час</sup>
              </ControlLabel>
              <br/>
              <br/>
              <FormControl
                type="number"
                onChange={this.handleChange}
              />
            </Col>
            <Col sm="12">
              <ButtonGroup>
                <Button bsStyle="success" className="spacer-top-20">
                  Добавить заказ
                </Button>
                <Button type="reset" bsStyle="default" className="spacer-top-20">
                  Очистить
                </Button>
              </ButtonGroup>
            </Col>
          </FormGroup>
        </Form>
      </Well>
    );

    const modal = (
      <MapInPopup
        storeCoords = {this.coords}
        show={this.state.lgShow}
        onHide={this.onHideModal}
      />
    );

    const tooltips = {
      t1: (<Tooltip id="tooltip">Грузоподъемность (Тонны)</Tooltip>),
      t2: (<Tooltip id="tooltip">Средняя скорость (км/ч)</Tooltip>),
      t3: (<Tooltip id="tooltip">Средняя скорость (км/ч)</Tooltip>),
    };

    const autoDashboard = (
      <Well>
        <Table>
          <thead>
          <tr>
            <th>#</th>
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
            <th>t <sup>ч</sup></th>
            <th>$ <sup>грн/км</sup></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>1</th>
            <td>0.5</td>
            <td>75</td>
            <td>1</td>
            <td>10</td>
          </tr>
          <tr>
            <th>2</th>
            <td>1.5</td>
            <td>60</td>
            <td>1.2</td>
            <td>12</td>
          </tr>
          </tbody>
        </Table>
        <Button bsStyle="success" className="add-auto">
          Добавить авто
        </Button>
      </Well>
    );

    const ordersList = (
      <div className="padding-top-40">
        <Row>
          <Col sm="8">
            { ordersForm }
          </Col>
          <Col sm="4">
            { autoDashboard }
          </Col>
          <Col sm="12">
            <h3 className="padding-bottom-40">
              Список заказов
            </h3>
          </Col>
          { modal }
          { !this.state.orders.length && emptyList }
          { !!this.state.orders.length && activeOrders}
        </Row>
      </div>
    );

    const interactiveMap = (
      <div className="padding-top-80">
        { about }
        <Gmaps
          key="AIzaSyCAkrHDF1qzFbANyiUEFX4HNhmmVnslOSA"
          width={'100%'}
          height={'600px'}
          lat={this.coords.lat}
          lng={this.coords.lng}
          minZoom={7}
          zoom={7}
          maxZoom={7}
          loadingMessage={'Be happy'}
          params={{v: '3.exp'}}
          onMapCreated={this.onMapCreated}
          onClick={this.createMarker }
        >
          { this.state.markers }
          <InfoWindow
            lat={46.957439141148775}
            lng={32.06686019897461}
            content={'Основной Склад'}
            onCloseClick={this.onCloseClick} />
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