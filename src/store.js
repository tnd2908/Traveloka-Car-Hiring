import rootReducer from './reducer/index'
const { createStore } = require("redux");
const store = createStore(rootReducer)
export default store