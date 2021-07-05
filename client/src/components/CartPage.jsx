import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions';

// Components
import Message from '../components/Message';
import { createOrderAction } from '../actions/orderActions';

const CartPage = ({ match, location, history }) => {
  const foodId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;

  // Get customer's logged in state from Redux store
  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  useEffect(() => {
    if (foodId) {
      dispatch(addToCart(foodId, qty));
    }
  }, [dispatch, foodId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = (foodId) => {
    // dispatch(createOrderAction({
    //   orderItems: cartItems,
    // }))
  };

  const signInHandler = () => {
    history.push('/customer/login?redirect=cart');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Orders</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {cartItems.length === 0 ? (
          <Message>
            You have not added any orders to cart. <Link to='/foods'>Menu</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.food}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>{item.name}</Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.food, Number(e.target.value)))}
                    >
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
                  <Col md={2}>
                    <Button variant='light' onClick={() => removeFromCartHandler(item.food)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>ORDER SUMMARY</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>No. of packets</Col>
                <Col>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Subtotal</Col>
                <Col>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {customerInfo ? (
                <Button className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                  Confirm order
                </Button>
              ) : (
                <Button className='btn-block' disabled={cartItems.length === 0} onClick={signInHandler}>
                  Log in to Checkout
                </Button>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
