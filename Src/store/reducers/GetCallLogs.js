export default function (
  state = {loading: true, authorized: true, data: []},
  action,
) {
  switch (action.type) {
    case 'GetCallLogs':
      return {...state, data: action.payload};
    case 'TOGGLE_LOAD':
      return {...state, loading: false, authorized: false};
    default:
      return state;
  }
}
