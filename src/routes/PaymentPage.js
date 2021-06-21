import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class PaymentPage extends React.Component {

  render() {
    return (
      <div className="App">
      <Breadcrumb>
        <Breadcrumb.Item onClick={this.props.goToSubscriptionScreen}>Subscription Options</Breadcrumb.Item>
        <Breadcrumb.Item active>Payment</Breadcrumb.Item>
      </Breadcrumb>
        <div style={{flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
            <div style={{width: '50%'}}>
              <Form.Group>
                <Form.Label>Card Number</Form.Label>
                <Form.Control value={this.props.cardNumber} onChange={this.props.handleCardNumberChange} type="number" placeholder="Enter card number" />
              </Form.Group>
            </div>

            <div style={{width: '15%'}}>
              <Form.Group>
                <Form.Label>Expires Date</Form.Label>
                <Form.Control value={this.props.cardExpire} onChange={this.props.handleCardExpireChange} type="text" placeholder="MM/YY" />
              </Form.Group>
            </div>

            <div style={{width: '17%'}}>
              <Form.Group>
                <Form.Label>CVC</Form.Label>
                <Form.Control value={this.props.cvc} onChange={this.props.handleCardSecureNumberChange} type="number" placeholder="cvc" />
              </Form.Group>
            </div>
        </div>
        </div>
        <div style={{justifyContent: 'space-between', display: 'flex', marginRight: "2rem", marginTop: "2rem", marginLeft: '2rem'}}>
          <div style={{flexDirection: 'column', display: "flex", justifyContent: "center", borderRadius: '5px', borderColor: 'black', backgroundColor: 'gainsboro', padding: '1rem'}}>
            <div>
              <span style={{fontWeight: "bold", color: "black"}}>Current Subscription:</span> {this.props.duration} Months Subscription
            </div>
            <div style={{flexDirection: 'row', display: 'flex',}}>
              <span style={{fontWeight: "bold", color: "black"}}>Total Amount: </span>
              {
                this.props.isUpfront === 'No' ? 
                <div><span style={{color: "black"}}>{this.props.amount}$</span></div> :
                <div>
                  <span style={{color: "black", textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{this.props.amount}$</span> 
                  <span style={{fontWeight: "bold", color: "black", fontSize: '1.1rem', marginLeft: '0.4rem'}}>{this.props.amount * 0.9}$</span>
                </div>
              }
            </div>
            <div><span style={{fontWeight: "bold", color: "black"}}>Upfront Payment:</span> {this.props.isUpfront} </div>
          </div>
          <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{marginRight: '1rem'}}>
              <Button onClick={this.props.goToSubscriptionScreen} variant="secondary"><span style={{fontWeight: "bold", color: "white"}}>Back</span></Button>
            </div>
            <div>
              <Button onClick={this.props.goToConfirmScreen} variant="success"><span style={{fontWeight: "bold", color: "white"}}>Next</span></Button>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
    );
  }
}