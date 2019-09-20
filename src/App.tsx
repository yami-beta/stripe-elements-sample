import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import { CheckoutForm } from "./components/CheckoutForm";
import { PaymentRequestForm } from "./components/PaymentRequestForm";

const App: React.FC<{}> = () => {
  return (
    <StripeProvider apiKey={process.env.STRIPE_API_KEY}>
      <div className="example">
        <h1>React Stripe Elements Example</h1>
        <Elements>
          <CheckoutForm />
        </Elements>
        <Elements>
          <PaymentRequestForm />
        </Elements>
      </div>
    </StripeProvider>
  );
};

export { App };
