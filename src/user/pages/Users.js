import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();

    //UseEffect prevents the infinite loop of re-rendering (request for data => render => changes (async finction, data comes) => sent request for data again)
    //Second argument - empty array => function runs once, when Component did mount
    useEffect(() => {
        //We can't use async func as the first argument of useEffect, but we can use async inside this func
        const sendRequest = async () => {
            setIsLoading(true);
            //Send a request
            try {
                const response = await fetch('http://localhost:5000/api/users');
                const responseData = await response.json();

                //Handle 4-- and 5-- errors
                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                //Add users from server to the state
                setLoadedUsers(responseData.users);
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        };
        sendRequest();
    }, []);

    //Handle closing of error modal
    const errorHandler = () => {
        setError(null);
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner asOverlay />
                </div>
            )}
            {
                //We don't need to render UsersList, while loadedUsers = undefined
                !isLoading && loadedUsers && <UsersList items={loadedUsers} />
            }
        </React.Fragment>
    );
};

export default Users;
