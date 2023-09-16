const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonList = document.getElementById('pokemon-list');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let offset = 0;
const limit = 50;

async function fetchPokemon(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function fetchAndDisplayPokemon(offset) {
    debugger
    const response = await fetchPokemon(`${apiUrl}?offset=${offset}&limit=${limit}`);
    const pokemonData = response.results;

    pokemonList.innerHTML = ''; // Clear previous list

    for (const pokemon of pokemonData) {
        const pokemonInfo = await fetchPokemon(pokemon.url);
        displayPokemonInfo(pokemonInfo);
    }
}

function displayPokemonInfo(pokemon) {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');

    const idElement = document.createElement('p');
    idElement.textContent = `ID: ${pokemon.id}`;

    const nameElement = document.createElement('h2');
    nameElement.textContent = pokemon.name;

    const imageElement = document.createElement('img');
    imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    imageElement.alt = pokemon.name;

    const abilitiesElement = document.createElement('p');
    abilitiesElement.textContent = `Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}`;

    const movesElement = document.createElement('p');
    movesElement.textContent = `Moves: ${pokemon.moves.map(move => move.move.name).join(', ')}`;

    const weightElement = document.createElement('p');
    weightElement.textContent = `Weight: ${pokemon.weight} kg`;

    pokemonCard.appendChild(idElement);
    pokemonCard.appendChild(nameElement);
    pokemonCard.appendChild(imageElement);
    pokemonCard.appendChild(abilitiesElement);
    pokemonCard.appendChild(movesElement);
    pokemonCard.appendChild(weightElement);

    pokemonList.appendChild(pokemonCard);
}



prevButton.addEventListener('click', () => {
    if (offset >= limit) {
        offset -= limit;
        fetchAndDisplayPokemon(offset);
    }
});

nextButton.addEventListener('click', () => {
    offset += limit;
    fetchAndDisplayPokemon(offset);
});

// Initial load
fetchAndDisplayPokemon(offset);
