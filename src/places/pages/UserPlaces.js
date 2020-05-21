import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

export const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world',
        imageUrl:
            'https://images.unsplash.com/photo-1583842761829-4245d7894246?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        address: '20 W 34th St, New York, NY 10001, USA',
        location: {
            lat: 40.7484405,
            lng: -73.9878531,
        },
        creator: 'u1',
    },
    {
        id: 'p2',
        title: 'MetLife Building',
        description:
            'This building was owned by PANAM Airlines, then it went out of business, and it was bought by metlafe, the building is a symbol of the 70s',
        imageUrl:
            'https://images.unsplash.com/photo-1565018996595-bb3ed07be1a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80',
        address: '200 Park Ave, New York, NY 10166, USA',
        location: {
            lat: 40.7476936,
            lng: -73.9691017,
        },
        creator: 'u1',
    },
];
const UserPlaces = (props) => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(
        (place) => place.creator === userId
    );
    return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
