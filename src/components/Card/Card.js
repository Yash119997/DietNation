import { Card, Button } from 'react-bootstrap';
import React from 'react';

const CardComponent = ({ title, description, picture }) => {
  return (
    <div>
      <Card className='text-center' style={{ width: '22rem', height: '28rem' }}>
        <Card.Img variant='top' src={picture} />
        <Card.Body>
          <Card.Text>{description}</Card.Text>
          <Button variant='primary'>{title}</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardComponent;
