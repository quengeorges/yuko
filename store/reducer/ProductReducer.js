import {combineReducers} from "redux";

const INITIAL_STATE = {
    current: {},
    allProducts: [],
    favorites: []
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ADD_PRODUCT':
            if (state.allProducts.find(elem => elem.code === action.item.code) === undefined) {
                return {
                    ...state,
                    allProducts: [...state.allProducts, action.item]
                };
            } else {
                return { ...state }
            }
        case 'ADD_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.item]
            };
        case 'SET_CURRENT':
            return {
                ...state,
                current: action.item
            };
        default:
            return state;
    }
};

export function addProduct(item) {
    return {
        type: 'ADD_PRODUCT',
        item
    }
}

export function addFavorite(item) {
    return {
        type: 'ADD_FAVORITE',
        item
    }
}

export function setCurrent(item) {
    return {
        type: 'SET_CURRENT',
        item
    }
}
