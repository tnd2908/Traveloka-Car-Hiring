const initialState = {
    newBill: ""
}

const billReducer = (state = initialState, payload) => {
    switch(payload.type) {
        case "GET_NEW_BILL" : {
            return {...state, newBill: payload.result}
        }

        case "GET_VISA_PAYMENT" : {
            return {...state, visaInfo: payload.info}
        }

        default: {
            return {...state}
        }
    }
}

export default billReducer;