import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';

// Components
import Header from './components/Header';
import FoodList from './components/FoodList';
import AddFoodForm from './components/AddFoodForm';

import { Provider } from 'react-redux';
import store from './store';
import { loadRestaurantUser } from './actions/restaurantAuthActions';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    store.dispatch(loadRestaurantUser());
  }, []);

  return (
    <Provider store={store}>
      <div className='App'>
        <Header />
        <Container>
          <AddFoodForm />
          <FoodList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
