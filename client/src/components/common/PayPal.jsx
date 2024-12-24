// import React, { useRef, useEffect } from "react";

// export default function Paypal() {
//   const paypal = useRef();

//   useEffect(() => {
//     window.paypal
//       .Buttons({
//         createOrder: (data, actions, err) => {
//           return actions.order.create({
            
//             purchase_units: [{
//                 amount: {
//                   value: '10.00' 
//                 }
//               }]
//           });
//         },
//         onApprove: async (data, actions) => {
//           const order = await actions.order.capture();
//           console.log(order);
//         },
//         onError: (err) => {
//           console.log(',,,,,,,,,,,,,,error: ',err);
//         },
//       })
//       .render(paypal.current);
//   }, []);

//   return (
//     <div>
//       <div ref={paypal}></div>
//     </div>
//   );
// }

import React, { useRef, useEffect } from "react";

export default function Paypal() {
  const paypal = useRef(null);

  // Function to dynamically load the PayPal SDK script
  const loadPayPalScript = (onLoadCallback) => {
    if (document.getElementById("paypal-sdk")) {
      onLoadCallback();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"; // Replace YOUR_CLIENT_ID with your actual client ID
    script.id = "paypal-sdk";
    script.async = true;
    script.onload = onLoadCallback;
    document.body.appendChild(script);
  };

  // Initialize PayPal buttons once
  const initializePayPalButtons = () => {
    if (paypal.current && !paypal.current.hasChildNodes()) {
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "10.00", // Adjust amount as needed
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
          },
          onError: (err) => {
            console.error("Error: ", err);
          },
        })
        .render(paypal.current);
    }
  };

  // Ensure PayPal script is loaded and initialize buttons
  useEffect(() => {
    loadPayPalScript(initializePayPalButtons);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
