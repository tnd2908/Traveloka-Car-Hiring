export const getListCarFromLowPrice = (list) =>{
    return{
        type: 'GET_LIST_CAR_FROM_LOW_PRICE',
        payload: list,
    }
}

export const getListCarFromHighPrice = (list) =>{
    return{
        type: 'GET_LIST_CAR_FROM_HIGH_PRICE',
        payload: list,
    }
}