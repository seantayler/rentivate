import React from 'react'
import CheckoutForm from './CheckoutForm'
import {Elements} from 'react-stripe-elements';

class Payment extends React.Component {

  render (){
    return(
      <div className="payment">
        <Elements>
          <CheckoutForm {...this.props}/>
        </Elements>
      </div>
    )
  }
}

export default Payment
