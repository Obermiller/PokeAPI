import { capitalize } from '@mui/material';
import { PokemonMove } from 'pokenode-ts';

export const appendToArray = <T>(arr: T[], addition: T): T[] => [
	...arr,
	addition
];

export const formatMoveDisplay = (move: string): string => capitalize(move) //Capitalize first letter
	.replace(/-[a-z]/g, match => match.toUpperCase()) //Capitalize after dashes
	.replace('-', ' '); //Remove dashes

export const levelSort = (x: PokemonMove, y: PokemonMove): number => {
	const xLevel = x.version_group_details.map(z => z.level_learned_at)[0];
	const yLevel = y.version_group_details.map(z => z.level_learned_at)[0];

	if (xLevel > yLevel) {
		return 1;
	}
	if (xLevel < yLevel) {
		return -1;
	}
	return stringSort(x.move.name, y.move.name); //Same level === Sort alphabetically
}

export const stringSort = (x: string, y: string): number => {
	if (x > y) {
		return 1;
	}
	if (x < y) {
		return -1;
	}
	return 0;
}