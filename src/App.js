import './App.css';
import CarRental from './components/Page/car_rental.js';
import CarHomePage from './components/Page/homepage';
import CarDetail from './components/Page/car_detail.js';
import Admin from './components/Partner/admin.js'
import dotenv from 'dotenv'
import {Elements} from '@stripe/react-stripe-js'
import {
      BrowserRouter as Router,
      Switch,
      Route,
} from "react-router-dom";
import ListCar from './components/Partner/list_car'
import AddCar from './components/Partner/add_car'
import Nav from './components//commons/nav';
import Reservation from './components/Page/payment/car_reservation';
import Payment from './components/Page/payment/payment';
import PaymentPage from './components/Page/payment/payment-cash'
import CreditCard from './components/Page/payment/credit_card'
import Rule from './components/Page/payment/payment_rule'
import { loadStripe } from '@stripe/stripe-js';
function App() {
      const stripePromise = loadStripe("pk_test_51IVICLDPcgh4yPrvBWLYr3on18d1mqZxFbT6JO3XstNVbQr23QXK1JRxrmYpN4T5dz8ygdcBEnLZRCZipNUMGWi300j8wX9ChL")
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
                                    <Payment children={<Rule/>}/> 
                              </Route>
                              <Route exact path="/vehicles/:idVehicle/payment/credit">
                                    <Payment children={
                                          <Elements stripe={stripePromise}>
                                                <CreditCard/>
                                          </Elements>
                                    }/> 
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
