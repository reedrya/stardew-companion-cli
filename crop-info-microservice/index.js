// index.js for Crop Info microservice
const express = require('express');
const app = express();
const PORT = 3000;

const cropData = require('./data');

// define routes
app.get('/crop-info/:season', (req, res) => {
    const { season } = req.params;
  
    // Check if the requested season exists in the crop data
    if (season in cropData) {
      res.json({ season, crops: cropData[season] });
    } else {
      res.status(404).json({ error: 'Season not found' });
    }
  });

  // start the server
app.listen(PORT, () => {
    console.log(`Crop information microservice running on port ${PORT}`);
  });