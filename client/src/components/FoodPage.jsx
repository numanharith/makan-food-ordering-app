import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listFoodDetails } from '../actions/foodActions';

// Components
import Message from './Message';
import Loader from './Loader';

const FoodPage = ({ match }) => {
  const dispatch = useDispatch();
  const foodDetails = useSelector((state) => state.foodDetails);
  const { loading, error, food } = foodDetails;

  useEffect(() => {
    dispatch(listFoodDetails(match.params.foodId));
  }, [dispatch, match]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Fragment>
          <h1>{food.name}</h1>
          <p>{food.price}</p>
        </Fragment>
      )}
    </Fragment>
  );
};

export default FoodPage;
