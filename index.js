// index.js
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

const pokemonService = require('./services/pokemonService');

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(cors());

// Route for getting the list of Pokémon
app.get('/api/pokemons', async (req, res) => {
  try {
    const pokemons = await pokemonService.getAllPokemons();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Pokémon list' });
  }
});

// Route for getting details of a specific Pokémon
app.get('/api/pokemon/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await pokemonService.getPokemonById(id);
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Pokémon details' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
