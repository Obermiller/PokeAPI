import { PokemonMove } from 'pokenode-ts';
import React from 'react';

export const MoveContext = React.createContext<PokemonMove[]>([]);