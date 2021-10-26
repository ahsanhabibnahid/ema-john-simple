import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
// import animalData from './fakeData/animal.json';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Review from './components/Review/Review';
import Invertory from './components/Inventory/Invertory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <h1>Email : {loggedInUser.email}</h1>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Shop></Shop>
          </Route>

          <Route path="/shop">
            <Shop></Shop>
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>

          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>

          <Route path="/review">
            <Review></Review>
          </Route>

          <PrivateRoute path="/inventory">
            <Invertory></Invertory>
          </PrivateRoute>

          <Route path='/product/:productKey'>
            <ProductDetail></ProductDetail>
          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>

        </Switch>
      </Router>
    </UserContext.Provider>
  );
}



export default App;
