import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button'
import PaymentPage from './PaymentPage';
import ConfirmationPage from './ConfirmationPage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import { withRouter } from 'react-router';

class SubscriptionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDuration: 12,
      priceUsdPerGb: 2,
      fetchData: [],
      selectedStorage: 5,
      selectedUpFrontPayment: 0,
      totalAmount: null,
      cardNumber: '',
      cardExpire: '',
      cardSecureNumber: '',
      email: '',
      checkbox: false,
      loading: false,
      pageIndex: 1,
    }
    this.onDurationValueChange = this.onDurationValueChange.bind(this);
    this.onStorageValueChange = this.onStorageValueChange.bind(this);
    this.onUpfrontValueChange = this.onUpfrontValueChange.bind(this);
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
    this.handleCardExpireChange = this.handleCardExpireChange.bind(this);
    this.handleCardSecureNumberChange = this.handleCardSecureNumberChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
  }

  componentDidMount() {
    this.setState({totalAmount: this.state.selectedDuration*this.state.priceUsdPerGb*this.state.selectedStorage})
    const requestOptions = {
      method: 'GET',
    };
    fetch('https://cloud-storage-prices-moberries.herokuapp.com/prices', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({fetchData: data.subscription_plans}));
  }

  onDurationValueChange = event => {
      this.setState({
        selectedDuration: event.target.value,
      });
      for (let index = 0; index < this.state.fetchData.length; index++) {
        if (this.state.fetchData[index].duration_months == event.target.value) {
          this.setState({priceUsdPerGb: this.state.fetchData[index].price_usd_per_gb}, () => {
            this.setState({totalAmount: this.state.selectedDuration*this.state.priceUsdPerGb*this.state.selectedStorage})
          })
          return
        }
      }
  }

  onStorageValueChange = event => {
    this.setState({
      selectedStorage: event.target.value,
    }, () => {
      this.setState({totalAmount: this.state.selectedDuration*this.state.priceUsdPerGb*this.state.selectedStorage})
    });
  }

  onUpfrontValueChange = event => {
    this.setState({
      selectedUpFrontPayment: event.target.value
    });
  }

  isUpfront = () => {
    return this.state.selectedUpFrontPayment == 1 ? 'Yes' : 'No';
  }

  handleCardNumberChange = event => {
    if (event.target.value.length <= 16) {
      this.setState({cardNumber: event.target.value});
      return
    }
  }

  handleCardExpireChange = event => {
    var today = new Date();
    let year = today.getFullYear().toString().substring(2, 5);
    let month = today.getMonth() + 1
    if (event.target.value.length <= 5) {
      let date = event.target.value;
      if (date[0] !== '1' && date[0] !== '0') {
        date = '';
      }
      if (date.length === 2) {
        if (parseInt(date.substring(0, 2)) > 12 || parseInt(date.substring(0, 2)) == 0) {
          date = date[0];
        } else if (this.state.cardExpire.length == 1) {
          date += '/';
        } else {
          date = date[0];
        }
      }
      if(event.target.value.length == 5 && parseInt(year.substring(0, 2)) >= parseInt(date.substring(3, 5))) {
        if (month >= parseInt(date.substring(0, 2))) {
          toast("Date must already be a later date!", {
            autoClose: 3000
          })
          return
        }
      }
      if(event.target.value.length == 5 && parseInt(year.substring(0, 2)) > parseInt(date.substring(3, 5))) {
        toast("Date must already be a later date!", {
          autoClose: 3000
        })
        return
      }
      this.setState({cardExpire: date});
    }
  }

  handleCardSecureNumberChange = event => {
    if (event.target.value.length <= 3) {
      this.setState({cvc: event.target.value});
      return
    }
  }

  handleEmailChange = event => {
    this.setState({email: event.target.value});
  }

  handleChangeCheckbox = () => {
      this.setState({checkbox: !this.state.checkbox});
  }

  goToSubscriptionScreen = () => {
    this.setState({pageIndex: 1})
  }

  goToPaymentScreen = () => {
    this.setState({pageIndex: 2})
  }

  goToConfirmationScreen = () => {
    this.setState({pageIndex: 3})
  }

  confirm = () => {
    this.setState({loading: true})
    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cardNumber: this.state.cardNumber,
            cardExpire: this.state.cardExpire,
            cvc: this.state.cvc,
            amount: this.state.amount
        })
    };
    if (this.state.checkbox === true && this.state.email !== '') {
        if (!validator.isEmail(this.state.email)) {
            toast("Enter valid e-mail!", {
                autoClose: 3000
            });
            this.setState({loading: false})
            return;
        }
        fetch('https://httpbin.org/post', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({loading: false});
                this.props.history.push('/success');
            })
            .catch(e => {
                console.log(e);
                this.setState({loading: false});
                toast("Something went wrong, please try again!", {
                    autoClose: 3000
                });
            })
    } else {
        toast("Please fill all blank fields correctly!", {
            autoClose: 3000
        });
        this.setState({loading: false})
    }
  }

  goToConfirmScreen = () => {
    if (!this.state.cardExpire || this.state.cvc.length != 3 || this.state.cardNumber.length != 16) {
      toast("Please fill all blank fields correctly!", {
        autoClose: 3000
      })
      return
    }
    this.goToConfirmationScreen();
  }

  render() {
    return (
      <div>
        {
        this.state.pageIndex == 1 ?
        <div className="App">
        <Breadcrumb>
          <Breadcrumb.Item active>Subscription Options</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
          <div style={{marginRight: '1rem', marginLeft: '1rem'}}>
            <span style={{fontWeight: "bold", color: "black"}}>Select Your Duration Time: </span>
          </div>
          <input type="radio" onChange={this.onDurationValueChange} value={3} checked={this.state.selectedDuration == 3} /> <span style={{marginLeft: '0.3rem', marginRight: '0.3rem'}}>3 Months</span>
          <input type="radio" onChange={this.onDurationValueChange} value={6} checked={this.state.selectedDuration == 6} /> <span style={{marginLeft: '0.3rem', marginRight: '0.3rem'}}>6 Months</span>
          <input type="radio" onChange={this.onDurationValueChange} value={12} checked={this.state.selectedDuration == 12} /> <span style={{marginLeft: '0.3rem', marginRight: '0.3rem'}}>12 Months</span>
        </div>
        <hr/>
        <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
          <div style={{marginRight: '1rem', marginLeft: '1rem'}}>
            <span style={{fontWeight: "bold", color: "black"}}>Select Your Amount of Storage in Cloud: </span>
          </div>
          <input type="radio" onChange={this.onStorageValueChange} value={5} checked={this.state.selectedStorage == 5} /> <span style={{marginLeft: '0.3rem', marginRight: '0.3rem'}}>5 GB</span>
          <input type="radio" onChange={this.onStorageValueChange} value={10} checked={this.state.selectedStorage == 10} /> <span style={{marginLeft: '0.3rem', marginRight: '0.3rem'}}>10 GB</span>
          <input type="radio" onChange={this.onStorageValueChange} value={50} checked={this.state.selectedStorage == 50} /> <span style={{marginLeft: '0.3rem', marginRight: '0.3rem'}}>50 GB</span>
        </div>
        <hr/>
        <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
          <div style={{marginRight: '1rem', marginLeft: '1rem'}}>
            <span style={{fontWeight: "bold", color: "black"}}>Select Will You Pay Upfront: </span>
          </div>
          <input type="radio" onChange={this.onUpfrontValueChange} value={1} checked={this.state.selectedUpFrontPayment == 1} /> <span style={{marginLeft: '0.3rem', marginRight: '0.3rem'}}>Yes</span>
          <input type="radio" onChange={this.onUpfrontValueChange} value={0} checked={this.state.selectedUpFrontPayment == 0} /> <span style={{marginLeft: '0.3rem', marginRight: '0.3rem'}}>No</span>
        </div>
        <hr/>
        <div style={{justifyContent: 'space-between', display: 'flex', marginRight: "2rem", marginTop: "2rem", marginLeft: '1rem'}}>
          <div style={{flexDirection: 'column', display: "flex", justifyContent: "center", borderRadius: '5px', borderColor: 'black', backgroundColor: 'gainsboro', padding: '1rem', marginLeft: '1rem'}}>
            <div><span style={{fontWeight: "bold", color: "black"}}>Current Subscription:</span> {this.state.selectedDuration} Months Subscription</div>
            <div style={{flexDirection: 'row', display: 'flex',}}>
              <span style={{fontWeight: "bold", color: "black"}}>Total Amount: </span>
              {
                this.state.selectedUpFrontPayment == 0 ? 
                  <div><span style={{color: "black"}}>{this.state.totalAmount}$</span></div> :
                  <div>
                    <span style={{color: "black", textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{this.state.totalAmount}$</span> 
                    <span style={{fontWeight: "bold", color: "black", fontSize: '1.1rem', marginLeft: '0.4rem'}}>{this.state.totalAmount * 0.9}$</span>
                  </div>
              }
            </div>
            <div><span style={{fontWeight: "bold", color: "black"}}>Upfront Payment:</span> {this.state.selectedUpFrontPayment == 1 ? 'Yes' : 'No'} </div>
          </div>
          <div>
            <Button onClick={this.goToPaymentScreen} variant="success"><span style={{fontWeight: "bold", color: "white"}}>Next</span></Button>
          </div>
        </div>
      </div> 
      : this.state.pageIndex == 2 ?
      <PaymentPage
        duration = {this.state.selectedDuration} 
        amount = {this.state.totalAmount}
        isUpfront = {this.isUpfront()}
        priceUsdPerGb = {this.state.priceUsdPerGb}
        storage = {this.state.selectedStorage}
        cardNumber = {this.state.cardNumber}
        cardExpire = {this.state.cardExpire}
        cvc = {this.state.cvc}
        handleCardNumberChange = {this.handleCardNumberChange}
        handleCardExpireChange = {this.handleCardExpireChange}
        handleCardSecureNumberChange = {this.handleCardSecureNumberChange}
        goToSubscriptionScreen = {this.goToSubscriptionScreen}
        goToConfirmationScreen = {this.goToConfirmationScreen}
        goToConfirmScreen = {this.goToConfirmScreen}
      />
      : 
      <ConfirmationPage
        duration = {this.state.selectedDuration} 
        amount = {this.state.totalAmount}
        isUpfront = {this.isUpfront()}
        priceUsdPerGb = {this.state.priceUsdPerGb}
        storage = {this.state.selectedStorage}
        cardNumber = {this.state.cardNumber}
        cardExpire = {this.state.cardExpire}
        cvc = {this.state.cardSecureNumber}
        goToSubscriptionScreen = {this.goToSubscriptionScreen}
        goToPaymentScreen = {this.goToPaymentScreen}
        handleEmailChange = {this.handleEmailChange}
        handleChangeCheckbox = {this.handleChangeCheckbox}
        confirm = {this.confirm}
      />
      }
      </div>
    );
  }
}

export default withRouter(SubscriptionPage);