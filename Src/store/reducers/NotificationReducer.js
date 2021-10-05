const initialState = {chat: '0', normal: '0'};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'NotificationCount':
      return action.payload;

    default:
      return state;
  }
}
