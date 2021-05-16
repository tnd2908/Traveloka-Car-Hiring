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
} from "react-router-dom";
import ListCar from './components/Admin/list_car'
import AddCar from './components/Admin/add_car'
import Nav from './components//commons/nav';


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
                                    {/* <Nav /> */}
                                    <CarHomePage />
                              </Route>
                              <Route exact path="/vehicles" >
                                    {/* <Nav/> */}
                                    <CarRental />
                              </Route>
                              <Route exact path="/vehicles/:idVehicle">
                                    {/* <Nav/> */}
                                    <CarDetail />
                              </Route>
                        </div>
                  </Switch>
            </Router>
      );
}

export default App;
