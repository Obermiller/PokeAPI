import { Search } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { Pokemon, PokemonClient } from 'pokenode-ts';
import React, { ChangeEvent, useState } from 'react';
import PokemonInformation, { AjaxResult } from './PokemonInformation';

export default function SearchBar(): JSX.Element {
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState<AjaxResult>();
	const [pokemon, setPokemon] = useState<Pokemon | undefined>();
	const [searchInputText, setSearchInputText] = useState('');

	const pokeApi = new PokemonClient();

	const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => setSearchInputText(e.currentTarget.value);

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
			<TextField label='Search' variant='outlined' onChange={searchInputHandler} />
			<IconButton size='large' aria-label='search' onClick={getPokemon}>
				<Search />
			</IconButton>

			<PokemonInformation isLoaded={isLoaded} error={error} pokemon={pokemon} />
		</div>
	);
}