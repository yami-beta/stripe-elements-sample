import React, { useState } from "react";
import {
  PaymentRequestButtonElement,
  ReactStripeElements,
  injectStripe
} from "react-stripe-elements";

class _PaymentRequestForm extends React.Component<
  ReactStripeElements.InjectedStripeProps,
  {
    canMakePayment: boolean;
    paymentRequest: ReturnType<
      ReactStripeElements.StripeProps["paymentRequest"]
    >;
  }
> {
  constructor(props) {
    super(props);

    const paymentRequest = props.stripe.paymentRequest({
      country: "JP",
      currency: "jpy",
      total: {
        label: "Demo total",
        amount: 50
      }
    });

    paymentRequest.on("token", ({ complete, token, ...data }) => {
      console.log("Received Stripe token: ", token);
      console.log("Received customer information: ", data);
      complete("success");
    });

    paymentRequest.canMakePayment().then(result => {
      this.setState({ canMakePayment: !!result });
    });

    this.state = {
      canMakePayment: false,
      paymentRequest
    };
  }

  render() {
    return this.state.canMakePayment ? (
      <PaymentRequestButtonElement
        className="PaymentRequestButton"
        paymentRequest={this.state.paymentRequest}
        style={{
          paymentRequestButton: {
            theme: "dark",
            height: "64px"
          }
        }}
      />
    ) : null;
  }
}
const PaymentRequestForm = injectStripe(_PaymentRequestForm);

// 何故か function component だと
// For the paymentRequestButton Element, you must first check availability using paymentRequest.canMakePayment()
// というエラーを出す
const PaymentRequestFormFC = injectStripe(({ stripe }) => {
  const [canMakePayment, setCanMakePayment] = useState(false);

  const paymentRequest = stripe.paymentRequest({
    country: "JP",
    currency: "jpy",
    total: {
      label: "Demo total",
      amount: 50
    }
  });

  paymentRequest.canMakePayment().then(result => {
    setCanMakePayment(!!result);
  });

  if (!canMakePayment) {
    return null;
  }

  return <PaymentRequestButtonElement paymentRequest={paymentRequest} />;
});

export { PaymentRequestForm, PaymentRequestFormFC };
