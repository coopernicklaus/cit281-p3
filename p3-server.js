const express = require('express');
const app = express();
// const path = require('path');


const { coinCombo, coinValue } = require('./p3-module.js');

// Middleware to parse JSON body
// app.use(express.json()); 

// Serve static files from public folder
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

// GET /coincombo?amount=30
app.get('/coincombo', (req, res) => {
  const amount = parseInt(req.query.amount);
  if (isNaN(amount) || amount < 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  const result = coinCombo(amount);
  res.json(result);
});

// GET /coinvalue?pennies=1&nickels=2&dimes=3&quarters=4&halves=1&dollars=2
app.get('/coinvalue', (req, res) => {
  const coinCounts = {
    pennies: parseInt(req.query.pennies) || 0,
    nickels: parseInt(req.query.nickels) || 0,
    dimes: parseInt(req.query.dimes) || 0,
    quarters: parseInt(req.query.quarters) || 0,
    halves: parseInt(req.query.halves) || 0,
    dollars: parseInt(req.query.dollars) || 0,
  };

  const result = coinValue(coinCounts);
  res.json(result);
});

// Handle 404 for all other routes
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start server and listen to requests using Express
const listenIP = "localhost";
const listenPort = 8080;

// Start the server
app.listen(listenPort, listenIP, () => {
  console.log(`Server running at http://${listenIP}:${listenPort}`);
});