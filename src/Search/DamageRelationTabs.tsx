import { Box, Tab, Tabs } from '@mui/material';
import { NamedAPIResource } from 'pokenode-ts';
import React, { SyntheticEvent, useState } from 'react';
import DamageRelationList from './DamageRelationList';
import { tabHeaderProps, TabPanel } from './TypeTabs';

type DamageRelationTabsProps = {
	doubleDamageTypes: NamedAPIResource[];
	halfDamageTypes: NamedAPIResource[];
	noEffectTypes: NamedAPIResource[];
}

export default function DamageRelationTabs({ doubleDamageTypes, halfDamageTypes, noEffectTypes }: DamageRelationTabsProps): JSX.Element {
	const [value, setValue] = useState(0);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} variant='scrollable' onChange={handleChange} aria-label='damage relations tabs'>
					<Tab key={0} label='Double Damage' {...tabHeaderProps(0)} />
					<Tab key={1} label='Half Damage' {...tabHeaderProps(1)} />
					<Tab key={2} label='No Effect' {...tabHeaderProps(2)} />
				</Tabs>
				<TabPanel value={value} index={0}>
					<DamageRelationList ariaLabel={'double damage'} damageRelations={doubleDamageTypes} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<DamageRelationList ariaLabel={'half damage'} damageRelations={halfDamageTypes} />
				</TabPanel>
				<TabPanel value={value} index={2}>
					<DamageRelationList ariaLabel={'no damage'} damageRelations={noEffectTypes} />
				</TabPanel>
			</Box>
		</Box>
	);
}