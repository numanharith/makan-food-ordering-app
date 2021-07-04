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
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const customerReg = useSelector((state) => state.customerReg);
  const { loading, error, customerInfo } = customerReg;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    // Redirects customer from this page if they're already logged in
    if (customerInfo) {
      history.push(redirect);
    }
  }, [history, customerInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!')
    } else {
      dispatch(customerRegAction(name, password));
    }
  };

  return (
    <FormContainer>
      <h1>REGISTER AS RESTAURANT</h1>
      {message && <Message variant='danger'>{message}</Message>}
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

          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>

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
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Login to existing customer account</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default CustomerRegPage;
