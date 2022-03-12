import React, { useContext, useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '../UtilityMethods';
import { PokemonContext } from './PokemonContext';
import { PokemonClient, Type } from 'pokenode-ts';
import { AjaxResult } from './PokemonInformation';

type PokemonTypeProps = {
	id: number;
	name: string;
}

function PokemonType({id, name}: PokemonTypeProps): JSX.Element {
	const [isLoading, setIsLoading] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState<AjaxResult>();
	const [type, setType] = useState<Type | undefined>();
	const pokemonName = useContext(PokemonContext);

	const pokeApi = new PokemonClient();
	const getType = async () => {
		if (!isLoading) {
			setIsLoading(true);

			await pokeApi
				.getTypeByName(name.toLowerCase())
				.then((result: Type) => {
					setType(result);
					setIsLoaded(true);
				})
				.catch((err) => {
					setIsLoaded(true);
					setError(err);
				});
		}
	};

	useEffect(() => {
		getType();
	});

	if (!isLoaded && !error) {
		return <></>;
	} else if (isLoaded && type) {
		return (
			<div>
				<li key={id}>{capitalizeFirstLetter(name)}</li>
				{
					//Some kind of modal
				}
				<div>
					<p>{name} has a type advantage over</p>
					<table>
						<thead>
						<tr>
							<td>Type</td>
							<td>Advantage</td>
						</tr>
						</thead>
						<tbody>
						{type.damage_relations.double_damage_to.map(x => {
							return (
								<tr key={x.name}>
									<td>{capitalizeFirstLetter(x.name)}</td>
									<td>Double damage to</td>
								</tr>
							);
						})}
						{type.damage_relations.half_damage_from.map(x => {
							return (
								<tr key={x.name}>
									<td>{capitalizeFirstLetter(x.name)}</td>
									<td>Half damage from</td>
								</tr>
							);
						})}
						{type.damage_relations.no_damage_from.map(x => {
							return (
								<tr key={x.name}>
									<td>{capitalizeFirstLetter(x.name)}</td>
									<td>No damage from</td>
								</tr>
							);
						})}
						</tbody>
					</table>

					<p>{name} has a type disadvantage to</p>
					<table>
						<thead>
						<tr>
							<td>Type</td>
							<td>Disadvantage</td>
						</tr>
						</thead>
						<tbody>
						{type.damage_relations.double_damage_from.map(x => {
							return (
								<tr key={x.name}>
									<td>{capitalizeFirstLetter(x.name)}</td>
									<td>Double damage from</td>
								</tr>
							);
						})}
						{type.damage_relations.half_damage_to.map(x => {
							return (
								<tr key={x.name}>
									<td>{capitalizeFirstLetter(x.name)}</td>
									<td>Half damage to</td>
								</tr>
							);
						})}
						{type.damage_relations.no_damage_to.map(x => {
							return (
								<tr key={x.name}>
									<td>{capitalizeFirstLetter(x.name)}</td>
									<td>No damage to</td>
								</tr>
							);
						})}
						</tbody>
					</table>
				</div>
			</div>
		);
	} else {
		return <div>{error?.message}</div>;
	}
}

export default PokemonType;