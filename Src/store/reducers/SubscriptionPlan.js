export default function (state = [], action) {
  switch (action.type) {
    case 'SubscriptionPlan':
      return action.payload;
    default:
      return state;
  }
}
