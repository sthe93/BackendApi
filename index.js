const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;

const pokemonService = require('./services/pokemonService');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi.yaml');

app.use(express.json());
app.use(cors());

// Endpoint to get a list of all pokemons
app.get('/api/pokemons', async (req, res) => {
  try {
    const pokemons = await pokemonService.getAllPokemons();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Pokemon list' });
  }
});

// Endpoint to get details of a specific pokemon by ID
app.get('/api/pokemon/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await pokemonService.getPokemonById(id);
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Pokemon details' });
  }
});

// Serve Swagger documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
