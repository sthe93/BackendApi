// Define the Pokemon class representing a Pokémon entity
class Pokemon {
  constructor(id, name, image, height, weight) {
      // Constructor to initialize the Pokemon object
      this.id = id;           // ID of the Pokémon
      this.name = name;       // Name of the Pokémon
      this.image = image;     // URL of the Pokémon's image
      this.height = height;   // Height of the Pokémon
      this.weight = weight;   // Weight of the Pokémon
  }
}

module.exports = Pokemon;   // Export the Pokemon class for use in other modules
