const fetchPokemon = (pokemon) => {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json();
    })
    .then(data => {
        // getting the pokemon data
        const container = document.getElementById('pokemon-container');
        container.innerHTML = ''; // clear previous data

        // displays pokemon info
        const pokemonData = `
            <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
            <p><strong>Base Experience:</strong> ${data.base_experience}</p>
            <p><strong>Height:</strong> ${data.height}</p>
            <p><strong>Weight:</strong> ${data.weight}</p>
            <p><strong>Abilities:</strong> ${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
        `;

        container.innerHTML = pokemonData; // insert data into the container
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('pokemon-container').innerHTML = 'Error fetching Pokémon data';
    });
};

// selection menu
document.getElementById('pokemon-select').addEventListener('change', function() {
    const selectedPokemon = this.value; 

    if (selectedPokemon) {
        // fetching selected pokemon
        fetchPokemon(selectedPokemon);
    } else {
        // clearing the space if nothing selected
        document.getElementById('pokemon-container').innerHTML = 'Select a Pokémon to see its stats';
    }
});
