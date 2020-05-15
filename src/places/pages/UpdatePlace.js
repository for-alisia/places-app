import React from 'react';
import { useParams } from 'react-router-dom';

import { DUMMY_PLACES } from './UserPlaces';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';

const UpdatePlace = (props) => {
    const placeId = useParams().placeId;

    const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

    const [formState, inputHandler] = useForm(
        {
            title: {
                value: identifiedPlace.title,
                isValid: true,
            },
            description: {
                value: identifiedPlace.description,
                isValid: true,
            },
        },
        true
    );

    const placeUpdateSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    if (!identifiedPlace) {
        return (
            <div className='center'>
                <h2>Could not find place</h2>
            </div>
        );
    }

    return (
        <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
            <Input
                id='title'
                element='input'
                type='text'
                validators={[VALIDATOR_REQUIRE()]}
                label='Title'
                errorText='Please enter a valid title'
                onInput={inputHandler}
                value={formState.inputs.title.value}
                valid={formState.inputs.title.isValid}
            />
            <Input
                id='description'
                element='textarea'
                type='text'
                validators={[VALIDATOR_MINLENGTH(5)]}
                label='Description'
                errorText='Please enter a valid description (at least 5 characters)'
                onInput={inputHandler}
                value={formState.inputs.description.value}
                valid={formState.inputs.description.isValid}
            />
            <Button type='submit' disabled={!formState.isValid}>
                Update Place
            </Button>
        </form>
    );
};

export default UpdatePlace;
