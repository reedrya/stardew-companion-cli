// index.js for Villager Birthday microservice
const express = require('express');
const app = express();
const PORT = 3001;

const birthdayData = require('./data');

// define routes
app.get('/villager-birthdays/:season', (req, res) => {
    const { season } = req.params;
    // Check if the requested season exists in the crop data
    if (season in birthdayData) {
        res.json({ season, birthday: birthdayData[season] });
      } else {
        res.status(404).json({ error: 'Season not found' });
      }
  });

  // start the server
app.listen(PORT, () => {
    console.log(`Villager birthdays microservice running on port ${PORT}`);
  });