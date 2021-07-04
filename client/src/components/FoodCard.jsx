import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const FoodCard = ({ food }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      {/* <Link to={`/food/${food._id}`}>
        <Card.Img src={food.image} variant='top' />
      </Link> */}

      <Card.Body>
        <Link to={`/foods/${food._id}`}>
          <Card.Title as='div'>
            <strong>{food.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='h3'>${food.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FoodCard;
