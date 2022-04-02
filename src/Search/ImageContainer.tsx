import { Container, ImageList, ImageListItem } from '@mui/material';
import { PokemonSprites } from 'pokenode-ts';
import React from 'react';

type ImageContainerProps = {
	name: string;
	sprites: PokemonSprites;
}

export default function ImageContainer({ name, sprites }: ImageContainerProps): JSX.Element {
	return (
		<Container maxWidth='sm'>
			<ImageList sx={{ width: 500, height: 500 }} cols={2}>
				<ImageListItem>
					<img src={`${sprites.front_default}`} alt={`${name} front`} loading='lazy' />
				</ImageListItem>
				<ImageListItem>
					<img src={`${sprites.front_shiny}`} alt={`${name} front shiny`} loading='lazy' />
				</ImageListItem>
				<ImageListItem>
					<img src={`${sprites.back_default}`} alt={`${name} back`} loading='lazy' />
				</ImageListItem>
				<ImageListItem>
					<img src={`${sprites.back_shiny}`} alt={`${name} back shiny`} loading='lazy' />
				</ImageListItem>
			</ImageList>
		</Container>
	);
}