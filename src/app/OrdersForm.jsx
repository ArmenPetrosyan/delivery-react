import React from 'react';
import {
  Well,
  Col,
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  ButtonGroup
} from 'react-bootstrap';

const OrdersForm = (props) => {
   return (
     <div>
       <h4 className="color-dark semibold">Новый заказ</h4>
       <Well>
         <Form horizontal>
           <FormGroup controlId="formFrom">
             {/*<Col sm={2}>*/}
               {/*<ControlLabel>*/}
                 {/*Откуда*/}
               {/*</ControlLabel>*/}
               {/*<br/>*/}
               {/*<br/>*/}
               {/*<a onClick={props.onShowModal}>*/}
                 {/*Указать*/}
               {/*</a>*/}
             {/*</Col>*/}
             <Col sm={2}>
               <ControlLabel>
                 Куда
               </ControlLabel>
               <br/>
               <br/>
               <a onClick={props.onShowModal}>
                 Указать
               </a>
             </Col>
             <Col sm={3}>
               <ControlLabel>
                 Объем <sup>т</sup>
               </ControlLabel>
               <br/>
               <br/>
               <FormControl
                 type="number"
                 min={0}
                 onChange={props.handleChange}
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
                 min={0}
                 onChange={props.handleChange}
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
                 min={0}
                 onChange={props.handleChange}
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
     </div>
   );
};

export default OrdersForm;