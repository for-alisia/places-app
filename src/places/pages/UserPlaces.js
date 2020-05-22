import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';

import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = (props) => {
  //Allow to get the dynamic parameters from ulr (we need user id here)
  const userId = useParams().userId;

  //Custom hook to interract with a server
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedPlaces, setLoadedPlaces] = useState();

  //We don't want to re-send request to a server on each re-render of a component, so we need useEffect hook
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );

        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };

    fetchPlaces();
  }, [sendRequest, userId]);

  const placedeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((p) => p.id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placedeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
