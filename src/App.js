import './App.css';
import CarRental from './components/Page/car_rental.js';
import CarHomePage from './components/Page/homepage';
import CarDetail from './components/Page/car_detail.js';
import Admin from './components/Admin/admin.js'
import dotenv from 'dotenv'
import {
      BrowserRouter as Router,
      Switch,
      Route,
} from "react-router-dom";
import ListCar from './components/Admin/list_car'
import AddCar from './components/Admin/add_car'
import Nav from './components//commons/nav';
import Reservation from './components/Page/payment/car_reservation';
import Payment from './components/Page/payment/payment';
import LoginPartner from './components/commons/login-partner';


function App() {
      dotenv.config();
      return (
            <Router>
                  <Switch>
                        <Route exact path="/login-partner">
                              <LoginPartner/>
                        </Route>
                        <Route exact path="/admin">
                              <Admin />
                        </Route>
                        <Route exact path="/admin/vehicles" >
                              <Admin com={<ListCar />} />
                        </Route>
                        <Route exact path="/admin/add-vehicles">
                              <Admin com={<AddCar />} />
                        </Route>
                        <Route exact path="/">
                              <Nav />
                              <CarHomePage />
                        </Route>
                        <Route exact path="/vehicles" >
                              <Nav />
                              <CarRental />
                        </Route>
                        <Route exact path="/detail/:id">
                              <Nav />
                              <CarDetail />
                        </Route>
                        <Route exact path="/vehicles/:idVehicle/input">
                              <Nav />
                              <Reservation />
                        </Route>
                        <Route exact path="/vehicles/:idVehicle/payment">
                              <Nav />
                              <Payment />
                        </Route>
                        <Route exact path="/cart">
                              <Nav />
                              <Payment className="mt-5" />
                        </Route>
                  </Switch>
            </Router>
      );
}

export default App;
