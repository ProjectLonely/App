export default function (
  state = {
    planId: '',
    relationShipId: '',
    name: '',
    age: '',
    genderId: '',
    phoneNumber: '',
  },
  action,
) {
  switch (action.type) {
    case 'addBeneficiary':
      return {...state, ...action.payload};
    default:
      return state;
  }
}
