import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

const RestaurantCard = ({ restaurant }) => {

  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Img src={restaurant.logo} variant='top' className='card-img-top' />
      <Card.Body>
        <Card.Title as='div'>{restaurant.name}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Link to={`/restaurants/${restaurant._id}/menu`}>
          <Button className='btn-block' type='button'>
            Menu
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default RestaurantCard;
