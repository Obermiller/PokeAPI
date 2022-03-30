import { Backdrop, Box, Fade, Link, Modal, Typography } from '@mui/material';
import { PokemonClient, Type } from 'pokenode-ts';
import React, { useCallback, useState } from 'react';
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
	height: 600,
	bgcolor: 'background.paper',
	border: '2px solid #000',
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

	const handleClose = () => setOpen(false);

	const handleOpen = useCallback(async () => {
		if (isLoading) {
			return
		}

		setIsLoading(true);

		await new PokemonClient().getTypeByName(name.toLowerCase())
			.then((result: Type) => setType(result))
			.catch((err) => setError(err))
			.finally(() => setIsLoading(false));

		setOpen(true);
	}, [name, isLoading]);

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
						{!error &&
							<>
                                <Typography variant='h6' component='h2'>
									{name}
                                </Typography>
                                <TypeContext.Provider value = {type}>
                                    <TypeTabs />
                                </TypeContext.Provider>
							</>
						}
						{error?.message}
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}