export default function (state = {}, action) {
  switch (action.type) {
    case 'transactionDetail':
      return action.payload;
    default:
      return state;
  }
}
