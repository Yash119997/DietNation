import React from 'react';
import CardComponent from '../../Card/Card';
import Services from '../../../Services';

const HomeScreen = () => {
  return (
    <div className='d-flex flex-row bg-secondary justify-content-around flex-wrap'>
      {Services.map((Service) => (
        <CardComponent
          key={Service.title}
          title={Service.title}
          description={Service.description}
          picture={Service.picture}
        />
      ))}
    </div>
  );
};

export default HomeScreen;
