import { Search } from '@mui/icons-material';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { Pokemon, PokemonClient } from 'pokenode-ts';
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearSearchInfo, isLoaded, setError, setPokemon } from '../Store/Types';

export default function SearchBar(): JSX.Element {
	const dispatch = useDispatch();

	const [searchInputText, setSearchInputText] = useState('');

	const searchButton = useRef<HTMLButtonElement>(null);

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
		if (e.key === 'Enter' && searchButton.current) {
			dispatch(clearSearchInfo());
			searchButton.current.click();
		}
	}

	const searchInputHandler = (e: ChangeEvent<HTMLInputElement>): void => setSearchInputText(e.currentTarget.value);

	const getPokemon = async (): Promise<void> => {
		await new PokemonClient()
			.getPokemonByName(searchInputText.toLowerCase())
			.then((result: Pokemon) => {
				dispatch(setPokemon(result));
				dispatch(setError(undefined));
			})
			.catch((err) => {
				dispatch(setError(err));
				dispatch(setPokemon(undefined));
			})
			.finally(() => dispatch(isLoaded(true)));
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
		</>
	);
}