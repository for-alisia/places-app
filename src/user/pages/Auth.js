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
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const Auth = (props) => {
  //Demands what fields in the form should be rendered (Sign in or Sign up)
  const [isLoginMode, setIsLoginMode] = useState(true);

  //Use a custom hook to send and handle the request to a server
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const auth = useContext(AuthContext);

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

  //Handle the forms (sign in or sign up)
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  // Handle Submit a form (enable only if form is valid (in other cases submit button is disabled))
  const authSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState);
    if (isLoginMode) {
      //Login Mode
      try {
        //Use custom hook function to send a request. It will return responce data (promise) and handle the errors
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { 'Content-Type': 'application/json' }
        );
        //We can login user
        auth.login(responseData.user.id);
      } catch (err) {
        console.log(err);
      }
    } else {
      //SignUp Mode
      try {
        //Send a request to the server
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { 'Content-Type': 'application/json' }
        );
        //We can login user
        auth.login(responseData.user.id);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
          {!isLoginMode && (
            <ImageUpload center id='image' onInput={inputHandler} />
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
