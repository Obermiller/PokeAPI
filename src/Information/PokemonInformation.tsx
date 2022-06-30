import { capitalize, Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import ImageContainer from '../Common/ImageContainer';
import { Store } from '../Store/Store';
import { MovesTable } from './Moves/MovesTable';
import PokemonType from './Types/PokemonType';

export default function PokemonInformation(): JSX.Element {
    const pokemon = useSelector((state: Store) => state.searchInfo.pokemon);
    const isLoaded = useSelector((state: Store) => state.searchInfo.isLoaded);
    const error = useSelector((state: Store) => state.searchInfo.error);
    const name = pokemon ? capitalize(pokemon.name) : '';

    return (
        <>
            {!isLoaded && !error &&
                <></>
            }
            {isLoaded && pokemon?.sprites.front_default &&
                <div>
                    <Typography variant='h1'>{ name }</Typography>
                    <div>
                        <Typography variant='h4'>
                            Type{ pokemon.types.length > 1 ? 's' : '' }:&nbsp;
                            { pokemon.types.map((type, i, types) => {
                                return (
                                    <span key={ i }>
                                    <PokemonType name={ capitalize(type.type.name) }/>
                                        { types.length !== i + 1 &&
                                            <>,&nbsp;</>
                                        }
                                    </span>
                                )
                            }) }
                        </Typography>
                    </div>
                    <ImageContainer name={ name } sprites={ pokemon.sprites }/>
                    <Typography variant='h4'>Move Set</Typography>
                    <Grid container spacing={ 2 }>
                        <Grid item xs={ 6 }>
                            <MovesTable isNatural={ true } moves={ pokemon.moves.filter(x => x.version_group_details.map(y => y.level_learned_at)[0] > 0) }/>
                        </Grid>
                        <Grid item xs={ 6 }>
                            <MovesTable isNatural={ false } moves={ pokemon.moves.filter(x => x.version_group_details.map(y => y.level_learned_at)[0] === 0) }/>
                        </Grid>
                    </Grid>
                </div>
            }
            {isLoaded && error &&
                <div>{error.message} - Check the spelling of the PokeMon's name.</div>
            }
        </>
    );
}