import {combineReducers} from 'redux';
import SubscriptionPlan from './SubscriptionPlan';
import AddBeneficiaryReducer from './AddBeneficiaryReducer';
const rootreducer = combineReducers({
  SubscriptionPlan,
  AddBeneficiaryReducer,
});

export default rootreducer;
