import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ApplyDiscount() {

  const { clientId } = useParams();
  const [client, setClient] = useState({});
  const [payHistory, setPayHistory] = useState({});
  const [discount, setDiscount] = useState(0);

  function getClient() {
    axios
      .get(`http://localhost:8050/client/${clientId}`)
      .then((res) => {
        setClient(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function getPayHistory() {
    axios
      .get(`http://localhost:8050/payment/get/${clientId}`)
      .then((res) => {
        setPayHistory(res.data);
        calculateDiscount(res.data.totalYet); // Call calculateDiscount function with totalYet value
      })
      .catch((err) => {
        alert(err);
      });
  }

  function calculateDiscount(totalYet) {
    let calculatedDiscount = 0;

    if (totalYet >= 60000) {
      calculatedDiscount = 0.025;
    } else if (totalYet >= 80000) {
      calculatedDiscount = 0.05;
    } else if (totalYet >= 100000) {
      calculatedDiscount = 0.075;
      const additionalDiscount = Math.floor((totalYet - 100000) / 50000) * 0.05;
      calculatedDiscount += additionalDiscount;
    }

    setDiscount(calculatedDiscount * 100); // Set the discount percentage
  }

  useEffect(() => {
    getClient();
    getPayHistory();
  }, []);

  return (
    <div>
      <h2>Dear {client.firstName} {client.lastName}, you have successfully qualified for a discount of {discount}% on your next payment</h2>
      <br/><h2>Your total value yet is Rs.{payHistory.totalYet}.00</h2>
    </div>
  )
}

export default ApplyDiscount;
