import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { ADD_FOOD } from '../actions/types';

const AddFoodForm = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const [foodName, setFoodName] = useState();

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color='primary' onClick={toggle}>
        Add food
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for='food'>Food</Label>
              <Input
                type='text'
                name='name'
                id='food'
                placeholder='Food name'
                onChange={(e) => setFoodName(e.target.value)}
                value={foodName}
              ></Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddFoodForm;
