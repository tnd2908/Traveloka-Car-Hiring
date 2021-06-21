import './App.css';
import CarRental from './components/Page/car_rental.js';
import CarHomePage from './components/Page/homepage';
import CarDetail from './components/Page/car_detail.js';
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
import LoginPartner from './components/commons/login-partner';
import AddCarToDistrict from './components/Partner/add_car_area';
import PurchaseList from './components/Page/purchase/history';
import Partner from './components/Partner/partner.js';
import Admin from './components/Admin/admin';
import Costumer from './components/Admin/customerlist';
import Saler from './components/Admin/salerlist';

function App() {
      const stripePromise = loadStripe("pk_test_51IVICLDPcgh4yPrvBWLYr3on18d1mqZxFbT6JO3XstNVbQr23QXK1JRxrmYpN4T5dz8ygdcBEnLZRCZipNUMGWi300j8wX9ChL")
      dotenv.config();
      return (
            <Router>
                  <Switch>
                        <Route exact path="/admin">
                              <Admin />
                        </Route>
                        <Route exact path="/admin/costumer" >
                              <Admin com={<Costumer />} />
                        </Route>
                        <Route exact path="/admin/saler" >
                              <Admin com={<Saler />} />
                        </Route>
                        <Route exact path="/login-partner">
                              <LoginPartner/>
                        </Route>
                        <Route exact path="/partner">
                              <Partner />
                        </Route>
                        <Route exact path="/partner/vehicles" >
                              <Partner com={<ListCar />} />
                        </Route>
                        <Route exact path="/partner/add-vehicles">
                              <Partner com={<AddCar />} />
                        </Route>
                        <Route exact path="/partner/add-car-area">
                              <Partner com={<AddCarToDistrict />} />
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
                        <Route exact path="/user/history">
                              <Nav />
                              <PurchaseList />
                        </Route>
                        <Route exact path="/vehicles/:idVehicle/input">
                              <Nav />
                              <Reservation />
                        </Route>
                        
                        <Route exact path="/vehicles/:idVehicle/payment">
                              <Nav />
                              <Payment children={<Rule/>}/>
                        </Route>
                        <Route path="/vehicles/:idVehicle/payment/credit">
                              <Nav />
                              <Elements stripe={stripePromise}>
                                    <Payment children={<CreditCard/>}/>
                              </Elements>
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
