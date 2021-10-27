export default function (state = {loading: true, data: []}, action) {
  switch (action.type) {
    case 'GetBeneficiary':
      return {...state, data: action.payload};
    case 'BENI_LOAD':
      return {...state, loading: false};
    default:
      return state;
  }
}
