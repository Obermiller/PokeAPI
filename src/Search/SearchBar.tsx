import { Search } from '@mui/icons-material';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { Pokemon, PokemonClient } from 'pokenode-ts';
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import PokemonInformation, { AjaxResult } from './PokemonInformation';

export default function SearchBar(): JSX.Element {
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState<AjaxResult>();
	const [pokemon, setPokemon] = useState<Pokemon | undefined>();
	const [searchInputText, setSearchInputText] = useState('');

	const searchButton = useRef<HTMLButtonElement>(null);

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter' && searchButton.current) {
			searchButton.current.click();
		}
	}
	const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => setSearchInputText(e.currentTarget.value);

	const getPokemon = async () => {
		await new PokemonClient()
			.getPokemonByName(searchInputText.toLowerCase())
			.then((result: Pokemon) => {
					setPokemon(result);
					setIsLoaded(true);
				})
			.catch((err) => setError(err));
	};

	return (
		<>
			<div className='search-bar'>
				<Typography variant='h5'>Search for a PokeMon by name</Typography>
				<Box display='flex' alignItems='right' justifyContent='right'>
					<TextField label='Search' variant='outlined' onChange={searchInputHandler} onKeyDown={handleKeyDown} />
					<IconButton size='large' aria-label='search' ref={searchButton} onClick={getPokemon}>
						<Search />
					</IconButton>
				</Box>
			</div>

			<PokemonInformation isLoaded={isLoaded} error={error} pokemon={pokemon} />
		</>
	);
}