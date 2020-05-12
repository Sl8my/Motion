import React from 'react';
import UserCard from '../../UserCard';

const UsersList = ({ users }) => users.map((user, index) => <UserCard user={user} key={index} />);

export default UsersList;
