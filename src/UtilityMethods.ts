import { PokemonMove } from 'pokenode-ts';

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const formatMoveDisplay = (move: string) => capitalizeFirstLetter(move) //Capitalize first letter
	.replace(/-[a-z]/g, match => match.toUpperCase()) //Capitalize after dashes
	.replace('-', ' '); //Remove dashes

export const levelSort = (x: PokemonMove, y: PokemonMove) => {
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

export const stringSort = (x: string, y: string) => {
	if (x > y) {
		return 1;
	}
	if (x < y) {
		return -1;
	}
	return 0;
}