import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

// Components
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import FoodPage from './components/FoodPage'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomePage} exact/>
          <Route path='/foods/:foodId' component={FoodPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
