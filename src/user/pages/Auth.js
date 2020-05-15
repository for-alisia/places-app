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

const Auth = (props) => {
    const [isLoginMode, setIsLoginMode] = useState(true);

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

    const authSubmitHandler = (event) => {
        event.preventDefault();

        console.log(formState.inputs);
        auth.login();
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

    return (
        <Card className='authentication'>
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
    );
};

export default Auth;
