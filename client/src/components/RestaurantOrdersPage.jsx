import { Fragment, useEffect } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Message from './Message';
import Loader from './Loader';
import { changeOrderStatusAction, restaurantGetsOrdersAction } from '../actions/orderActions';

const RestaurantOrdersPage = ({ history }) => {
  const dispatch = useDispatch();

  const restaurantGetsOrders = useSelector((state) => state.restaurantGetsOrders);
  const { loading, error, orders } = restaurantGetsOrders;

  const changeOrderStatus = useSelector((state) => state.changeOrderStatus);
  const { loading: changOrderLoading, success: changOrderSuccess, error: changOrderError } = changeOrderStatus;

  const restaurantUserLogin = useSelector((state) => state.restaurantUserLogin);
  const { restaurantUserInfo } = restaurantUserLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success } = orderCreate;

  useEffect(() => {
    if (restaurantUserInfo) {
      dispatch(restaurantGetsOrdersAction());
    } else {
      history.push('/customer/login');
    }
  }, [dispatch, history, restaurantUserInfo, success, changOrderSuccess]);

  const statusHandler = (order) => {
    dispatch(changeOrderStatusAction(order));
  };

  return (
    <Fragment>
      <Row className='align-items-center'>
        <Col className='col-auto mr-auto'>
          <h1>Orders</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Food</th>
              <th>Qty</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  {order.orderItems.map((food) => (
                    <p key={food.food._id}>{food.food.name}</p>
                  ))}
                </td>
                <td>
                  {order.orderItems.map((food) => (
                    <p key={food.food._id}>{food.qty}</p>
                  ))}
                </td>
                <td>
                  <Button
                    variant={
                      order.status === 'Pending' ? 'danger' : order.status === 'Preparing' ? 'warning' : 'success'
                    }
                    onClick={() => statusHandler(order)}
                  >
                    {order.status}
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

export default RestaurantOrdersPage;
