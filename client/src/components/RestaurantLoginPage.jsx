import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { restaurantLogin } from '../actions/restaurantUserActions';
// Components
import FormContainer from './FormContainer';
import Message from './Message';
import Loader from './Loader';

const RestaurantLoginPage = ({ location, history }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const restaurantUserLogin = useSelector((state) => state.restaurantUserLogin);
  const { loading, error, restaurantUserInfo } = restaurantUserLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    // Redirects user from this page if they're already logged in
    if (restaurantUserInfo) {
      history.push(redirect);
    }
  }, [history, restaurantUserInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(restaurantLogin(name, password));
  };

  return (
    <FormContainer>
      <h1>Login as Restaurant</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Login
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          <Link to='/restaurant/reg'>Create a new restaurant account</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RestaurantLoginPage;
