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
import LoginPartner from './components/commons/login-partner';
import AddCarToDistrict from './components/Partner/add_car_area';
import ListBill from './components/Partner/list-bill';
import Revenue from "./components/Partner/Revenue"
import PurchaseList from './components/user/history';

function App() {
      const stripePromise = loadStripe("pk_test_51IVICLDPcgh4yPrvBWLYr3on18d1mqZxFbT6JO3XstNVbQr23QXK1JRxrmYpN4T5dz8ygdcBEnLZRCZipNUMGWi300j8wX9ChL")
      dotenv.config();
      return (
            <Router>
                  <Switch>
                        <Route exact path="/login-partner">
                              <LoginPartner/>
                        </Route>
                        <Route exact path="/partner">
                              <Admin com={<Revenue/>}/>
                        </Route>
                        <Route exact path="/partner/vehicles" >
                              <Admin com={<ListCar />} />
                        </Route>
                        <Route exact path="/partner/add-vehicles">
                              <Admin com={<AddCar />} />
                        </Route>
                        <Route exact path="/partner/add-car-area">
                              <Admin com={<AddCarToDistrict />} />
                        </Route>
                        <Route exact path="/partner/bill">
                              <Admin com={<ListBill/>} />
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
