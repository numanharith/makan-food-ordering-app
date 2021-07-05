import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Row, Col, Form } from 'react-bootstrap';

const FoodCard = ({ food }) => {
  const history = useHistory();
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    history.push(`/customer/cart/${food._id}?qty=${qty}`);
  };
  
  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Img src={food.image} variant='top' className='card-img-top' />

      <Card.Body>
        <Card.Title as='div'>
          {food.name} <strong>(${food.price})</strong>
        </Card.Title>
        <Row>
          <Col>Qty</Col>
          <Col>
            <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </Form.Control>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Button onClick={addToCartHandler} className='btn-block' type='button'>
          Add to Cart
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default FoodCard;
