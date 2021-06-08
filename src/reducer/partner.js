const initialState ={
    partner: {}
}
const partnerReducer = (state = initialState, action ) =>{
    switch (action.type){
        case 'SET_PARTNER_INFOR' :{
            return {...state, partner: action.payload}
        }
        default:
            return state
    }
}
export default partnerReducer