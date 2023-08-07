const chai = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const PokemonService = require('../services/pokemonService');
const Pokemon = require('../models/pokemon');

const expect = chai.expect;

describe('PokemonService', () => {
  describe('getAllPokemons', () => {
    it('should return an array of Pokemon', async () => {
      const mockResponse = {
        data: {
          results: [
            { name: 'bulbasaur' },
            { name: 'charmander' },
          ],
        },
      };
      sinon.stub(axios, 'get').resolves(mockResponse);

      const pokemons = await PokemonService.getAllPokemons();

      expect(pokemons).to.be.an('array');
      expect(pokemons).to.have.length.above(0);
      expect(pokemons[0]).to.be.instanceOf(Pokemon);

      axios.get.restore();
    });

    it('should throw an error if fetching Pokemon list fails', async () => {
      sinon.stub(axios, 'get').throws(new Error('Failed to fetch Pokemon list'));
      try {
        await PokemonService.getAllPokemons();
      } catch (error) {
        expect(error.message).to.equal('Failed to fetch Pokemon list');
      }

      axios.get.restore();
    });
  });

  describe('getPokemonById', () => {
    it('should return a Pokemon object', async () => {
      const mockResponse = {
        data: {
          id: 1,
          name: 'bulbasaur',
          sprites: {
            front_default: 'https://example.com/bulbasaur.png',
          },
          height: 7,
          weight: 69,
        },
      };
      sinon.stub(axios, 'get').resolves(mockResponse);

      const pokemon = await PokemonService.getPokemonById(1);

      expect(pokemon).to.be.instanceOf(Pokemon);
      expect(pokemon.id).to.equal(1);
      expect(pokemon.name).to.equal('bulbasaur');

      axios.get.restore();
    });

    it('should throw an error if fetching Pokemon details fails', async () => {
      sinon.stub(axios, 'get').throws(new Error('Failed to fetch Pokemon details'));
      try {
        await PokemonService.getPokemonById(1);
      } catch (error) {
        expect(error.message).to.equal('Failed to fetch Pokemon details');
      }

      axios.get.restore();
    });
  });
});
