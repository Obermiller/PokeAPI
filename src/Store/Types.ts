import { Move, Pokemon, Type } from 'pokenode-ts';
import { AjaxResult } from '../Common/Types/AjaxResult';

export const APPEND_MOVE = 'APPEND_MOVE';
export const APPEND_TYPE = 'APPEND_TYPE';
export const CLEAR_SEARCH_INFO = 'CLEAR_SEARCH_INFO';
export const IS_LOADED = 'IS_LOADED';
export const SET_ERROR = 'SET_ERROR';
export const SET_POKEMON = 'SET_POKEMON';

export type ActionTypes = { type: typeof APPEND_MOVE, data: Move }
	| { type: typeof APPEND_TYPE, data: Type }
	| { type: typeof CLEAR_SEARCH_INFO }
	| { type: typeof IS_LOADED, data: boolean }
	| { type: typeof SET_ERROR, data: AjaxResult | undefined }
	| { type: typeof SET_POKEMON, data: Pokemon | undefined };

export const appendMove = (move: Move): ActionTypes => ({
	type: APPEND_MOVE,
	data: move
});

export const appendType = (type: Type): ActionTypes => ({
	type: APPEND_TYPE,
	data: type,
});

export const clearSearchInfo = (): ActionTypes => ({
	type: CLEAR_SEARCH_INFO
});

export const isLoaded = (isLoading: boolean): ActionTypes => ({
	type: IS_LOADED,
	data: isLoading
});

export const setError = (error: AjaxResult | undefined): ActionTypes => ({
	type: SET_ERROR,
	data: error
});

export const setPokemon = (pokemon: Pokemon | undefined): ActionTypes => ({
	type: SET_POKEMON,
	data: pokemon
});
