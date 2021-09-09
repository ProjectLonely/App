import {combineReducers} from 'redux';
import SubscriptionPlan from './SubscriptionPlan';
import AddBeneficiaryReducer from './AddBeneficiaryReducer';
import GetBeneficiary from './GetBeneficiary';

const rootreducer = combineReducers({
  SubscriptionPlan,
  AddBeneficiaryReducer,
  GetBeneficiary,
});

export default rootreducer;
