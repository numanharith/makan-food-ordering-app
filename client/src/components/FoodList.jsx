import React, { useEffect, useState, Fragment } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getFoods, deleteFood } from '../actions/foodActions';
import PropTypes from 'prop-types';

const FoodList = () => {
  const [foods, setFoods] = useState();

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <Fragment>
      <h1>Food List</h1>

      <ListGroup></ListGroup>
    </Fragment>
  );
};

FoodList.propTypes = {
  getFoods: PropTypes.func.isRequired,
  food: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  food: state.food,
});

export default connect(mapStateToProps, { getFoods, deleteFood })(FoodList);
