import { Box, Tab, Tabs } from '@mui/material';
import React, { ReactNode, SyntheticEvent, useContext, useState } from 'react';
import DamageRelationTabs from './DamageRelationTabs';
import { TypeContext } from './TypeContext';

type TabPanelProps = {
	children?: ReactNode;
	index: number;
	value: number;
}

export const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;

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

export default function TypeTabs(): JSX.Element {
	const [value, setValue] = useState(0);
	const type = useContext(TypeContext);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	if (type) {
		const damageRelations = type.damage_relations;
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