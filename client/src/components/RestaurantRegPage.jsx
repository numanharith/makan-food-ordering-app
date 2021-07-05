import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { restaurantReg } from '../actions/restaurantUserActions';
// Components
import FormContainer from './FormContainer';
import Message from './Message';
import Loader from './Loader';
import axios from 'axios';

const RestaurantRegPage = ({ location, history }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [image, setImage] = useState('');
  const [msg, setMsg] = useState('');

  const dispatch = useDispatch();
  const restaurantUserReg = useSelector((state) => state.restaurantUserReg);
  const { loading, error, restaurantUserInfo } = restaurantUserReg;

  const redirect = location.search ? location.search.split('=')[1] : '/orders';

  useEffect(() => {
    // Redirects user from this page if they're already logged in
    if (restaurantUserInfo) {
      history.push(redirect);
    }
  }, [history, restaurantUserInfo, redirect]);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!')
    } else {
      try {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'dpcju0f7');
        data.append('cloud_name', 'dxnyuudyt');
        axios
          .post('https://api.cloudinary.com/v1_1/dxnyuudyt/image/upload', data)
          .then((res) => dispatch(restaurantReg(name, password, res.data.url)))
          .catch((err) => setMsg('Image failed to upload'));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Register a Restaurant</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {msg && <Message variant='danger'>{msg}</Message>}
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

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='logo'>
              <Form.Label>Logo</Form.Label>
              <Form.File required onChange={(e) => setImage(e.target.files[0])}></Form.File>
          </Form.Group>
        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          <Link to='/restaurant/login'>Login to an existing restaurant account</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RestaurantRegPage;
