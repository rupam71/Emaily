import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleToken } from './../actions/index';


class Payment extends Component {
    state = {  }
    render() { 
        console.log(this.props)

        return ( 
            <StripeCheckout
                name='Emaily' //header
                description='$5 for 5 email credits'
                amount={500} //500 cent in us currency
                token={token=>this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                 <button className='btn'> {/* btn come from matreialize css */}
                    Add Credits
                </button>
            </StripeCheckout>
         );
    }
}
 
export default connect(null,{handleToken})(Payment);