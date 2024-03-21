import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ApplyDiscount() {
  const { clientId } = useParams();
  const [payHistory, setPayHistory] = useState({});
  const [discount, setDiscount] = useState(0);

  const getPayHistory = () => {
    axios
      .get(`http://localhost:8050/payment/get/${clientId}`)
      .then((res) => {
        setPayHistory(res.data);
        calculateDiscount(res.data.totalYet); 
      })
      .catch((err) => {
        alert(err);
      });
  }

  const calculateDiscount = (totalYet) => {
    let calculatedDiscount = 0;

    if (totalYet >= 100000) {
      calculatedDiscount = 0.075;
      const additionalDiscount = Math.floor((totalYet - 100000) / 50000) * 0.05;
      calculatedDiscount += additionalDiscount;
    } else if (totalYet >= 80000) {
      calculatedDiscount = 0.05;
    } else if (totalYet >= 60000) {
      calculatedDiscount = 0.025;
    }

    if (calculatedDiscount * 100 > 50) {
      calculatedDiscount = 0.5; 
    }

    setDiscount(calculatedDiscount * 100); 
  }

  const redeemDiscount = () => {
    alert('Discount will be added');

    axios
      .put(`http://localhost:8050/payment/update/${clientId}`, {
        totalYet: payHistory.totalYet,
        discount: discount / 100,
      })
      .then(() => {
        setTimeout(() => {
          window.close();
        }, 5000);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getPayHistory();
  }, [clientId]); // Include clientId in the dependency array

  return (
    <div>
      <h2>
        Dear Customer, you have successfully
        qualified for a discount of {discount}% on your next payment
      </h2>
      <br />
      <h2>Your total value yet is Rs.{payHistory.totalYet}.00</h2>
      <br />
      <br />
      <button onClick={redeemDiscount}>Redeem discount</button>
    </div>
  );
}

export default ApplyDiscount;
