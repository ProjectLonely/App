const initialState = {
  planId: '',
  relationShipId: 'Self',
  name: '',
  timeZone: '',
  age: '',
  genderId: 'Men',
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
