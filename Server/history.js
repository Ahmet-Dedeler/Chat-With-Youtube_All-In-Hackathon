const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/searchHistoryDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a simple schema for search history
const searchHistorySchema = new mongoose.Schema({
  term: String,
  timestamp: { type: Date, default: Date.now },
});

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

app.use(bodyParser.json());

// API endpoint to fetch search history
app.get('/api/searchHistory', async (req, res) => {
  try {
    const history = await SearchHistory.find().sort({ timestamp: -1 }).limit(5);
    res.json(history);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to add a new search to history
app.post('/api/searchHistory', async (req, res) => {
  try {
    const { term } = req.body;
    const newSearch = new SearchHistory({ term });
    await newSearch.save();
    res.json(newSearch);
  } catch (error) {
    console.error('Error adding to search history:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
