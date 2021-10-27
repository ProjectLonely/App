export default function (state = {loading: true, data: []}, action) {
  switch (action.type) {
    case 'transactionDetail':
      return {...state, data: action.payload};
    case 'TRANSACTION_LOAD':
      return {...state, loading: false};
    default:
      return state;
  }
}
