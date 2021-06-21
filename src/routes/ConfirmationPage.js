import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner'

export default class ConfirmationPage extends React.Component {

    render() {
        return (
            <div className="App">
                {this.props.loading ? 
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '500px'}}>
                    <Spinner animation="grow" />
                </div> 
                : 
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item onClick={this.props.goToSubscriptionScreen}>Subscription Options</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={this.props.goToPaymentScreen}>Payment</Breadcrumb.Item>
                        <Breadcrumb.Item active>Confirm</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                        <div style={{flexDirection: 'column', width: '80%', height: '220px', display: "flex", justifyContent: "space-evenly", borderRadius: '5px', borderColor: 'black', backgroundColor: 'gainsboro', padding: '1rem'}}>
                            <div><span style={{fontWeight: "bold", color: "black"}}>Selected Subscription: </span> {this.props.duration} Months Subscription</div>
                            <div><span style={{fontWeight: "bold", color: "black"}}>USD Per GB: </span>{this.props.priceUsdPerGb}$</div>
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
                            <div style={{width: "25%"}}>
                                <Form.Control value={this.props.email} onChange={this.props.handleEmailChange} type="text" placeholder="Please enter your e-mail" />
                            </div>
                            <label>
                                <input type="checkbox" defaultChecked={this.props.checkbox} onChange={this.props.handleChangeCheckbox} />
                                <span style={{marginLeft: '0.4rem'}}>You must sign Terms and Conditions Agreement Contract before checkout</span>
                            </label>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", marginTop: '2rem'}}>
                            <div style={{marginRight: '1rem'}}>
                                <Button onClick={this.props.goToPaymentScreen} variant="secondary"><span style={{fontWeight: "bold", color: "white"}}>Back</span></Button>
                            </div>
                            <div>
                                <Button onClick={this.props.confirm} variant="success"><span style={{fontWeight: "bold", color: "white"}}>Confirm Order</span></Button>
                            </div>
                        </div>
                    </div>
                    <ToastContainer/>
                </div>
                }
            </div>
        )
    }
}
