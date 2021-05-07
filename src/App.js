import './App.css';
import CarRental from './components/Page/car_rental.js';
import CarHomePage from './components/Page/car_homepage';
import CarDetail from './components/Page/car_detail.js';
import Admin from './components/Admin/admin.js'
import dotenv from 'dotenv'
import {
      BrowserRouter as Router,
      Switch,
      Route,
      useLocation,
      Link
} from "react-router-dom";
import ListCar from './components/Admin/list_car'
import AddCar from './components/Admin/add_car'
import { useState } from 'react';
import Nav from './components/nav';


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
                  </Switch>
                  <Switch>
                        <div>
                              <Nav/>
                              <Route exact path="/">
                                    <CarHomePage />
                              </Route>
                              <Route exact path="/vehicles">
                                    <CarRental />
                              </Route>
                              <Route exact path="/vehicles/:idVehicle">
                                    <CarDetail />
                              </Route>
                        </div>
                  </Switch>
            </Router>
      );
}

export default App;
