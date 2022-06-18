import { Box, Tab, Tabs } from '@mui/material';
import { TypeRelations } from 'pokenode-ts';
import React, { ReactNode, SyntheticEvent, useState } from 'react';
import DamageRelationTabs from './DamageRelationTabs';

type TabPanelProps = {
	children?: ReactNode;
	index: number;
	value: number;
}

type TypeTabProps = {
	damageRelations?: TypeRelations
}

export const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
	return (
		<div role='tabpanel' hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
			{value === index && (
				<Box>
					{children}
				</Box>
			)}
		</div>
	);
}

export const tabHeaderProps = (index: number) => {
	return {
		id: `tab-${index}`,
		'aria-controls': `tabpanel-${index}`,
	};
}

export default function TypeTabs({damageRelations} : TypeTabProps): JSX.Element {
	const [value, setValue] = useState(0);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	if (damageRelations) {
		return (
			<Box className='type-tab-container' sx={{ bgcolor: 'background.paper' }}>
				<Tabs orientation='vertical' variant='scrollable' value={value} onChange={handleChange} aria-label='offensive or defensive' sx={{ borderColor: 'divider' }}>
					<Tab label='Offensive' {...tabHeaderProps(0)} />
					<Tab label='Defensive' {...tabHeaderProps(1)} />
				</Tabs>
				<TabPanel value={value} index={0}>
					<DamageRelationTabs doubleDamageTypes={damageRelations.double_damage_to} halfDamageTypes={damageRelations.half_damage_to} noEffectTypes={damageRelations.no_damage_to} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<DamageRelationTabs doubleDamageTypes={damageRelations.double_damage_from} halfDamageTypes={damageRelations.half_damage_from} noEffectTypes={damageRelations.no_damage_from} />
				</TabPanel>
			</Box>
		);
	}
	else {
		return (
			<div>No type provided.</div>
		);
	}
}