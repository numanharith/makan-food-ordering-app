import { Fragment, useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addFood } from '../actions/foodActions';
import axios from 'axios';

// Components
import Message from './Message';
import Loader from './Loader';

const AddFoodModal = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0.0);
  const [picture, setPicture] = useState('');
  const [msg, setMsg] = useState('');

  const dispatch = useDispatch();
  const foodAdd = useSelector((state) => state.foodAdd);
  const { loading, error, success } = foodAdd;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (success) {
      handleClose();
    }
  }, [success]);

  const addFoodHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', picture);
    data.append('upload_preset', 'dpcju0f7');
    data.append('cloud_name', 'dxnyuudyt');

    axios
      .post('https://api.cloudinary.com/v1_1/dxnyuudyt/image/upload', data)
      .then((res) => dispatch(addFood(name, price, res.data.url)))
      .catch((err) => setMsg('Image failed to upload'));

    setName('');
    setPrice(0);
  };

  return (
    <Fragment>
      <Button onClick={handleShow}>
        <i className='fas fa-plus'></i> Add food
      </Button>
      <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add food</Modal.Title>
        </Modal.Header>
        {msg && <Message variant='danger'>{msg}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={addFoodHandler}>
          <Modal.Body>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                required
                type='number'
                min='0.01'
                step='0.01'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.File required onChange={(e) => setPicture(e.target.files[0])}></Form.File>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' variant='primary'>
              Confirm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default AddFoodModal;
