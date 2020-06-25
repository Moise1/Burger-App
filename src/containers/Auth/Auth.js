import React from 'react';
import {connect} from 'react-redux'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as authActions from '../../store/actions/index'; 


class Auth extends React.Component {

    state = {
        controls: {
            
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email... '
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password... '
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    }


    checkValidity(value, rules) {
        
        if(!rules){
            return true;
        }
        let isValid = true; 
        if(rules.required){
            isValid = value.trim() !== '' && isValid; 
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (e, controlName ) =>{

         const updatedControls = {
             ...this.state.controls, 
             [controlName]: {
                 ...this.state.controls[controlName], 
                 value: e.target.value, 
                 valid: this.checkValidity(e.target.value, this.state.controls[controlName].validation), 
                 touched: true
             }
         }
         this.setState({controls: updatedControls})
    }

    switchAuthHandler = () =>{
        this.setState(prevState =>{
            return {
                isSignup: !prevState.isSignup
            }
        })
    }
    submitHandler = (e) => {

        e.preventDefault();
        this.props.onAuthUser(
            this.state.controls.email.value, 
            this.state.controls.password.value, 
            this.state.isSignup 
        )
    }

    render() {
        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElements.map(formEl => (
            <Input 
                key={formEl.id}
                elementType={formEl.config.elementType}
                elementConfig={formEl.config.elementConfig}
                value={formEl.config.value}
                invalid={!formEl.config.valid}
                touched={formEl.config.touched}
                changed={(e) => this.inputChangedHandler(e, formEl.id)}
                shouldValidate={formEl.config.validation} />
        ));

        if(this.props.loading) {
            form = <Spinner/> 
        }

        let errorMessage = null;

        if(this.props.error){
        errorMessage = <p>{this.props.error.message}</p>
            
        }

        return (
             
            <div className={classes.AuthData}>
                <h2> Sign Up </h2>

                {errorMessage}

                <form action="" onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
        <Button 
        btnClicked={this.switchAuthHandler}
        btnType="Danger">
            SWITCH TO { this.state.isSignup ? 'SIGN UP': 'SIGN IN'}
        </Button>
            </div>
        )
    }
}


const mapStateToProps = state => {
     
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error
    }
}

const mapDispatchToProps = dispatch =>{

    return {
        onAuthUser: (email, password, isSignup) => dispatch(authActions.authAction(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
