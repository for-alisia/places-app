import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Lina',
            image:
                'https://images.unsplash.com/photo-1588887563897-7809995fe9b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=802&q=80',
            places: 3,
        },
    ];

    return <UsersList items={USERS} />;
};

export default Users;
