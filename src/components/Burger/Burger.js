import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = props => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {

            // transform the ingredient name into an array which has a given number of elmnts 
            // then take the index of the elements to pruduce a unique key

            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient
                    key={igKey + i}
                    type={igKey}
                />
            });
        }).reduce((arr, el) =>{
            return arr.concat(el);
        }, [])
        
        if(transformedIngredients.length === 0){
             transformedIngredients = <p>Please start adding ingredients.</p>
        }    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />

        </div>
    )
}

export default burger;