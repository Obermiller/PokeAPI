import { Backdrop, Box, capitalize, Fade, Link, Modal, Typography } from '@mui/material';
import { PokemonClient, Type } from 'pokenode-ts';
import React, { useCallback, useContext, useState } from 'react';
import { LoadedTypeContext } from './LoadedTypeContext';
import { AjaxResult } from './PokemonInformation';
import TypeTabs from './TypeTabs';

type PokemonTypeProps = {
	name: string;
}

const style = {
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

export default function PokemonType({name}: PokemonTypeProps): JSX.Element {
	const [type, setType] = useState<Type | undefined>();
	//Ajax hooks
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<AjaxResult>();
	//Modal hooks
	const [open, setOpen] = useState(false);
	const loadedTypes = useContext(LoadedTypeContext);

	const handleClose = () => setOpen(false);

	const handleOpen = useCallback(async () => {
		if (type || isLoading) {
			setOpen(true);
			return;
		}

		if (loadedTypes.map(x => capitalize(x.name)).includes(name)) {
			setType(loadedTypes.filter(x => x.name === name.toLowerCase())[0]);
		}
		else {
			setIsLoading(true);

			await new PokemonClient().getTypeByName(name.toLowerCase())
				.then((result: Type) => {
					setType(result);
					loadedTypes.push(result);
				})
				.catch((err) => setError(err))
				.finally(() => setIsLoading(false));
		}

		setOpen(true);

	}, [isLoading, loadedTypes, name, type]);

	return (
		<>
			<Link href='#' underline='none' onClick={handleOpen}>
				{name}
			</Link>
			<Modal
				aria-labelledby='type'
				aria-describedby='strengths and weaknesses'
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}
			>
				<Fade in={open}>
					<Box className='type-modal' sx={style}>
						{!error &&
							<>
                                <Typography variant='h6' component='h4'>
									{name}
                                </Typography>
								<TypeTabs damageRelations={type?.damage_relations} />
							</>
						}
						{error?.message}
					</Box>
				</Fade>
			</Modal>
		</>
	);
}