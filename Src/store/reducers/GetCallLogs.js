export default function (state = {loading: true, data: []}, action) {
  switch (action.type) {
    case 'GetCallLogs':
      return {...state, data: action.payload};
    case 'TOGGLE_LOAD':
      return {...state, loading: false};
    default:
      return state;
  }
}
