import { Backdrop, Box, Fade, Link, Modal, Typography } from '@mui/material';
import { PokemonClient, Type } from 'pokenode-ts';
import React, { useEffect, useState } from 'react';
import { AjaxResult } from './PokemonInformation';
import { TypeContext } from './TypeContext';
import TypeTabs from './TypeTabs';

type PokemonTypeProps = {
	name: string;
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 700,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function PokemonType({name}: PokemonTypeProps): JSX.Element {
	const [type, setType] = useState<Type | undefined>();
	//Ajax hooks
	const [isLoading, setIsLoading] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState<AjaxResult>();
	//Modal hooks
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
				<Link component='button' variant='body2' onClick={handleOpen}>
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
						<Box sx={style}>
							<Typography variant='h6' component='h2'>
								{name}
							</Typography>
							<TypeContext.Provider value = {type}>
								<TypeTabs />
							</TypeContext.Provider>
						</Box>
					</Fade>
				</Modal>
			</div>
		);
	} else {
		return <div>{error?.message}</div>;
	}
}