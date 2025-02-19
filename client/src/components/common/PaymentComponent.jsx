// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import axios from "axios";

// const stripePromise = loadStripe("pk_test_51QoP1kCc5nEXg12iewiGVqzngS0lh9lweriboJV7TJIzNRHgokIP5wxkK17hjmP0TeTuU69gzAGhY6LtZH60kFQI007ZXU9GuX");

// const CheckoutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         const { data } = await axios.post("http://localhost:3000/create-payment-intent", {
//             amount: 1000, // Amount in cents (e.g., 1000 = $10)
//             currency: "usd",
//         });

//         const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
//             payment_method: {
//                 card: elements.getElement(CardElement),
//             },
//         });

//         if (error) {
//             setMessage(error.message);
//         } else if (paymentIntent.status === "succeeded") {
//             setMessage("Payment successful!");
//         }

//         setLoading(false);
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement className="border p-3 rounded" />
//             <button type="submit" disabled={!stripe || loading} className="btn btn-primary mt-3">
//                 {loading ? "Processing..." : "Pay"}
//             </button>
//             {message && <p className="mt-3 text-success">{message}</p>}
//         </form>
//     );
// };

// const PaymentComponent = () => {
//     return (
//         <Elements stripe={stripePromise}>
//             <CheckoutForm />
//         </Elements>
//     );
// };

// export default PaymentComponent;

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";

const stripePromise = loadStripe(
  "pk_test_51QoP1kCc5nEXg12iewiGVqzngS0lh9lweriboJV7TJIzNRHgokIP5wxkK17hjmP0TeTuU69gzAGhY6LtZH60kFQI007ZXU9GuX"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!amount || isNaN(amount) || amount <= 0) {
      setMessage("Please enter a valid amount.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/create-payment-intent",
        {
          amount: amount * 100, // Convert USD to cents
          currency: "usd",
        }
      );

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setMessage(error.message);
      } else if (paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");
      }
    } catch (err) {
      setMessage("Payment failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
          bgcolor: "white",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Payment Details
        </Typography>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount (USD)"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            margin: "10px 0",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
          Card Details:
        </Typography>

        <Box sx={{ border: "1px solid #ccc", borderRadius: "5px", p: 2 }}>
          <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleSubmit}
          disabled={!stripe || loading}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Pay Now"
          )}
        </Button>

        {message && (
          <Typography color="error" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

const PaymentComponent = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentComponent;
