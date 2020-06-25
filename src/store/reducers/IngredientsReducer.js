import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIngredientHelper = (state, action) => {
    const updatedIngredientToAdd = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredientsToAdd = updateObject(state.ingredients, updatedIngredientToAdd)
    const updatedStateToAdd = {
        ingredients: updatedIngredientsToAdd,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    
    return updateObject(state, updatedStateToAdd);
}

const removeIngredientHelper = (state, action) => {
    const updatedIngredientToRemove = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngredientsToRemove = updateObject(state.ingredients, updatedIngredientToRemove);
    const updatedStatetoRemove = {
        ingredients: updatedIngredientsToRemove,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }

    return updateObject(state, updatedStatetoRemove)
}

const setIngredientsHelper = (state, action) => {

    return updateObject(
        state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false
    })
}

const fetchIngredientsFailureHelper = (state, action) => {
    return updateObject(state, { error: true })
}


const ingredientsReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredientHelper(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredientHelper(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredientsHelper(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailureHelper(state, action)
        default: return state;
    }
}

export default ingredientsReducer;