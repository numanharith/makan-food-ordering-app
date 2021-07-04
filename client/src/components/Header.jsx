import { Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Actions
import { restaurantLogout } from '../actions/restaurantUserActions'

const Header = () => {
  const dispatch = useDispatch();

  const restaurantUserLogin = useSelector((state) => state.restaurantUserLogin);
  const { restaurantUserInfo } = restaurantUserLogin;

  const logoutHandler = () => {
    dispatch(restaurantLogout());
  }
  
  return (
    <Navbar bg='light' expand='lg' collapseOnSelect>
      <Container>
        <Navbar.Brand>Makan</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <LinkContainer exact to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {restaurantUserInfo &&
              <LinkContainer exact to='/mymenu'>
                <Nav.Link>Menu</Nav.Link>
              </LinkContainer>
            }
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider /> 
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown> */}
          </Nav>
          <Nav className='ml-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i className='fas fa-shopping-cart'></i> Cart
              </Nav.Link>
            </LinkContainer>
            {restaurantUserInfo &&
              <NavDropdown title={restaurantUserInfo.name} id='username'>
                <LinkContainer to='/account'>
                  <NavDropdown.Item>Account</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            }
            {!restaurantUserInfo &&
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
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
