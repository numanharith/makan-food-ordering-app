import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantsAction } from '../actions/restaurantActions';
import { Row, Col } from 'react-bootstrap';

// Components
import RestaurantCard from './RestaurantCard';
import Message from './Message';
import Loader from './Loader';

const RestaurantsPage = () => {
  const dispatch = useDispatch();

  // Extract restaurantList data from Redux store
  const restaurantList = useSelector((state) => state.restaurantList);
  const { loading, error, restaurants } = restaurantList;

  useEffect(() => {
    dispatch(getRestaurantsAction());
  }, [dispatch]);

  return (
    <Fragment>
      <h1>Restaurants</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {restaurants.map((restaurant) => (
            <Col key={restaurant._id} sm={12} md={6} lg={4} xl={3}>
              <RestaurantCard restaurant={restaurant} />
            </Col>
          ))}
        </Row>
      )}
    </Fragment>
  );
};

export default RestaurantsPage;
