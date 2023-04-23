const express = require('express');
const axios = require('axios');
const mongo = require('mongoose');
const app = express();
const port = 4000;

app.post('/items', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        price: req.body.price
    });
    try {
        const savedItem = await item.save();
        res.json(savedItem);
    } catch (error) {
        console.error('error', error);
        res.status(500).json({ message: 'An error occurred' });
    }
}); 
    


app.listen(port, () => {
    console.log(`Mobile validation service listening at http://localhost:${port}`);
  });
  