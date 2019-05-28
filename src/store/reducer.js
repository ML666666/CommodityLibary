let reducer = (state = {}, action)=>{
    switch (action.type) {
      case 'GET_SALE_COMMODITY':
        var _state = state;
        _state.CommoditySaleObj = action.payload;
        return _state 
      case 'DELETE_SALE_COMMODITY':
        var _state = state;
        _state.CommoditySaleObj = false;
        return _state 
      default:
        return state
    }
}

export default reducer