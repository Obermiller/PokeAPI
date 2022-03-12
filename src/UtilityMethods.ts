export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const formatMoveDisplay = (move: string) => capitalizeFirstLetter(move) //Capitalize first letter
	.replace(/-[a-z]/g, match => match.toUpperCase()) //Capitalize after dashes
	.replace('-', ' '); //Remove dashes
