import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

// Components
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import FoodPage from './components/FoodPage'
import RestaurantLoginPage from './components/RestaurantLoginPage'
import RestaurantRegPage from './components/RestaurantRegPage'
import FoodListPage from './components/FoodListPage'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/restaurant/login' component={RestaurantLoginPage} />
          <Route path='/restaurant/reg' component={RestaurantRegPage} />
          <Route path='/foods/:foodId' component={FoodPage} />
          <Route path='/mymenu' component={FoodListPage} />
          <Route path='/' component={HomePage} exact/>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
