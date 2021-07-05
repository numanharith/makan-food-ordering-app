import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { publicRestaurantMenuAction } from '../actions/foodActions';
import { Row, Col } from 'react-bootstrap';

// Components
import FoodCard from './FoodCard';
import Message from './Message';
import Loader from './Loader';

const RestaurantMenuPage = ({ match }) => {
  const dispatch = useDispatch();

  // Extract specific restaurant menu from Redux store
  const publicRestaurantMenu = useSelector((state) => state.publicRestaurantMenu);
  const { loading, error, foods } = publicRestaurantMenu;

  useEffect(() => {
    dispatch(publicRestaurantMenuAction(match.params.restaurantId));
  }, [dispatch, match]);

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

export default RestaurantMenuPage;
