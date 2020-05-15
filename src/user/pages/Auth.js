import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_EMAIL, VALIDATOR_MIN } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './Auth.css';

const Auth = (props) => {
    const [formState, inputHandler] = useForm(
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

    const authSubmitHandler = (event) => {
        event.preventDefault();

        console.log(formState.inputs);
    };

    return (
        <Card className='authentication'>
            <h2>Login Required</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
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
                    validators={[VALIDATOR_MIN(6)]}
                />
                <Button type='submit' disabled={!formState.isValid}>
                    Login
                </Button>
            </form>
        </Card>
    );
};

export default Auth;
