export default function (state = '', action) {
  switch (action.type) {
    case 'NotificationCount':
      return action.payload;
    default:
      return state;
  }
}
