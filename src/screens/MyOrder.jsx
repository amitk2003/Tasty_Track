import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function MyOrder() {
  const [orderData, setOrderData] = useState("");

  const fetchMyHistory = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/myOrderHistory", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem("UserEmail"),
        }),
      });
      
      const data = await response.json();
      setOrderData(data.orderHis);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  useEffect(() => {
    fetchMyHistory();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className='container'>
        <div className='row'>
          {orderData && orderData.order_data ? (
            orderData.order_data.map((array_data, index) => (
              <div className='col-12 my-4' key={index}>
                {/* Date Header */}
                {array_data[0]?.Order_date && (
                  <div className='m-auto mb-3'>
                    <h4 className='text-primary'>Order Date: {array_data[0].Order_date}</h4>
                    <hr />
                  </div>
                )}

                {/* Order Items */}
                <div className='row'>
                  {array_data.slice(1).map((item, i) => (
                    <div className='col-12 col-md-6 col-lg-3 mb-4' key={i}>
                      <div className='card h-100 shadow-sm'>
                        {/* Image */}
                        <img
                          src={item.img}
                          className='card-img-top'
                          alt={item.name}
                          style={{
                            height: '160px',
                            objectFit: 'cover'
                          }}
                        />
                        
                        {/* Card Body */}
                        <div className='card-body'>
                          <h5 className='card-title text-truncate'>{item.title}</h5>
                          
                          <div className='mt-2'>
                            <div className='d-flex justify-content-between align-items-center mb-2'>
                              <span className='badge bg-info'>Qty: {item.qty}</span>
                              <span className='badge bg-secondary'>{item.size}</span>
                            </div>
                            
                            <div className='d-flex justify-content-between align-items-center'>
                              <span className='text-muted'>Price:</span>
                              <span className='fw-bold text-success'>₹{item.price}/-</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className='col-12 text-center my-5'>
              <h3 className='text-muted'>No Order History Available</h3>
            </div>
          )}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}