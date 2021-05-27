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
import Reservation from './components/Page/car_reservation';
import Payment from './components/Page/payment/payment';


function App() {
      dotenv.config();
      return (
            <Router>
                  <Switch>
                        <Route exact path="/admin">
                              <Admin />
                        </Route>
                        <Route exact path="/admin/vehicles" >
                              <Admin com={<ListCar />} />
                        </Route>
                        <Route exact path="/admin/add-vehicles">
                              <Admin com={<AddCar />} />
                        </Route>
                        <div>
                              <Nav />
                              <Route exact path="/">
                                    <CarHomePage />
                              </Route>
                              <Route exact path="/vehicles" >
                                    <CarRental />
                              </Route>
                              <Route exact path="/detail/:id">
                                    <CarDetail />
                              </Route>
                              <Route exact path="/vehicles/:idVehicle/input">
                                    <Reservation/> 
                              </Route>
                              <Route exact path="/vehicles/:idVehicle/payment">
                                    <Payment/> 
                              </Route>
                              <Route exact path="/cart">
                                    <Payment className="mt-5"/>
                              </Route>
                        </div>
                  </Switch>
            </Router>
      );
}

export default App;
