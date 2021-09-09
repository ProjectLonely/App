export default function (state = [], action) {
  switch (action.type) {
    case 'GetBeneficiary':
      return action.payload;
    default:
      return state;
  }
}
