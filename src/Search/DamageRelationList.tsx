import { capitalize, Divider, List, ListItem, ListItemText } from '@mui/material';
import { NamedAPIResource } from 'pokenode-ts';
import React from 'react';

const style = {
	bgcolor: 'background.paper'
};

type DamageRelationListProps = {
	ariaLabel: string;
	damageRelations: NamedAPIResource[]
}

export default function DamageRelationList({ariaLabel, damageRelations}: DamageRelationListProps): JSX.Element {
	return (
		<List className='damage-relation-list' sx={style} component='nav' aria-label={ariaLabel}>
			{damageRelations.map((x) => {
				return (
					<div key={x.name}>
						<ListItem key={x.name}>
							<ListItemText primary={capitalize(x.name)} />
						</ListItem>
						<Divider />
					</div>
				);
			})}
		</List>
	);
}