import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NavBar from '../Common/Components/NavBar';
import PokemonInformation from '../Information/PokemonInformation';
import SearchBar from '../Search/SearchBar';

export default function Search() {
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<>
			<NavBar />

			<SearchBar defaultText={searchParams.get('name')?.toString()} />
			<PokemonInformation />
		</>
	)
}