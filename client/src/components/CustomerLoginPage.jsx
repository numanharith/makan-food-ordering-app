import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { customerLoginAction } from '../actions/customerActions';
// Components
import FormContainer from './FormContainer';
import Message from './Message';
import Loader from './Loader';

const CustomerLoginPage = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const customerLogin = useSelector((state) => state.customerLogin);
  const { loading, error, customerInfo } = customerLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    // Redirects user from this page if they're already logged in
    if (customerInfo) {
      history.push(redirect);
    }
  }, [history, customerInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(customerLoginAction(email, password));
  };

  return (
    <FormContainer>
      <h1>Login as Customer</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Link to='/customer/reg'>Create a new customer account</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default CustomerLoginPage;
