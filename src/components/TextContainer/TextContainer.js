import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className='textContainer'>
    <div>
      <h1 style={{ color: 'white' }}>CURRENT USERS:</h1>
    </div>
    {users ? (
      <div>
        <h1>People currently chatting:</h1>
        <div className='activeContainer'>
          <h2 style={{ color: 'white' }}>
            {users.map(({ name }) => (
              <div key={name} className='activeItem'>
                {name}
                <img alt='Online Icon' src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
