import React from 'react';
import UserItem from './UserItem';
import './UsersList.css';

const UsersList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className='center'>
                <h2>No users found</h2>
            </div>
        );
    }

    return (
        <ul className='users-list'>
            {props.items.map((user) => {
                const { id, image, name, places } = user;

                return (
                    <UserItem
                        key={id}
                        id={id}
                        image={image}
                        name={name}
                        placeCount={places}
                    />
                );
            })}
        </ul>
    );
};

export default UsersList;
