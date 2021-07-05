import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listFoods } from '../actions/foodActions';
import { Row, Col } from 'react-bootstrap';

// Components
import FoodCard from './FoodCard';
import Message from './Message';
import Loader from './Loader';

const HomePage = () => {
  const dispatch = useDispatch();

  // Extract foodList data from Redux store
  const foodList = useSelector((state) => state.foodList);
  const { loading, error, foods } = foodList;

  useEffect(() => {
    dispatch(listFoods());
  }, [dispatch]);

  return (
    <Fragment>
      <h1>Food</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {foods.map((food) => (
            <Col key={food._id} sm={12} md={6} lg={4} xl={3}>
              <FoodCard food={food} />
            </Col>
          ))}
        </Row>
      )}
    </Fragment>
  );
};

export default HomePage;
