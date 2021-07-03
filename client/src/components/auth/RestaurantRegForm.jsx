import React, { useState, useCallback, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerRestaurantUser } from '../../actions/restaurantAuthActions';
import { clearErrors } from '../../actions/errorActions';

const RestaurantRegForm = ({ className, registerRestaurantUser, clearErrors, error, isAuthenticated }) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const toggle = useCallback(() => {
    // Clear errors
    clearErrors();
    setModal(!modal);
  }, [clearErrors, modal]);

  const handleReg = (e) => {
    e.preventDefault();
    const newRestaurant = { name, password };
    registerRestaurantUser(newRestaurant);
  };

  useEffect(() => {
    // Check for register error
    if (error.id === 'RESTAURANT_USER_REGISTER_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }

    // If authenticated, close modal
    if (modal) {
      if (isAuthenticated) {
        toggle();
      }
    }
  }, [error, toggle, isAuthenticated, modal]);

  return (
    <div>
      <NavLink onClick={toggle} href='#'>
        Register as Restaurant
      </NavLink>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={handleReg}>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                className='mb-3'
                onChange={(e) => setName(e.target.value)}
                value={name}
              />

              <Label for='password'>Password</Label>
              <Input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                className='mb-3'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <Button color='primary'>Register</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

RestaurantRegForm.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  registerRestaurantUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.restaurantAuth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { registerRestaurantUser, clearErrors })(RestaurantRegForm);
