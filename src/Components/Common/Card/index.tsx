import React, { FC } from 'react';
import { User } from '../../../Types';

import './index.scss'

interface CardProps {
  user: User; 
}

const Card: FC<CardProps> = ({ user }) => {
  return (
    <div key={user.id} className="card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.website}</p>
      <p>{user.address.street}, {user.address.city}</p>
    </div>
  );
};

export default Card;
