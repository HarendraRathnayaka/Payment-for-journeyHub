const router = require('express').Router();
let payment = require('../models/payhistory');


router.route('/add').post((req, res) => {
  
  const { clientId, totalYet, discount} = req.body;

  const newPayment = new payment({
    clientId,
    totalYet,
    discount
  });

  newPayment
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

  payment
    .findOne({ clientId: clientId })
    .then((payment) => {
      if (payment) {
        res.json(payment);
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

  payment
    .findOneAndUpdate({ clientId: clientId }, { totalYet, discount }, { new: true })
    .then((updatedPayment) => {
      if (updatedPayment) {
        res.json(updatedPayment);
      } else {
        res.status(404).send('Payment history updated');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Error updating payment');
    });
});

module.exports = router;