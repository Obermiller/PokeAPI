import React from 'react';
import { Pokemon, PokemonClient } from 'pokenode-ts';
import { FormEvent, useState } from 'react';
import PokemonInformation, { AjaxResult } from './PokemonInformation';

function Search() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState<AjaxResult>();
	const [pokemon, setPokemon] = useState<Pokemon | undefined>();
	const [searchInputText, setSearchInputText] = useState('');

	const pokeApi = new PokemonClient();

	const searchInputHandler = (e: FormEvent<HTMLInputElement>) => setSearchInputText(e.currentTarget.value);

	const getPokemon = async () => {
		await pokeApi
			.getPokemonByName(searchInputText.toLowerCase())
			.then((result: Pokemon) => {
					setPokemon(result);
					setIsLoaded(true);
				})
			.catch((err) => setError(err));
	};

	return (
		<div>
			<h3>Search for a PokeMon by name</h3>
			<input type='search' placeholder='PokeMon' onChange={searchInputHandler} />
			<button onClick={getPokemon}>Search</button>

			<PokemonInformation isLoaded={isLoaded} error={error} pokemon={pokemon} />
		</div>
	);
}

export default Search;