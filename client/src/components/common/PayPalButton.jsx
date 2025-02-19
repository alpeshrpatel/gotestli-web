// import React, { useEffect } from 'react';

// const PayPalButton = ({ amount, onSuccess, onError }) => {
//   useEffect(() => {
//     // Load the PayPal SDK
//     const loadPayPalScript = () => {
//       const script = document.createElement('script');
//       script.src = `https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID_HERE&currency=USD`;
//       script.async = true;
      
//       script.onload = () => {
//         window.paypal
//           .Buttons({
//             createOrder: async () => {
//               try {
//                 const response = await fetch('http://localhost:3000/api/create-paypal-order', {
//                   method: 'POST',
//                   headers: {
//                     'Content-Type': 'application/json',
//                   },
//                   body: JSON.stringify({
//                     amount: amount,
//                   }),
//                 });
                
//                 const order = await response.json();
//                 return order.id;
//               } catch (err) {
//                 onError(err);
//               }
//             },
//             onApprove: async (data, actions) => {
//               try {
//                 const response = await fetch('http://localhost:3000/api/capture-paypal-order', {
//                   method: 'POST',
//                   headers: {
//                     'Content-Type': 'application/json',
//                   },
//                   body: JSON.stringify({
//                     orderId: data.orderID,
//                   }),
//                 });
                
//                 const orderData = await response.json();
//                 onSuccess(orderData);
//               } catch (err) {
//                 onError(err);
//               }
//             },
//             onError: (err) => {
//               onError(err);
//             },
//           })
//           .render('#paypal-button-container');
//       };
      
//       document.body.appendChild(script);
//     };
    
//     loadPayPalScript();
//   }, [amount, onSuccess, onError]);

//   return <div id="paypal-button-container" style={{width:'300px', height:'50px'}}>

//   </div>;
// };

// export default PayPalButton;


// PayPalButton.jsx
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  const initialOptions = {
    "client-id": "AdLW3pInwY3FRX1U9H0RinK8j_Vetw3V2ppZ9GhPj7gYDsypAEeLVgnW42dJkxuU7D_da7S3EHSg-a18",
    currency: "USD",
    intent: "capture",
    "enable-funding": "paylater,venmo",
    "data-namespace": "PayPalSDK",
    // Important: Add this for sandbox testing
    "data-client-token": "sandbox_token",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="w-full max-w-md mx-auto p-4">
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "pay"
          }}
          createOrder={async () => {
            try {
              const response = await fetch('http://localhost:3000/api/create-paypal-order/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  amount: amount,
                }),
              });
              
              const order = await response.json();
              return order.id;
            } catch (err) {
              onError(err);
              throw err;
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await fetch('http://localhost:3000/api/capture-paypal-order/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  orderId: data.orderID,
                }),
              });
              
              const orderData = await response.json();
              onSuccess(orderData);
            } catch (err) {
              onError(err);
              throw err;
            }
          }}
          onError={(err) => {
            onError(err);
            console.error("PayPal error:", err);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;