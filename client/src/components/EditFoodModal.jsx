import { Fragment, useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { editFood } from '../actions/foodActions';

// Components
import Message from './Message';
import Loader from './Loader';

const EditFoodModal = ({ food }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(food.name);
  const [price, setPrice] = useState(food.price);

  const dispatch = useDispatch();
  const foodEdit = useSelector((state) => state.foodEdit);
  const { loading, error, success } = foodEdit;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (success) {
      handleClose();
    }
  }, [success]);

  const editFoodHandler = (e) => {
    e.preventDefault();
    dispatch(editFood({ _id: food._id, name, price }));
  };

  return (
    <Fragment>
      <Button variant='light' className='btn-sm' onClick={handleShow}>
        <i className='fas fa-edit'></i>
      </Button>
      <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add food</Modal.Title>
        </Modal.Header>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={editFoodHandler}>
          <Modal.Body>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>

              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                min='0.00'
                step='0.01'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' variant='warning'>
              Modify
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default EditFoodModal;
