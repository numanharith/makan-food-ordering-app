import { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const RestaurantPrivateRoute = ({ ...children }) => {
  const restaurantUserLogin = useSelector((state) => state.restaurantUserLogin);
  const { restaurantUserInfo } = restaurantUserLogin;

  return (
    <Fragment>
      {restaurantUserInfo ? (
        <Route {...children} /> 
      ) : (
        <Redirect to='restaurant/login' />
      )}
    </Fragment>
  )
};

export default RestaurantPrivateRoute;
