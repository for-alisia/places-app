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
        {
            id: 'u2',
            name: 'Jason',
            image:
                'https://images.unsplash.com/photo-1584202532967-6390de14ecac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=693&q=80',
            places: 5,
        },
        {
            id: 'u3',
            name: 'Sandy',
            image:
                'https://images.unsplash.com/photo-1489701714346-794d8674a788?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            places: 8,
        },
    ];

    return <UsersList items={USERS} />;
};

export default Users;
