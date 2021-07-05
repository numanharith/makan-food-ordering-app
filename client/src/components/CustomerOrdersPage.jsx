import { Fragment, useEffect } from 'react';
import { Table, Row, Col, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Message from './Message';
import Loader from './Loader';
import { customerGetsOrdersAction } from '../actions/orderActions';

const CustomerOrdersPage = ({ history }) => {
  const dispatch = useDispatch();

  const customerGetsOrders = useSelector((state) => state.customerGetsOrders);
  const { loading, error, orders } = customerGetsOrders;

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success } = orderCreate;

  useEffect(() => {
    if (customerInfo) {
      dispatch(customerGetsOrdersAction());
    } else {
      history.push('/customer/login');
    }
  }, [dispatch, history, customerInfo, success]);

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
              <th>Restaurant</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  {order.orderItems.map((food) => (
                    <p>{food.food.name}</p>
                  ))}
                </td>
                <td>
                  {order.orderItems.map((food) => (
                    <p>{food.qty}</p>
                  ))}
                </td>
                <td>{order.restaurant.name}</td>
                <td>
                  <Badge
                    variant={
                      order.status === 'Pending' ? 'danger' : order.status === 'Preparing' ? 'warning' : 'success'
                    }
                  >
                    {order.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default CustomerOrdersPage;
