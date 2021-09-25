const initialState = {
  planId: '',
  relationShipId: 'Self',
  name: '',
  timeZone: 'Central Daylight Time Chicago (GMT-5)',
  age: '',
  genderId: 'Men',
  phoneNumber: '',
  aboutPerson: '',
  selectedSeekOption: [],
  comment: '',
  newArray: [],
  base64: '',
  sourceURL: '',
};
export default function (state = initialState, action) {
  switch (action.type) {
    case 'addBeneficiary':
      return {...state, ...action.payload};
    case 'completeBeneficiary':
      return {...initialState, newArray: []};
    default:
      return state;
  }
}
