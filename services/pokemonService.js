// services/pokemonService.js
const axios = require('axios');
const Pokemon = require('../models/pokemon');

class PokemonService {
  async getAllPokemons() {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
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
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
