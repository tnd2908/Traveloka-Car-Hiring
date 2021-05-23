import {combineReducers} from 'redux'
import carReducer from './car'
import partnerReducer from './partner'
const rootReducer = combineReducers({
    car: carReducer,
    partner: partnerReducer
})
export default rootReducer;