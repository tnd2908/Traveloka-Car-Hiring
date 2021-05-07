import {combineReducers} from 'redux'
import carReducer from './car'
const rootReducer = combineReducers({
    car: carReducer,
})
export default rootReducer;