import { Search } from '@mui/icons-material';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { Pokemon, PokemonClient } from 'pokenode-ts';
import React, { ChangeEvent, KeyboardEvent, useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearSearchInfo, isLoaded, setError, setPokemon } from '../Store/Types';

export type SearchBarProps = {
	defaultText?: string;
}

export default function SearchBar({ defaultText }: SearchBarProps): JSX.Element {
	const dispatch = useDispatch();

	const [searchInputText, setSearchInputText] = useState(defaultText ?? '');

	const searchButton = useRef<HTMLButtonElement>(null);

	const handleKeyDown = async (e: KeyboardEvent<HTMLDivElement>): Promise<void> => {
		if (e.key === 'Enter' && searchButton.current) {
			dispatch(clearSearchInfo());
			await getPokemon();
		}
	}

	const searchInputHandler = (e: ChangeEvent<HTMLInputElement>): void => setSearchInputText(e.currentTarget.value);

	const getPokemon = useCallback(async (): Promise<void> => {
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
	}, [dispatch, searchInputText]);

	return (
		<>
			<div className='search-bar'>
				<Typography variant='h5'>Search for a PokeMon by name</Typography>
				<Box display='flex' alignItems='right' justifyContent='right'>
					<TextField label='Search' variant='outlined' value={searchInputText} onChange={searchInputHandler} onKeyDown={handleKeyDown} />
					<IconButton size='large' aria-label='search' ref={searchButton} onClick={getPokemon}>
						<Search />
					</IconButton>
				</Box>
			</div>
		</>
	);
}