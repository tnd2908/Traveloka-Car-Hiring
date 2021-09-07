export const LoginPartner = (user) =>{
    return{
        type: 'LOGIN_PARTNER',
        payload: user
    }
}
export const setPartnerInfor = (infor) =>{
    return{
        type: 'SET_PARTNER_INFOR',
        payload: infor
    }
}