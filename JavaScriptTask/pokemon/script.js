const API_BASE_URL = 'https://pokeapi.co/api/v2/';
const POKEMONS_PER_PAGE = 9;
let offset = 0;

async function fetchPokemonData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


async function displayPokemonDetails(pokemonUrl) {
    const pokemonData = await fetchPokemonData(pokemonUrl);

    const abilities = pokemonData.abilities.map(ability => ability.ability.name).join(', ');
    const moves = pokemonData.moves.map(move => move.move.name).slice(0, 5).join(', ');
    const weight = pokemonData.weight;

    const smallImageUrl = pokemonData.sprites.front_shiny; 

    const pokemonCard = document.createElement('div');
    pokemonCard.className = 'col-lg-4';
    pokemonCard.innerHTML = `
            <div class="card m-5">
                <img src="${smallImageUrl}" class="card-img-top" alt="${pokemonData.name}">
                <div class="card-body">
                    <h5 class="card-title">${pokemonData.name}</h5>
                    <p class="card-text"><strong>Abilities:</strong> ${abilities}</p>
                    <p class="card-text"><strong>Moves:</strong> ${moves}</p>
                    <p class="card-text"><strong>Weight:</strong> ${weight}</p>
                </div>
            </div>
        `;
    document.getElementById('pokemon-list').appendChild(pokemonCard);
}


async function displayPokemons(offset, limit) {
    const response = await fetchPokemonData(`${API_BASE_URL}pokemon?offset=${offset}&limit=${limit}`);
    const pokemons = response.results;

    for (const pokemon of pokemons) {
        await displayPokemonDetails(pokemon.url);
    }
}

document.getElementById('forward-button').addEventListener('click', () => {
    offset += POKEMONS_PER_PAGE;
    document.getElementById('pokemon-list').innerHTML = '';
    displayPokemons(offset, POKEMONS_PER_PAGE);
});

document.getElementById('backward-button').addEventListener('click', () => {
    if (offset >= POKEMONS_PER_PAGE) {
        offset -= POKEMONS_PER_PAGE;
    } else {
        offset = 0;
    }
    document.getElementById('pokemon-list').innerHTML = '';
    displayPokemons(offset, POKEMONS_PER_PAGE);
});

async function init() {
    const response = await fetchPokemonData(`${API_BASE_URL}pokemon?limit=1`);
    const totalPokemons = response.count;
    displayPokemons(offset, POKEMONS_PER_PAGE);
}

init();
