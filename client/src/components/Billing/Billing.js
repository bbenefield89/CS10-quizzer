import React, { Component } from 'react'
import axios from 'axios'

import Stripe from '../Stripe/Stripe'

import './Billing.css'

class Billing extends Component {
  getStripeToken = token => {
    const apiURI = process.env.NODE_ENV !== 'production' ? 'http://localhost:8000/api/payments/' : '/api/payments/'

    const request = {
      method: 'POST',
      url: apiURI,
      data: token
    }

    // TODO: figure out what to do when this request returns
    axios(request)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }
  
  render () {
    return (
      <div>
        <h1>Add Billing Statement</h1>

        {/**
          * this is a component brought in by react-stripe-checkout
          * this component takes a lot of possible attributes but this is all that
          * is needed for now. If we need more options make sure to check the docs
          * at https://github.com/azmenak/react-stripe-checkout
          *
          * TODO: dynamically set the currency attribute depending on the users
          *       location
          */}
        <Stripe />
      </div>
    )
  }
}

export default Billing
