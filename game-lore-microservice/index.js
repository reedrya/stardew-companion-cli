// index.js for Game Lore microservice
const express = require('express');
const app = express();
const PORT = 3002;

const gameFacts = [
  "The dominant religion in Pelican Town centers around the belief in 'Yoba'.",
  "There are two nations at war in Stardew Valley: the Ferngill Republic, and the Gotoro Empire.",
  "The villager Kent served as a soldier for the Ferngill Republic, and even spent some time in a Gotoro prison camp."
];

app.get('/game-lore/random-fact', (req, res) => {
  const randomIndex = Math.floor(Math.random() * gameFacts.length);
  const randomFact = gameFacts[randomIndex];
  res.json({ fact: randomFact });
});

app.listen(PORT, () => {
  console.log(`Game lore microservice running on port ${PORT}`);
});
