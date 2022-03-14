import Grid from '@mui/material/Grid';
import { Pokemon } from 'pokenode-ts';
import React from 'react';
import { capitalizeFirstLetter } from '../UtilityMethods';
import { MoveContext } from './MoveContext';
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
        const name = capitalizeFirstLetter(pokemon.name);

        return (
            <div>
                <h2>{name}</h2>
                <img src={pokemon.sprites.front_default} alt={name}/>
                <div>
                    <label>Type{pokemon.types.length > 1 ? 's' : ''}:</label>
                    {pokemon.types.map((type, i) => <PokemonType key={i} name={capitalizeFirstLetter(type.type.name)} />)}
                </div>
                <h2>Move Set</h2>
                <Grid container spacing={2}>
                    <MoveContext.Provider value={pokemon.moves}>
                        <Grid item xs={6}>
                            <MovesTable isNatural={true} />
                        </Grid>
                        <Grid item xs={6}>
                            <MovesTable isNatural={false} />
                        </Grid>
                    </MoveContext.Provider>
                </Grid>
            </div>
        );
    } else {
        return <div>{error?.message}</div>;
    }
}