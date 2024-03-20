const router = require('express').Router();
const client = require('../models/clientregister');

// Get client by client ID
router.route('/:clientId').get(async (req, res) => {
  const clientId = req.params.clientId;

  try {
    const foundClient = await client.findOne({ clientId: clientId });
    if (foundClient) {

      //console.log('Client QR Code:', foundClient.qrCode);
      res.json(foundClient);
    } else {
      res.status(404).send('Client not found');
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(`Error fetching client: ${error.message}`);
  }

});

module.exports = router;
