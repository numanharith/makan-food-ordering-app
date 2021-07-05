import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'

// Components
import RestaurantPrivateRoute from './components/RestaurantPrivateRoute'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import FoodPage from './components/FoodPage'
import RestaurantLoginPage from './components/RestaurantLoginPage'
import RestaurantRegPage from './components/RestaurantRegPage'
import CustomerLoginPage from './components/CustomerLoginPage'
import CustomerRegPage from './components/CustomerRegPage'
import FoodListPage from './components/FoodListPage'
import CartPage from './components/CartPage'
import RestaurantsPage from './components/RestaurantsPage'
import RestaurantMenuPage from './components/RestaurantMenuPage'
import CustomerOrdersPage from './components/CustomerOrdersPage'
import RestaurantOrdersPage from './components/RestaurantOrdersPage'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/orders' component={RestaurantOrdersPage} />
            <Route exact path='/myorders' component={CustomerOrdersPage} />
            <Route exact path='/restaurant/login' component={RestaurantLoginPage} />
            <Route exact path='/restaurant/reg' component={RestaurantRegPage} />
            <Route exact path='/restaurants/:restaurantId/menu' component={RestaurantMenuPage} />
            <Route exact path='/restaurants' component={RestaurantsPage} />
            <Route exact path='/customer/login' component={CustomerLoginPage} />
            <Route exact path='/customer/reg' component={CustomerRegPage} />
            <Route exact path='/customer/cart/:id?' component={CartPage} />
            <Route exact path='/foods/:foodId' component={FoodPage} />
            <RestaurantPrivateRoute exact path='/mymenu' component={FoodListPage} />
            {/* <Route path="/*" component={NotFound} status={404} /> */}
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
