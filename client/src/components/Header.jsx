import { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Actions
import { restaurantLogout } from '../actions/restaurantUserActions';
import { customerLogoutAction } from '../actions/customerActions';

const Header = () => {
  const dispatch = useDispatch();

  const restaurantUserLogin = useSelector((state) => state.restaurantUserLogin);
  const { restaurantUserInfo } = restaurantUserLogin;

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const logoutHandler = () => {
    if (restaurantUserInfo) {
      dispatch(restaurantLogout());
    } else if (customerInfo) {
      dispatch(customerLogoutAction());
    }
  };

  return (
    <Navbar bg='light' expand='lg' collapseOnSelect>
      <Container>
        <Navbar.Brand>MAKAN</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            {!restaurantUserInfo && (
              <Fragment>
                <LinkContainer exact to='/foods'>
                  <Nav.Link>Foods</Nav.Link>
                </LinkContainer>
                <LinkContainer exact to='/restaurants'>
                  <Nav.Link>Restaurants</Nav.Link>
                </LinkContainer>
              </Fragment>
            )}
            {customerInfo && (
              <Fragment>
                <LinkContainer exact to='/myorders'>
                  <Nav.Link>My Orders</Nav.Link>
                </LinkContainer>
              </Fragment>
            )}
            {restaurantUserInfo && (
              <Fragment>
                <LinkContainer exact to='/orders'>
                  <Nav.Link>Orders</Nav.Link>
                </LinkContainer>
                <LinkContainer exact to='/mymenu'>
                  <Nav.Link>Menu</Nav.Link>
                </LinkContainer>
              </Fragment>
            )}
          </Nav>
          <Nav className='ml-auto'>
            {customerInfo && (
              <Fragment>
                <NavDropdown title={customerInfo.email} id='email'>
                  <LinkContainer to='/account'>
                    <NavDropdown.Item>Account</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Fragment>
            )}
            {restaurantUserInfo && (
              <NavDropdown title={restaurantUserInfo.name} id='name'>
                <LinkContainer to='/account'>
                  <NavDropdown.Item>Account</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
            {!restaurantUserInfo && !customerInfo && (
              <Fragment>
                <LinkContainer to='/restaurant/login'>
                  <Nav.Link>
                    <i className='fas fa-store'></i> Login as Restaurant
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/customer/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Login as Customer
                  </Nav.Link>
                </LinkContainer>
              </Fragment>
            )}
            {!restaurantUserInfo && (
              <LinkContainer to='/customer/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
