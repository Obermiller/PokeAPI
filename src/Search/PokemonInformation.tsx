import React from 'react';
import { Pokemon, PokemonMove } from 'pokenode-ts';
import { capitalizeFirstLetter, formatMoveDisplay } from '../UtilityMethods';
import { PokemonContext } from './PokemonContext';
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

function PokemonInformation({isLoaded, error, pokemon}: PokemonInformationProps): JSX.Element {
    const levelSort = (x: PokemonMove, y: PokemonMove) => {
        const xLevel = x.version_group_details.map(z => z.level_learned_at)[0];
        const yLevel = y.version_group_details.map(z => z.level_learned_at)[0];

        if (xLevel > yLevel) {
            return 1;
        }
        if (xLevel < yLevel) {
            return -1;
        }
        return stringSort(x, y); //Same level === Sort alphabetically
    }

    const stringSort = (x: PokemonMove, y: PokemonMove) => {
        const xMove = x.move.name;
        const yMove = y.move.name;

        if (xMove > yMove) {
            return 1;
        }
        if (xMove < yMove) {
            return -1;
        }
        return 0;
    }

    if (!isLoaded && !error) {
        return <></>;
    } else if (isLoaded && pokemon?.sprites.front_default) {
        const name = capitalizeFirstLetter(pokemon.name);
        const naturalMoves = pokemon.moves.filter(x => x.version_group_details.map(y => y.level_learned_at)[0] > 0)
                .sort((x, y) => levelSort(x, y))
                .map((move) => {
                    return (
                        <tr key={move.move.name}>
                            <td>{formatMoveDisplay(move.move.name)}</td>
                            <td>{move.version_group_details.map(x => x.level_learned_at)[0]}</td>
                        </tr>
                    );
                });
        const learnableMoves = pokemon.moves.filter(x => x.version_group_details.map(y => y.level_learned_at)[0] === 0)
                .sort((x, y) => stringSort(x, y))
                .map((move) => {
                    return(
                        <tr key={move.move.name}>
                            <td>{formatMoveDisplay(move.move.name)}</td>
                            <td>{formatMoveDisplay(move.version_group_details.map(x => x.move_learn_method)[0].name)}</td>
                        </tr>
                    );
                });

        return (
            <div>
                <h2>{name}</h2>
                <img src={pokemon.sprites.front_default} alt="Pokemon pic"/>
                <div>
                    <label>Type{pokemon.types.length > 1 ? 's' : ''}:</label>
                    <ul>
                        <PokemonContext.Provider value={name}>
                            {pokemon.types.map((type, i) => <PokemonType key={i} id={i} name={capitalizeFirstLetter(type.type.name)} />)}
                        </PokemonContext.Provider>
                    </ul>
                </div>
                <h5>Move Set</h5>
                <table>
                    <thead>
                    <tr>
                        <td>Move Name</td>
                        <td>Level or Method Learned</td>
                    </tr>
                    </thead>
                    <tbody>
                    {naturalMoves}
                    {learnableMoves}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return <div>{error?.message}</div>;
    }
}

export default PokemonInformation;