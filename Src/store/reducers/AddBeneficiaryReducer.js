const initialState = {
  planId: '',
  relationShipId: '0',
  name: '',
  timeZone: '',
  age: '',
  genderId: '0',
  phoneNumber: '',
  aboutPerson: '',
  selectedSeekOption: [],
  comment: '',
  newArray: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case 'addBeneficiary':
      return {...state, ...action.payload};
    case 'completeBeneficiary':
      return initialState;
    default:
      return state;
  }
}
