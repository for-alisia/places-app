import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';
import './PlaceList.css';

const PlaceList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className='place-list center'>
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <Button to='/places/new'>Share Place</Button>
                </Card>
            </div>
        );
    }
    return (
        <ul className='place-list'>
            {props.items.map((item) => {
                const {
                    id,
                    imageUrl,
                    title,
                    description,
                    address,
                    creator,
                    location,
                } = item;
                return (
                    <PlaceItem
                        key={id}
                        id={id}
                        image={imageUrl}
                        title={title}
                        description={description}
                        address={address}
                        creatorId={creator}
                        coordinates={location}
                    />
                );
            })}
        </ul>
    );
};

export default PlaceList;
