import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ReceiptDownloader = ({ transaction }) => {
  // Reference to the receipt content for capturing with html2canvas
  const receiptRef = useRef(null);
  
  // Example transaction object structure:
  // const transaction = {
  //   id: 'pi_3O4XYZ123456',
  //   date: '2025-03-31T14:30:00Z',
  //   amount: 49.99,
  //   currency: 'usd',
  //   customer: {
  //     name: 'John Doe',
  //     email: 'john@example.com'
  //   },
  //   items: [
  //     { name: 'Product A', quantity: 1, price: 39.99 },
  //     { name: 'Service Fee', quantity: 1, price: 10.00 }
  //   ]
  // };
  
  const generatePDF = async () => {
    // Show loading indicator if needed
    const element = receiptRef.current;
    
    try {
      // Use html2canvas to capture the receipt element
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        logging: false,
        useCORS: true
      });
      
      // Initialize jsPDF with A4 page
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Get dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Convert canvas to image
      const imgData = canvas.toDataURL('image/png');
      
      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Download the PDF
      pdf.save(`receipt-${transaction.id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };
  
  // Format currency
//   const formatCurrency = (amount, currency) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: currency?.toUpperCase()
//     }).format(amount);
//   };
  
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div>
      {/* Button to generate and download the receipt */}
      <button 
        onClick={generatePDF} 
        style={{
          padding: '10px 15px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '15px'
        }}
      >
        Download Receipt
      </button>
      
      {/* Receipt content that will be converted to PDF */}
      <div 
        ref={receiptRef} 
        style={{
          width: '100%',
          maxWidth: '800px',
          padding: '20px',
          border: '1px solid #ddd',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          backgroundColor: 'white'
        }}
      >
        {/* Receipt Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: '0', color: '#333' }}>RECEIPT</h1>
          <p style={{ color: '#666' }}>Transaction #{transaction.payment_intent_id}</p>
        </div>
        
        {/* Company and Date Information */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <div>
            <h3 style={{ margin: '0 0 5px 0' }}>Your Company Name</h3>
            <p style={{ margin: '0', color: '#666' }}>123 Business Street</p>
            <p style={{ margin: '0', color: '#666' }}>City, State ZIP</p>
            <p style={{ margin: '0', color: '#666' }}>contact@yourcompany.com</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0', fontWeight: 'bold' }}>Date:</p>
            <p style={{ margin: '0' }}>{formatDate(transaction.created_date)}</p>
            <p style={{ margin: '10px 0 0 0', fontWeight: 'bold' }}>Payment Method:</p>
            <p style={{ margin: '0' }}>Credit Card</p>
          </div>
        </div>
        
        {/* Customer Information */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Bill To:</h3>
          <p style={{ margin: '0', fontWeight: 'bold' }}>{transaction.customer?.name || 'Customer'}</p>
          <p style={{ margin: '0' }}>{transaction.customer?.email || 'customer@example.com'}</p>
        </div>
        
        {/* Items Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Item</th>
              <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Quantity</th>
              <th style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Price</th>
              <th style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transaction.items ? (
              transaction.items.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{item.name}</td>
                  <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{item.quantity}</td>
                  <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                    {/* {formatCurrency(item.price, transaction.currency)} */}
                    {item.amount}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                    {/* {formatCurrency(item.price * item.quantity, transaction.currency)} */} $
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Purchase</td>
                <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>1</td>
                <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                  {/* {formatCurrency(transaction.amount, transaction.currency)} */}
                </td>
                <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                  {/* {formatCurrency(transaction.amount, transaction.currency)} */}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Total */}
        <div style={{ textAlign: 'right', marginBottom: '30px' }}>
          <div style={{ display: 'inline-block', minWidth: '200px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
              <span>Subtotal:</span>
              {/* <span>{formatCurrency(transaction.amount, transaction.currency)}</span> */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
              <span>Tax:</span>
              {/* <span>{formatCurrency(0, transaction.currency)}</span> */}
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '10px 0', 
              borderTop: '2px solid #333',
              fontWeight: 'bold',
              fontSize: '1.2em'
            }}>
              <span>Total:</span>
              {/* <span>{formatCurrency(transaction.amount, transaction.currency)}</span> */}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '50px', borderTop: '1px solid #ddd', paddingTop: '20px', color: '#666' }}>
          <p style={{ margin: '0' }}>Thank you for your business!</p>
          <p style={{ margin: '5px 0 0 0' }}>For questions regarding this receipt, please contact support@yourcompany.com</p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptDownloader;