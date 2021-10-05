import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
// import animalData from './fakeData/animal.json';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Invertory from './components/Inventory/Invertory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';

function App() {
  // console.log(animalData)
  return (
    <Router>
      <div>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Shop></Shop>
          </Route>

          <Route path="/shop">
            <Shop></Shop>
          </Route>

          <Route path="/review">
            <Review></Review>
          </Route>

          <Route path="/inventory">
            <Invertory></Invertory>
          </Route>

          <Route path='/product/:productKey'>
            <ProductDetail></ProductDetail>
          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}



export default App;
