import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(): JSX.Element {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' component='div'>
						<Link to='/Search'>Search</Link>
						&nbsp;&nbsp;&nbsp;
						<Link to='/Battle'>Battle</Link>
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}