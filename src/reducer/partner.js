const initialState ={
    isLogin: false,
    token: localStorage.getItem("partner-token")
}
const partnerReducer = (state = initialState, action ) =>{
    switch (action.type){
        case 'LOGIN_PARTNER' :{
            const login = true
            if(state.token)
            return {...state, isLogin : login}
            else
            return {...state, isLogin : !login}

        }
        default:
            return state
    }
}
export default partnerReducer