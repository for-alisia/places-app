import React, { useEffect, useState } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  //UseEffect prevents the infinite loop of re-rendering (request for data => render => changes (async finction, data comes) => sent request for data again)
  //Second argument - function from hook, that doesn't re-creates (useCallback using) => function runs once, when Component did mount
  useEffect(() => {
    //We can't use async func as the first argument of useEffect, but we can use async inside this func
    const fetchUsers = async () => {
      try {
        //Send a request (using custom http hook and it's function)
        const responseData = await sendRequest(
          'http://localhost:5000/api/users'
        );

        //Add users from server to the state
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
