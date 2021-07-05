import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { customerRegAction } from '../actions/customerActions';
// Components
import FormContainer from './FormContainer';
import Message from './Message';
import Loader from './Loader';

const CustomerRegPage = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const customerReg = useSelector((state) => state.customerReg);
  const { loading, error, customerInfo } = customerReg;
  
  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo: customerInfoLogin } = customerLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/foods';

  useEffect(() => {
    // Redirects customer from this page if they're already logged in
    if (customerInfoLogin) {
      history.push(redirect);
    }
  }, [history, customerInfoLogin, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
    } else {
      dispatch(customerRegAction(email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Register as Customer</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
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

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          <Link to='/customer/login'>Login to existing customer account</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default CustomerRegPage;
