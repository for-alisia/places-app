import React, { useState, useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Auth = (props) => {
    //Demands what fields in the form should be rendered (Sign in or Sign up)
    const [isLoginMode, setIsLoginMode] = useState(true);
    //Demands to show a spinner
    const [isLoading, setIsLoading] = useState(false);
    //Demands if the error occures due the connection to the server and shows an error modal
    const [error, setError] = useState();
    //Custom hook to manage state and validity of the form
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false,
            },
            password: {
                value: '',
                isValid: false,
            },
        },
        false
    );

    const auth = useContext(AuthContext);
    // Handle Submit a form (enable only if form is valid (in other cases submit button is disabled))
    const authSubmitHandler = async (event) => {
        event.preventDefault();
        //Initial loading data
        setIsLoading(true);
        if (isLoginMode) {
            //Login Mode
            try {
                //Send a request to the server
                const response = await fetch(
                    'http://localhost:5000/api/users/login',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: formState.inputs.email.value,
                            password: formState.inputs.password.value,
                        }),
                    }
                );

                const responseData = await response.json();
                //If response status is not 200 (404, 500 etc), throw an Error
                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setIsLoading(false);
                //We can login user
                auth.login();
            } catch (err) {
                console.log(err);
                setIsLoading(false);
                setError(
                    err.message || 'Something went wrong, please try again'
                );
            }
        } else {
            //SignUp Mode
            try {
                //Send a request to the server
                const response = await fetch(
                    'http://localhost:5000/api/users/signup',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: formState.inputs.name.value,
                            email: formState.inputs.email.value,
                            password: formState.inputs.password.value,
                        }),
                    }
                );

                const responseData = await response.json();
                //If response status is not 200 (404, 500 etc), throw an Error
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setIsLoading(false);
                //We can login user
                auth.login();
            } catch (err) {
                console.log(err);
                //Loading is finished
                setIsLoading(false);
                //Set error to state
                setError(
                    err.message || 'Something went wrong, please try again'
                );
            }
        }
    };

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                },
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false,
                    },
                },
                false
            );
        }
        setIsLoginMode((prevMode) => !prevMode);
    };

    //Occured,when user close Error Modal, reset error state to null
    const errorHandler = () => {
        setError(null);
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            <Card className='authentication'>
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>{isLoginMode ? 'Sign in' : 'Sign up'}</h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && (
                        <Input
                            id='name'
                            type='text'
                            element='input'
                            label='Name'
                            errorText='Enter your name'
                            validators={[VALIDATOR_REQUIRE()]}
                            onInput={inputHandler}
                        />
                    )}
                    <Input
                        id='email'
                        type='email'
                        element='input'
                        label='Email'
                        errorText='Enter a valid email'
                        onInput={inputHandler}
                        validators={[VALIDATOR_EMAIL()]}
                    />
                    <Input
                        id='password'
                        type='password'
                        element='input'
                        label='Password'
                        errorText='Enter at least 6 characters'
                        onInput={inputHandler}
                        validators={[VALIDATOR_MINLENGTH(6)]}
                    />
                    <Button type='submit' disabled={!formState.isValid}>
                        {isLoginMode ? 'Login' : 'Sign Up'}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>
                    {isLoginMode
                        ? "Don't have an account yet?"
                        : 'Do you already have an account?'}
                </Button>
            </Card>
        </React.Fragment>
    );
};

export default Auth;
