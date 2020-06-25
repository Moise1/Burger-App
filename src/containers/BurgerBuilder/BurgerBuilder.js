import React from 'react'; 
import {connect} from 'react-redux'
import { Aux } from '../../hoc/Aux/Aux';
import classes from './BurgerBuilder.module.css';
import axios from '../../axios-orders'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

 

class BurgerBuilder extends React.Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((totalEls, el) => {
                return totalEls + el;
            }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {

        this.props.history.push('/checkout');
    }

    
    render() {

        // checking whether the ingredients array is not empty
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p className={classes.IngredientsError}>Ingredients couldn't be loaded.</p> : <Spinner/>
        
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        disabled={disabledInfo}

                    />
                </Aux>

            );
 
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price} />
        };

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}


const mapStateToProps = state => {
    
    return {
        ings: state.ingredientsReducer.ingredients,
        price: state.ingredientsReducer.totalPrice,
        error: state.ingredientsReducer.error
    }

}
const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded: (ingName) =>{dispatch(burgerBuilderActions.addIngredient(ingName))},
        onIngredientRemoved: (ingName) =>{dispatch(burgerBuilderActions.removeIngredient(ingName))},
        onInitIngredients: () =>{dispatch(burgerBuilderActions.initIngredients())}
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
