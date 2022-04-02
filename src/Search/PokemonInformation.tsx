import { capitalize, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Pokemon } from 'pokenode-ts';
import React from 'react';
import ImageContainer from './ImageContainer';
import { PokemonMoveContext } from './PokemonMoveContext';
import { MovesTable } from './MovesTable';
import PokemonType from './PokemonType';

export type AjaxResult = {
    status: number;
    message: string;
}

type PokemonInformationProps = {
    isLoaded: boolean;
    error: AjaxResult | undefined;
    pokemon: Pokemon | undefined;
}

export default function PokemonInformation({isLoaded, error, pokemon}: PokemonInformationProps): JSX.Element {
    if (!isLoaded && !error) {
        return <></>;
    } else if (isLoaded && pokemon?.sprites.front_default) {
        const name = capitalize(pokemon.name);

        return (
            <div>
                <Typography variant='h1'>{name}</Typography>
                <div>
                    <Typography variant='h4'>
                        Type{pokemon.types.length > 1 ? 's' : ''}:&nbsp;
                        {pokemon.types.map((type, i, types) => {
                            return (
                                <>
                                    <PokemonType key={ i } name={ capitalize(type.type.name) }/>
                                    {types.length !== i + 1 &&
                                        <>,&nbsp;</>
                                    }
                                </>
                            );
                        })}
                    </Typography>
                </div>
                <ImageContainer name={name} sprites={pokemon.sprites} />
                <Typography variant='h4'>Move Set</Typography>
                <Grid container spacing={2}>
                    <PokemonMoveContext.Provider value={pokemon.moves}>
                        <Grid item xs={6}>
                            <MovesTable isNatural={true} />
                        </Grid>
                        <Grid item xs={6}>
                            <MovesTable isNatural={false} />
                        </Grid>
                    </PokemonMoveContext.Provider>
                </Grid>
            </div>
        );
    } else {
        return <div>{error?.message} - Check the spelling of the PokeMon's name.</div>;
    }
}