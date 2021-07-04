import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message';
import Loader from './Loader';
import { listFoods, deleteFood } from '../actions/foodActions';

const FoodListPage = ({ history, match }) => {
  const dispatch = useDispatch();

  const foodList = useSelector((state) => state.foodList);
  const { loading, error, foods } = foodList;

  const restaurantUserLogin = useSelector((state) => state.restaurantUserLogin);
  const { restaurantUserInfo } = restaurantUserLogin;

  const foodDelete = useSelector((state) => state.foodDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = foodDelete;

  useEffect(() => {
    if (restaurantUserInfo) {
      dispatch(listFoods());
    } else {
      history.push('/restaurant/login');
    }
  }, [dispatch, history, restaurantUserInfo, successDelete]);

  const deleteHandler = (foodId) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteFood(foodId));
    }
  };

  const addFoodHandler = (food) => {
    // Add food
  };
  return (
    <>
      <Row className='align-items-center'>
        <Col className='col-auto me-auto'>
          <h1>Food</h1>
        </Col>
        <Col className='col-auto'>
          <Button onClick={addFoodHandler}>
            <i className='fas fa-plus'></i> Add food
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>errorDelete</Message>}
      {loadingDelete && <Loader />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>NAME</th>
              <th>PRICE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id}>
                <td>{food.name}</td>
                <td>${food.price}</td>
                <td>
                  <LinkContainer to={`/foods/${food._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(food._id)}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default FoodListPage;
