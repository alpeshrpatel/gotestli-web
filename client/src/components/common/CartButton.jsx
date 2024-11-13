import React from 'react';
import axios from 'axios';
import { API } from '@/utils/AxiosInstance';

const CartButton = () => {
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isScriptLoaded = await loadRazorpay();

    if (!isScriptLoaded) {
      alert('Failed to load Razorpay SDK');
      return;
    }

    // Request order creation on the server
    const orderResult = await API.post('/create-order', { amount: 100 });
    const orderData = orderResult.data;

    const options = {
      key: '_KEY_ID',
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'App Name',
      description: 'Payment for quiz credits',
      order_id: orderData.id,
      handler: async function (response) {
        // Verify payment on the backend
        const verifyResult = await API.post('/verify-payment', {
          order_id: response.razorpay_order_id,
          payment_id: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        });

        if (verifyResult.data.status === 'success') {
          alert('Payment successful!');
          // Grant quiz access here
        } else {
          alert('Payment verification failed');
        }
      },
      prefill: {
        name: 'User Name',
        email: 'user@example.com',
        contact: '1234567890',
      },
      theme: {
        color: '#F37254',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button
    className="button -sm px-24 py-25 -outline-red-3 text-red-3 text-16 fw-bolder lh-sm"
    onClick={handlePayment}
    // onClick={googleLogin}
  >
   Pay with Razorpay
  </button>
    
  );
};

export default CartButton;
