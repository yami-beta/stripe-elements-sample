import React from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

const CheckoutForm = injectStripe(({ stripe }) => {
  const handleSubmit = async (event: any) => {
    let { token } = await stripe.createToken({ name: "Name" });
    let response = await fetch("/charge", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: token.id
    });

    if (response.ok) {
      console.log("Purchase Complete!");
    }
  };

  return (
    <div className="checkout">
      <p>Would you like to complete the purchase?</p>
      <CardElement />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
});

export { CheckoutForm };
