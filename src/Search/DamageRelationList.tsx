import { Divider, List, ListItem, ListItemText } from '@mui/material';
import { NamedAPIResource } from 'pokenode-ts';
import React from 'react';
import { capitalizeFirstLetter } from '../UtilityMethods';

const style = {
	width: '100%',
	maxWidth: 360,
	bgcolor: 'background.paper'
};

type DamageRelationListProps = {
	ariaLabel: string;
	damageRelations: NamedAPIResource[]
}

export default function DamageRelationList({ariaLabel, damageRelations}: DamageRelationListProps): JSX.Element {
	return (
		<List sx={style} component='nav' aria-label={ariaLabel}>
			{damageRelations.map((x, i, item) => {
				return (
					<div key={x.name}>
						<ListItem key={x.name}>
							<ListItemText primary={capitalizeFirstLetter(x.name)} />
						</ListItem>
						<Divider />
					</div>
				);
			})}
		</List>
	);
}