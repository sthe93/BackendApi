const axios = require('axios');
const Pokemon = require('../models/pokemon');

class PokemonService {
  async getAllPokemons() {
    try {
      // Fetch a list of the first 100 Pokémon from the PokeAPI
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
      
      // Transform and map the response data to an array of Pokemon objects
      return response.data.results.map((pokemon, index) => new Pokemon(
        index + 1,
        pokemon.name,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
      ));
    } catch (error) {
      throw new Error('Failed to fetch Pokémon list');
    }
  }

  async getPokemonById(id) {
    try {
      // Fetch details of a specific Pokémon by ID from the PokeAPI
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      
      // Create a Pokemon object using relevant data from the response
      return new Pokemon(
        response.data.id,
        response.data.name,
        response.data.sprites.front_default,
        response.data.height,
        response.data.weight,
      );
    } catch (error) {
      throw new Error('Failed to fetch Pokémon details');
    }
  }
}

module.exports = new PokemonService();
