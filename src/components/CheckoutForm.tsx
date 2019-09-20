import React, { FormEvent } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

const CheckoutForm = injectStripe(({ stripe }) => {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

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
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit">Send</button>
      </form>
    </div>
  );
});

export { CheckoutForm };
