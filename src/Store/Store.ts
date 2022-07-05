import { configureStore } from '@reduxjs/toolkit';
import { Move, Pokemon, Type } from 'pokenode-ts';
import { AjaxResult } from '../Common/Types/AjaxResult';
import { appendToArray } from '../Common/Methods/UtilityMethods';
import { ActionTypes, APPEND_MOVE, APPEND_TYPE, CLEAR_SEARCH_INFO, IS_LOADED, SET_ERROR, SET_POKEMON } from './Types';

export interface SearchInfo {
	pokemon?: Pokemon;
	isLoaded: boolean;
	error?: AjaxResult;
}

export interface Store {
	searchInfo: SearchInfo;
	moves: Move[];
	types: Type[];
}

const typesReducer = (state: Store = {
	searchInfo: {
		pokemon: undefined,
		isLoaded: false,
		error: undefined
	},
	moves: [],
	types: []
}, action: ActionTypes): Store => {
	switch (action.type) {
		case APPEND_MOVE:
			return {
				...state,
				moves: appendToArray(state.moves, action.data)
			};
		case APPEND_TYPE:
			return {
				...state,
				types: appendToArray(state.types, action.data)
			};
		case CLEAR_SEARCH_INFO:
			return {
				...state,
				searchInfo: {
					pokemon: undefined,
					isLoaded: false,
					error: undefined
				}
			};
		case IS_LOADED:
			return {
				...state,
				searchInfo: {
					...state.searchInfo,
					isLoaded: action.data
				}
			};
		case SET_ERROR:
			return {
				...state,
				searchInfo: {
					...state.searchInfo,
					error: action.data
				}
			};
		case SET_POKEMON:
			return {
				...state,
				searchInfo: {
					...state.searchInfo,
					pokemon: action.data
				}
			};
		default:
			return state;
	}
}

let store = configureStore({
	reducer: typesReducer
});

export default store;