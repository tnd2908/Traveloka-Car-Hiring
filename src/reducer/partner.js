const initialState ={
    isLogin: false
}
const partnerReducer = (state = initialState, action ) =>{
    switch (action.type){
        case 'LOGIN_PARTNER' :{
            const login = true
            return {...state, isLogin : login}
        }
        default:
            return state
    }
}
export default partnerReducer