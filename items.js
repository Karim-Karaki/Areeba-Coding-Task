const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const Item = require('./itemModel');
const port = 4000;

//connect to DB

async function connect() {
    try {
      await mongoose.connect("mongodb+srv://karim:karim@cluster0.wwtbgbm.mongodb.net/?retryWrites=true&w=majority");
      console.log("Connected to Database!");
    } catch (error) {
      console.error(error);
    }
  }
  
connect();

app.post('/items', async (req, res) => {
    const item = {
        name: req.body.name,
        description: req.body.description,
        phone_number: req.body.phone_number
    };
    try {
        const response = await axios.get(`http://localhost:3000/validate/${item.phone_number}`);
        if(response.data.valid){
            const newItem = new Item(item);
            await newItem.save();
            res.json(newItem);
        } else {
            res.status(500).json({ message: 'Invalid Number' });
        }
    } catch (error) {
        console.error('error', error);
        res.status(500).json({ message: 'An error occurred' });
    }
}); 
    


app.listen(port, () => {
    console.log(`Mobile validation service listening at http://localhost:${port}`);
  });
  