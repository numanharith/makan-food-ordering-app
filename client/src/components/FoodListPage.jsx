import { Fragment, useEffect } from 'react';
// import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listMyFoods, deleteFood } from '../actions/foodActions';

// Components
import Message from './Message';
import Loader from './Loader';
import AddFoodModal from './AddFoodModal';
import EditFoodModal from './EditFoodModal';

const FoodListPage = ({ history, match }) => {
  const dispatch = useDispatch();

  const myFoodList = useSelector((state) => state.myFoodList);
  const { loading, error, foods } = myFoodList;

  const restaurantUserLogin = useSelector((state) => state.restaurantUserLogin);
  const { restaurantUserInfo } = restaurantUserLogin;

  const foodDelete = useSelector((state) => state.foodDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = foodDelete;

  const foodAdd = useSelector((state) => state.foodAdd);
  const { success: successAdd } = foodAdd;

  const foodEdit = useSelector((state) => state.foodEdit);
  const { success: successEdit } = foodEdit;

  useEffect(() => {
    if (restaurantUserInfo) {
      dispatch(listMyFoods());
    } else {
      history.push('/restaurant/login');
    }
  }, [dispatch, history, restaurantUserInfo, successDelete, successAdd, successEdit]);

  const deleteHandler = (foodId) => {
    if (window.confirm('Confirm delete?')) {
      dispatch(deleteFood(foodId));
    }
  };

  return (
    <Fragment>
      <Row className='align-items-center'>
        <Col className='col-auto mr-auto'>
          <h1>Food</h1>
        </Col>
        <Col className='col-auto'>
          <AddFoodModal />
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
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
                  <EditFoodModal food={food} />
                  <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(food._id)}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default FoodListPage;
