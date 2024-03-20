const router = require('express').Router();
let pay = require('../models/payhistory');

const nodemailer = require('nodemailer');

router.route('/add/:clientId').post((req, res) => {
  
  const { clientId, totalYet, discount} = req.body;

  const newPay = new pay({
    clientId,
    totalYet,
    discount
  });

  newPay
    .save()
    .then(() => {
      res.json('New payment added'); //give a response from json format
    })
    .catch((err) => {
      console.log(err);
    });
});


// Get a payment by client Id
router.route('/get/:clientId').get((req, res) => {
  const clientId = req.params.clientId;

  pay
    .findOne({ clientId: clientId })
    .then((pay) => {
      if (pay) {
        res.json(pay);
      } else {
        res.status(404).send('Payment history not found');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Error fetching data');
    });
});

// Update a payment by client Id
router.route('/update/:clientId').put((req, res) => {
  const clientId = req.params.clientId;
  const { totalYet, discount } = req.body;

  pay
    .findOneAndUpdate({ clientId: clientId }, { totalYet, discount }, { new: true })
    .then((updatedPay) => {
      if (updatedPay) {
        res.json(updatedPay);
      } else {
        res.status(404).send('Payment history updated');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Error updating payment');
    });
});


//subscribe mail send
const transporter = nodemailer.createTransport({
    service: 'Gmail',

    auth: {
      user: 'woodmasters574@gmail.com', 
      pass: 'lofkfoafptumclqg', 
    },
  });
  
  router.route('/subscribe').post(async (req, res) => {
    const { email } = req.body;
  
    console.log(`Email received: ${email}`);
  
    // Email body
    const mailOptions = {
      from: 'journeyhublk@gmail.com', 
      to: email, 
      subject: 'Welcome to JourneyHub Newsletter!', 
      text: 'You have subscribed to our newsletter successfully. Stay tuned, we will give updates frequently.', 
    };
  
    try {
      // Send email
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}`);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    }
  });

  module.exports = router;