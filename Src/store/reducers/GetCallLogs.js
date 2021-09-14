export default function (state = [], action) {
  switch (action.type) {
    case 'GetCallLogs':
      return action.payload;
    default:
      return state;
  }
}
