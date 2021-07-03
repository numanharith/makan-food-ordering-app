import React, { Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logoutRestaurant } from '../../actions/restaurantAuthActions';

export const RestaurantLogout = ({ logoutRestaurant }) => {
  return (
    <Fragment>
      <NavLink onClick={logoutRestaurant} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

export default connect(null, { logoutRestaurant })(RestaurantLogout);