const initialState ={
    listCar: [],
}
const carReducer = (state = initialState, action)=>{
    switch (action.type){
        case 'GET_LIST_CAR_FROM_LOW_PRICE':{
            return 'listcar'
        }
        case 'GET_LIST_CAR_FROM_HIGH_PRICE':{
            return 'haha'
        }
        default:
            return state
    }
}
export default carReducer;